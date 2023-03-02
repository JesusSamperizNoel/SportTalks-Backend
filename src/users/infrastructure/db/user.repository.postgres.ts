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
                    `insert into users(password, name, lastName, email, bornDate, sport, description)
                    values (
                        '${hash(user.password)}',
                        '${user.name}',
                        '${user.lastName}',
                        '${user.email}',
                        '${user.bornDate}',
                        '${user.sport}',
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

    async getAll(): Promise<User[]> {
        const result: any[] = await executeQuery(
            `select * from users`
        )
        return result
    }

    async login(user: User): Promise<User | undefined> {
        try {
            if (user.name && user.password) {
                const result: any[] = await executeQuery(`
                        select * 
                        from users 
                        where name = '${user.name}'
                    `)
                const userFromDB = result[0]
                if (userFromDB && compare(user.password, userFromDB.password)) {
                    const userOK : User = {
                        id: userFromDB.id,
                        name: userFromDB.name,
                        password: userFromDB.password,
                        lastName: userFromDB.lastName,
                        email: userFromDB.email,
                        bornDate: userFromDB.bornDate,
                        sport: userFromDB.sport,
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
                `insert into usertalkuser (user1, user2)
                values (${user1}, ${user2})`
            )
            return "New talk started";
        } catch {
            return "Error starting new talk";
        }
    }

    async getTalks(userid: Number): Promise<String[]> {
        try {            
            const talksUsers = await executeQuery(
                `
                SELECT name
                FROM users
                INNER JOIN usermessages ON users.id = usermessages.receiver
                where transmitter = ${userid}       
                `
            )
            console.log(talksUsers);
            
            const talksGroups = await executeQuery(
                `
                SELECT name
                FROM groups
                INNER JOIN groupusers ON groups.id = groupusers.groupid
                where userid = ${userid}
                `
            )
            const talks = talksUsers.concat(talksGroups) //union of 2 array responses
            return talks;
        } catch (error) {
            console.error(String(error));
            
            return ["failed"];
        }
    }
}