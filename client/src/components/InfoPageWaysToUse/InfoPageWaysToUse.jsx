import React from 'react';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../constants';
import styles from './InfoPageWaysToUse.module.sass';

export default function InfoPageWaysToUse () {
  return (
    <section className={styles.sectionContainer}>
      <span className={styles.buttonReward}>Our Services</span>
      <h2>3 Ways To Use Squadhelp </h2>
      <p>
        Squadhelp offers 3 ways to get you a perfect name for your business.
      </p>
      <ul>
        <li>
          <div className={styles.item}>
            <img
              src={
                `${CONSTANTS.STATIC_IMAGES_PATH}` +
                'howItWorkPage/LaunchAContest.svg'
              }
              alt=''
            />
            <h3>Launch a Contest</h3>
            <p>
              Work with hundreds of creative experts to get custom name
              suggestions for your business or brand. All names are auto-checked
              for URL availability.
            </p>
            <Link to='/start-contest' className={styles.itemsButton}>
              Launch a Contest
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <img
              src={
                `${CONSTANTS.STATIC_IMAGES_PATH}` +
                'howItWorkPage/starsIcon.svg'
              }
              alt='Stars Icon'
            />
            <h3>Explore Names For Sale</h3>
            <p>
              Our branding team has curated thousands of pre-made names that you
              can purchase instantly. All names include a matching URL and a
              complimentary Logo Design
            </p>
            <Link
              to='/premium-domains-for-sale/'
              className={styles.itemsButton}
            >
              Explore Names For Sale
            </Link>
          </div>
        </li>
        <li>
          <div className={styles.item}>
            <img
              src={
                `${CONSTANTS.STATIC_IMAGES_PATH}` + 'howItWorkPage/agency.svg'
              }
              alt='Agency Icon'
            />
            <h3>Agency-level Managed Contests</h3>
            <p>
              Our Managed contests combine the power of crowdsourcing with the
              rich experience of our branding consultants. Get a complete
              agency-level experience at a fraction of Agency costs
            </p>
            <Link to='/managed-contests' className={styles.itemsButton}>
              Learn More
            </Link>
          </div>
        </li>
      </ul>
    </section>
  );
}
