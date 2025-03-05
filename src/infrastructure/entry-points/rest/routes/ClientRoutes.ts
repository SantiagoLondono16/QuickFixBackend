import { InstanceFactory } from "@applications/app-service/DI/InstanceFactory";
import { ClientPostController } from "../controller/ClientPostController";
import { Router } from "express";
import { ClientPostServiceController } from "../controller/ClientPostServiceController";

export class ClientRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected registerRoutes() {
    this.router.post("/", (req, res) =>
      InstanceFactory(ClientPostController).execute(req, res),
    );
    this.router.post("/service", (req, res) =>
      InstanceFactory(ClientPostServiceController).execute(req, res),
    );
  }
}
