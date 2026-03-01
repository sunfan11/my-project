export type CustomerCategory = 'SMART_HOME' | 'JD_APPLIANCE'
export type CustomerStatus = 'INTENTION' | 'NEGOTIATION' | 'QUOTED' | 'CLOSED'
export type FollowMethod = 'PHONE' | 'WECHAT' | 'VISIT' | 'EMAIL'
export type QuoteStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
export type ContractStatus = 'ACTIVE' | 'COMPLETED' | 'CANCELLED'
export type TicketStatus = 'PENDING' | 'PROCESSING' | 'RESOLVED' | 'CLOSED'
export type Priority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT'
export type StockType = 'IN' | 'OUT'

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  category: CustomerCategory
  status: CustomerStatus
  source: string
  assignee: string
  notes?: string
  createdAt: string
  updatedAt: string
  tags?: string[]
}

export interface FollowUp {
  id: string
  customerId: string
  customerName: string
  userId: string
  userName: string
  method: FollowMethod
  content: string
  result?: string
  nextFollowAt?: string
  createdAt: string
}

export interface Product {
  id: string
  name: string
  sku: string
  category: string
  price: number
  stock: number
  minStock: number
  unit: string
}

export interface StockRecord {
  id: string
  productId: string
  productName: string
  type: StockType
  quantity: number
  note?: string
  operator: string
  createdAt: string
}

export interface QuoteItem {
  id: string
  name: string
  quantity: number
  unitPrice: number
  discount: number
  amount: number
}

export interface Quote {
  id: string
  quoteNo: string
  customerId: string
  customerName: string
  userName: string
  status: QuoteStatus
  totalAmount: number
  validDays: number
  items: QuoteItem[]
  notes?: string
  createdAt: string
}

export interface Contract {
  id: string
  contractNo: string
  customerId: string
  customerName: string
  userName: string
  quoteNo?: string
  status: ContractStatus
  totalAmount: number
  signedAt?: string
  deliveryAt?: string
  createdAt: string
}

export interface Ticket {
  id: string
  ticketNo: string
  customerId: string
  customerName: string
  creatorName: string
  assigneeName?: string
  title: string
  description: string
  status: TicketStatus
  priority: Priority
  satisfaction?: number
  resolvedAt?: string
  createdAt: string
  updatedAt: string
}
