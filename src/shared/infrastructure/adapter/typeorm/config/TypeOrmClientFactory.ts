import { DataSource } from "typeorm";
import { TypeOrmConfig } from "./TypeOrmConfig";
import { join } from "path";

export class TypeOrmClientFactory {
  static async createClient(config: TypeOrmConfig): Promise<DataSource> {
    const dataSource = new DataSource({
      type: "mssql",
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: true,
      logging: true,
      entities: [
        join(
          __dirname,
          "../../../../../infrastructure/driven-adapters/typeorm/**/entity/*.{js,ts}",
        ),
      ],
      options: { trustServerCertificate: true },
    });

    await dataSource.initialize();
    return dataSource;
  }
}
