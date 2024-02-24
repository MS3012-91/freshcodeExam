import React from 'react';
import CONSTANTS from '../../constants';
import styles from './HowItWorkHeroSection.module.sass'

export default function HowItWorkHeroSection () {
  return (
    <div>
      <section className={styles.heroSection}>
        <div className={styles.heroSectionWrapper}>
          <div className={styles.leftSpace}>
            <span className={styles.buttonReward}>
              World's #1 naming platform
            </span>
            <div className={styles.mainBlock}>
              <h1>How Does Squadhelp Work?</h1>
              <p>
                Squadhelp helps you come up with a great name for your business
                by combining the power of crowdsourcing with sophisticated
                technology and Agency-level validation services.
              </p>
              <button type='button' className={styles.videoButton}>
                <i class='fas fa-play'></i>
                Play Video
              </button>
            </div>
          </div>
          <div className={styles.rightSpace}>
            <figure className={styles.userImage}>
              <img
                src={
                  `${CONSTANTS.STATIC_IMAGES_PATH}` +
                  'howItWorkPage/app-user.svg'
                }
                alt='user'
              />
            </figure>
          </div>
        </div>
      </section>
    </div>
  );
}
