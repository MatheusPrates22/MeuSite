import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? styles.active : '';
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <h1 className={styles.logo}>Meu Site</h1>
        <ul className={styles.navList}>
          <li>
            <Link to="/receitas" className={`${styles.navLink} ${isActive('/receitas')}`}>
              Receitas
            </Link>
          </li>
          <li>
            <Link to="/financas" className={`${styles.navLink} ${isActive('/financas')}`}>
              Finanças
            </Link>
          </li>
          <li>
            <Link to="/trade" className={`${styles.navLink} ${isActive('/trade')}`}>
              Trade
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
