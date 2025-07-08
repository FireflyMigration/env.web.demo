import { dataApiFor } from '../lib/data-api-for';

export interface Customer {
  id?: string;
  companyName?: string;
  contactName?: string;
  contactTitle?: string;
  address?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  fax?: string;
}

export const customersApi = dataApiFor<Customer>('customers');
