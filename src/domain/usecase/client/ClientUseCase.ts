import { AccountRepository } from "@domain/model/account/gateways/AccountRepository";
import { HasherRepository } from "@domain/model/account/gateways/HasherProviderRepository";
import { CreateAccount } from "@domain/model/account/type/CreateAccount";
import { AccountPassword } from "@domain/model/account/value-object/AccountPassword";
import { Client } from "@domain/model/client/Client";
import { ClientRepository } from "@domain/model/client/gateways/ClientRepository";
import { CreateClient } from "@domain/model/client/type/CreateClient";
import { ServiceType } from "@domain/model/service/type/CreateService";
import { HireService } from "@domain/model/service/type/HireService";
import { WorkerRepository } from "@domain/model/worker/gateways/WorkerRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientUseCase {
  constructor(
    @inject(AccountRepository)
    private readonly accountRepository: AccountRepository,
    @inject(ClientRepository)
    private readonly clientRepository: ClientRepository,
    @inject(HasherRepository)
    private readonly hasherRepository: HasherRepository,
    @inject(WorkerRepository)
    private readonly workerRepository: WorkerRepository,
  ) {}

  // POST: api/v1/client
  async create(payload: CreateClient & Omit<CreateAccount, "rol">) {
    const { email, password, name } = payload;

    const foundUser = await this.accountRepository.getByEmail(email);
    if (foundUser) throw new Error("The user already exists.");

    const verifiedPass = AccountPassword.create(password).value;
    const hashedPass = await this.hasherRepository.hash(verifiedPass);

    const createdClient = Client.create({ name });
    createdClient.addAccount(email, hashedPass, "CLIENT");
    // Save client
    await this.clientRepository.save(createdClient);
    return createdClient;
  }

  // POST: api/v1/client/service
  async hireService(payload: HireService) {
    const type = ServiceType[payload.type as keyof typeof ServiceType];

    const client = await this.clientRepository.findByAccountEmail(
      payload.clientEmail,
    );
    if (!client) throw new Error("User not found.");

    const worker = await this.workerRepository.findOneById(payload.workerId);
    if (!worker) throw new Error("Worker not found.");

    const serviceProps = {
      worker,
      type,
      address: payload.address,
      onDate: payload.onDate,
      value: payload.value,
      paymentType: payload.payment,
      description: payload.description,
    };

    // Add new service
    const createdService = client.addService(serviceProps);
    // Save service
    await this.clientRepository.save(client);

    return createdService;
  }
  // // PATCH: api/v1/client/service/{id}
  // GET: api/v1/client/service?params
}
