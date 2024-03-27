import React from 'react';
import styles from './NavMenu.module.sass';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function NavMenu ({ data, level }) {
  return (
    <div
      className={`${
        level === 0 ? styles.bottomNavigation : styles.dropdownMenu
      } ${styles[`level${level}`]}`}
    >
      <ul>
        {data.map(item => (
          <li key={item.id} className={item.variants && styles.withArrow}>
            {!item.variants && <Link to={item.link}>{item.title} </Link>}
            {item.variants && (
              <Link to={item.link} className={styles.arrowLink}>
                {item.title}
                <span className={styles.arrow}>&#x2039;</span>
                <NavMenu data={item.variants} level={level + 1} />
              </Link>
            )}
            {item.options && (
              <ul className={styles.subList}>
                {item.options.map(link => (
                  <li key={link.id}>
                    <Link to={link.link}>{link.title}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {level === 0 && (
          <li key='decorateElement' className={styles.decorateItem}>
            <div className={styles.decorateElement}></div>
          </li>
        )}
      </ul>
    </div>
  );
}
