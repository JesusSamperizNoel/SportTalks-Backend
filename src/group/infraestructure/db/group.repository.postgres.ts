//Application entities:
import Group from "../../domain/Group"
import GroupRepository from "../../domain/group.repository"
//SQL:
import executeQuery from "../../../context/db/postgres.connector"

export default class GroupRepositoryPostgres implements GroupRepository {
        
    async create(group: Group): Promise<String> {
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

    async addUser(userid: Number, groupid: String): Promise<String> {      
        const groupidRes = await executeQuery(
            `select id 
            from groups 
            where name = '${groupid}'`
        )        
        const newUserGroup = await executeQuery(
            `insert into groupusers (userid, groupid)
            values (${userid}, ${groupidRes[0].id})`
        )
        if (newUserGroup) {
            return "User added to "+groupid
        } else {
            return "Failed adding user to group"
        }
    }
}