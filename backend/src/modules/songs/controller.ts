import { Request, Response } from "express";
import { generateSongs } from "./service";
import type { Region } from "./types";
export const getSongs = (req: Request, res: Response) => {
    const seed = String(req.query.seed ?? "default");
    const page = Number(req.query.page ?? 0);
    const limit = Number(req.query.limit ?? 20);
    const region = (req.query.region as Region) ?? "en-US";
    const likes = Number(req.query.likes ?? 5);

    res.json(
        generateSongs({
            seed,
            page,
            limit,
            region,
            likesAvg: likes,
        })
    );
};