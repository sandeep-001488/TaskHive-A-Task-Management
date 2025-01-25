import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";
import userRoutes from "./routes/userRoutes";
import { errorMiddleware } from "./middlewares/errorMiddleware";
const port = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "https://taskhive-manage-your-tasks.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(cookieParser());

// app.use("/", (req: Request, res: Response) => {
//   res.send("Hello from the backend!");
// });
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/user", userRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server runnning on port ${port}`);
});
