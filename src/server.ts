import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
const app = express();
const port = process.env.PORT || 5000;

// parse data from post

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
// console.log(process.env.DATABASE_URL);
app.use(express.json());
const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) ,
    address TEXT,
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);
};
initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello next level developer");
});

app.post("/users", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name,email) VALUES($1,$2) RETURNING *`,
      [name, email]
    );
    console.log(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "data inserted unsuccessfully",
      error: error,
    });
  }

  res.status(201).json({
    success: "success",
    message: "data inserted successfully",
  });
});

app.get("/users/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "User get successfully",
      data: result.rows,
    });
    console.log(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User get unsuccessfully",
      error: error,
    });
  }
  res.status(500).json({
    success: false,
    message: "User get unsuccessfully",
  });
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    if (result.rows.length === 1) {
      res.status(200).json({
        success: true,
        message: "User get successfully",
        data: result.rows,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "User get unsuccessfully",
        data: result.rows,
      });
    }
    console.log(result);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User get unsuccessfully",
      error: error,
    });
  }
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
