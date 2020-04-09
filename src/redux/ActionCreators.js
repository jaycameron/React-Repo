import * as ActionTypes from './ActionTypes';
import { CAMPSITES } from '../shared/campsites';
// the asterisc is a wildcard that allows importing all from action types

export const addComment = (campsiteId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    campsiteId: campsiteId,
    rating: rating,
    author: author,
    text: text,
  },
});
// ^ this creates the action first identified by "type",carrying the payload (the info/data) and returns an object
// this will then be called in via a mapDTProps function in MainComponent, then connected at the bottom in the export section with connect(), then it can finally be called in CampsiteInfo to be rendered
// Action Type, then action created, then action to mDTProps, then connect(), then used as a prop in CampsiteInfo tag in main componenet, then used inside <RenderComments /> inCampsiteInfoComponent
export const fetchCampsites = () => (dispatch) => {
  dispatch(campsitesLoading());

  setTimeout(() => {
    dispatch(addCampsites(CAMPSITES));
  }, 2000);
};

export const campsitesLoading = () => ({
  type: ActionTypes.CAMPSITES_LOADING,
});

export const campsitesFailed = (errMess) => ({
  type: ActionTypes.CAMPSITES_FAILED,
  payload: errMess,
});

export const addCampsites = (campsites) => ({
  type: ActionTypes.ADD_CAMPSITES,
  payload: campsites,
});
// ^^^ type is reference to the action in ActionTypes, payload is pulling the info that comes from ADD_CAMPSITES and returning that object
