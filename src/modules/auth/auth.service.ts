import { pool } from "../../config/database";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const loginUserService = async (email: string, password: string) => {
  console.log(email, password);
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
  };

  const secrete = "KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
  const token = jwt.sign(payload, secrete, { expiresIn: "7d" });
  return { token, user };
};
