import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardButton.module.sass';

export default function DashboardButton () {
  return (
    <div className={styles.button}>
      <Link className={styles.button__link } to='/dashboard'>
        DASHBOARD
      </Link>
    </div>
  );
}
