export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Profile {
  name: string;
  email: string;
  avatar_id?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
}

export interface userState {
  profile: User;
}

export const SIGN_IN_SUCCESS = '@auth/SIGN_IN_SUCCESS';
export const UPDATE_PROFILE = '@user/UPDATE_PROFILE_SUCCESS';
export const SIGN_OUT = '@auth/SIGN_OUT';

interface signInAction {
  type: typeof SIGN_IN_SUCCESS;
  payload: {
    token: string;
    user: User;
  };
}

interface signOutAction {
  type: typeof SIGN_OUT;
}

export type UserActionTypes = signInAction | signOutAction;
