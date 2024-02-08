import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import SelectInput from '../../../SelectInput/SelectInput';
import Notification from '../../../Notification/Notification';
import { addChatToCatalog } from '../../../../store/slices/chatSlice';
import styles from './AddToCatalog.module.sass';

const AddToCatalog = props => {
  const [error, setError] = useState(false);
  const getCatalogsNames = () => {
    const { catalogList } = props;
    const namesArray = [];
    catalogList.forEach(catalog => {
      namesArray.push(catalog.catalogName);
    });
    return namesArray;
  };

  const getValueArray = () => {
    const { catalogList } = props;
    const valueArray = [];
    catalogList.forEach(catalog => {
      valueArray.push(catalog._id);
    });
    return valueArray;
  };

  const click = values => {
    const { addChatId, catalogList } = props;
    const catalogNames = [];
    catalogList.map(item => catalogNames.push(item._id));
    catalogNames.includes(values.catalogId)
      ? setError(true)
      : props.addChatToCatalog({
          chatId: addChatId,
          catalogId: values.catalogId,
        });
  };

  const selectArray = getCatalogsNames();
  return (
    <>
      {selectArray.length !== 0 ? (
        <Formik onSubmit={click} initialValues={{ catalogId: '' }}>
          <Form className={styles.form}>
            <SelectInput
              name='catalogId'
              header='name of catalog'
              classes={{
                inputContainer: styles.selectInputContainer,
                inputHeader: styles.selectHeader,
                selectInput: styles.select,
              }}
              optionsArray={selectArray}
              valueArray={getValueArray()}
            />
            <button type='submit'>Add</button>
          </Form>
        </Formik>
      ) : (
        <div className={styles.notFound}>
          You have not created any directories.
        </div>
      )}
      {error && (
        <Notification
          message={'Chat is already in choosing catalog'}
        />
      )}
    </>
  );
};

const mapStateToProps = state => state.chatStore;

const mapDispatchToProps = dispatch => ({
  addChatToCatalog: data => dispatch(addChatToCatalog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCatalog);
