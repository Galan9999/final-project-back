import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import connectDatabase from "./database/connectDatabase.js";
import startServer from "./server/startServer.js";

export const debug = createDebug("sentio:root");

const port = process.env.PORT ?? 4000;
const mongoDbUrl = process.env.MONGODB_CONNECTION_URL;

try {
  await connectDatabase(mongoDbUrl!);
  debug(chalk.green("Connected to database"));

  await startServer(+port);
  debug(chalk.blue(`Server listening on ${port}`));
} catch (error) {
  debug(error.message);
}
