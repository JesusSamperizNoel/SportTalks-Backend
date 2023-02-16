export default interface User{
    id?: Number
    password: String
    name: String
    lastName: String
    email: String
    bornDate: Date
    sport: String //this is an select input of determined sport
    description: String
    chats?: String[] //here are stored groups and users
}