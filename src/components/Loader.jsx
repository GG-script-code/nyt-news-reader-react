import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div
      className={styles.grid}
      aria-label="Caricamento articoli"
      role="status"
    >
      {/* Hero */}
      <div className={`${styles.skeleton} ${styles.hero}`}>
        <div className={styles.image} />
        <div className={styles.title} />
        <div className={styles.titleShort} />
        <div className={styles.text} />
      </div>

      {/* Sidebar: 2 elementi compatti */}
      <div className={styles.side}>
        <div className={`${styles.skeleton} ${styles.compact}`}>
          <div className={styles.titleShort} />
          <div className={styles.text} />
        </div>
        <div className={`${styles.skeleton} ${styles.compact}`}>
          <div className={styles.titleShort} />
          <div className={styles.text} />
        </div>
      </div>

      {/* Card: 3 elementi */}
      {[1, 2, 3].map((i) => (
        <div key={i} className={`${styles.skeleton} ${styles.card}`}>
          <div className={styles.image} />
          <div className={styles.title} />
          <div className={styles.titleShort} />
          <div className={styles.text} />
        </div>
      ))}
    </div>
  );
}