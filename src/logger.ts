export default class Logger {
  static debug(log: string) {
    console.error(log);
  }

  static error(err: string): Error {
    throw new Error(err);
  }
}
