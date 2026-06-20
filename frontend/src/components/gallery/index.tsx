import { useState } from "react";
import styles from "./styled.module.scss";
import type { Song } from "../../types/index";
import { ExpandedRow } from "../expandedRow";

interface GalleryProps {
  songs: Song[];
  loading?: boolean;
}

export function Gallery({ songs, loading }: GalleryProps) {
  const [activeSong, setActiveSong] = useState<Song | null>(null);

 
  if (activeSong) {
    return (
      <div className={styles.grid}>
        <button
          className={styles.backBtn}
          onClick={() => setActiveSong(null)}
        >
           Back
        </button>

        <ExpandedRow song={activeSong} />
      </div>
    );
  }


  return (
    <div className={styles.grid}>
      {songs.map((song) => (
        <article
          key={song.id}
          className={styles.card}
          onClick={() => setActiveSong(song)}
        >
          <img
            className={styles.image}
            src={song.coverUrl}
            alt={song.title}
          />

          <div className={styles.body}>
            <div className={styles.title}>{song.title}</div>
            <div className={styles.artist}>{song.artist}</div>
            <div className={styles.meta}>{song.album}</div>
            <div className={styles.meta}>{song.genre}</div>
          </div>
        </article>
      ))}

      {loading ? (
        <div className={styles.loading}>Loading more...</div>
      ) : null}
    </div>
  );
}