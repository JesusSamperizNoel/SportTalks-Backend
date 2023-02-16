//Application entities:
import Group from "../../domain/Group"
import GroupRepository from "../../domain/group.repository"
//SQL:
import executeQuery from "../../../context/db/postgres.connector"

export default class GroupRepositoryPostgres implements GroupRepository {
    
    async create(group): Promise<String> {
        try {
            if (group.sport && group.name && group.admin) {
                await executeQuery(
                    `insert into groups(name, sport, admin)
                    values (
                        '${group.name}',
                        '${group.sport}',
                        '${group.admin}'
                    )`
                )
            }
            return `Group: ${group.name}, has been created successfully`            
        } catch (error) {
            return 'The necessary data has not been correctly provided'
        }     
    }

    async getAll(): Promise<Group[]> {
        const result: any[] = await executeQuery(
            `select * from groups`
        )
        return result
    }
}