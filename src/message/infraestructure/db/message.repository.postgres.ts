//Application entities:
import Message from "../../domain/Message";
import MessageRepository from "../../domain/message.repository";
//SQL:
import executeQuery from "../../../context/db/postgres.connector";

export default class MessageRepositoryPostgres implements MessageRepository {
    async createMessageUsers(message: Message, transmitter: String, receiver: String) {
        try {
            //seting correct format to the message date for the SQL script:
            const formatedDate = `${message.date.getFullYear() + 1}-${message.date.getMonth()}-${message.date.getDay()} ${message.date.getHours()}:${message.date.getMinutes()}:${message.date.getSeconds()}`
            const resId = await executeQuery(
                `insert into messages(text, date)
                values (
                    '${message.text}',
                    '${formatedDate}'
                )
                returning id`
            )        
            await executeQuery(
                `insert into usermessages(message, transmitter, receiver)
                values (
                    ${resId[0].id},
                    ${transmitter},
                    ${receiver}
                )`
            )            
            return undefined //No necessary "OK" message for send message to a chat 
        } catch (error) {
            //There can't be an error because client application checks if credentials are ok
            console.error(String(error))
        }
    }

    async createMessageGroups(message: Message, transmitter: String, groupReceiver: String) {
        try {
            //seting correct format to the message date for the SQL script:
            const formatedDate = `${message.date.getFullYear() + 1}-${message.date.getMonth()}-${message.date.getDay()} ${message.date.getHours()}:${message.date.getMinutes()}:${message.date.getSeconds()}`
            const resId = await executeQuery(
                `insert into messages(text, date)
                values (
                    '${message.text}',
                    '${formatedDate}'
                )
                returning id`
            )                            
            await executeQuery(
                `insert into groupmessages(groupid, message, transmitter)
                values (
                    ${groupReceiver},
                    ${resId[0].id},
                    ${transmitter}
                )`
            )
            return undefined //No necessary "OK" message for send message to a chat 
        } catch (error) {
            //There can't be an error because client application checks if credentials are ok
            console.error(String(error))
        }
    }

    async getUserMessages(transmitter: String, receiver: String): Promise<Message[]> {
        const result: any[] = await executeQuery(
            `select * from usermessages where transmitter = ${transmitter} and receiver = ${receiver}`
        )
        return result
    }

    async getGroupMessages(groupName: String): Promise<Message[]> {
        const resId = await executeQuery(
            `select id 
            from groups 
            where name = '${groupName}'`
        )         
        const result: any[] = await executeQuery(
            `select * from groupmessages where groupid = ${resId[0].id}`
        )
        return result
    }
}