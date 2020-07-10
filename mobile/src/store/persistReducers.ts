import AsyncStorage from '@react-native-community/async-storage';
// storage ja descobre qual o tipo de storage q tu usa e aplica
import { persistReducer } from 'redux-persist';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (reducers: any): any => {
  const persistedReducer = persistReducer(
    {
      // chave pro nome do storage
      key: 'fastfeet',
      storage: AsyncStorage,
      // quem eu quero persistir
      whitelist: ['auth', 'user', 'deliveries'],
    },
    reducers,
  );
  return persistedReducer;
};
