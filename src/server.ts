import errorHandler from "errorhandler";
import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
const port = process.argv[2];
const server = app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env"),
  );
  // tslint:disable-next-line:no-console
  console.log("  Press CTRL-C to stop\n");
});
export default server;
