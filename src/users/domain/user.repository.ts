import User from "./User"

export default interface UserRepository {
  create(user: User): Promise<String>
  getAll(): Promise<User[]> // this is to search users with an input while typing it
  login(user: User): Promise<User | undefined>
  update(idUser: String, user: User): Promise<String>
  addUserTalkUser(user1: Number, user2: Number): Promise<String>
  getTalks(userid: Number): Promise<String[]>
}