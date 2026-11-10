import styles from './NewsGrid.module.css';
import ArticleCard from './ArticleCard';

export default function NewsGrid({ articles }) {
  if (!articles || articles.length === 0) return null;

  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 2);
  const remaining = rest.slice(2, 8);

  return (
    <div className={styles.grid}>
      <div className={styles.heroCol}>
        <ArticleCard article={hero} variant="hero" />
      </div>

      <div className={styles.sideCol}>
        {secondary.map((article) => (
          <ArticleCard key={article.url} article={article} variant="compact" />
        ))}
      </div>

      {remaining.map((article) => (
        <div key={article.url} className={styles.cardCol}>
          <ArticleCard article={article} variant="default" />
        </div>
      ))}
    </div>
  );
}