export type Region = "en-US" | "de-DE" | "uk-UA";

export interface GetSongsParams {
    seed: string;
    page: number;
    limit: number;
    region: Region;
    likes: number;
}

export type ViewMode = "table" | "gallery";

/*export interface Song {
    index: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
    likes: number;
}*/
export interface Song {
    id: string;
    index: number;
    title: string;
    artist: string;
    album: string;
    genre: string;
    coverUrl: string;
    likes: number;
    review: string;
    lyrics: string[];
  
    preview: {
      bpm: number;
      root: number;
      pattern: number[];
    };
  }