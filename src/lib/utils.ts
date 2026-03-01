import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { CustomerStatus, CustomerCategory, FollowMethod, QuoteStatus, ContractStatus, TicketStatus, Priority } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fmt(amount: number) {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency', currency: 'CNY', minimumFractionDigits: 0,
  }).format(amount)
}

export const CustomerStatusCfg: Record<CustomerStatus, { label: string; cls: string }> = {
  INTENTION:   { label: '意向',   cls: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  NEGOTIATION: { label: '洽谈中', cls: 'bg-blue-100 text-blue-700 border-blue-200' },
  QUOTED:      { label: '已报价', cls: 'bg-purple-100 text-purple-700 border-purple-200' },
  CLOSED:      { label: '已成交', cls: 'bg-green-100 text-green-700 border-green-200' },
}

export const CategoryCfg: Record<CustomerCategory, { label: string; cls: string }> = {
  SMART_HOME:   { label: '智能家居', cls: 'bg-blue-50 text-blue-700' },
  JD_APPLIANCE: { label: 'JD家电',   cls: 'bg-emerald-50 text-emerald-700' },
}

export const MethodCfg: Record<FollowMethod, { label: string; icon: string; cls: string }> = {
  PHONE:  { label: '电话', icon: '📞', cls: 'bg-green-50 text-green-700' },
  WECHAT: { label: '微信', icon: '💬', cls: 'bg-emerald-50 text-emerald-700' },
  VISIT:  { label: '上门', icon: '🏠', cls: 'bg-orange-50 text-orange-700' },
  EMAIL:  { label: '邮件', icon: '📧', cls: 'bg-blue-50 text-blue-700' },
}

// 兼容旧引用
export const FollowMethodMap = MethodCfg

export const QuoteStatusCfg: Record<QuoteStatus, { label: string; cls: string }> = {
  DRAFT:    { label: '草稿',   cls: 'bg-gray-100 text-gray-600' },
  SENT:     { label: '已发送', cls: 'bg-blue-100 text-blue-700' },
  ACCEPTED: { label: '已接受', cls: 'bg-green-100 text-green-700' },
  REJECTED: { label: '已拒绝', cls: 'bg-red-100 text-red-700' },
  EXPIRED:  { label: '已过期', cls: 'bg-orange-100 text-orange-700' },
}

export const ContractStatusCfg: Record<ContractStatus, { label: string; cls: string }> = {
  ACTIVE:    { label: '执行中', cls: 'bg-blue-100 text-blue-700' },
  COMPLETED: { label: '已完成', cls: 'bg-green-100 text-green-700' },
  CANCELLED: { label: '已取消', cls: 'bg-red-100 text-red-700' },
}

export const TicketStatusCfg: Record<TicketStatus, { label: string; cls: string; dot: string }> = {
  PENDING:    { label: '待处理', cls: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  PROCESSING: { label: '处理中', cls: 'bg-blue-100 text-blue-700',    dot: 'bg-blue-400' },
  RESOLVED:   { label: '已完成', cls: 'bg-green-100 text-green-700',  dot: 'bg-green-400' },
  CLOSED:     { label: '已关闭', cls: 'bg-gray-100 text-gray-600',    dot: 'bg-gray-400' },
}

export const PriorityCfg: Record<Priority, { label: string; cls: string }> = {
  LOW:    { label: '低',   cls: 'bg-gray-100 text-gray-500' },
  NORMAL: { label: '普通', cls: 'bg-blue-100 text-blue-600' },
  HIGH:   { label: '高',   cls: 'bg-orange-100 text-orange-600' },
  URGENT: { label: '紧急', cls: 'bg-red-100 text-red-600' },
}
