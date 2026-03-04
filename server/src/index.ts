import { config } from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import clubRoutes from './routes/clubRoutes.js'
import cookieParser from "cookie-parser";
config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.json({ message: "Campus Pulse API running" });
});
app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/clubs",clubRoutes)

const port = process.env.PORT as string;

app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`MongoDB Successfully Connected`);
    console.log(`Server listen on ${port}`);
  } catch (error) {
    console.log(`MongoDB does not connected : ${error}`);
  }
});
