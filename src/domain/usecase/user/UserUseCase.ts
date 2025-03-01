import { HasherRepository } from "@domain/model/user/gateways/HasherProviderRepository";
import { UserRepository } from "@domain/model/user/gateways/UserRepository";
import { CreateUserProps } from "@domain/model/user/type/CreateUserProps";
import { User } from "@domain/model/user/User";
import { UserPassword } from "@domain/model/user/value-object/UserPassword";

export class UserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasherRepository: HasherRepository,
  ) {}

  async create(payload: CreateUserProps): Promise<User> {
    const foundUser = await this.userRepository.getByEmail(payload.email);
    if (foundUser) throw new Error("The user already exists.");

    const verifiedPass = UserPassword.create(payload.password).value;
    const hashedPass = await this.hasherRepository.hash(verifiedPass);
    const user = User.create({ email: payload.email, password: hashedPass });

    // Save new user
    await this.userRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.all();
  }

}
