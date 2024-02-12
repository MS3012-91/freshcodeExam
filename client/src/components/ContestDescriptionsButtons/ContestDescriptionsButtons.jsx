import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { changeContestViewMode } from '../../store/slices/contestByIdSlice';
import styles from './ContestDescriptionsButtons.module.sass';

const ContestDescriptionsButtons = ({
  buttonName,
  className,
  changeContestViewMode,
}) => {
  return (
    <button
      type='button'
      className={classNames(styles.btn, {
        [styles.activeBtn]: className,
      })}
      onClick={() =>
        changeContestViewMode(buttonName === 'Brief' ? true : false)
      }
    >
      {buttonName}
    </button>
  );
};

const mapDispatchToProps = dispatch => ({
  changeContestViewMode: data => dispatch(changeContestViewMode(data)),
});

export default connect(null, mapDispatchToProps)(ContestDescriptionsButtons);
