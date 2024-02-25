import React from 'react';
import InfoPageHeader from '../../components/InfoPageHeader/InfoPageHeader';
import HowItWorkHeroSection from '../../components/HowItWorkHeroSection/HowItWorkHeroSection';
import InfoPageWaysToUse from '../../components/InfoPageWaysToUse/InfoPageWaysToUse';
import InfoPageNamingContest from '../../components/InfoPageNamingContest/InfoPageNamingContest';
import styles from './HowItWork.module.sass';

export default function HowItWork () {
  return (
    <div>
      <InfoPageHeader />
      <div className={styles.container}>
        <HowItWorkHeroSection />
        <InfoPageWaysToUse />
        <hr className={styles.line} />
        <InfoPageNamingContest />
      </div>

      {/* <LaunchingAContest />
      <Banner />
      <Benefits />  */}
    </div>
  );
}
