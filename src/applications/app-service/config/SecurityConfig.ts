import helmet, { HelmetOptions } from "helmet";
import { Express } from "express";
import cors, { CorsOptions } from "cors";

export class SecurityConfig {
  constructor() {}

  static setConfig(app: Express) {
    // Helmet configuration
    const helmetConfiguration: HelmetOptions = {
      xssFilter: true,
      noSniff: true,
      hidePoweredBy: true,
      frameguard: { action: "deny" },
    };
    app.use(helmet(helmetConfiguration));

    // cross-origin sharing standard configuration
    const corsConfiguration: CorsOptions = {
      origin: "*",
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    };
    app.use(cors(corsConfiguration));
  }
}
