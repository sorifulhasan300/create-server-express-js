import { pool } from "../../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/config";
export const loginUserService = async (email: string, password: string) => {
  const res = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
  if (res.rowCount === 0) {
    return null;
  }
  const user = res.rows[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return false;
  }
  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, config.secretKey as string, {
    expiresIn: "7d",
  });
  console.log(token);
  return { token, user };
};
