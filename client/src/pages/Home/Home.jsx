import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import SlideBar from '../../components/SlideBar/SlideBar';
import DashboardButton from '../../components/DashboardButton/DashboardButton';
import Footer from '../../components/Footer/Footer';
import styles from './Home.module.sass';
import carouselConstants from '../../carouselConstants';
import Spinner from '../../components/Spinner/Spinner';
import HeaderBarTop from '../../components/HeaderBars/HeaderBarTop/HeaderBarTop';
import BenefitsCardsSection from '../../components/BenefitsCardsSection/BenefitsCardsSection';
import BrandsLogo from '../../components/BrandsLogo/BrandsLogo';
import ContestSteps from '../../components/ContestSteps/ContestSteps';
import HeaderBarBottom from '../../components/HeaderBars/HeaderBarBottom/HeaderBarBottom';
import UsersStatistics from '../../components/UsersStatistics/UsersStatistics';

const Home = props => {
  const { isFetching } = props;
  return (
    <>
      <Header />
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <main className={styles.container}>
            <section className={styles.headerBar}>
              <HeaderBarTop />
              <DashboardButton />
            </section>
            <section className={styles.greyContainer}>
              <SlideBar
                images={carouselConstants.mainSliderImages}
                carouselType={carouselConstants.MAIN_SLIDER}
              />
            </section>
            <section className={styles.description}>
              <h2 className={styles.blueUnderline}>Why Squadhelp?</h2>
              <BenefitsCardsSection />
            </section>
            <section className={styles.greyContainer}>
              <BrandsLogo />
              <UsersStatistics />
            </section>
            <section>
              <h2>How Do Name Contest Work?</h2>
              <ContestSteps />
            </section>
            <section className={styles.examplesBlock}>
              <div className={styles.headerBar}>
                <HeaderBarBottom />
              </div>
              <SlideBar
                images={carouselConstants.exampleSliderImages}
                carouselType={carouselConstants.EXAMPLE_SLIDER}
              />
              <DashboardButton />
            </section>
            <section className={styles.blueContainer}>
              <h2 className={styles.whiteUnderline}>What our customers say</h2>
              <SlideBar
                images={carouselConstants.feedbackSliderImages}
                carouselType={carouselConstants.FEEDBACK_SLIDER}
              />
            </section>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => {
  const { isFetching } = state.userStore;
  return { isFetching };
};

export default connect(mapStateToProps, null)(Home);
