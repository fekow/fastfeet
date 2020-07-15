import { createContext } from 'react';

import { CourierState } from 'types';

const CourierContext = createContext<CourierState>({} as CourierState);

export default CourierContext;
