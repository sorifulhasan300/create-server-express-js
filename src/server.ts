import express, { NextFunction, Request, Response } from "express";
import config from "./config/config";
import initDB, { pool } from "./config/database";
import { logger } from "./middleware/middleware";
import { userRoutes } from "./modules/users/user.route";
import { todoRouter } from "./modules/todo/user.route";
import { AuthRouter } from "./modules/auth/auth.route";

const app = express();
const port = config.port;

// parse data from post

app.use(express.json());

initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello next level developer");
});

app.use("/users", userRoutes);

app.use("/users", userRoutes);

app.use("/user", userRoutes);

app.use("/user", userRoutes);

app.use("/user", userRoutes);

app.use("/todo", todoRouter);

app.use("/todo", todoRouter);

app.use("/auth", AuthRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "path not found",
    req: req,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
