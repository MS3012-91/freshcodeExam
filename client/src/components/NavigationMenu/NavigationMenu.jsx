import React from 'react';
import { appMenu } from './NavigationMenuData';
import styles from './NavigationMenu.module.sass';

export default function NavigationMenu () {
  return (
    <nav className={styles.bottomNavigation}>
      <ul>
        {appMenu.map(item => (
          <li key={item.id}>
            <div>
              {item.title}
              {item.variants && (
                /*To add reducer to change state of item (open/close list)*/
                <button className={styles.arrow} type='button'>
                  <i class='fas fa-chevron-down'></i>
                  {/* {<i class='fas fa-chevron-up'></i>} */}
                </button>
              )}
            </div>
          </li>
        ))}
        <li key='decorateElement'>
          <div className={styles.decorateElement}></div>
        </li>
      </ul>
    </nav>
  );
}
