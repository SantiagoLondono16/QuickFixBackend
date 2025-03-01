import { Express, json, urlencoded } from "express";

export class ServerConfig {
  constructor() {}

  static setConfig(app: Express) {
    app.use(json());
    app.use(urlencoded({ extended: true }));
  }
}
