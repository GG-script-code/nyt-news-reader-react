import styles from './Loader.module.css';

export default function Loader({ count = 6 }) {
  return (
    <div className={styles.grid} aria-label="Caricamento articoli" role="status">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skeleton}>
          <div className={styles.image} />
          <div className={styles.title} />
          <div className={styles.titleShort} />
          <div className={styles.text} />
        </div>
      ))}
    </div>
  );
}