import { all } from 'redux-saga/effects';
import auth from './auth/sagas';
import deliveries from './deliveries/sagas';
// fix ts
export default function* rootSaga(): any {
  return yield all([auth, deliveries]);
}
