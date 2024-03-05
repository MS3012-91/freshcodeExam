import React from 'react';
import CONSTANTS from '../../constants';
import styles from './FeaturedSection.module.sass';

export default function FeaturedSection () {
  return (
    <section className={styles.sectionContainer}>
      <h3>Featured In</h3>
      <div className={styles.logoContainer}>
        <ul>
          <li>
            <a href='https://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199/?sh=65b3014f6145'>
              <img
                src={`${
                  CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/forbes.svg'
                }`}
                alt='forbes'
              />
            </a>
          </li>
          <li>
            <a href='https://thenextweb.com/news/changing-startups-name-tale-crowdsourcing-843-domain-names'>
              <img
                src={`${
                  CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/tnw.svg'
                }`}
                alt='TNW'
              />
            </a>
          </li>
          <li>
            <a href='https://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html'>
              <img
                src={`${
                  CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/chicago.svg'
                }`}
                alt='chicago'
              />
            </a>
          </li>
          <li>
            <a href='https://mashable.com/2011/04/01/make-money-crowdworking/'>
              <img
                src={`${
                  CONSTANTS.STATIC_IMAGES_PATH + 'howItWorkPage/mashable.svg'
                }`}
                alt=''
              />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
