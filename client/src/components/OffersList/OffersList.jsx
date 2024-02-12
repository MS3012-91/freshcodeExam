import React from 'react';
import { connect } from 'react-redux';
import CONSTANTS from '../../constants';
import { setOfferStatus, clearSetOfferStatusError } from '../../store/slices/contestByIdSlice';
import OfferBox from '../OfferBox/OfferBox';
import styles from './OffersList.module.sass';

const OffersList = ({
  contestByIdStore,
  userStore,
}) => {
  const needButtons = offerStatus => {
    const {
      contestData: { User, status },
    } = contestByIdStore;
    const { data } = userStore;
    const { CONTEST_STATUS_ACTIVE, OFFER_STATUS_PENDING } = CONSTANTS;
    const contestCreatorId = User.id;
    const userId = data.id;
    const contestStatus = status;
    return (
      contestCreatorId === userId &&
      contestStatus === CONTEST_STATUS_ACTIVE &&
      offerStatus === OFFER_STATUS_PENDING
    );
  };

  const setOfferStatus = (contestByIdStore, creatorId, offerId, command) => {
    const { id, orderId, priority } = contestByIdStore.contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    clearSetOfferStatusError();
    setOfferStatus(obj);
  };

  const setOffersList = () => {
    const { offers, contestData } = contestByIdStore;
    const array = offers
      ? offers.map(offer => (
          <OfferBox
            key={offer.id}
            data={offer}
            needButtons={needButtons}
            setOfferStatus={setOfferStatus}
            contestType={contestData.contestType}
            date={new Date()}
          />
        ))
      : [];

    return array.length !== 0 ? (
      array
    ) : (
      <div className={styles.notFound}>
        There is no suggestion at this moment
      </div>
    );
  };

  return <div className={styles.offers}>{setOffersList()}</div>;
}

const mapStateToProps = state => {
  const {contestByIdStore, userStore} = state
  return {contestByIdStore, userStore};
};

const mapDispatchToProps = dispatch => ({
  setOfferStatus: data => dispatch(setOfferStatus(data)),
  clearSetOfferStatusError: () => dispatch(clearSetOfferStatusError()),
}); 

export default connect(mapStateToProps, mapDispatchToProps)(OffersList);