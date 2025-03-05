import { MainApplication } from "./app-service/MainApplication";

try {
  new MainApplication().start();
} catch (err) {
  console.log(err);
}
