import { createContext } from 'react';

import { OrderState } from 'types';

const OrderContext = createContext<OrderState>({
  orderPrevious: {
    courier_id: 0,
    recipient_id: 0,
    product: '',
  },
  setOrderContext: () => {},
  resetOrderContext: () => {},
});

export default OrderContext;
