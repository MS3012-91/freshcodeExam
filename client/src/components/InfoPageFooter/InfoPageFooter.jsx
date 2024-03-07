import React from 'react';
import { InfoPageFooterData as data, buttons } from './InfoPageFooterData';
import styles from './InfoPageFooter.module.sass';

export default function InfoPageFooter () {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.topContainer}>
        <nav className={styles.topFooter}>
          {data.map(info => (
            <div className={styles.navigationBlock} key={info.id}>
              <h3>{info.title}</h3>
              {info.links.map(link => (
                <ul>
                  <li key={link.id}>
                    <a href={link.href}>{link.title}</a>
                    {link.variants &&
                      link.variants.map(variant => (
                        <ul>
                          <li key={variant.id} className={styles.innerList}>
                            <a href={variant.href}> {variant.variant}</a>
                          </li>
                        </ul>
                      ))}
                  </li>
                </ul>
              ))}
            </div>
          ))}
        </nav>
        <div className={styles.middleFooter}>
          <div className={styles.leftSpace}>
            <h3>Trending Searches</h3>
            <p className={styles.textBlock}>
              Explore our unique, hand-picked brand & business names for sale
              along with a matching, premium domain name. Buy instantly for a
              fixed low price.
            </p>
            <form method='get' onsubmit='#'>
              <input
                className={styles.footerInput}
                type='text'
                placeholder='Search  over 75,000 Names'
              />
              <button
                type='submit'
                className={styles.searchButton}
                role='button'
              >
                <span aria-label='Search'>
                  <i className='fas fa-search'></i>
                </span>
              </button>
            </form>
          </div>
          <div className={styles.rightSpace}>
            <ul>
              {buttons.map(button => (
                <li key={button.id}>
                  <a className={styles.footerButton} href={button.href}>
                    <span aria-label='Bolt'>
                      <i className='fas fa-bolt'></i>
                    </span>
                    <span>{button.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.bottomFooter}>
          <div className={styles.copyrightText}>
            <span>Copyright © 2024 Squadhelp LLC</span>
          </div>
          <div className={styles.textLink}>
            <a
              href='https://www.shopperapproved.com/reviews/squadhelp.com/'
              rel='nofollow'
              target='shopperapproved'
            >
              Squadhelp.com has a Shopper Approved rating of 4.9/5 based on 2782
              ratings and reviews
            </a>
          </div>
          <div className={styles.socialItems}>
            <a
              href='https://www.linkedin.com/company/squadhelp/'
              target='_blank'
            >
              <span aria-label='Linkedin'>
                <i className='fab fa-linkedin-in'></i>
              </span>
            </a>
            <a href='https://www.instagram.com/squadhelpinc/' target='_blank'>
              <span aria-label='Instagram'>
                <i className='fab fa-instagram'></i>
              </span>
            </a>
            <a href='https://twitter.com/squadhelp' target='_blank'>
              <span aria-label='Twitter'>
                <i className='fab fa-twitter'></i>
              </span>
            </a>
            <a href='https://www.facebook.com/squadhelpinc' target='_blank'>
              <span aria-label='Facebook'>
                <i className='fab fa-facebook-square'></i>
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
