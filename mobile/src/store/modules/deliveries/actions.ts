import { Orders } from '~/types';

export function deliveriesRequest(
  id: string,
  status: string,
  page?: number,
): { type: string; payload: { id: string; status: string; page?: number } } {
  return {
    type: '@orders/DELIVERIES_REQUEST',
    payload: {
      id,
      status,
      page: page || undefined,
    },
  };
}
export function deliveriesSuccess(
  docs: Orders[],
  total: string,
  pages: string,
): {
  type: string;
  payload: { deliveries: Orders[]; total: string; totalPages: string };
} {
  return {
    type: '@orders/DELIVERIES_SUCCESS',
    payload: {
      deliveries: docs,
      totalPages: pages,
      total,
    },
  };
}
export function deliveriesFailure(): { type: string } {
  return {
    type: '@orders/DELIVERIES_FAILURE',
  };
}
