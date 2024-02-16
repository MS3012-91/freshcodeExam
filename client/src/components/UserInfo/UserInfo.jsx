import React from 'react';
import { connect } from 'react-redux';
import UpdateUserInfoForm from '../UpdateUserInfoForm/UpdateUserInfoForm';
import { updateUser } from '../../store/slices/userSlice';
import { changeEditModeOnUserProfile } from '../../store/slices/userProfileSlice';
import CONSTANTS from '../../constants';
import styles from './UserInfo.module.sass';

const component = (componentName, dataValue) => {
  return (
    <div className={styles.infoBlock}>
      <dt className={styles.label}>{componentName}</dt>
      <dd className={styles.info}>{dataValue}</dd>
    </div>
  );
};

const UserInfo = props => {
  const updateUserData = values => {
    const formData = new FormData();
    formData.append('file', values.file);
    formData.append('firstName', values.firstName);
    formData.append('lastName', values.lastName);
    formData.append('displayName', values.displayName);
    props.updateUser(formData);
  };

  const { isEdit, changeEditMode, data } = props;
  const { avatar, firstName, lastName, displayName, email, role, balance } =
    data;
  return (
    <div className={styles.mainContainer}>
      {isEdit ? (
        <UpdateUserInfoForm onSubmit={updateUserData} />
      ) : (
        <div className={styles.infoContainer}>
          <img
            src={
              avatar === 'anon.png'
                ? CONSTANTS.ANONYM_IMAGE_PATH
                : `${CONSTANTS.publicURL}${avatar}`
            }
            className={styles.avatar}
            alt='user'
          />
          <dl className={styles.infoContainer}>
            {component('First Name', firstName)}
            {component('Last Name', lastName)}
            {component('Display Name', displayName)}
            {component('Email', email)}
            {component('Role', role)}
            {component('Balance', `${balance}$`)}
          </dl>
        </div>
      )}
      <div
        onClick={() => changeEditMode(!isEdit)}
        className={styles.buttonEdit}
      >
        {isEdit ? 'Cancel' : 'Edit'}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { data } = state.userStore;
  const { isEdit } = state.userProfile;
  return { data, isEdit };
};

const mapDispatchToProps = dispatch => ({
  updateUser: data => dispatch(updateUser(data)),
  changeEditMode: data => dispatch(changeEditModeOnUserProfile(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
