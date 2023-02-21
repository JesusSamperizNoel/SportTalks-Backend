import Message from "./Message"

export default interface MessageRepository {
    create(message: Message): Promise<undefined>
    getUserMessages(transmitter: String, receiver: String): Promise<Message[]>
    getGroupMessages(group: String): Promise<Message[]>
} 