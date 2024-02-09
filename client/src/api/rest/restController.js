import http from '../interceptor';

export const registerRequest = data => http.post('user/registration', data);
export const loginRequest = data => http.post('user/login', data);
export const getUser = () => http.post('user/getUser');
export const updateContest = data => http.post('contest/updateContest', data);
export const setNewOffer = data => http.post('contest/setNewOffer', data);
export const setOfferStatus = data => http.post('contest/setOfferStatus', data);
export const downloadContestFile = data =>
  http.get(`contest/downloadFile/${data.fileName}`);
export const payMent = data => http.post('user/pay', data.formData);
export const changeMark = data => http.post('user/changeMark', data);
export const dataForContest = data => http.post('contest/dataForContest', data);
export const cashOut = data => http.post('user/cashout', data);
export const updateUser = data => http.post('user/updateUser', data);
export const getCatalogList = data => http.post('chat/getCatalogs', data);
export const deleteCatalog = data => http.post('chat/deleteCatalog', data);
export const getCustomersContests = data =>
  http.post(
    'contest/getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.post('contest/getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  http.get('contest/getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });

//chat connections
export const newMessage = data => http.post('chat/newMessage', data);
export const getDialog = queryParams => http.get(`chat/getChat${queryParams}`);
export const getPreviewChat = () => http.get('chat/getPreview');
export const changeChatBlock = ({ chatId, blackListFlag }) =>
  http.patch(`chat/blackList${chatId}`, { blackListFlag });
export const changeChatFavorite = ({ chatId, chatParams }) =>
  http.patch(`chat/favorite${chatId}`, { chatParams });
export const createCatalog = ({ catalogName, chatId }) =>
  http.post(`chat/createCatalog${chatId}`, { catalogName });
export const changeCatalogName = ({ catalogName, catalogId }) =>
  http.patch(`chat/updateNameCatalog${catalogId}`, { catalogName });
export const addChatToCatalog = ({ chatId, catalogId }) =>
  http.patch(`chat/addNewChatToCatalog${chatId}`, { catalogId });
export const removeChatFromCatalog = ({ chatId, catalogId }) =>
  http.patch(`chat/removeChatFromCatalog${chatId}`, { catalogId });
