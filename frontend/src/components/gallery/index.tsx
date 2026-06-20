import styles from "./styled.module.scss";
import type { Song } from "../../types/index";

interface GalleryProps {
  songs: Song[];
  loading?: boolean;
}

export function Gallery({ songs, loading }: GalleryProps) {
  return (
    <div className={styles.grid}>
      {songs.map((song) => (
        <article key={song.id} className={styles.card}>
          <img className={styles.image} src={song.coverUrl} alt={song.title} />
          <div className={styles.body}>
            <div className={styles.title}>{song.title}</div>
            <div className={styles.artist}>{song.artist}</div>
            <div className={styles.meta}>{song.album}</div>
            <div className={styles.meta}>{song.genre}</div>
          </div>
        </article>
      ))}

      {loading ? <div className={styles.loading}>Loading more...</div> : null}
    </div>
  );
}