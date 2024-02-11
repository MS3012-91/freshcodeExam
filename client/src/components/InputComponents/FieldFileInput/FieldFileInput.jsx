import React from 'react';
import { Field } from 'formik';

const FieldFileInput = ({ classes, ...rest }) => {
  const { fileUploadContainer, labelClass, fileNameClass, fileInput } = classes;

  return (
    <Field name={rest.name}>
      {props => {
        const { field, form } = props;
        
        const getFileName = () => {
          if (props.field.value) {
            return props.field.value.name;
          }
          return '';
        };
        
        const handleChange = (e, rest) => {
          const file = e.target.files[0];
          const fieldName = rest.name;
          form.getFieldHelpers(fieldName).setValue(file);
        };

        return (
          <div className={fileUploadContainer}>
            <label htmlFor='fileInput' className={labelClass}>
              Choose file
            </label>
            <span id='fileNameContainer' className={fileNameClass}>
              {getFileName()}
            </span>
            <input
              {...field}
              accept='.jpg, .png, .jpeg'
              className={fileInput}
              id='fileInput'
              name='fileInput'
              type='file'
              onChange={e => {
                handleChange(e, rest);
              }}
              value={undefined}
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldFileInput;
