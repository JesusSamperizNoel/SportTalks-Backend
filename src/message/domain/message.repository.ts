import Message from "./Message"

export default interface MessageRepository {
    createMessageUsers(message: Message, transmitter: String, receiver: String): Promise<undefined>
    createMessageGroups(message: Message, transmitter: String, groupReceiver: String): Promise<undefined>
    getUserMessages(transmitter: String, receiver: String): Promise<String[]>
    getGroupMessages(group: String): Promise<String[]>
} 