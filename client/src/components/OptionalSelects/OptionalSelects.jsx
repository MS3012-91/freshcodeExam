import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import Spinner from '../Spinner/Spinner';
import styles from '../ContestForm/ContestForm.module.sass';

const selectClasses = {
  inputContainer: styles.selectInputContainer,
  inputHeader: styles.selectHeader,
  selectInput: styles.select,
  warning: styles.warning,
};

const formInputClasses = {
  inputContainer: styles.inputContainer,
  inputLabel: styles.inputHeader,
  input: styles.input,
  warning: styles.warning,
};

const OptionalSelects = props => {
  if (props.isFetching) {
    return <Spinner />;
  }
  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name='typeOfName'
            header='type of company'
            classes={selectClasses}
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            name='styleName'
            header='Style name'
            classes={selectClasses}
            optionsArray={props.dataForContest.data.nameStyle}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <FormInput
            name='nameVenture'
            type='text'
            label='What name of your venture?'
            placeholder='name of venture'
            classes={formInputClasses}
          />
          <SelectInput
            name='brandStyle'
            classes={selectClasses}
            header='Brand Style'
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <FormInput
            name='nameVenture'
            type='text'
            label='What name of your venture?'
            placeholder='name of venture'
            classes={formInputClasses}
          />
          <SelectInput
            name='typeOfTagline'
            classes={selectClasses}
            header='Type tagline'
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
      default: return null
  }
};

export default OptionalSelects;
