//Application entities:
import Message from "../../domain/Message";
import MessageRepository from "../../domain/message.repository";
//SQL:
import executeQuery from "../../../context/db/postgres.connector";

export default class MessageRepositoryPostgres implements MessageRepository {
    async create(message: Message) {
        try {
            //seting correct format to the message date for the SQL script:
            const formattedDate = `${message.date.getDate()}/
            ${message.date.getMonth() + 1}/
            ${message.date.getFullYear()} 
            ${message.date.getHours()}:
            ${message.date.getMinutes()}:
            ${message.date.getSeconds()}`
            await executeQuery(
                `insert into messages(text, date)
                values (
                    '${message.text}',
                    '${formattedDate}'
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
            `select * from userMessages where transmitter = ${transmitter} and receiver = ${receiver}`
        )
        return result
    }

    async getGroupMessages(group: String): Promise<Message[]> {
        const result: any[] = await executeQuery(
            `select * from groupMessages where group = ${group}`
        )
        return result
    }
}