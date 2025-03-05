import { TypeOrmConfig } from "@shared/infrastructure/adapter/typeorm/config/TypeOrmConfig";

export class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: "localhost",
      port: 1443,
      username: "root",
      password: "123",
      database: "quickfix",
    };
  }
}
