import React from 'react';
import InfoPageHeader from '../../components/InfoPageHeader/InfoPageHeader';
import HowItWorkHeroSection from '../../components/HowItWorkHeroSection/HowItWorkHeroSection';
import styles from './HowItWork.module.sass';

export default function HowItWork () {
  return (
    <div>
      <InfoPageHeader />
      <div className={styles.container}>
        <HowItWorkHeroSection />

      </div>
      {/* <WaysToUse />
      <NamingContest />
      <LaunchingAContest />
      <Banner />
      <Benefits /> */}
    </div>
  );
}
