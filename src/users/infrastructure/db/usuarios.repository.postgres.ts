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
                        '${hash(user.password)},'
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
                        where name = '${user.name}'`)
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
            const result: any[] = await executeQuery(
                `update usuarios 
                set password = '${hash(user.password)}'
                where id = '${idUser}'`
            )
            return "Updated and saved changes";
        } catch {
            return "Error updating data";
        }
    }
}