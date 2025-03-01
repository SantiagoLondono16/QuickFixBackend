import { Nullable } from "@shared/domain/type/Nullable";

export class ApiResponse<T> {
  constructor(
    readonly code: boolean,
    readonly message: string,
    readonly data?: Nullable<T>,
    readonly timestamp: Date = new Date(),
  ) {}

  public static success<T>(message: string, data?: T) {
    return new ApiResponse<T>(true, message, data);
  }

  public static noContent() {
    return null;
  }

  public static error<T>(message: string, data?: T) {
    return new ApiResponse<T>(false, message, data);
  }
}
