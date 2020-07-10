import { produce } from 'immer';
import {
  deliveriesState,
  DeliveriesActionTypes,
  DELIVERIES_SUCCESS,
  DELIVERIES_REQUEST,
  DELIVERIES_FAILURE,
} from '../moduleTypes';

const INITIAL_STATE: deliveriesState = {
  deliveries: [
    {
      id: -1,
      status: '',
      product: '',
      created_at: '',
    },
  ],
  loading: false,
  total: -1,
  totalPages: -1,
};
// fix any
export default function user(
  state = INITIAL_STATE,
  action: DeliveriesActionTypes,
): deliveriesState {
  return produce(state, draft => {
    switch (action.type) {
      case DELIVERIES_SUCCESS: {
        draft.deliveries = action.payload.deliveries;
        draft.total = action.payload.totalPages;
        draft.totalPages = action.payload.total;
        draft.loading = false;
        break;
      }
      case DELIVERIES_REQUEST: {
        draft.loading = true;
        break;
      }
      case DELIVERIES_FAILURE: {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
