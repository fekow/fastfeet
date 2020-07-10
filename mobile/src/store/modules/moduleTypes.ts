import { Orders } from '~/types';

export interface Courier {
  id: string;
  name: string;
  email: string;
  created_at: string;
  avatar?: {
    url: string;
  };
}

export interface userState {
  profile: Courier;
}

export interface deliveriesState {
  deliveries: [Orders];
  loading: boolean;
  total: number;
  totalPages: number;
}

export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const DELIVERIES_SUCCESS = '@orders/DELIVERIES_SUCCESS';
export const DELIVERIES_REQUEST = '@orders/DELIVERIES_REQUEST';
export const DELIVERIES_FAILURE = '@orders/DELIVERIES_FAILURE';
export const SIGN_OUT = '@auth/SIGN_OUT';

interface signInAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    courier: Courier;
  };
}

interface deliveriesSuccessAction {
  type: typeof DELIVERIES_SUCCESS;
  payload: deliveriesState;
}
interface deliveriesRequestAction {
  type: typeof DELIVERIES_REQUEST;
  payload: deliveriesState;
}

interface signOutAction {
  type: typeof SIGN_OUT;
}
interface deliveryFailureAction {
  type: typeof DELIVERIES_FAILURE;
}

export type UserActionTypes = signInAction | signOutAction;
export type DeliveriesActionTypes =
  | deliveriesSuccessAction
  | deliveriesRequestAction
  | deliveryFailureAction;
