import { SecurityConfig } from "./config/SecurityConfig";
import { ServerConfig } from "./config/ServerConfig";
import express, { Router } from "express";
import http from "http";

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
  }

  private routes(): void {
    const router = Router();
    this.app.use(router);
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
      if (!this.httpServer) return;
      this.httpServer.close((err) => (err ? reject(err) : resolve()));
    });
  }

  getHTTPServer() {
    return this.httpServer;
  }
}
