import React from 'react';
import InfoPageHeader from '../../components/InfoPageHeader/InfoPageHeader';
import HowItWorkHeroSection from '../../components/HowItWorkHeroSection/HowItWorkHeroSection';
import InfoPageWaysToUse from '../../components/InfoPageWaysToUse/InfoPageWaysToUse';
import InfoPageNamingContest from '../../components/InfoPageNamingContest/InfoPageNamingContest';
import LaunchingAContest from '../../components/LaunchingAContest/LaunchingAContest';
import Banner from '../../components/Banner/Banner';
import StatisticsSection from '../../components/StatisticsSection/StatisticsSection';
import CallToAction from '../../components/CallToAction/CallToAction';
import FeaturedSection from '../../components/FeaturedSection/FeaturedSection';
import InfoPageFooter from '../../components/InfoPageFooter/InfoPageFooter';
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
        <hr className={styles.line} />
        <LaunchingAContest />
      </div>
      <Banner />
      <StatisticsSection />
      <div className={styles.container}>
        <CallToAction />
      </div>
      <FeaturedSection />
      <InfoPageFooter />
    </div>
  );
}
