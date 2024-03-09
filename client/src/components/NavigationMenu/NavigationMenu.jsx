import React from 'react';
import { Link } from 'react-router-dom';
import { appMenu } from './NavigationMenuData';
import styles from './NavigationMenu.module.sass';

export default function NavigationMenu () {
  return (
    <nav className={styles.bottomNavigation}>
      <ul className={styles.navigationList}>
        {appMenu.map(item => (
          <li key={item.id} className={styles.navListElement}>
            {!item.variants && <Link to={item.link}>{item.title} </Link>}
            {item.variants && (
              <div className={styles.dropdownMenu}>
                <Link to={item.link} className={styles.menuLink}>
                  {item.title}
                </Link>
                <div className={styles.variantList}>
                  <ul>
                    {item.variants.map(item => (
                      <li key={item.id}>
                        <a href={item.link}>{item.title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
        <li key='decorateElement' className={styles.decorateItem}>
          <div className={styles.decorateElement}></div>
        </li>
      </ul>
    </nav>
  );
}
