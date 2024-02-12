import React from 'react';
import { connect } from 'react-redux';
import {
  getContestById,
  changeEditContest,
} from '../../store/slices/contestByIdSlice';
import ContestsChat from '../../components/ContestsChat/ContestsChat';
import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import ContestDescriptionsButtons from '../../components/ContestDescriptionsButtons/ContestDescriptionsButtons';
import ContestBrief from '../../components/ContestBrief/ContestBrief';
import OffersContainer from '../../components/OffersContainer/OffersContainer';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import 'react-image-lightbox/style.css';
import styles from './ContestPage.module.sass';

class ContestPage extends React.Component {
  componentWillUnmount () {
    const { changeEditContest } = this.props;
    changeEditContest(false);
  }

  componentDidMount () {
    this.getData();
  }

  getData = () => {
    const {
      match: { params },
      getData,
    } = this.props;
    getData({ contestId: params.id });
  };

  render () {
    const { role } = this.props.userStore.data;
    const {
      contestByIdStore,
      getData,
    } = this.props;
    const { error, isFetching, isBrief, contestData, offers } =
      contestByIdStore;
    return (
      <div>
        <ContestsChat />
        <Header />
        {error ? (
          <div className={styles.tryContainer}>
            <TryAgain getData={getData} />
          </div>
        ) : isFetching ? (
          <div className={styles.containerSpinner}>
            <Spinner />
          </div>
        ) : (
          <div className={styles.mainInfoContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.buttonsContainer}>
                <ContestDescriptionsButtons
                  buttonName='Brief'
                  className={isBrief ? 'styles.activeBtn' : ''}
                />
                <ContestDescriptionsButtons
                  buttonName='Offer'
                  className={!isBrief ? 'styles.activeBtn' : ''}
                />
              </div>
              {isBrief ? (
                <ContestBrief {...{ contestData, role }} />
              ) : (
                <OffersContainer {...{ role }} />
              )}
            </div>
            <ContestSideBar
              contestData={contestData}
              totalEntries={offers.length}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { contestByIdStore, userStore, chatStore } = state;
  return { contestByIdStore, userStore, chatStore };
};

const mapDispatchToProps = dispatch => ({
  getData: data => dispatch(getContestById(data)),
  changeEditContest: data => dispatch(changeEditContest(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestPage);
