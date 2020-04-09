import { COMMENTS } from '../shared/comments';
import * as ActionTypes from './ActionTypes';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      // ^ this says "when the action type is ADD_COMMENT then:"
      var comment = action.payload;
      // ^new var or const for the payload
      comment.id = state.length;
      // ^ ASK Nick wtf this is
      comment.date = new Date().toISOString();
      // ^ these are properties added to the object which is the payload (the data stored inside)
      return state.concat(comment);
    // ^ adds on the item to the end of the array, doesn't mutate state( push would mutate it )
    default:
      return state;
  }
};

// ^above is the reducer for comments action which is taking the action of the comments (the state of the object) and returning a new state based on the changes to the store
