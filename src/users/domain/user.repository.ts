import User from "./User"

export default interface UserRepository {
  create(user: User): Promise<String>
  getAll(): Promise<User[]> // this is to search users with an input
  login(user: User): Promise<User | undefined>
  update(idUser: String, user: User): Promise<String>
//  falta implementar getChats(): Promise<String[]>
}