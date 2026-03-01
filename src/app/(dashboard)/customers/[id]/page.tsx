'use client'
import { use } from 'react'
import Link from 'next/link'
import { ArrowLeftIcon, PhoneIcon, EnvelopeIcon, MapPinIcon, PlusIcon } from '@heroicons/react/24/outline'
import { customers, followUps, quotes, contracts, tickets } from '@/data/mock'
import { CustomerStatusCfg, CategoryCfg, MethodCfg, QuoteStatusCfg, ContractStatusCfg, TicketStatusCfg, PriorityCfg, fmt } from '@/lib/utils'

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const c = customers.find(x => x.id === id)
  if (!c) return <div className="p-8 text-slate-400">客户不存在</div>

  const cFollowUps = followUps.filter(f => f.customerId === id)
  const cQuotes    = quotes.filter(q => q.customerId === id)
  const cContracts = contracts.filter(ct => ct.customerId === id)
  const cTickets   = tickets.filter(t => t.customerId === id)

  const status = CustomerStatusCfg[c.status]
  const cat    = CategoryCfg[c.category]

  const funnelSteps = ['INTENTION','NEGOTIATION','QUOTED','CLOSED'] as const
  const stepIdx = funnelSteps.indexOf(c.status)
  const funnelLabels = { INTENTION:'意向', NEGOTIATION:'洽谈', QUOTED:'报价', CLOSED:'成交' }

  return (
    <div className="space-y-5 max-w-[1200px]">
      {/* 返回 + 标题 */}
      <div className="flex items-center gap-4">
        <Link href="/customers" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 transition-all">
          <ArrowLeftIcon className="w-4 h-4 text-slate-500" />
        </Link>
        <div className="flex-1 flex flex-wrap items-center gap-3">
          <h1 className="page-title">{c.name}</h1>
          <span className={`badge ${status.cls}`}>{status.label}</span>
          <span className={`badge ${cat.cls} border-transparent`}>{cat.label}</span>
        </div>
        <button className="btn-ghost"><PlusIcon className="w-4 h-4" /> 新增跟进</button>
      </div>

      {/* 成交漏斗进度 */}
      <div className="card-p">
        <div className="flex items-center gap-2 overflow-x-auto">
          {funnelSteps.map((step, i) => {
            const done = i <= stepIdx
            const colors = ['bg-amber-400','bg-blue-400','bg-violet-400','bg-emerald-400']
            return (
              <div key={step} className="flex items-center gap-2 flex-shrink-0">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium ${done ? colors[i] + ' text-white' : 'bg-slate-100 text-slate-400'}`}>
                  <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs
                    border-white/60 font-bold">{i + 1}</span>
                  {funnelLabels[step]}
                </div>
                {i < 3 && <div className={`w-6 h-0.5 ${i < stepIdx ? 'bg-slate-300' : 'bg-slate-100'}`} />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 左侧：基本信息 */}
        <div className="space-y-4">
          <div className="card-p">
            <h2 className="section-title mb-4">基本信息</h2>
            <div className="flex flex-col items-center mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-blue-700 text-2xl font-bold">
                {c.name[0]}
              </div>
              <p className="mt-2 font-bold text-slate-900">{c.name}</p>
              <p className="text-xs text-slate-400">{c.source} · {c.assignee} 负责</p>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-slate-600">
                <PhoneIcon className="w-4 h-4 text-slate-400" />
                {c.phone}
              </div>
              {c.email && (
                <div className="flex items-center gap-2 text-slate-600">
                  <EnvelopeIcon className="w-4 h-4 text-slate-400" />
                  {c.email}
                </div>
              )}
              {c.address && (
                <div className="flex items-start gap-2 text-slate-600">
                  <MapPinIcon className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                  {c.address}
                </div>
              )}
            </div>
            {c.tags && c.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {c.tags.map(t => (
                  <span key={t} className="badge bg-slate-100 text-slate-600 border-slate-200">{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* 数据概览 */}
          <div className="card-p">
            <h2 className="section-title mb-3">数据概览</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: '跟进次数', value: cFollowUps.length, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: '报价单数', value: cQuotes.length, color: 'text-violet-600', bg: 'bg-violet-50' },
                { label: '合同数量', value: cContracts.length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: '工单数量', value: cTickets.length, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map(s => (
                <div key={s.label} className={`${s.bg} rounded-xl p-3 text-center`}>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            {cContracts.length > 0 && (
              <div className="mt-3 p-3 bg-emerald-50 rounded-xl text-center">
                <p className="text-xs text-emerald-600 font-medium">累计成交金额</p>
                <p className="text-xl font-bold text-emerald-700 mt-0.5">
                  {fmt(cContracts.reduce((s, ct) => s + ct.totalAmount, 0))}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 右侧：时间线 + 报价 + 工单 */}
        <div className="lg:col-span-2 space-y-5">
          {/* 跟进时间线 */}
          <div className="card-p">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">跟进记录时间线</h2>
              <button className="btn-ghost text-xs py-1.5">
                <PlusIcon className="w-3.5 h-3.5" /> 记录跟进
              </button>
            </div>
            {cFollowUps.length > 0 ? (
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-slate-100" />
                <div className="space-y-6">
                  {cFollowUps.map((f, i) => {
                    const m = MethodCfg[f.method]
                    return (
                      <div key={f.id} className="relative">
                        <div className="absolute -left-4 w-4 h-4 rounded-full border-2 border-white bg-blue-400 shadow-sm" />
                        <div className="bg-slate-50 rounded-2xl p-4">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`badge ${m.cls} border-transparent text-xs`}>{m.icon} {m.label}</span>
                            <span className="text-xs text-slate-400">{f.createdAt.slice(0, 10)}</span>
                            <span className="text-xs text-slate-400">· {f.userName}</span>
                          </div>
                          <p className="text-sm text-slate-700">{f.content}</p>
                          {f.result && (
                            <p className="text-sm text-slate-500 mt-2 pt-2 border-t border-slate-200">
                              <span className="font-medium text-slate-600">结果：</span>{f.result}
                            </p>
                          )}
                          {f.nextFollowAt && (
                            <p className="text-xs text-amber-600 mt-2 font-medium">
                              ⏰ 下次跟进：{f.nextFollowAt}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">暂无跟进记录</p>
            )}
          </div>

          {/* 报价单 */}
          {cQuotes.length > 0 && (
            <div className="card-p">
              <h2 className="section-title mb-4">报价单</h2>
              <div className="space-y-3">
                {cQuotes.map(q => {
                  const qs = QuoteStatusCfg[q.status]
                  return (
                    <div key={q.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{q.quoteNo}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{q.createdAt} · {q.items.length} 项产品</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{fmt(q.totalAmount)}</p>
                        <span className={`badge ${qs.cls} border-transparent text-xs`}>{qs.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 合同 */}
          {cContracts.length > 0 && (
            <div className="card-p">
              <h2 className="section-title mb-4">合同记录</h2>
              <div className="space-y-3">
                {cContracts.map(ct => {
                  const cs = ContractStatusCfg[ct.status]
                  return (
                    <div key={ct.id} className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{ct.contractNo}</p>
                        <p className="text-xs text-slate-400 mt-0.5">签约：{ct.signedAt || '—'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-700">{fmt(ct.totalAmount)}</p>
                        <span className={`badge ${cs.cls} border-transparent text-xs`}>{cs.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* 工单 */}
          {cTickets.length > 0 && (
            <div className="card-p">
              <h2 className="section-title mb-4">售后工单</h2>
              <div className="space-y-2">
                {cTickets.map(t => {
                  const ts = TicketStatusCfg[t.status]
                  const pt = PriorityCfg[t.priority]
                  return (
                    <div key={t.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-xl">
                      <div className="flex items-start gap-2">
                        <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${ts.dot}`} />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{t.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{t.ticketNo} · {t.createdAt.slice(0, 10)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0 ml-3">
                        <span className={`badge ${pt.cls} border-transparent text-xs`}>{pt.label}</span>
                        <span className={`badge ${ts.cls} border-transparent text-xs`}>{ts.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
