export interface ICustomer {
  avatar?: string;
  customerId: string;
  customerCode?: string;
  customerName?: string;
  phoneNumber?: string;
  address?: string;
  orderSuccessful?: number;
}

export interface ICustomerFilter {
  customerId?: string;
  customerCode?: string;
  customerName?: string;
  phoneNumber?: string;
  sortBy?: string;
  pageNumber?: number;
  pageSize?: number;
}
