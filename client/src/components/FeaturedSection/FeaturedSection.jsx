import React from 'react';
import { socialInfo } from './FeaturedSectionData';
import styles from './FeaturedSection.module.sass';

export default function FeaturedSection() {
  return (
    <section className={styles.sectionContainer}>
      <h3>Featured In</h3>
      <div className={styles.logoContainer}>
        <ul>
          {socialInfo.map(item => (
            <li key={item.id}>
              <a href={item.href}>
                <img src={item.imageSrc} alt={item.imageAlt} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
