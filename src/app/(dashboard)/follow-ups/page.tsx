'use client'
import { useState, useMemo } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import {
  FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { followUps, dashboardStats } from '@/data/mock'
import { MethodCfg, cn } from '@/lib/utils'
import type { FollowMethod } from '@/types'

const METHOD_TABS: { key: FollowMethod | 'ALL'; label: string }[] = [
  { key: 'ALL',    label: '全部方式' },
  { key: 'PHONE',  label: '📞 电话' },
  { key: 'WECHAT', label: '💬 微信' },
  { key: 'VISIT',  label: '🏠 上门' },
  { key: 'EMAIL',  label: '📧 邮件' },
]

const FUNNEL_COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981']

export default function FollowUpsPage() {
  const [method, setMethod] = useState<FollowMethod | 'ALL'>('ALL')

  const filtered = useMemo(() =>
    followUps.filter(f => method === 'ALL' || f.method === method),
    [method]
  )

  const funnelData = dashboardStats.funnel.map((f, i) => ({
    value: f.count,
    name: f.label,
    fill: FUNNEL_COLORS[i],
  }))

  return (
    <div className="space-y-5 max-w-[1300px]">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">跟进记录</h1>
          <p className="text-sm text-slate-400 mt-0.5">共 {followUps.length} 条跟进</p>
        </div>
        <button className="btn-primary"><PlusIcon className="w-4 h-4" /> 记录跟进</button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
        {/* 时间线 */}
        <div className="xl:col-span-2 space-y-4">
          {/* 方式 Tab */}
          <div className="flex flex-wrap gap-1.5">
            {METHOD_TABS.map(({ key, label }) => (
              <button key={key} onClick={() => setMethod(key)}
                className={cn(
                  'px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all',
                  method === key ? 'bg-blue-600 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                )}>
                {label}
              </button>
            ))}
          </div>

          {/* 时间线卡片 */}
          <div className="relative pl-6">
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-slate-200 to-slate-100" />
            <div className="space-y-4">
              {filtered.map(f => {
                const m = MethodCfg[f.method]
                return (
                  <div key={f.id} className="relative group">
                    {/* 时间轴节点 */}
                    <div className="absolute -left-4 w-5 h-5 rounded-full bg-white border-2 border-blue-400 flex items-center justify-center text-[10px] shadow-sm">
                      {m.icon}
                    </div>

                    <div className="card-p hover:shadow-md transition-all duration-200">
                      {/* 顶部信息栏 */}
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`badge ${m.cls} border-transparent text-xs`}>{m.label}</span>
                        <span className="font-semibold text-slate-800">{f.customerName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{f.userName}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{f.createdAt.slice(0, 10)}</span>
                      </div>

                      {/* 内容 */}
                      <p className="text-sm text-slate-700 leading-relaxed">{f.content}</p>

                      {/* 结果 */}
                      {f.result && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-start gap-2">
                          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap mt-0.5">跟进结果</span>
                          <p className="text-sm text-slate-600">{f.result}</p>
                        </div>
                      )}

                      {/* 下次跟进 */}
                      {f.nextFollowAt && (
                        <div className="mt-3 flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
                          <span className="text-amber-500 text-sm">⏰</span>
                          <span className="text-xs text-amber-700 font-medium">下次跟进：{f.nextFollowAt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
              {filtered.length === 0 && (
                <div className="text-center py-16 text-slate-400 text-sm">暂无跟进记录</div>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：漏斗图 + 统计 */}
        <div className="space-y-4">
          {/* 销售漏斗图 */}
          <div className="card-p">
            <h2 className="section-title mb-1">销售漏斗</h2>
            <p className="text-xs text-slate-400 mb-4">当前客户阶段分布</p>
            <ResponsiveContainer width="100%" height={240}>
              <FunnelChart>
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}
                  formatter={(v: number) => [v + ' 人', '客户数']}
                />
                <Funnel dataKey="value" data={funnelData} isAnimationActive>
                  {funnelData.map((_, i) => <Cell key={i} fill={FUNNEL_COLORS[i]} />)}
                  <LabelList position="center" fill="#fff" stroke="none"
                    fontSize={13} fontWeight={600}
                    formatter={(v: number, entry: { name: string }) => `${entry.name} ${v}`}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>

            {/* 漏斗转化率 */}
            <div className="mt-4 space-y-2 pt-4 border-t border-slate-100">
              {dashboardStats.funnel.map((f, i) => {
                const next = dashboardStats.funnel[i + 1]
                if (!next) return null
                const rate = Math.round((next.count / f.count) * 100)
                return (
                  <div key={f.status} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{f.label} → {next.label}</span>
                    <span className="font-semibold" style={{ color: FUNNEL_COLORS[i + 1] }}>{rate}%</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 跟进方式统计 */}
          <div className="card-p">
            <h2 className="section-title mb-4">跟进方式分布</h2>
            <div className="space-y-3">
              {(['PHONE','WECHAT','VISIT','EMAIL'] as FollowMethod[]).map(m => {
                const count = followUps.filter(f => f.method === m).length
                const pct = Math.round((count / followUps.length) * 100)
                const cfg = MethodCfg[m]
                return (
                  <div key={m}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-slate-600">{cfg.icon} {cfg.label}</span>
                      <span className="font-semibold text-slate-800">{count} 次</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full">
                      <div className="h-full bg-blue-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 即将跟进提醒 */}
          <div className="card-p">
            <h2 className="section-title mb-3">📅 近期跟进提醒</h2>
            <div className="space-y-2">
              {followUps.filter(f => f.nextFollowAt).slice(0, 4).map(f => (
                <div key={f.id} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl">
                  <span className="text-amber-500 text-sm mt-0.5">⏰</span>
                  <div>
                    <p className="text-sm font-medium text-slate-800">{f.customerName}</p>
                    <p className="text-xs text-amber-600">{f.nextFollowAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
