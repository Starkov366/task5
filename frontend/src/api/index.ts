import type { GetSongsParams, Song } from "../types";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function getSongs({
    seed,
    page,
    limit,
    region,
    likes,
}: GetSongsParams): Promise<Song[]> {
    const params = new URLSearchParams({
        seed,
        page: String(page),
        limit: String(limit),
        region,
        likes: String(likes),
    });

    const response = await fetch(`${BASE_URL}/songs?${params}`);

    if (!response.ok) {
        throw new Error("Failed to fetch songs");
    }

    return response.json();
}