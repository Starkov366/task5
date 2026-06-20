import styles from "./styled.module.scss";
import type { ViewMode, Region } from "../../types/index";

interface ToolbarProps {
  region: Region;
  seed: string;
  likes: number;
  viewMode: ViewMode;
  loading?: boolean;
  onRegionChange: (value: Region) => void;
  onSeedChange: (value: string) => void;
  onRandomSeed: () => void;
  onLikesChange: (value: number) => void;
  onViewModeChange: (value: ViewMode) => void;
}

export function Toolbar({
  region,
  seed,
  likes,
  viewMode,
  loading,
  onRegionChange,
  onSeedChange,
  onRandomSeed,
  onLikesChange,
  onViewModeChange,
}: ToolbarProps) {
  return (
    <div className={styles.toolbar}>
      <label className={styles.control}>
        <span className={styles.label}>Language</span>
        <select value={region} onChange={(e) => onRegionChange(e.target.value as Region)} className={styles.select}>
          <option value="en-US">English (US)</option>
          <option value="de-DE">German (Germany)</option>
          <option value="uk-UA">Ukrainian (Ukraine)</option>
        </select>
      </label>

      <label className={styles.control}>
        <span className={styles.label}>Seed</span>
        <div className={styles.seedRow}>
          <input
            value={seed}
            onChange={(e) => onSeedChange(e.target.value)}
            className={styles.input}
            inputMode="numeric"
          />
          <button className={styles.iconBtn} onClick={onRandomSeed} type="button" title="Random seed">
            ↻
          </button>
        </div>
      </label>

      <label className={styles.sliderControl}>
        <span className={styles.label}>Likes</span>
        <input
          type="range"
          min={0}
          max={10}
          step={0.1}
          value={likes}
          onChange={(e) => onLikesChange(Number(e.target.value))}
          className={styles.slider}
        />
        <span className={styles.sliderValue}>{likes.toFixed(1)}</span>
      </label>

      <div className={styles.viewSwitch}>
        <button
          type="button"
          className={`${styles.viewBtn} ${viewMode === "table" ? styles.active : ""}`}
          onClick={() => onViewModeChange("table")}
        >
          ⌗
        </button>
        <button
          type="button"
          className={`${styles.viewBtn} ${viewMode === "gallery" ? styles.active : ""}`}
          onClick={() => onViewModeChange("gallery")}
        >
          ▢
        </button>
      </div>

      {loading ? <div className={styles.loadingDot} /> : null}
    </div>
  );
}