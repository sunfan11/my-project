'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, PlusIcon, FunnelIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { customers } from '@/data/mock'
import { CustomerStatusCfg, CategoryCfg, cn } from '@/lib/utils'
import type { CustomerCategory, CustomerStatus } from '@/types'

const STATUS_TABS: { key: CustomerStatus | 'ALL'; label: string }[] = [
  { key: 'ALL',         label: '全部' },
  { key: 'INTENTION',   label: '意向' },
  { key: 'NEGOTIATION', label: '洽谈中' },
  { key: 'QUOTED',      label: '已报价' },
  { key: 'CLOSED',      label: '已成交' },
]

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [statusTab, setStatusTab] = useState<CustomerStatus | 'ALL'>('ALL')
  const [category, setCategory] = useState<CustomerCategory | 'ALL'>('ALL')

  const filtered = useMemo(() => customers.filter(c => {
    const matchSearch = !search ||
      c.name.includes(search) ||
      c.phone.includes(search) ||
      (c.email?.includes(search))
    const matchStatus = statusTab === 'ALL' || c.status === statusTab
    const matchCat = category === 'ALL' || c.category === category
    return matchSearch && matchStatus && matchCat
  }), [search, statusTab, category])

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* 标题栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">客户管理</h1>
          <p className="text-sm text-slate-400 mt-0.5">共 {customers.length} 位客户</p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="w-4 h-4" /> 新增客户
        </button>
      </div>

      {/* 筛选工具栏 */}
      <div className="card-p space-y-4">
        {/* 状态 Tab */}
        <div className="flex items-center gap-1 flex-wrap">
          {STATUS_TABS.map(({ key, label }) => {
            const count = key === 'ALL' ? customers.length : customers.filter(c => c.status === key).length
            return (
              <button key={key} onClick={() => setStatusTab(key)}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all',
                  statusTab === key
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-500 hover:bg-slate-100'
                )}>
                {label}
                <span className={cn('text-xs px-1.5 py-0.5 rounded-md tabular-nums',
                  statusTab === key ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500')}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* 搜索 & 类型筛选 */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input className="input pl-9" placeholder="搜索姓名、手机号、邮箱..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-4 h-4 text-slate-400" />
            <select className="input w-auto pr-8" value={category}
              onChange={e => setCategory(e.target.value as CustomerCategory | 'ALL')}>
              <option value="ALL">全部类型</option>
              <option value="SMART_HOME">智能家居</option>
              <option value="JD_APPLIANCE">JD家电</option>
            </select>
          </div>
        </div>
      </div>

      {/* 客户表格 */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="th">客户信息</th>
                <th className="th">联系方式</th>
                <th className="th">类型</th>
                <th className="th">状态</th>
                <th className="th">来源</th>
                <th className="th">负责人</th>
                <th className="th">标签</th>
                <th className="th">操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => {
                const status = CustomerStatusCfg[c.status]
                const cat = CategoryCfg[c.category]
                return (
                  <tr key={c.id} className="tr">
                    <td className="td">
                      <Link href={`/customers/${c.id}`} className="flex items-center gap-3 group">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                          {c.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">{c.name}</p>
                          <p className="text-xs text-slate-400">{c.address?.slice(0, 14) || '—'}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <PhoneIcon className="w-3.5 h-3.5 text-slate-400" />
                        {c.phone}
                      </div>
                      {c.email && <p className="text-xs text-slate-400 mt-0.5">{c.email}</p>}
                    </td>
                    <td className="td">
                      <span className={`badge ${cat.cls} border-transparent`}>{cat.label}</span>
                    </td>
                    <td className="td">
                      <span className={`badge ${status.cls}`}>{status.label}</span>
                    </td>
                    <td className="td text-slate-500">{c.source}</td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                          {c.assignee[0]}
                        </div>
                        <span className="text-slate-600">{c.assignee}</span>
                      </div>
                    </td>
                    <td className="td">
                      <div className="flex flex-wrap gap-1">
                        {c.tags?.map(t => (
                          <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">{t}</span>
                        ))}
                      </div>
                    </td>
                    <td className="td">
                      <div className="flex items-center gap-2">
                        <Link href={`/customers/${c.id}`}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium">详情</Link>
                        <span className="text-slate-200">|</span>
                        <button className="text-xs text-slate-500 hover:text-slate-700">编辑</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-sm text-slate-400">暂无符合条件的客户</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 text-sm text-slate-500">
          <span>共 {filtered.length} 条记录</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3].map(p => (
              <button key={p} className={cn('w-8 h-8 rounded-lg text-sm font-medium',
                p === 1 ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600')}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
