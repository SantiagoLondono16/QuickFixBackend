import { Nullable } from "@shared/domain/type/Nullable";
import { Response } from "express";
import { Code } from "./Code";

export class ApiResponse<T> {
  constructor(
    readonly code: boolean,
    readonly message: string,
    readonly data?: Nullable<T>,
    readonly timestamp: Date = new Date(),
  ) {}

  static success<T>(res: Response, message: string, data?: T) {
    const response = new ApiResponse<T>(true, message, data);
    res.status(Code.SUCCESS.code).json(response);
  }

  static noContent(res: Response) {
    res.status(Code.NO_CONTENT.code);
  }

  static error<T>(message: string, data?: T) {
    return new ApiResponse<T>(false, message, data);
  }
}
