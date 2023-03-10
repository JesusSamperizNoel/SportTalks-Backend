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

    async getUserMessages(transmitter: String, receiver: String): Promise<String[]> {
        const messagesId: any[] = await executeQuery(
            `select message from usermessages where transmitter = ${transmitter} and receiver = ${receiver}`
        )
        const messageTexts: any[] = messagesId.map(async m => {
            const text: any[] = await executeQuery(`select text from messages where id = ${m.message}`)          
            return text[0].text
        })
        const texts = await Promise.all(messageTexts)
        return texts
    }

    async getGroupMessages(groupName: String): Promise<String[]> {
        const messagesId: any[] = await executeQuery(
            `select message from groupmessages where groupid = ${groupName}`
        )
        const messageTexts: any[] = messagesId.map(async m => {
            const text: any[] = await executeQuery(`select text from messages where id = ${m.message}`)          
            return text[0].text
        })
        const texts = await Promise.all(messageTexts)
        return texts
    }
}