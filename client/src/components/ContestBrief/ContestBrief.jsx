import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import {
  goToExpandedDialog,
  changeChatShow,
} from '../../store/slices/chatSlice';
import Brief from '../Brief/Brief';

const findConversationInfo = (interlocutorId, userStore, chatStore) => {
  const { messagesPreview } = chatStore;
  const { id } = userStore.data;
  const participants = [id, interlocutorId];
  participants.sort(
    (participant1, participant2) => participant1 - participant2
  );

  const foundMessage = messagesPreview.find(message =>
    isEqual(participants, message.participants)
  );
  if (foundMessage) {
    return {
      participants: foundMessage.participants,
      _id: foundMessage._id,
      blackList: foundMessage.blackList,
      favoriteList: foundMessage.favoriteList,
    };
  }
  return null;
};

const goChat = (
  contestData,
  userStore,
  chatStore,
  goToExpandedDialog,
  changeChatShow
) => {
  const { User } = contestData;
  chatStore.isExpanded
    ? changeChatShow()
    : goToExpandedDialog({
        interlocutor: User,
        conversationData: findConversationInfo(
          User.id,
          userStore,
          chatStore,
          goToExpandedDialog
        ),
      });
};

const ContestBrief = ({
  contestData,
  role,
  userStore,
  chatStore,
  goToExpandedDialog,
  changeChatShow,
}) => {
  return (
    <Brief
      contestData={contestData}
      role={role}
      goChat={() =>
        goChat(
          contestData,
          userStore,
          chatStore,
          goToExpandedDialog,
          changeChatShow
        )
      }
    />
  );
};

const mapStateToProps = state => {
  const { userStore, chatStore } = state;
  return { userStore, chatStore };
};

const mapDispatchToProps = dispatch => ({
  goToExpandedDialog: data => dispatch(goToExpandedDialog(data)),
  changeChatShow: () => dispatch(changeChatShow()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContestBrief);
