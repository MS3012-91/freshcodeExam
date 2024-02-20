import React from 'react';
import Cards from 'react-credit-cards';
import { Form, Formik } from 'formik';
import 'react-credit-cards/es/styles-compiled.css';
import { connect } from 'react-redux';
import styles from './PayForm.module.sass';
import { changeFocusOnCard } from '../../store/slices/paymentSlice';
import PayInput from '../InputComponents/PayInput/PayInput';
import Schems from '../../utils/validators/validationSchems';

const inputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  notValid: styles.notValid,
  error: styles.error,
  label: styles.label,
};

const PayForm = props => {
  const changeFocusOnCard = name => {
    props.changeFocusOnCard(name);
  };

  const pay = values => {
    props.sendRequest(values);
  };

  const { focusOnElement, isPayForOrder } = props;
  return (
    <div className={styles.payFormContainer}>
      <h1 className={styles.headerInfo}>Payment Information</h1>
      <Formik
        initialValues={{
          focusOnElement: '',
          name: '',
          number: '',
          sum: '',
          cvc: '',
          expiry: '',
        }}
        onSubmit={pay}
        validationSchema={Schems.PaymentSchema}
      >
        {({ values }) => {
          const { name, number, expiry, cvc } = values;
          
          return (
            <>
              <div className={styles.cardContainer}>
                <Cards
                  number={number || ''}
                  name={name || ''}
                  expiry={expiry || ''}
                  cvc={cvc || ''}
                  focused={focusOnElement}
                />
              </div>
              <Form id='myForm' className={styles.formContainer}>
                <div className={styles.bigInput}>
                  <PayInput
                    label='Name'
                    name='name'
                    classes={inputClasses}
                    type='text'
                    placeholder='name'
                    changeFocus={changeFocusOnCard}
                  />
                </div>
                {!isPayForOrder && (
                  <div className={styles.bigInput}>
                    <PayInput
                      label='Sum'
                      name='sum'
                      classes={inputClasses}
                      type='text'
                      placeholder='sum'
                    />
                  </div>
                )}
                <div className={styles.bigInput}>
                  <PayInput
                    label='Card Number'
                    isInputMask
                    mask='9999 9999 9999 9999'
                    name='number'
                    classes={inputClasses}
                    type='text'
                    placeholder='card number'
                    changeFocus={changeFocusOnCard}
                  />
                </div>
                <div className={styles.smallInputContainer}>
                  <div className={styles.smallInput}>
                    <PayInput
                      label='* Expires'
                      isInputMask
                      mask='99/99'
                      name='expiry'
                      classes={inputClasses}
                      type='text'
                      placeholder='expiry'
                      changeFocus={changeFocusOnCard}
                    />
                  </div>
                  <div className={styles.smallInput}>
                    <PayInput
                      label='* Security Code'
                      isInputMask
                      mask='9999'
                      name='cvc'
                      classes={inputClasses}
                      type='text'
                      placeholder='cvc'
                      changeFocus={changeFocusOnCard}
                    />
                  </div>
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
      {isPayForOrder && <div className={styles.totalSum}>Total: $100.00</div>}
      <div className={styles.buttonsContainer}>
        <button form='myForm' className={styles.payButton} type='submit'>
          {isPayForOrder ? 'Pay Now' : 'CashOut'}
        </button>
        {isPayForOrder && (
          <div onClick={() => props.back()} className={styles.backButton}>
            Back
          </div>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeFocusOnCard: data => dispatch(changeFocusOnCard(data)),
});

export default connect(null, mapDispatchToProps)(PayForm);
