import express, { Request, Response } from "express";
import { Pool } from "pg";

const app = express();
const port = 5000;

// parse data from post
app.use(express.json());
const initDB = async () => {
  `CREATE TABLE IF NOT EXIST users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(15),
    address TEXT,
    create_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )`;
};
initDB();
const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_aIL4W8ZDxgNB@ep-jolly-lake-a4mmd9i4-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
});
app.get("/", (req: Request, res: Response) => {
  res.send("Hello next level developer");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    success: true,
    message: "API is working",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
