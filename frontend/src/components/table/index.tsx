import styles from "./styled.module.scss";
import { SongRow } from "../../components/songRow";
import type { Song } from "../../types/index"
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

interface SongsTableProps {
  songs: Song[];
  loading?: boolean;
  page: number;
  expandedId: string | null;
  onToggleExpanded: (id: string | null) => void;
  onPageChange: (page: number) => void;
}

export function SongsTable({
  songs,
  loading,
  page,
  expandedId,
  onToggleExpanded,
  onPageChange,
}: SongsTableProps) {
  const pages = [page - 1, page, page + 1].filter((p) => p > 0);

  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        <div className={styles.head}>
          <div />
          <div>#</div>
          <div>Song</div>
          <div>Artist</div>
          <div>Album</div>
          <div>Genre</div>
        </div>

        {songs.map((song) => (
          <SongRow
            key={song.title}
            song={song}
            expanded={expandedId === song.id}
            onToggle={() => onToggleExpanded(expandedId === song.id ? null : song.id)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <button className={styles.pageBtn} onClick={() => onPageChange(Math.max(1, page - 1))}>
          <FaAngleLeft/>
        </button>
        {pages.map((p) => (
          <button
            key={p}
            className={`${styles.pageBtn} ${p === page ? styles.active : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ))}
        <button className={styles.pageBtn} onClick={() => onPageChange(page + 1)}>
          <FaAngleRight/>
        </button>
      </div>

      {loading ? <div className={styles.loading}>Loading...</div> : null}
    </div>
  );
}