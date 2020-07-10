import { all, takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from 'services/api';
import history from 'services/history';
import { signInSuccess, signFailure } from './actions';

export function* signIn({
  payload,
}: {
  payload: { email: string; password: string };
  type: string;
}): any {
  // aqui faço verificação de login na api

  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;
    api.defaults.headers['Authorization'] = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    console.tron.log(err);
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}
// toda vez q o persist carrega, euu seto o meu token nos headers
export function setToken({
  payload,
}: {
  type: string;
  payload: { auth: { token: string } };
}): any {
  if (!payload) {
    return;
  }
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
  }
}

function signOut() {
  history.push('/');
}

// posso escutar essa cal do persist rehydrate
export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
