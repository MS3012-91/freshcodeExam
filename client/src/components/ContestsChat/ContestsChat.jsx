import React from 'react';
import { connect } from 'react-redux';
import LightBox from 'react-image-lightbox';
import changeShowImage from '../../store/slices/contestByIdSlice';
import CONSTANTS from '../../constants';

const ContestsChat = (contestByIdStore) => {
  const {isShowOnFull, imagePath} = contestByIdStore;
  const publicURL = CONSTANTS;
  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${publicURL}${imagePath}`}
          onCloseRequest={() =>
            changeShowImage({ isShowOnFull: false, imagePath: null })
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return state.contestByIdStore;
};

const mapDispatchToProps = dispatch => ({
  changeShowImage: data => dispatch(changeShowImage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestsChat);
