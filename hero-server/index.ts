import express, { Request, Response, json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db";
import heroesRouter from "./routes/heroes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());

// Use Heroes router
app.use("/heroes", heroesRouter);

app.get("/", (req: Request, res: Response) => {
  res.send(`Hello Server http://localhost:${port}`);
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
};

// Connect to MongoDB and start the server
(async () => {
  await connectDB();
  startServer();
})();
