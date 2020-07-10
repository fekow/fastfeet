import { createContext } from 'react';

import { RecipientState } from 'types';

const RecipientContext = createContext<RecipientState>({
  recipientPrevious: {
    name: '',
    address_name: '',
    address_number: '',
    street_add_on: '',
    state: '',
    city: '',
    postal_code: '',
  },
  setRecipientState: () => {},
  resetRecipient: () => {},
});

export default RecipientContext;
