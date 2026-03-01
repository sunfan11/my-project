'use client'
import { useState, useMemo } from 'react'
import { PlusIcon, MagnifyingGlassIcon, ExclamationTriangleIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { products, stockRecords } from '@/data/mock'
import { fmt, cn } from '@/lib/utils'

type StockFilter = 'ALL' | 'LOW' | 'OUT'

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('ALL')
  const [stockFilter, setStockFilter] = useState<StockFilter>('ALL')
  const [tab, setTab] = useState<'products' | 'records'>('products')

  const categories = ['ALL', ...Array.from(new Set(products.map(p => p.category)))]

  const filtered = useMemo(() => products.filter(p => {
    const matchSearch = !search || p.name.includes(search) || p.sku.includes(search)
    const matchCat = category === 'ALL' || p.category === category
    const matchStock =
      stockFilter === 'ALL' ? true :
      stockFilter === 'OUT' ? p.stock === 0 :
      p.stock <= p.minStock
    return matchSearch && matchCat && matchStock
  }), [search, category, stockFilter])

  const lowStockCount = products.filter(p => p.stock <= p.minStock && p.stock > 0).length
  const outStockCount = products.filter(p => p.stock === 0).length
  const totalValue = products.reduce((s, p) => s + p.price * p.stock, 0)

  // 图表数据
  const chartData = products
    .sort((a, b) => b.stock - a.stock)
    .slice(0, 8)
    .map(p => ({
      name: p.name.slice(0, 8),
      stock: p.stock,
      min: p.minStock,
      fill: p.stock === 0 ? '#ef4444' : p.stock <= p.minStock ? '#f59e0b' : '#3b82f6',
    }))

  const getStockStatus = (p: typeof products[0]) => {
    if (p.stock === 0) return { label: '已缺货', cls: 'bg-red-100 text-red-700' }
    if (p.stock <= p.minStock) return { label: '库存低', cls: 'bg-amber-100 text-amber-700' }
    return { label: '正常', cls: 'bg-emerald-100 text-emerald-700' }
  }

  return (
    <div className="space-y-5 max-w-[1300px]">
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">库存管理</h1>
          <p className="text-sm text-slate-400 mt-0.5">共 {products.length} 种产品</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-ghost"><ArrowDownIcon className="w-4 h-4 text-green-600" /> 入库</button>
          <button className="btn-ghost"><ArrowUpIcon className="w-4 h-4 text-red-500" /> 出库</button>
          <button className="btn-primary"><PlusIcon className="w-4 h-4" /> 新增产品</button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '产品种类', value: products.length, unit: '种', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '库存预警', value: lowStockCount, unit: '种', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '缺货产品', value: outStockCount, unit: '种', color: 'text-red-600', bg: 'bg-red-50' },
          { label: '库存总价值', value: fmt(totalValue), unit: '', color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map(s => (
          <div key={s.label} className={`${s.bg} rounded-2xl p-4`}>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}{s.unit && <span className="text-sm ml-0.5">{s.unit}</span>}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* 预警 Banner */}
      {(lowStockCount > 0 || outStockCount > 0) && (
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
          <ExclamationTriangleIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-800">库存预警</p>
            <p className="text-sm text-amber-700 mt-0.5">
              当前有 <span className="font-bold">{outStockCount}</span> 种产品已缺货，
              <span className="font-bold">{lowStockCount}</span> 种产品库存低于预警线，请及时补货。
            </p>
          </div>
        </div>
      )}

      {/* Tab */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl w-fit">
        {(['products', 'records'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={cn('px-5 py-2 rounded-lg text-sm font-medium transition-all',
              tab === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700')}>
            {t === 'products' ? '产品库' : '出入库记录'}
          </button>
        ))}
      </div>

      {/* ── 产品库 ── */}
      {tab === 'products' && (
        <div className="space-y-4">
          {/* 图表 */}
          <div className="card-p">
            <h2 className="section-title mb-4">库存数量一览</h2>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 10, border: '1px solid #e2e8f0' }}
                  formatter={(v: number) => [v + ' 件', '库存']}
                />
                <Bar dataKey="stock" radius={[4, 4, 0, 0]} barSize={28}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 筛选 */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input className="input pl-9" placeholder="搜索产品名称或 SKU..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="input w-auto pr-8" value={category} onChange={e => setCategory(e.target.value)}>
              {categories.map(c => <option key={c} value={c}>{c === 'ALL' ? '全部分类' : c}</option>)}
            </select>
            <div className="flex gap-1.5">
              {([['ALL','全部'],['LOW','预警'],['OUT','缺货']] as const).map(([k, l]) => (
                <button key={k} onClick={() => setStockFilter(k)}
                  className={cn('px-3 py-1.5 rounded-xl text-sm font-medium transition-all',
                    stockFilter === k ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50')}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* 产品表格 */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="th">产品信息</th>
                    <th className="th">SKU</th>
                    <th className="th">分类</th>
                    <th className="th text-right">单价</th>
                    <th className="th text-right">库存</th>
                    <th className="th text-right">预警线</th>
                    <th className="th text-right">库存价值</th>
                    <th className="th text-center">状态</th>
                    <th className="th">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => {
                    const st = getStockStatus(p)
                    const isLow = p.stock <= p.minStock
                    return (
                      <tr key={p.id} className={cn('tr', isLow && p.stock > 0 && 'bg-amber-50/50', p.stock === 0 && 'bg-red-50/50')}>
                        <td className="td font-medium text-slate-800">{p.name}</td>
                        <td className="td"><code className="text-xs bg-slate-100 px-2 py-0.5 rounded">{p.sku}</code></td>
                        <td className="td text-slate-500 text-xs">{p.category}</td>
                        <td className="td text-right font-medium">{fmt(p.price)}</td>
                        <td className={cn('td text-right font-bold tabular-nums',
                          p.stock === 0 ? 'text-red-600' : p.stock <= p.minStock ? 'text-amber-600' : 'text-slate-800')}>
                          {p.stock} {p.unit}
                        </td>
                        <td className="td text-right text-slate-400 text-xs">{p.minStock}</td>
                        <td className="td text-right text-emerald-700 font-medium">{fmt(p.price * p.stock)}</td>
                        <td className="td text-center">
                          <span className={`badge ${st.cls} border-transparent text-xs`}>{st.label}</span>
                        </td>
                        <td className="td">
                          <div className="flex items-center gap-2 text-xs">
                            <button className="text-green-600 hover:text-green-700 font-medium">入库</button>
                            <span className="text-slate-200">|</span>
                            <button className="text-red-500 hover:text-red-600 font-medium">出库</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── 出入库记录 ── */}
      {tab === 'records' && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="th">产品</th>
                  <th className="th text-center">类型</th>
                  <th className="th text-right">数量</th>
                  <th className="th">备注</th>
                  <th className="th">操作人</th>
                  <th className="th">时间</th>
                </tr>
              </thead>
              <tbody>
                {stockRecords.map(r => (
                  <tr key={r.id} className="tr">
                    <td className="td font-medium text-slate-800">{r.productName}</td>
                    <td className="td text-center">
                      <span className={cn('badge border-transparent text-xs',
                        r.type === 'IN' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')}>
                        {r.type === 'IN' ? '▲ 入库' : '▼ 出库'}
                      </span>
                    </td>
                    <td className={cn('td text-right font-bold tabular-nums',
                      r.type === 'IN' ? 'text-green-600' : 'text-red-500')}>
                      {r.type === 'IN' ? '+' : '-'}{r.quantity}
                    </td>
                    <td className="td text-slate-500 text-xs">{r.note || '—'}</td>
                    <td className="td text-slate-600">{r.operator}</td>
                    <td className="td text-slate-400 text-xs">{r.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
