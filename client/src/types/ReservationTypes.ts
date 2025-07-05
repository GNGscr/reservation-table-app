export type LimitType = 10 | 20 | 50;

export type SortOrderType = 'asc' | 'desc';

export type SortByType = '' | 'reservation_uuid' | 'number_of_active_purchases' | 'sum_of_active_charges';

export type ProductType = {
  name: string;
  status: boolean;
  charge: number;
};

export type ReservationType = {
  reservation_uuid: string;
  number_of_active_purchases: number;
  sum_of_active_charges: number;
  products: ProductType[];
};