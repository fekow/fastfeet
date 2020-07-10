import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import deliveries from './deliveries/reducer';

export default combineReducers({
  auth,
  user,
  deliveries,
});
// crio minha tipagem de reducers
const rootReducer = combineReducers({
  auth,
  user,
  deliveries,
});

export type RootState = ReturnType<typeof rootReducer>;
