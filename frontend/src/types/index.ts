export type Region = "en-US" | "de-DE" | "uk-UA";

export interface GetSongsParams {
    seed: string;
    page: number;
    limit: number;
    region: Region;
    likes: number;
}

export interface Song {
    index: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
    likes: number;
}
