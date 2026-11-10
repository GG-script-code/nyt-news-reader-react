import styles from './ArticleCard.module.css';
import { getBestImage, truncate } from '../utils/formatters';

/**
 * Card riutilizzabile per un articolo NYT.
 *
 * @param {object} article  - oggetto articolo dell'API NYT
 * @param {string} variant  - 'hero' | 'default' | 'compact'
 */
export default function ArticleCard({ article, variant = 'default' }) {
  const image = getBestImage(article.multimedia);
  const imageUrl = image ? `https://www.nytimes.com/${image}` : null;

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      {imageUrl && (
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt=""
            className={styles.image}
            loading="lazy"
          />
        </div>
      )}
      <div className={styles.content}>
        {article.section && (
          <span className={styles.section}>{article.section}</span>
        )}
        <h2 className={styles.title}>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>
        {article.abstract && variant !== 'compact' && (
          <p className={styles.abstract}>{truncate(article.abstract, 180)}</p>
        )}
        {article.byline && (
          <span className={styles.byline}>{article.byline}</span>
        )}
      </div>
    </article>
  );
}