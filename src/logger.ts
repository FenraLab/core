import chalk from "chalk";

export class Logger {
  constructor(public prefix: string) {}

  public child(prefix: string): Logger {
    return new Logger(this.prefix + "." + prefix);
  }

  public formatMessage(
    level: string,
    levelColor: (text: string) => string,
    message: string,
  ): string {
    return (
      chalk.grey(`${new Date().toLocaleString()} `) +
      levelColor(`[${level}] `) +
      chalk.blue(`[${this.prefix}] `) +
      message
    );
  }

  trace(message: string) {
    console.error(this.formatMessage("TRACE", chalk.gray, message));
  }

  debug(message: string) {
    console.debug(this.formatMessage("DEBUG", chalk.cyan, message));
  }

  info(message: string) {
    console.info(this.formatMessage("INFO", chalk.green, message));
  }

  warn(message: string) {
    console.warn(this.formatMessage("WARN", chalk.yellow, message));
  }

  error(message: string) {
    console.error(this.formatMessage("ERROR", chalk.red, message));
  }

  success(message: string) {
    console.log(this.formatMessage("SUCCESS", chalk.greenBright, message));
  }
}
