import React from 'react';
import { Field, ErrorMessage } from 'formik';
import classNames from 'classnames';

const FormInput = ({ classes, label, name, ...rest }) => (
  <Field name={name}>
    {props => {
      const {
        field,
        meta: { touched, error },
      } = props;

      const inputClassName = classNames(classes.input, {
        [classes.notValid]: touched && error,
        [classes.valid]: touched && !error,
      });
      return (
        <div className={classes.inputContainer}>
        <div className={classes.container}>
          <label htmlFor={field.name} className={classes.inputLabel}>{label}</label>
          <input
            {...field}
            placeholder={label}
            className={inputClassName}
            {...rest}
          />
          <ErrorMessage
            name={name}
            component='span'
            className={classes.warning}
          />
          </div>
        </div>
      );
    }}
  </Field>
);

export default FormInput;
