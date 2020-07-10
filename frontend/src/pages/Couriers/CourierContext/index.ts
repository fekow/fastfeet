import { createContext } from 'react';

import { CourierState } from 'types';

const CourierContext = createContext<CourierState>({
  courierPrevious: {
    name: '',
    email: '',
  },
  setCourierState: () => {},
  resetCourierState: () => {},
});

export default CourierContext;
