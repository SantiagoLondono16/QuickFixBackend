import InjectionToken from "tsyringe/dist/typings/providers/injection-token";
import Container from "./Container";

export function InstanceFactory<T>(token: InjectionToken<T>): T {
  return Container.resolve(token);
}
