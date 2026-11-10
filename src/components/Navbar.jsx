import { NavLink } from 'react-router-dom';
import { useNews } from '../context/NewsContext';
import styles from './Navbar.module.css';

const SECTIONS = ['home', 'world', 'technology', 'science', 'arts'];

export default function Navbar() {
  const { dispatch } = useNews();

  return (
    <nav className={styles.nav}>
      {SECTIONS.map((s) => (
        <NavLink
          key={s}
          to={s === 'home' ? '/' : `/section/${s}`}
          onClick={() => dispatch({ type: 'SET_SECTION', payload: s })}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          {s}
        </NavLink>
      ))}
      <NavLink
        to="/search"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        Cerca
      </NavLink>
    </nav>
  );
}