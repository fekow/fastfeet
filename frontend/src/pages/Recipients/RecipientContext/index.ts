import { createContext } from 'react';

import { RecipientState } from 'types';

const RecipientContext = createContext<RecipientState>({} as RecipientState);

export default RecipientContext;
