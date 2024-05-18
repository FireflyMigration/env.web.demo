import { dataApiFor } from '../lib/env-web/data-api-for'

export interface Customer {
  id?: string
  companyName?: string
  contactName?: string
  contactTitle?: string
  address?: string
  city?: string
  region?: string
  postalCode?: string
  country?: string
  phone?: string
  fax?: string
}

export const customerApi = dataApiFor<Customer>('customers')
