import React from 'react';
import { bannerElements, cardsData } from './MotivatedSectionData';
import styles from './MotivatedSection.module.sass';

const FormatText = ({ textParts }) => {
  let formattedText = textParts.text;
  textParts.boldText.forEach(boldItem => {
    const regex = new RegExp(boldItem.replace('\\$&') + '\\+?', 'g');
    formattedText = formattedText.replace(
      regex,
      `<span class=${styles.importantText}>${boldItem}</span>`
    );
  });

  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

export default function MotivatedSection () {
  return (
    <section className={styles.motivatedSection}>
      <div className={styles.bannerContainer}>
        {bannerElements.map(bannerData => (
          <figure className={styles[bannerData.alt]} key={bannerData.id}>
            <img
              src={bannerData.src}
              alt={bannerData.alt}
              className={styles[bannerData.alt]}
            />
          </figure>
        ))}
        <div className={styles.infoContainer}>
          <h2>Ready to get started?</h2>
          <p>
            Fill out your contest brief and begin receiving custom name
            suggestions within minutes.
          </p>
          <a href='/start-contest'>Start A Contest</a>
        </div>
      </div>
      <div className={styles.statisticContainer}>
        {cardsData.map(card => (
          <div className={styles.card} key={card.id}>
            <figure className={styles.image}>
              <img src={card.src} alt={card.alt} />
            </figure>
            <figcaption>
              <FormatText
                textParts={{ text: `${card.text}`, boldText: card.boldText }}
              />
            </figcaption>
          </div>
        ))}
      </div>
    </section>
  );
}
