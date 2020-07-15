import { createContext } from 'react';

import { OrderState } from 'types';

const OrderContext = createContext<OrderState>({} as OrderState)

export default OrderContext;
