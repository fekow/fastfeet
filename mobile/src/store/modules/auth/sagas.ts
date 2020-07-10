import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({
  payload,
}: {
  payload: { id: string };
  type: string;
}): any {
  // aqui faço verificação de login na api

  try {
    const { id } = payload;
    const response = yield call(api.get, `/deliveryman/${id}`);

    yield put(signInSuccess(response.data));
  } catch (err) {
    Alert.alert('Entregador não existe.', 'Por favor, verifique seu ID');
    yield put(signFailure());
  }
}

// posso escutar essa cal do persist rehydrate
export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
