import styles from './ErrorState.module.css';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.wrapper} role="alert">
      <h2 className={styles.title}>Qualcosa è andato storto</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.button} onClick={onRetry}>
          Riprova
        </button>
      )}
    </div>
  );
}