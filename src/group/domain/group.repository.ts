import Group from "./Group"

export default interface GroupRepository {
  create(group: Group): Promise<String>
  getAll(): Promise<Group[]> // this is to search groups with an input
}