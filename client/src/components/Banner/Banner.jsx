import React from 'react';
import CONSTANTS from '../../constants';
import styles from './Banner.module.sass';

export default function Banner () {
  return (
    <div className={styles.bannerContainer}>
      <figure className={styles.startImage}>
        <img
          src={`${
            CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/startBannerImage.svg'
          }`}
          alt='startBannerImage'
        />
      </figure>
      <figure className={styles.endImage}>
        <img
          src={`${
            CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/endBannerImage.svg'
          }`}
          alt='endBannerImage'
        />
      </figure>
      <div className={styles.infoContainer}>
        <h2>Ready to get started?</h2>
        <p>
          Fill out your contest brief and begin receiving custom name
          suggestions within minutes.
        </p>
        <a href='/start-contest'>Start A Contest</a>
      </div>
    </div>
  );
}
