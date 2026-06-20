import styles from "./styled.module.scss";
import { ExpandedRow } from "../../components/expandedRow";
import type { Song } from "../../types/index"

interface SongRowProps {
  song: Song;
  expanded: boolean;
  onToggle: () => void;
}

export function SongRow({ song, expanded, onToggle }: SongRowProps) {
  return (
    <div className={`${styles.rowWrap} ${expanded ? styles.expanded : ""}`}>
      <div className={styles.row} onClick={onToggle}>
        <button className={styles.chevron} type="button">
          {expanded ? "⌃" : "⌄"}
        </button>
        <div className={styles.index}>{song.index}</div>
        <div className={styles.cell}>{song.title}</div>
        <div className={styles.cell}>{song.artist}</div>
        <div className={`${styles.cell} ${song.album === "Single" ? styles.muted : ""}`}>{song.album}</div>
        <div className={styles.cell}>{song.genre}</div>
      </div>

      {expanded ? <ExpandedRow song={song} /> : null}
    </div>
  );
}