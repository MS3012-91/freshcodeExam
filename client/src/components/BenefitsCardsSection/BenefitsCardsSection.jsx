import React from 'react';
import { benefitsData } from './BenefitsData';
import CONSTANTS from '../../constants';
import styles from './BenefitsCardsSection.module.sass';

export default function BenefitsCardsSection() {
  return (
        <div className={styles.cardContainer}>
          {benefitsData.map(benefits => (
            <div className={styles.card} key={benefits.header} >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}${benefits.image}`}
                alt={benefits.title}
              />
              <h3>{benefits.header}</h3>
              <p>{benefits.text}</p>
            </div>
          ))}
      </div>
  );
}
