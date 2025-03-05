import { Request, Response } from "express";
import { AccountUseCase } from "@domain/usecase/account/AccountUseCase";
import { Controller } from "@shared/infrastructure/adapter/rest/Controller";
import { ApiResponse } from "@shared/infrastructure/adapter/rest/ApiResponse";
import { TokenPayload } from "@domain/model/account/gateways/TokenRepository";
import { injectable } from "tsyringe";

interface AuthRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthPostController implements Controller {
  constructor(private readonly accountUseCase: AccountUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const payload = await this.accountUseCase.login(req.body as AuthRequest);
    ApiResponse.success<TokenPayload>(
      res,
      "Token generated successfully",
      payload,
    );
  }
}
