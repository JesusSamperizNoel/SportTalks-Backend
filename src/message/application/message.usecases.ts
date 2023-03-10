import Message from "../domain/Message";
import MessageRepository from "../domain/message.repository";

export default class MessageUseCases {

    messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    createMessageUsers(message: Message, transmitter: String, receiver: String): Promise <undefined> {
        return this.messageRepository.createMessageUsers(message, transmitter, receiver)
    }

    createMessageGroups(message: Message, transmitter: String, groupReceiver: String): Promise <undefined> {
        return this.messageRepository.createMessageGroups(message, transmitter, groupReceiver)
    }

    getUserMessages(transmitter: String, receiver: String): Promise <String[]> {
        return this.messageRepository.getUserMessages(transmitter, receiver)
    }
    
    getGroupMessages(group: String): Promise <String[]> {
        return this.messageRepository.getGroupMessages(group)
    }
}