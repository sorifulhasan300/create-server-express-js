import { pool } from "../../config/database";

export const createTodoService = async (user_id: number, title: string) => {
  const res = await pool.query(
    `INSERT INTO todos(user_id,title) VALUES($1,$2) RETURNING *`,
    [user_id, title]
  );
  return res;
};

export const getTodoService = async () => {
  const res = await pool.query(`SELECT * FROM todos`);
  return res;
};
