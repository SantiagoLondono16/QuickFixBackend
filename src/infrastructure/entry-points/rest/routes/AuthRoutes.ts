import { InstanceFactory } from "@applications/app-service/DI/InstanceFactory";
import { Router } from "express";
import { AuthPostController } from "../controller/AuthPostController";

export class AuthRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.registerRoutes();
  }

  protected registerRoutes() {
    this.router.post("/login", (req, res) =>
      InstanceFactory(AuthPostController).execute(req, res),
    );
  }
}
