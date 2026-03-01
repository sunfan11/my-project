'use client'
import { useState } from 'react'
import { PlusIcon, UserCircleIcon, StarIcon } from '@heroicons/react/24/outline'
import { tickets } from '@/data/mock'
import { TicketStatusCfg, PriorityCfg, cn } from '@/lib/utils'
import type { TicketStatus, Ticket } from '@/types'

const COLUMNS: { status: TicketStatus; label: string; headerColor: string; countColor: string }[] = [
  { status: 'PENDING',    label: '待处理', headerColor: 'border-amber-400',  countColor: 'bg-amber-100 text-amber-700' },
  { status: 'PROCESSING', label: '处理中', headerColor: 'border-blue-400',   countColor: 'bg-blue-100 text-blue-700' },
  { status: 'RESOLVED',   label: '已完成', headerColor: 'border-emerald-400', countColor: 'bg-emerald-100 text-emerald-700' },
  { status: 'CLOSED',     label: '已关闭', headerColor: 'border-slate-300',   countColor: 'bg-slate-100 text-slate-500' },
]

function TicketCard({ t }: { t: Ticket }) {
  const pt = PriorityCfg[t.priority]
  const ts = TicketStatusCfg[t.status]
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
      {/* 优先级 + 工单号 */}
      <div className="flex items-center justify-between mb-2">
        <span className={`badge ${pt.cls} border-transparent text-xs`}>{pt.label}</span>
        <span className="text-xs text-slate-400 font-mono">{t.ticketNo}</span>
      </div>

      {/* 标题 */}
      <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-700 transition-colors leading-snug">
        {t.title}
      </p>

      {/* 描述 */}
      <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">{t.description}</p>

      {/* 客户 */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-700">
          {t.customerName[0]}
        </div>
        <span className="text-xs text-slate-600 font-medium">{t.customerName}</span>
      </div>

      {/* 底部 */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {t.assigneeName ? (
            <>
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                {t.assigneeName[0]}
              </div>
              <span className="text-xs text-slate-500">{t.assigneeName}</span>
            </>
          ) : (
            <span className="flex items-center gap-1 text-xs text-red-400">
              <UserCircleIcon className="w-3.5 h-3.5" /> 未指派
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {t.satisfaction && (
            <span className="flex items-center gap-0.5 text-xs text-amber-500">
              <StarIcon className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              {t.satisfaction}.0
            </span>
          )}
          <span className="text-xs text-slate-400">{t.createdAt.slice(5)}</span>
        </div>
      </div>
    </div>
  )
}

export default function TicketsPage() {
  const [filterPriority, setFilterPriority] = useState<string>('ALL')

  const filtered = tickets.filter(t =>
    filterPriority === 'ALL' || t.priority === filterPriority
  )

  const totalByStatus = (status: TicketStatus) => tickets.filter(t => t.status === status).length

  return (
    <div className="space-y-5">
      {/* 标题 */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="page-title">售后工单</h1>
          <p className="text-sm text-slate-400 mt-0.5">共 {tickets.length} 张工单</p>
        </div>
        <div className="flex items-center gap-3">
          {/* 优先级筛选 */}
          <select className="input w-auto pr-8 text-sm" value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}>
            <option value="ALL">全部优先级</option>
            <option value="URGENT">紧急</option>
            <option value="HIGH">高</option>
            <option value="NORMAL">普通</option>
            <option value="LOW">低</option>
          </select>
          <button className="btn-primary"><PlusIcon className="w-4 h-4" /> 新建工单</button>
        </div>
      </div>

      {/* 统计条 */}
      <div className="grid grid-cols-4 gap-3">
        {COLUMNS.map(col => {
          const count = totalByStatus(col.status)
          return (
            <div key={col.status} className="card-p text-center">
              <p className={`text-2xl font-bold ${TicketStatusCfg[col.status].cls.split(' ')[1]}`}>{count}</p>
              <p className="text-xs text-slate-500 mt-0.5">{col.label}</p>
            </div>
          )
        })}
      </div>

      {/* 看板 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 items-start">
        {COLUMNS.map(col => {
          const colTickets = filtered.filter(t => t.status === col.status)
          return (
            <div key={col.status} className="flex flex-col gap-3">
              {/* 列标题 */}
              <div className={`flex items-center justify-between px-4 py-2.5 bg-white rounded-xl border-l-4 ${col.headerColor} border border-slate-200 shadow-sm`}>
                <span className="text-sm font-semibold text-slate-700">{col.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${col.countColor}`}>
                  {colTickets.length}
                </span>
              </div>

              {/* 工单卡片 */}
              <div className="space-y-3 min-h-[100px]">
                {colTickets.map(t => <TicketCard key={t.id} t={t} />)}
                {colTickets.length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-300 border-2 border-dashed border-slate-200 rounded-xl">
                    暂无工单
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 满意度分析 */}
      <div className="card-p">
        <h2 className="section-title mb-4">客户满意度分析</h2>
        <div className="flex flex-wrap gap-6">
          {[5,4,3,2,1].map(star => {
            const count = tickets.filter(t => t.satisfaction === star).length
            const total = tickets.filter(t => t.satisfaction).length
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            return (
              <div key={star} className="flex items-center gap-3 min-w-[200px] flex-1">
                <span className="text-sm text-amber-500 flex items-center gap-0.5 w-10 flex-shrink-0">
                  {star} <StarIcon className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                </span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full">
                  <div className="h-full bg-amber-400 rounded-full transition-all"
                    style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-slate-500 w-8 text-right">{count} 条</span>
              </div>
            )
          })}
          <div className="flex flex-col items-center justify-center px-6 border-l border-slate-100">
            <p className="text-3xl font-bold text-amber-500">4.5</p>
            <p className="text-xs text-slate-400 mt-1">综合满意度</p>
          </div>
        </div>
      </div>
    </div>
  )
}
