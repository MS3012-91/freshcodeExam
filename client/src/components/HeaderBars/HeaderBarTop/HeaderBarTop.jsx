import React, { useState, useEffect } from 'react';
import CONSTANTS from '../../../constants';
import styles from './HeaderBarTop.module.sass';

export default function HeaderBarTop () {
  const [index, setIndex] = useState(0);
  const [styleName, setStyle] = useState(styles.headline__static);
  
  useEffect(() => {
    let timeout = setInterval(() => {
      setIndex(index + 1);
      setStyle(styles.headline__isloading);
    }, 3000);
    return () => {
      setStyle(styles.headline__static);
      clearInterval(timeout);
    };
  });

  const text =
    CONSTANTS.HEADER_ANIMATION_TEXT[
      index % CONSTANTS.HEADER_ANIMATION_TEXT.length
    ];

  return (
    <>
      <div className={styles.headline}>
        <h1 className={styles.mainHeader}>
          Find the Perfect Name for
          <span className={styleName}>{text}</span>
        </h1>
      </div>
      <p className={styles.headerBarText}>
        Launch a naming contest to engage hundreds of naming experts as you’re
        guided through our agency-level naming process. Or, explore our
        hand-picked collection of premium names available for immediate purchase
      </p>
      </>
  );
}
