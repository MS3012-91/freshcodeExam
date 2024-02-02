import React, { useState } from 'react';
import CONSTANTS from '../../constants';
import {cardsInfo} from './BrandsLogoData'
import styles from './BrandsLogo.module.sass';

export default function ClientImages() {
  const [hover, setHover] = useState();

  return (
    <div className={styles.adv}>
      {cardsInfo.map(card => (
        <div
          className={styles.images}
          key={card.alt}
          onMouseEnter={() => setHover(card.alt)}
          onMouseLeave={() => setHover()}
        >
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}sponsors/${card.alt===hover ? card.image.active : card.image.inactive}`}
            alt={card.alt}
          />
        </div>
      ))}
    </div>
  );
}
