import { AuthRoutes } from "./AuthRoutes";
import { Router } from "express";
import { ClientRoutes } from "./ClientRoutes";

const registerRoutes = (): Router => {
  const router = Router();
  router.use("/", new AuthRoutes().router);
  router.use("/client", new ClientRoutes().router);
  return router;
};

export default registerRoutes;
