import express, { Request, Response } from "express";
const app = express();
const port = 5000;

// parse data from post
app.use(express.json());

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
