import React from 'react';
import styles from './UsersStatistics.module.sass';

const usersData = [
  {
    role: 'Creatives',
    count: '119,525',
  },
  {
    role: 'Customers',
    count: '21,875',
  },
  {
    role: 'Industries',
    count: '85',
  },
];

export default function UsersStatistics () {
  return (
    <dl className={styles.stats}>
      {usersData.map(user => (
        <div key={user.role}>
          <dt> {user.role} </dt>
          <dd> {user.count}</dd>
        </div>
      ))}
    </dl>
  );
}
