import User from "../domain/User";
import UserRepository from "../domain/user.repository";

export default class UserUseCases {

  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  create(user: User): Promise<String> {
    return this.userRepository.create(user);
  }

  getUser(userid: Number) {
    return this.userRepository.getUser(userid);
  }

  getAll() {
    return this.userRepository.getAll();
  }

  getFromPattern(pattern: String) {
    return this.userRepository.getFromPattern(pattern);
  }

  login(user: User): Promise<User | undefined> {
    return this.userRepository.login(user);
  }

  update(idUser: String, user: User) {
    return this.userRepository.update(idUser, user);
  }

  addUserTalkUser(user1: Number, user2: Number) {
    return this.userRepository.addUserTalkUser(user1, user2)
  }

  getTalks(userid: Number) {
    return this.userRepository.getTalks(userid);
  }
}