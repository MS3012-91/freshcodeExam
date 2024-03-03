import React from 'react';
import CONSTANTS from '../../constants';
import styles from './StatisticsSection.module.sass';

export default function StatisticsSection () {
  return (
    <section className={styles.statisticContainer}>
      <div className={styles.card}>
        <figure className={styles.image}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/stars.svg'}`}
            alt='stars SVG'
          />
          <figcaption>
            <span className={styles.importantText}>4.9 out of 5 stars</span>
            from 25,000+ customers.
          </figcaption>
        </figure>
      </div>
      <div className={styles.card}>
        <figure className={styles.image}>
          <img
            src={`${
              CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/peoples.webp'
            }`}
            alt='peoples'
          />
          <figcaption>
            Our branding community stands
            <span className={styles.importantText}>200,000+</span>
            strong.
          </figcaption>
        </figure>
      </div>
      <div className={styles.card}>
        <figure className={styles.image}>
          <img
            src={`${
              CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/sharing-files.svg'
            }`}
            alt='sharing files SVG'
          />
          <figcaption>
            <span className={styles.importantText}>140+ Industries</span>
            supported across more than
            <span className={styles.importantText}>85 countries</span>
            <br /> – and counting.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
