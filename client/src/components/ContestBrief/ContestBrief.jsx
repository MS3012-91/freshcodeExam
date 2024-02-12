import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import Brief from '../Brief/Brief';

const findConversationInfo = (interlocutorId, userStore, chatStore) => {
  const {messagesPreview} = chatStore;
  const { id } = userStore.data;
  const participants = [id, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );
  for (let i = 0; i < messagesPreview.length; i++) {
    if (isEqual(participants, messagesPreview[i].participants)) {
      return {
        participants: messagesPreview[i].participants,
        _id: messagesPreview[i]._id,
        blackList: messagesPreview[i].blackList,
        favoriteList: messagesPreview[i].favoriteList,
      };
    }
  }
  return null;
};

const goChat = (contestData, userStore, chatStore, goToExpandedDialog ) => {
  const {User} = contestData;
  goToExpandedDialog({
    interlocutor: User,
    conversationData: findConversationInfo(User.id, userStore, chatStore, goToExpandedDialog),
  });
};

const ContestBrief = ({ contestData, role, userStore, chatStore, goToExpandedDialog }) => {
  return (
    <Brief
      contestData={contestData}
      role={role}
      goChat={() => goChat(contestData, userStore, chatStore, goToExpandedDialog)}
    />
  );
};

const mapStateToProps = state => {
  const { userStore, chatStore } = state;
  return { userStore, chatStore };
};

const mapDispatchToProps = dispatch => ({
  goToExpandedDialog: data => dispatch(goToExpandedDialog(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestBrief);
