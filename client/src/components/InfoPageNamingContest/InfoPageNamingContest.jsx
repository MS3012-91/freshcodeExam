import React from 'react';
import useMeasure from 'react-use-measure';
import CONSTANTS from '../../constants';
import styles from './InfoPageNamingContest.module.sass';

export default function InfoPageNamingContest () {
  const [firstElement, { height: topHeight }] = useMeasure();
  const [lastElement, { height: bottomHeight }] = useMeasure();
  const topLinePosition = Math.round(topHeight / 2);
  const bottomLinePosition = Math.round(bottomHeight / 2);

  return (
    <div className={styles.namingContestContainer}>
      <header className={styles.headerBlock}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorkPage/prize.svg`}
          alt='prize'
        />
        <h2>How Do Naming Contests Work?</h2>
      </header>
      <div className={styles.contentWrapper}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}howItWorkPage/support-man.svg`}
          alt='support man'
        />
        <ol
          className={styles.list}
          style={{
            '--top-line-position': `${topLinePosition}px`,
            '--bottom-line-position': `${bottomLinePosition}px`,
          }}
        >
          <li ref={firstElement}>
            Fill out your Naming Brief and begin receiving name ideas in minutes
          </li>
          <li>
            Rate the submissions and provide feedback to creatives. Creatives
            submit even more names based on your feedback.
          </li>
          <li>
            Our team helps you test your favorite names with your target
            audience. We also assist with Trademark screening.
          </li>
          <li ref={lastElement}>
            Pick a Winner. The winner gets paid for their submission.
          </li>
        </ol>
      </div>
    </div>
  );
}
