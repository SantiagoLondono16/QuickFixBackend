import { AccountRepository } from "@domain/model/account/gateways/AccountRepository";
import { HasherRepository } from "@domain/model/account/gateways/HasherProviderRepository";
import { TokenRepository } from "@domain/model/account/gateways/TokenRepository";
import { Login } from "@domain/model/account/type/LoginProps";
import { inject, injectable } from "tsyringe";

@injectable()
export class AccountUseCase {
  constructor(
    @inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
    @inject(HasherRepository)
    private readonly hasherRepository: HasherRepository,
    @inject(TokenRepository)
    private readonly tokenRepository: TokenRepository,
  ) {}

  // POST: api/v1/login
  async login(payload: Login) {
    const user = await this.accountRepository.getByEmail(payload.email);
    if (!user) throw new Error("Wrong email, user does not exists");

    const userProps = user.getProps();
    const isMatch = await this.hasherRepository.check(
      payload.password,
      userProps.password,
    );

    if (!isMatch) throw new Error("Wrong password");

    return this.tokenRepository.generate(
      userProps.id.valueOf() as string,
      payload.email,
    );
  }
}
