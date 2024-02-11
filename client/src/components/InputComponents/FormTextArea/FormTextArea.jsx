import React from 'react';
import classNames from 'classnames';
import { Field, ErrorMessage } from 'formik';

const FormTextArea = ({ label, classes, type, placeholder, ...rest }) => (
  <Field {...rest}>
    {props => {
      const {
        field,
        meta: { touched, error },
      } = props;
      const { container, inputStyle, notValid, warning, inputContainer,inputHeader } =
        classes;
      return (
        <div className={inputContainer}>
          <div className={container}>
            <label htmlFor={field.name} className={inputHeader}>{label}</label>
            <textarea
              {...field}
              placeholder={placeholder}
              className={classNames(inputStyle, {
                [notValid]: touched && error,
              })}
            />
            <ErrorMessage
              name={field.name}
              component='span'
              className={warning}
            />
          </div>
        </div>
      );
    }}
  </Field>
);

export default FormTextArea;
