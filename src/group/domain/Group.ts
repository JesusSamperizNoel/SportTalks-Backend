import User from "../../users/domain/User"

export default interface Group {
    id?: Number
    name: String
    sport: String
    admin: Number
    users?: User[]
}