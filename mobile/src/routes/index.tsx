import React from 'react';
import { useSelector } from 'react-redux';
import SignRoutes from './sign.routes';
import UserRoutes from './user.routes';

import { RootState } from '~/store/modules/rootReducer';

const Routes: React.FC = () => {
  const SignedIn = useSelector((state: RootState) => state.auth.signed);
  return SignedIn ? <UserRoutes /> : <SignRoutes />;
};

export default Routes;
