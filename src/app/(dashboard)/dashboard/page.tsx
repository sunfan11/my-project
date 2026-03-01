'use client'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts'
import {
  UsersIcon, ChatBubbleLeftEllipsisIcon, TrophyIcon,
  WrenchScrewdriverIcon, CurrencyYenIcon, ArrowUpRightIcon,
  ClockIcon, CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { dashboardStats } from '@/data/mock'
import { fmt, FollowMethodMap } from '@/lib/utils'
import { followUps } from '@/data/mock'

const STAT_CARDS = [
  {
    label: '总客户数', value: dashboardStats.totalCustomers, sub: '+12 本月新增',
    icon: UsersIcon, color: 'from-blue-500 to-blue-600', light: 'bg-blue-50 text-blue-600',
  },
  {
    label: '今日跟进', value: dashboardStats.todayFollowUps, sub: '较昨日 +2',
    icon: ChatBubbleLeftEllipsisIcon, color: 'from-violet-500 to-violet-600', light: 'bg-violet-50 text-violet-600',
  },
  {
    label: '本月成交', value: dashboardStats.monthClosed, sub: '目标进度 93%',
    icon: TrophyIcon, color: 'from-emerald-500 to-emerald-600', light: 'bg-emerald-50 text-emerald-600',
  },
  {
    label: '本月营收', value: fmt(dashboardStats.monthRevenue), sub: '较上月 +24%',
    icon: CurrencyYenIcon, color: 'from-amber-500 to-amber-600', light: 'bg-amber-50 text-amber-600',
  },
]

const TODO_ICONS: Record<string, string> = {
  follow: '📞', visit: '🏠', quote: '📄', contract: '📋', ticket: '🔧',
}

export default function DashboardPage() {
  const { funnel, monthlySales, categoryPie, todos, ticketStats } = dashboardStats
  const maxFunnel = Math.max(...funnel.map(f => f.count))
  const funnelColors = ['#f59e0b', '#3b82f6', '#8b5cf6', '#10b981']

  const recentFollowUps = followUps.slice(0, 5)

  return (
    <div className="space-y-5 max-w-[1400px]">
      {/* ── 顶部标题 ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">数据看板</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          实时数据
        </span>
      </div>

      {/* ── 核心统计卡片 ── */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ label, value, sub, icon: Icon, color, light }) => (
          <div key={label} className="card-p group hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl ${light} flex items-center justify-center`}>
                <Icon className="w-5.5 h-5.5" />
              </div>
              <ArrowUpRightIcon className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-slate-900">{value}</p>
              <p className="text-sm text-slate-500 mt-0.5">{label}</p>
              <p className="text-xs text-emerald-600 mt-1 font-medium">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── 中间行：营收趋势 + 销售漏斗 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* 营收趋势 */}
        <div className="card-p lg:col-span-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="section-title">近 6 个月营收 & 成交趋势</h2>
            <select className="text-xs border border-slate-200 rounded-lg px-2 py-1 text-slate-500 bg-white focus:outline-none">
              <option>近半年</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlySales} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v / 10000).toFixed(0)}万`} />
              <Tooltip
                contentStyle={{ fontSize: 12, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                formatter={(v: number, name: string) => [name === '营收' ? fmt(v) : v + ' 单', name]}
              />
              <Area type="monotone" dataKey="营收" stroke="#3b82f6" strokeWidth={2.5} fill="url(#colorRev)" dot={false} />
              <Bar dataKey="成交数" fill="#e0e7ff" radius={[3, 3, 0, 0]} barSize={16} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 销售漏斗 */}
        <div className="card-p lg:col-span-2">
          <h2 className="section-title mb-5">销售漏斗</h2>
          <div className="space-y-4">
            {funnel.map((stage, i) => {
              const pct = Math.round((stage.count / maxFunnel) * 100)
              return (
                <div key={stage.status}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium text-slate-700">{stage.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 font-bold tabular-nums">{stage.count}</span>
                      <span className="text-xs text-slate-400">人</span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: funnelColors[i] }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* 客户分类饼图 */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <h3 className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">客户类型分布</h3>
            <div className="flex items-center gap-4">
              <PieChart width={80} height={80}>
                <Pie data={categoryPie} cx={35} cy={35} innerRadius={20} outerRadius={38} dataKey="value" paddingAngle={3}>
                  {categoryPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
              </PieChart>
              <div className="space-y-2">
                {categoryPie.map(c => (
                  <div key={c.name} className="flex items-center gap-2 text-sm">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: c.fill }} />
                    <span className="text-slate-600">{c.name}</span>
                    <span className="font-semibold text-slate-900 ml-auto pl-4">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 底部行：最近跟进 + 工单概览 + 待办 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* 最近跟进记录 */}
        <div className="card-p lg:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">最近跟进</h2>
            <a href="/follow-ups" className="text-xs text-blue-600 hover:underline">全部</a>
          </div>
          <div className="space-y-3">
            {recentFollowUps.map(f => {
              const m = FollowMethodMap[f.method as keyof typeof FollowMethodMap]
              return (
                <div key={f.id} className="flex gap-3 items-start">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm flex-shrink-0">
                    {m?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-slate-800">{f.customerName}</span>
                      <span className="text-xs text-slate-400">{m?.label}</span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{f.content}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{f.userName} · {f.createdAt.slice(0, 10)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 工单概览 */}
        <div className="card-p">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">工单概览</h2>
            <a href="/tickets" className="text-xs text-blue-600 hover:underline">查看看板</a>
          </div>
          <div className="space-y-3">
            {[
              { label: '待处理', count: ticketStats.pending, color: 'bg-amber-400', textColor: 'text-amber-700', bg: 'bg-amber-50' },
              { label: '处理中', count: ticketStats.processing, color: 'bg-blue-400', textColor: 'text-blue-700', bg: 'bg-blue-50' },
              { label: '已完成', count: ticketStats.resolved, color: 'bg-emerald-400', textColor: 'text-emerald-700', bg: 'bg-emerald-50' },
            ].map(item => (
              <div key={item.label} className={`flex items-center justify-between p-3 ${item.bg} rounded-xl`}>
                <div className="flex items-center gap-2.5">
                  <WrenchScrewdriverIcon className={`w-4 h-4 ${item.textColor}`} />
                  <span className={`text-sm font-medium ${item.textColor}`}>{item.label}</span>
                </div>
                <span className={`text-2xl font-bold ${item.textColor}`}>{item.count}</span>
              </div>
            ))}
          </div>

          {/* 满意度 */}
          <div className="mt-4 p-3 bg-slate-50 rounded-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">客户满意度</span>
              <span className="text-sm font-bold text-emerald-600">4.6 ⭐</span>
            </div>
            <div className="mt-2 h-2 bg-slate-200 rounded-full">
              <div className="h-full w-[92%] bg-emerald-400 rounded-full" />
            </div>
            <p className="text-xs text-slate-400 mt-1">基于 23 条评价</p>
          </div>
        </div>

        {/* 今日待办 */}
        <div className="card-p">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">今日待办</h2>
            <span className="badge bg-blue-100 text-blue-700 border-blue-200">{todos.length} 项</span>
          </div>
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group cursor-pointer">
                <span className="text-base mt-0.5 flex-shrink-0">{TODO_ICONS[todo.type]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-700 font-medium truncate group-hover:text-blue-600 transition-colors">
                    {todo.text}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ClockIcon className="w-3 h-3 text-slate-400" />
                    <p className="text-xs text-slate-400">{todo.time}</p>
                  </div>
                </div>
                <CheckCircleIcon className="w-4 h-4 text-slate-200 group-hover:text-emerald-400 transition-colors flex-shrink-0 mt-0.5" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
