import React from 'react';
import { connect } from 'react-redux';
import { clearSetOfferStatusError } from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';
import OfferForm from '../OfferForm/OfferForm';
import OffersList from '../OffersList/OffersList';
import Error from '../Error/Error';
import styles from './OffersContainer.module.sass';

const OffersContainer = ({role, contestByIdStore}) => {
  const { CREATOR, CONTEST_STATUS_ACTIVE } = CONSTANTS;
  const { contestData, setOfferStatusError } = contestByIdStore;
  return (
    <div className={styles.offersContainer}>
      {role === CREATOR && contestData.status === CONTEST_STATUS_ACTIVE && (
        <OfferForm
          contestType={contestData.contestType}
          contestId={contestData.id}
          customerId={contestData.User.id}
        />
      )}
      {setOfferStatusError && (
        <Error
          data={setOfferStatusError.data}
          status={setOfferStatusError.status}
          clearError={clearSetOfferStatusError}
        />
      )}
      <OffersList />
    </div>
  );
};

const mapStateToProps = state => {
  const contestByIdStore = state;
  return contestByIdStore;
};

const mapDispatchToProps = dispatch => ({
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(OffersContainer);
