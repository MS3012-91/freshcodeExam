import React from 'react';
import Logo from '../Logo/Logo';
import { topHeaderData } from './HeaderNavigationData';
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './InfoPageHeader.module.sass';

export default function InfoPageHeader () {
  return (
    <div className={styles.navbar}>
      <div className={styles.topHeader}>
        <div className={styles.topHeaderContent}>
          <Logo className={styles.logo} />
          <form className={styles.searchForm} action='#'>
            <input
              type='search'
              name='Search name'
              id='Search name'
              placeholder='Search over 100,000 names'
            />
            <button className={styles.searchButton} type='submit'>
              <span aria-label='Search'>
                <i className='fas fa-search'></i>
              </span>
            </button>
          </form>
          <nav className={styles.topNavigation}>
            <ul>
              {topHeaderData.map(info => (
                <li key={info.id}>
                  <Link className={styles.link} to={info.linkPath}>
                    <span className={styles.image} aria-label={info.title}>
                      <i className={info.image}></i>
                    </span>
                    <span className={styles.title}>{info.title}</span>
                  </Link>
                  {!info.linkPath && (
                    <div className={styles.dropDownMenu}>
                      <ul>
                        {info.items.map(item => (
                          <li key={item.id}>
                            <span aria-label={item.title}>
                              <i className={item.image} />
                            </span>
                            {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
              <li key='startContest'>
                <Link to='/startContest' className={styles.startContest}>
                  Start Contest
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <NavigationMenu />
    </div>
  );
}
