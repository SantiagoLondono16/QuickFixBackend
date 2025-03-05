import { TokenRepository } from "@domain/model/account/gateways/TokenRepository";
import { HasherRepository } from "@domain/model/account/gateways/HasherProviderRepository";
import { JsonWebToken } from "@infrastructure/driven-adapters/jwt/JsonWebToken";
import { BcryptHasher } from "@infrastructure/driven-adapters/bcrypt/BcryptHasher";
import { DataSource } from "typeorm";
import { TypeOrmConfigFactory } from "@infrastructure/driven-adapters/typeorm/config/TypeOrmConfigFactory";
import { TypeOrmClientFactory } from "@shared/infrastructure/adapter/typeorm/config/TypeOrmClientFactory";
import { AccountRepository } from "@domain/model/account/gateways/AccountRepository";
import { AccountTypeOrmRepository } from "@infrastructure/driven-adapters/typeorm/account/repository/AccountTypeOrmRepository";
import { ClientRepository } from "@domain/model/client/gateways/ClientRepository";
import { ClientTypeOrmRepository } from "@infrastructure/driven-adapters/typeorm/client/repository/ClientTypeOrmRepository";
import { ClientMapper } from "@infrastructure/driven-adapters/typeorm/client/mapper/ClientMapper";
import { AccountMapper } from "@infrastructure/driven-adapters/typeorm/account/mapper/AccountMapper";
import { SkillMapper } from "@infrastructure/driven-adapters/typeorm/skill/mapper/SkillMapper";
import { WorkerMapper } from "@infrastructure/driven-adapters/typeorm/worker/mapper/WorkerMapper";
import { CertificationMapper } from "@infrastructure/driven-adapters/typeorm/certification/mapper/CertificationMapper";
import { ReviewMapper } from "@infrastructure/driven-adapters/typeorm/review/mapper/ReviewMapper";
import { ServiceMapper } from "@infrastructure/driven-adapters/typeorm/service/mapper/ServiceMapper";
import { PaymentMapper } from "@infrastructure/driven-adapters/typeorm/payment/PaymentMapper";
import { WorkerRepository } from "@domain/model/worker/gateways/WorkerRepository";
import { WorkerTypeOrmRepository } from "@infrastructure/driven-adapters/typeorm/worker/repository/WorkerTypeOrmRepository";
import containerApp from "./Container";

export default async function registerDependencies() {
  containerApp.register(HasherRepository, BcryptHasher);
  containerApp.register(TokenRepository, JsonWebToken);
  containerApp.register(AccountRepository, AccountTypeOrmRepository);
  containerApp.register(ClientRepository, ClientTypeOrmRepository);
  containerApp.register(WorkerRepository, WorkerTypeOrmRepository);

  // Mappers
  containerApp.registerSingleton(AccountMapper, AccountMapper);
  containerApp.registerSingleton(PaymentMapper, PaymentMapper);
  containerApp.registerSingleton(SkillMapper, SkillMapper);
  containerApp.registerSingleton(WorkerMapper, WorkerMapper);
  containerApp.registerSingleton(CertificationMapper, CertificationMapper);
  containerApp.registerSingleton(ReviewMapper, ReviewMapper);
  containerApp.registerSingleton(ServiceMapper, ServiceMapper);
  containerApp.registerSingleton(ClientMapper, ClientMapper);

  const datasource = await TypeOrmClientFactory.createClient(
    TypeOrmConfigFactory.createConfig(),
  );

  containerApp.registerInstance(DataSource, datasource);
}
