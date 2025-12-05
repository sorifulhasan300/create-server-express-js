import { Router } from "express";
import { User } from "./user.controller";

const router = Router();

router.post("/", User.createUser);

router.get("/", User.getUsers);

router.get("/:id", User.getSingleUser);

router.put("/:id", User.updateUser);

router.delete("/:id", User.deleteUser);

export const userRoutes = router;
