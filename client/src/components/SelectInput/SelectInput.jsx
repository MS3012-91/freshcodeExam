import React, { useLayoutEffect } from 'react';
import { Field, ErrorMessage } from 'formik';

const SelectInput = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...props
}) => {
  const {
    form: { setFieldValue },
    meta: { initialValue },
    field,
  } = props;

  const getOptionsArray = () => {
    return (optionsArray || []).map((option, i) => (
      <option key={i} value={valueArray ? valueArray[i] : undefined}>
        {option}
      </option>
    ));
  };

  useLayoutEffect(() => {
    if (!initialValue && optionsArray) {
      setFieldValue(field.name, valueArray ? valueArray[0] : optionsArray[0]);
    }
  });

  return (
    <div className={classes.inputContainer}>
      <label htmlFor={field.name} className={classes.inputHeader}>
        {header}
      </label>
      <select {...field} className={classes.selectInput}>
        {getOptionsArray()}
      </select>
    </div>
  );
};

const SelectInputWrapper = ({
  header,
  classes,
  optionsArray,
  valueArray,
  ...rest
}) => (
  <Field {...rest}>
    {fieldProps => (
      <>
        <SelectInput
          {...fieldProps}
          header={header}
          classes={classes}
          optionsArray={optionsArray}
          valueArray={valueArray}
        />
        <ErrorMessage
          name={fieldProps.field.name}
          component='span'
          className={classes.warning}
        />
      </>
    )}
  </Field>
);

export default SelectInputWrapper;
