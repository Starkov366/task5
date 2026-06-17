export type Region = "en-US" | "de-DE" | "uk-UA";


export type GenerateSongsParams = {
    seed: string;
    page: number;
    limit: number;
    region: Region;
    likesAvg: number;
};
