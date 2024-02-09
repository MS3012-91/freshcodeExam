import React from 'react';
import { Form, Formik } from 'formik';
import { connect } from 'react-redux';
import { clearUserError } from '../../store/slices/userSlice';
import styles from './UpdateUserInfoForm.module.sass';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormTextFields from './FormTextFields';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';

const UpdateUserInfoForm = props => {
  const { onSubmit, submitting, error, clearUserError } = props;
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={props.initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        <FormTextFields fieldName='firstName' fieldLabel='First Name' />
        <FormTextFields fieldName='lastName' fieldLabel='Last Name' />
        <FormTextFields fieldName='displayName' fieldLabel='Display Name' />
        <ImageUpload
          name='file'
          file= {props.initialValues.file}
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
        <button type='submit' disabled={submitting}>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

const mapStateToProps = state => {
  const { data, error } = state.userStore;
  return {
    error,
    initialValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      file: data.avatar
    },
  };
};

const mapDispatchToProps = dispatch => ({
  clearUserError: () => dispatch(clearUserError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserInfoForm);
