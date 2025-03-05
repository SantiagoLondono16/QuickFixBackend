import { accountRol } from "./AccountProps";

export interface CreateAccount {
  email: string;
  password: string;
  rol: accountRol;
}
