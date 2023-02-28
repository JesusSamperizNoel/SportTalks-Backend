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

  getAll() {
    return this.userRepository.getAll();
  }

  login(user: User): Promise<User | undefined> {
    return this.userRepository.login(user);
  }

  update(idUser: String, user: User) {
    return this.userRepository.update(idUser, user);
  }

  getTalks(userid: Number) {
    return this.userRepository.getTalks(userid);
  }
}