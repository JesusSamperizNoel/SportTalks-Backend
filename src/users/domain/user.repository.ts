import User from "./User"

export default interface UserRepository {
  create(user: User): Promise<String>
  getUser(userid: Number): Promise<User>
  getAll(): Promise<User[]>
  getFromPattern(pattern: String): Promise<User[]>
  login(user: User): Promise<User | undefined>
  update(idUser: String, user: User): Promise<String>
  addUserTalkUser(user1: Number, user2: Number): Promise<String>
  getTalks(userid: Number): Promise<String[]>
}