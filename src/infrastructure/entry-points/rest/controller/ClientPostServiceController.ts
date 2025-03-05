import { Request, Response } from "express";
import { Controller } from "@shared/infrastructure/adapter/rest/Controller";
import { ApiResponse } from "@shared/infrastructure/adapter/rest/ApiResponse";
import { ClientUseCase } from "@domain/usecase/client/ClientUseCase";
import { Service } from "@domain/model/service/Service";
import { injectable } from "tsyringe";

@injectable()
export class ClientPostServiceController implements Controller {
  constructor(private readonly clientUseCase: ClientUseCase) {}

  async execute(req: Request, res: Response): Promise<void> {
    const payload = await this.clientUseCase.hireService(req.body);
    ApiResponse.success<Service>(res, "User created successfully", payload);
  }
}
