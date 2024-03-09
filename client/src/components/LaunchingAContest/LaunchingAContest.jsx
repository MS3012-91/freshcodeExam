import React, { useState } from 'react';
import {
  launchingData,
  linkMapping,
  navigationItem,
} from './LaunchingAContestInfo';
import styles from './LaunchingAContest.module.sass';

export default function LaunchingAContest () {
  const [selectedItem, setSelectedItem] = useState();

  function replaceTextWithLinks (text) {
    linkMapping.forEach(link => {
      text = text.replace(
        link.anchor,
        `<a href="${link.url}" target='_blank'>${link.anchor} </a>`
      );
    });

    return text;
  }
  return (
    <section className={styles.sectionWrapper}>
      <nav className={styles.sectionNavigation}>
        <ul className={styles.navigationList}>
          {navigationItem.map(item => (
            <li key={item.id} className={styles.navigationItem} tabIndex={0}>
              <a
                className={styles.navigationLink}
                tabIndex={1}
                href={item.href}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.answersBlock}>
        <ul className={styles.topList}>
          {launchingData.map(info => (
            <li key={info.id} id={info.url} className={styles.sectionItem}>
              <h3>{info.header}</h3>
              <ul className={styles.questionsList}>
                {info.faqs.map(faq => (
                  <li key={faq.id}>
                    <div className={styles.questionBlock} tabIndex={0}>
                      <button
                        className={styles.button}
                        onClick={() => {
                          selectedItem === faq.id
                            ? setSelectedItem('')
                            : setSelectedItem(faq.id);
                        }}
                      >
                        <div className={styles.contentBlock}>
                          <h4>{faq.question}</h4>
                          <i
                            className={`fas ${
                              selectedItem === faq.id
                                ? 'fa-arrow-down'
                                : 'fa-arrow-right'
                            }`}
                          ></i>
                        </div>
                      </button>
                    </div>
                    <div className={styles.outerBlock}>
                      <p
                        className={`${
                          selectedItem === faq.id
                            ? `${styles.visibleAnswer}`
                            : `${styles.invisibleAnswer}`
                        } ${faq.variants ? `${styles.listHeading}` : ''}`}
                        dangerouslySetInnerHTML={{
                          __html: replaceTextWithLinks(faq.answer),
                        }}
                      ></p>
                      {faq.variants && (
                        <ul
                          className={`${
                            selectedItem === faq.id
                              ? `${styles.visibleAnswer}`
                              : `${styles.invisibleAnswer}`
                          } ${styles.variantsList}`}
                        >
                          {faq.variants.map(variant => (
                            <li key={variant.id}>
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: replaceTextWithLinks(variant.variant),
                                }}
                              ></div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {info.id < launchingData.length ? (
                <hr className={styles.line} />
              ) : (
                ''
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
