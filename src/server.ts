import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./database";
import { errorMiddleware } from "./middlewares/error";
import { router } from "./routes";
import swaggerFile from "./swagger.json";
import "@shared/container";

const app = express();

app.use(express.json());
app.use(router);
app.use(errorMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

AppDataSource.initialize()
  .then(() => {
    app.listen(3333, () => {
      console.log("Server running on port :3333");
    });
  })
  .catch((error) => {
    console.log("teste");
    console.log(error);
  });
