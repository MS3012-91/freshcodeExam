import React from 'react';
import InfoPageHeader from '../../components/InfoPageHeader/InfoPageHeader';
import HowItWorkHeroSection from '../../components/HowItWorkHeroSection/HowItWorkHeroSection';
import InfoPageWaysToUse from '../../components/InfoPageWaysToUse/InfoPageWaysToUse'
import styles from './HowItWork.module.sass';

export default function HowItWork () {
  return (
    <div>
      <InfoPageHeader />
      <div className={styles.container}>
        <HowItWorkHeroSection />
        <InfoPageWaysToUse />
      </div>
{/*       
      <NamingContest />
      <LaunchingAContest />
      <Banner />
      <Benefits /> */}
    </div>
  );
}
