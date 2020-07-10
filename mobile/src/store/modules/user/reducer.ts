import { produce } from 'immer';
import {
  UserActionTypes,
  SIGN_IN_SUCCESS,
  SIGN_OUT,
  userState,
} from '../moduleTypes';

const INITIAL_STATE: userState = {
  profile: {
    id: '',
    name: '',
    email: '',
    created_at: '',
  },
};
// fix any
export default function user(
  state = INITIAL_STATE,
  action: UserActionTypes,
): userState {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return produce(state, draft => {
        draft.profile = action.payload.courier;
      });
    case SIGN_OUT:
      return produce(state, draft => {
        draft.profile = INITIAL_STATE.profile;
      });

    default:
      return state;
  }
}
