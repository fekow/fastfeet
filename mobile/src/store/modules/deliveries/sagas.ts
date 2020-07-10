import { all, takeLatest, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { deliveriesSuccess, deliveriesFailure } from './actions';

export function* deliveries({
  payload,
}: {
  payload: { id: string; status: string; page?: number };
  type: string;
}): any {
  // aqui faço verificação de login na api
  try {
    const { id, status, page = 1 } = payload;
    const response = yield call(api.get, `/deliveryman/${id}/orders`, {
      params: {
        status,
        page,
      },
    });
    const { docs, pages, total } = response.data;

    yield put(deliveriesSuccess(docs, pages, total));
  } catch (err) {
    Alert.alert('Não existem entregas.', 'Por favor, verifique seu ID');
    yield put(deliveriesFailure());
  }
}

export default all([takeLatest('@orders/DELIVERIES_REQUEST', deliveries)]);
