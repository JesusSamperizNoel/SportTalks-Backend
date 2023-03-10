import Group from "./Group"

export default interface GroupRepository {
  create(group: Group): Promise<String>
  getAll(): Promise<Group[]>
  getFromPattern(pattern: String): Promise<Group[]>
  addUser(userid: Number, group: String): Promise<String>
}