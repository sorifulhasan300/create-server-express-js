import { Router } from "express";
import { User } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

router.post("/create", User.createUser);

router.get("/get", auth("admin"), User.getUsers);

router.get("/:id", User.getSingleUser);

router.put("/:id", User.updateUser);

router.delete("/:id", User.deleteUser);

export const userRoutes = router;
