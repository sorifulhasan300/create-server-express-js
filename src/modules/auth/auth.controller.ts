import { Request, Response } from "express";
import { loginUserService } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUserService(email, password);
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "user get unsuccessfully",
      error: error,
    });
  }
};

export const loginController = {
  loginUser,
};
