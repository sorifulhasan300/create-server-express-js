import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config/config";
export const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        message: "User UnAuthorize",
      });
    }
    const decode = jwt.verify(token, config.secretKey as string) as JwtPayload;
    req.user = decode as JwtPayload;
    if (roles.length && !roles.includes(decode.role)) {
      return "you are not authorized";
    }
    next();
  };
};
