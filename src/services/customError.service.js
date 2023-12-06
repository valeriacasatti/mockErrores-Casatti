export class CustomError {
  static createError({ name = "error", cause, message, errorCode }) {
    const error = new Error(message, { cause });
    error.name = name;
    error.code = errorCode;
    console.log(error);
    return error;
  }
}
