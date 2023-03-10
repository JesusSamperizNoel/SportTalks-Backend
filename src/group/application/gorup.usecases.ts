import Group from "../domain/Group"
import GroupRepository from "../domain/group.repository"

export default class GroupUseCases {

    groupRepository: GroupRepository

    constructor(groupRepository: GroupRepository) {
        this.groupRepository = groupRepository
    }

    async create (group: Group) {
        return await this.groupRepository.create(group)
    }
    
    async getAll () {
        return await this.groupRepository.getAll()
    }

    async getFromPattern (pattern: String) {
        return await this.groupRepository.getFromPattern(pattern)
    }

    async addUser (userid: Number, group: String) {
        return await this.groupRepository.addUser(userid, group)
    }
}