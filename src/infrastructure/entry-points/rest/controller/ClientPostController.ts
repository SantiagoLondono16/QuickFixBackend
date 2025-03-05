import { Request, Response } from "express";
import { Controller } from "@shared/infrastructure/adapter/rest/Controller";
import { ApiResponse } from "@shared/infrastructure/adapter/rest/ApiResponse";
import { ClientUseCase } from "@domain/usecase/client/ClientUseCase";
import { injectable } from "tsyringe";
import { Client } from "@domain/model/client/Client";

@injectable()
export class ClientPostController implements Controller {
  constructor(private readonly clientUseCase: ClientUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const payload = await this.clientUseCase.create(req.body);
    ApiResponse.success<Client>(res, "User created successfully", payload);
  }
}
