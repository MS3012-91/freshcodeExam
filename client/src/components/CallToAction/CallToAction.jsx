import React from 'react';
import CONSTANTS from '../../constants';
import styles from './CallToAction.module.sass';

export default function CallToAction () {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.benefitsBlock}>
        <ul>
          <li>
            <div className={styles.content}>
              <h3>Pay a Fraction of cost vs hiring an agency</h3>
              <p>
                For as low as $199, our naming contests and marketplace allow
                you to get an amazing brand quickly and affordably.
              </p>
            </div>
          </li>
          <li>
            <hr className={styles.line} />
          </li>
          <li>
            <div className={styles.content}>
              <h3>Satisfaction Guarantee</h3>
              <p>
                Of course! We have policies in place to ensure that you are
                satisfied with your experience.
                <a
                  href='/how-it-works#satisfactionGaurenteedModal'
                  tabindex='0'
                >
                  Learn more
                </a>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.questionsBlock}>
        <h3>Questions?</h3>
        <p>
          Speak with a Squadhelp platform expert to learn more and get your
          questions answered.
        </p>
        <button type='button'>Schedule Consultation</button>
        <a href={`tel:${CONSTANTS.SQUADHELP_TEL}`}>
          <span aria-label='Phone'>
            <i className='fas fa-phone-volume'></i>
          </span>
          &nbsp;(877) 355-3585
        </a>
        <p>Call us for assistance</p>
      </div>
    </section>
  );
}
