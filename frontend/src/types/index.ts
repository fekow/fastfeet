export interface Orders {
  id: number;
  status: string;
  product: string;
  canceled_at?: string;
  start_date?: string;
  end_date?: string;
  courier_id?: number;
  formatedStartDate?: string;
  formatedEndDate?: string;
  courier?: {
    id: number;
    email: string;
    name: string;
    avatar?: {
      id: number;
      url: string;
      path: string;
    };
  };
  recipient?: {
    id: number;
    name: string;
    address_name: string;
    address_number: string;
    street_add_on?: string;
    state: string;
    city: string;
    postal_code: string;
  };
  signature?: {
    id: number;
    url: string;
    path: string;
  };
}
export interface Couriers {
  id: number;
  name: string;
  email: string;
  avatar_id?: number;
  avatar?: {
    url: string;
    id: number;
    path: string;
  };
}
export interface Recipient {
  id: number;
  name: string;
  address_name: string;
  address_number: string;
  street_add_on?: string;
  state: string;
  city: string;
  postal_code: string;
}
export interface RecipientPrevious {
  name: string;
  address_name: string;
  address_number: string;
  street_add_on?: string;
  state: string;
  city: string;
  postal_code: string;
}
export interface RecipientState {
  recipientPrevious: RecipientPrevious | null;
  setRecipientState: CallableFunction;
  resetRecipient: CallableFunction;
}

export interface OrderPrevious {
  courier_id: number;
  recipient_id: number;
  product: string;
}

export interface OrderState {
  orderPrevious: OrderPrevious | null;
  setOrderContext: CallableFunction;
  resetOrderContext: CallableFunction;
}
export interface CourierPrevious {
  name: string;
  email: string;
  avatar_id?: string;
  avatar?: {
    url: string;
    id: number;
    name: string;
    path: string;
  };
}
export interface CourierState {
  courierPrevious: CourierPrevious | null;
  setCourierState: CallableFunction;
  resetCourierState: CallableFunction;
}

export interface Problems {
  id: number;
  description: string;
  order_id: number;
}

export interface OrderEdit {
  orderId: number;
  product: string;
  recipientId?: number;
  courierId?: number;
}

export interface MatchParams {
  id: string;
}
