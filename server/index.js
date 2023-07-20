import express from "express";
import { dirname, join } from 'path'
import { fileURLToPath } from "url";
import { PORT } from "./config.js";
import router from "./Routes/tasks.routes.js";
import cors from "cors";
import { config } from "dotenv";

const app = express();
config();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.json());
app.use(cors({
  origin: process.env.ORIGIN
}));
app.use(router);
app.use(express.static(join(__dirname, '../client/dist')));
app.listen(process.env.PORT);
console.log(`Server is alive on PORT: ${process.env.PORT}`);