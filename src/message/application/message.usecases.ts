import Message from "../domain/Message";
import MessageRepository from "../domain/message.repository";

export default class MessageUseCases {

    messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository
    }

    create(message: Message): Promise <undefined> {
        return this.messageRepository.create(message)
    }

    getUserMessages(transmitter: String, receiver: String): Promise <Message[]> {
        return this.messageRepository.getUserMessages(transmitter, receiver)
    }
    
    getGroupMessages(group: String): Promise <Message[]> {
        return this.messageRepository.getGroupMessages(group)
    }
}