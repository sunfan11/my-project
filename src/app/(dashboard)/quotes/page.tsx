'use client'
import { useState, useMemo } from 'react'
import { PlusIcon, DocumentArrowDownIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { quotes, contracts } from '@/data/mock'
import { QuoteStatusCfg, ContractStatusCfg, fmt, cn } from '@/lib/utils'
import type { QuoteStatus } from '@/types'

const Q_TABS: { key: QuoteStatus | 'ALL'; label: string }[] = [
  { key: 'ALL',      label: '全部' },
  { key: 'DRAFT',    label: '草稿' },
  { key: 'SENT',     label: '已发送' },
  { key: 'ACCEPTED', label: '已接受' },
  { key: 'REJECTED', label: '已拒绝' },
]

export default function QuotesPage() {
  const [tab, setTab] = useState<'quotes' | 'contracts'>('quotes')
  const [qStatus, setQStatus] = useState<QuoteStatus | 'ALL'>('ALL')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredQuotes = useMemo(() =>
    quotes.filter(q => qStatus === 'ALL' || q.status === qStatus),
    [qStatus]
  )

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">报价 / 合同</h1>
          <p className="text-sm text-slate-400 mt-0.5">报价单 {quotes.length} 份 · 合同 {contracts.length} 份</p>
        </div>
        <button className="btn-primary"><PlusIcon className="w-4 h-4" /> 新建报价单</button>
      </div>

      {/* 主 Tab：报价单 / 合同 */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(['quotes', 'contracts'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-all',
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
            {t === 'quotes' ? '报价单' : '合同管理'}
          </button>
        ))}
      </div>

      {/* ── 报价单 ── */}
      {tab === 'quotes' && (
        <div className="space-y-4">
          {/* 状态筛选 */}
          <div className="flex flex-wrap gap-1.5">
            {Q_TABS.map(({ key, label }) => (
              <button key={key} onClick={() => setQStatus(key)}
                className={cn('px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all',
                  qStatus === key ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50')}>
                {label}
                <span className={cn('ml-1.5 text-xs px-1.5 py-0.5 rounded-md tabular-nums',
                  qStatus === key ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500')}>
                  {key === 'ALL' ? quotes.length : quotes.filter(q => q.status === key).length}
                </span>
              </button>
            ))}
          </div>

          {/* 报价单列表 */}
          <div className="space-y-3">
            {filteredQuotes.map(q => {
              const qs = QuoteStatusCfg[q.status]
              const expanded = expandedId === q.id
              return (
                <div key={q.id} className="card overflow-hidden">
                  {/* 头部 */}
                  <div className="flex flex-wrap items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-slate-700">{q.quoteNo}</span>
                        <span className={`badge ${qs.cls} border-transparent text-xs`}>{qs.label}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">
                        客户：<span className="text-slate-700 font-medium">{q.customerName}</span>
                        <span className="mx-2 text-slate-300">·</span>
                        负责：{q.userName}
                        <span className="mx-2 text-slate-300">·</span>
                        {q.createdAt}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-slate-900">{fmt(q.totalAmount)}</p>
                      <p className="text-xs text-slate-400">有效期 {q.validDays} 天</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="btn-ghost text-xs py-1.5">
                        <DocumentArrowDownIcon className="w-3.5 h-3.5" /> PDF
                      </button>
                      <button onClick={() => setExpandedId(expanded ? null : q.id)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
                        {expanded ? <ChevronUpIcon className="w-4 h-4" /> : <ChevronDownIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* 展开：产品明细 */}
                  {expanded && (
                    <div className="border-t border-slate-100">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="th">产品名称</th>
                            <th className="th text-right">数量</th>
                            <th className="th text-right">单价</th>
                            <th className="th text-right">折扣</th>
                            <th className="th text-right">小计</th>
                          </tr>
                        </thead>
                        <tbody>
                          {q.items.map(item => (
                            <tr key={item.id} className="border-b border-slate-100 last:border-0">
                              <td className="td font-medium text-slate-700">{item.name}</td>
                              <td className="td text-right text-slate-500">{item.quantity}</td>
                              <td className="td text-right text-slate-500">{fmt(item.unitPrice)}</td>
                              <td className="td text-right">
                                {item.discount < 1
                                  ? <span className="text-red-500 font-medium">{Math.round(item.discount * 10)}折</span>
                                  : <span className="text-slate-400">无折扣</span>}
                              </td>
                              <td className="td text-right font-semibold text-slate-800">{fmt(item.amount)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-blue-50">
                            <td colSpan={4} className="td text-right font-semibold text-slate-700">合计金额</td>
                            <td className="td text-right font-bold text-blue-700 text-base">{fmt(q.totalAmount)}</td>
                          </tr>
                        </tfoot>
                      </table>
                      {q.notes && (
                        <div className="px-4 pb-4">
                          <p className="text-xs text-slate-400 bg-slate-50 rounded-lg p-3">{q.notes}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ── 合同管理 ── */}
      {tab === 'contracts' && (
        <div className="space-y-3">
          {contracts.map(ct => {
            const cs = ContractStatusCfg[ct.status]
            return (
              <div key={ct.id} className="card-p flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-semibold text-slate-700">{ct.contractNo}</span>
                    <span className={`badge ${cs.cls} border-transparent text-xs`}>{cs.label}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">
                    客户：<span className="text-slate-700 font-medium">{ct.customerName}</span>
                    <span className="mx-2 text-slate-300">·</span>
                    负责：{ct.userName}
                    {ct.quoteNo && <><span className="mx-2 text-slate-300">·</span>来自 {ct.quoteNo}</>}
                  </p>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-400">
                    <span>签约：{ct.signedAt || '—'}</span>
                    <span>交付：{ct.deliveryAt || '—'}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-emerald-700">{fmt(ct.totalAmount)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn-ghost text-xs py-1.5">
                    <DocumentArrowDownIcon className="w-3.5 h-3.5" /> 下载合同
                  </button>
                </div>
              </div>
            )
          })}

          {/* 合同统计 */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            {[
              { label: '执行中', count: contracts.filter(c => c.status === 'ACTIVE').length, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: '已完成', count: contracts.filter(c => c.status === 'COMPLETED').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: '累计金额', count: fmt(contracts.reduce((s, c) => s + c.totalAmount, 0)), color: 'text-slate-900', bg: 'bg-slate-50' },
            ].map(s => (
              <div key={s.label} className={`${s.bg} rounded-2xl p-4 text-center`}>
                <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                <p className="text-xs text-slate-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
