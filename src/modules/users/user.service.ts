import { pool } from "../../config/database";
import bcrypt from "bcryptjs";

export const createUserService = async (payload: Record<string, unknown>) => {
  const { name, email, password, role } = payload;
  const hashedPassword = bcrypt.hashSync(password as string, 10);
  console.log(hashedPassword);
  const res = await pool.query(
    `INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING *`,
    [name, email, hashedPassword, role]
  );
  return res;
};

export const getUsersService = async () => {
  const res = await pool.query(`SELECT * FROM users`);
  return res;
};

export const singleUserService = async (id: number | string) => {
  const res = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return res;
};

export const updateUserService = async (
  name: string,
  email: string,
  id: number | string
) => {
  const res = await pool.query(
    `UPDATE users SET name=$1,email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );
  return res;
};

export const deleteUserService = async (id: number | string) => {
  const res = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return res;
};
