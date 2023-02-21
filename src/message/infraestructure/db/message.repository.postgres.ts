import executeQuery from "../../../context/db/postgres.connector";
import Message from "../../domain/Message";
import MessageRepository from "../../domain/message.repository";

export default class MessageRepositoryPostgres implements MessageRepository {
    async create(message: Message) {
        try {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
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

    async getUserMessages(transmitter: String, receiver: String): Promise<Message[] | undefined> {
        const result: any[] = await executeQuery(
            `select * from userMessages where transmitter = ${transmitter} and receiver = ${receiver}`
        )
        return result
    }

    async getGroupMessages(group: String): Promise<Message[] | undefined> {
        const result: any[] = await executeQuery(
            `select * from groupMessages where group = ${group}`
        )
        return result
    }
}