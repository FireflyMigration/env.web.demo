export interface Order {
  id?: number
  customerID?: string
  employeeID?: number
  orderDate?: string
  requiredDate?: string
  shippedDate?: string
  shipVia?: number
  freight?: number
  shipName?: string
  shipAddress?: string
  shipCity?: string
  shipRegion?: string
  shipPostalCode?: string
  shipCountry?: string
}

export const orderConfig: EntityConfig<Order> = {
  key: 'orders',
}
export type EntityConfig<T> = {
  key: string
}

