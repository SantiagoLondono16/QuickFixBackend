import "module-alias/register";
import "reflect-metadata";
import { SecurityConfig } from "./config/SecurityConfig";
import { ServerConfig } from "./config/ServerConfig";
import express from "express";
import http from "http";
import registerRoutes from "@infrastructure/entry-points/rest/routes/routes";
import registerDependencies from "./DI/DependencyRegistration";

export class Server {
  public app: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(params: { port: string }) {
    const { port } = params;
    this.port = port;
    this.app = express();
    this.configuration();
    this.routes();
  }

  private configuration(): void {
    ServerConfig.setConfig(this.app);
    SecurityConfig.setConfig(this.app);
    registerDependencies();
  }

  private routes(): void {
    this.app.use("/api/v1", registerRoutes());
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(this.port, () => {
        console.log(`The server running in: http://localhost:${this.port}\n`);
        console.log("Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) return resolve();
      this.httpServer.close((err) => (err ? reject(err) : resolve()));
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }
}
