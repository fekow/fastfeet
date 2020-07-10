import { produce } from 'immer';
import { Courier } from '../moduleTypes';
// CHECK THIS LATER, NULL IS BETTER
const INITIAL_STATE = {
  id: '',
  signed: false,
  loading: false,
};

// fix any
export default function auth(
  state = INITIAL_STATE,
  action: {
    payload: {
      courier: Courier;
    };
    type: string;
  },
): any {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.id = action.payload.courier.id;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.id = '';
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
