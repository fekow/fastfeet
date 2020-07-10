import { Courier } from '../moduleTypes';

export function signInRequest(
  id: string,
): { type: string; payload: { id: string } } {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      id,
    },
  };
}

export function signInSuccess(
  courier: Courier,
): {
  type: string;
  payload: {
    courier: Courier;
  };
} {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {
      courier,
    },
  };
}

export function signFailure(): { type: string } {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signOut(): { type: string } {
  return {
    type: '@auth/SIGN_OUT',
  };
}
