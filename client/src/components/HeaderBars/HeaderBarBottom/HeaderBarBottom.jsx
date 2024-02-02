import React from 'react';
import styles from './HeaderBarBottom.module.sass'

export default function HeaderBarBottom () {
  return (
    <>
      <h3>Names For Sale</h3>
      <p className={styles.blueUnderline}>
        Not interested in launching a contest? Purchase a name instantly from
        our hand-picked collection of premium names. Price includes a
        complimentary Trademark Report, a Domain name as well as a Logo design
      </p>
    </>
  );
}
