import { Router } from "express";
import { loginController } from "./auth.controller";

const router = Router();

router.get("/login", loginController.loginUser);

export const AuthRouter = router;
