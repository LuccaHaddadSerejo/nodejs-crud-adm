import "express-async-errors";
import express, { Application } from "express";
import { handleErrors } from "./errors";
import userRouters from "./routers/usersRoutes";
import loginRouters from "./routers/loginRoutes";
const app: Application = express();
app.use(express.json());

app.use("/users", userRouters);
app.use("/login", loginRouters);

app.use(handleErrors);

export default app;
