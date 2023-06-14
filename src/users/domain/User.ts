export default interface User{
    id?: Number
    password: String
    name: String
    surname?: String
    username?: String
    email?: String
    borndate?: Date
    sports?: String //this is an select input of determined sport
    description?: String
    talks?: String[] //here are stored groups and users
}