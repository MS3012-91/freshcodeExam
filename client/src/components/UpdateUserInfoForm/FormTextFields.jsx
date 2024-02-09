import React from 'react';
import FormInput from '../FormInput/FormInput';
import styles from './UpdateUserInfoForm.module.sass';

export default function FormTextFields ({fieldName, fieldLabel}) {
  return (
    <div className={styles.container}>
      <label htmlFor={fieldName} className={styles.label}>
        {fieldLabel}
      </label>
      <FormInput
        name={fieldName}
        type='text'
        label={fieldLabel}
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.error,
          notValid: styles.notValid,
        }}
      />
    </div>
  );
}
