//Application entities:
import User from "../../domain/User";
import UserRepository from "../../domain/user.repository";
//security:
import { compare, hash } from "../../../context/security/encrypter";
//SQL:
import executeQuery from "../../../context/db/postgres.connector";

export default class UserRepositoryPostgres implements UserRepository {
    async create(user: User): Promise<String> {
        try {
            if (user.name && user.password) {
                await executeQuery(
                    `insert into users(password, name, surName, username, email, borndate, sports, description)
                    values (
                        '${hash(user.password)}',
                        '${user.name}',
                        '${user.surname}',
                        '${user.username}',
                        '${user.email}',
                        '${user.borndate}',
                        '${user.sports}',
                        '${user.description}'
                    )`
                )
            }
            return `User: ${user.name}, has been created successfully`            
        } catch (error) {
            console.error(String(error))
            return 'The necessary data has not been correctly provided'
        }     
    }

    async getUser(userid: Number): Promise<User> {
        const result: any[] = await executeQuery(
            `select * from users where id = ${userid}`
        )
        return result[0]
    }

    async getAll(): Promise<User[]> {
        const result: any[] = await executeQuery(
            `select * from users`
        )
        return result
    }

    async getFromPattern(pattern: String): Promise<User[]> {
        const result: any[] = await executeQuery(
            `SELECT * FROM users WHERE LOWER(name) LIKE '%${pattern.toLowerCase()}%'`
        )
        return result
    }

    async login(user: User): Promise<User | undefined> {
        try {
            if (user.name && user.password) {
                const result: any[] = await executeQuery(`
                        select * 
                        from users 
                        where username = '${user.name}'
                    `)
                const userFromDB = result[0]                
                if (userFromDB && compare(user.password, userFromDB.password)) {
                    const userOK : User = {
                        id: userFromDB.id,
                        name: userFromDB.name,
                        password: userFromDB.password,
                        surname: userFromDB.surname,
                        username: userFromDB.user,
                        email: userFromDB.email,
                        borndate: userFromDB.borndate,
                        sports: userFromDB.sports,
                        description: userFromDB.description
                    }                                
                return userOK
            }
        } 
        }catch (error) {
            return undefined            
        }
    }

    async update(idUser: String, user: User): Promise<String> {
        try {
            await executeQuery(
                `update usuarios 
                set password = '${hash(user.password)}'
                where id = '${idUser}'`
            )
            return "Updated and saved changes";
        } catch {
            return "Error updating data";
        }
    }

    async addUserTalkUser(user1: Number, user2: Number): Promise<String> {
        try {
            await executeQuery(
                `insert into usertalkuser (transmitter, receiver)
                values (${user1}, ${user2})`
            )
            return "New talk started";
        } catch {
            return "Error starting new talk";
        }
    }

    async getTalks(userid: Number): Promise<String[]> {
        try {            
            const talksUsers: any[] = await executeQuery(
                `
                SELECT name, id
                FROM users
                INNER JOIN usertalkuser ON users.id = usertalkuser.receiver
                where transmitter = ${userid}       
                `
            )
            talksUsers.forEach((t) => {
                t.type = 'user'
            })

            const talksGroups: any[] = await executeQuery(
                `
                SELECT name, id
                FROM groups
                INNER JOIN groupusers ON groups.id = groupusers.groupid
                where userid = ${userid}
                `
            )
            talksGroups.forEach((t) => {
                t.type = 'group'
            })

            const talks = talksUsers.concat(talksGroups) //union of 2 array responses           
            return talks;
        } catch (error) {
            console.error(String(error));
            return ["failed"];
        }
    }
}