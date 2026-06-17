import express from "express";
import cors from "cors";
import songsRoutes from "./modules/songs/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/songs", songsRoutes);

export default app;