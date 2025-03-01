interface CodeDescription {
  code: number;
  message: string;
}

export class Code {
  private constructor() {}

  static readonly SUCCESS: CodeDescription = {
    code: 200,
    message: "Request was successful",
  };

  static readonly CREATED: CodeDescription = {
    code: 201,
    message: "Created",
  };

  static readonly NO_CONTENT: CodeDescription = {
    code: 204,
    message: "No content",
  };

  static readonly BAD_REQUEST: CodeDescription = {
    code: 400,
    message: "Bad Request",
  };

  static readonly UNAUTHORIZED: CodeDescription = {
    code: 401,
    message: "Unauthorized",
  };

  static readonly NOT_FOUND: CodeDescription = {
    code: 404,
    message: "Not found",
  };

  static readonly INTERNAL_ERROR: CodeDescription = {
    code: 500,
    message: "Internal server error",
  };
}
