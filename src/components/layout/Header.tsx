'use client'
import { useState } from 'react'
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Header({ onMenu }: { onMenu: () => void }) {
  const [show, setShow] = useState(false)

  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center gap-3 px-4 sticky top-0 z-40 flex-shrink-0">
      <button onClick={onMenu} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-100">
        <Bars3Icon className="w-5 h-5 text-slate-600" />
      </button>

      {/* 搜索框 */}
      <div className="hidden sm:flex items-center gap-2 flex-1 max-w-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-400">
        <MagnifyingGlassIcon className="w-4 h-4 flex-shrink-0" />
        <span>搜索客户、工单...</span>
      </div>

      <div className="flex-1" />

      {/* 通知 */}
      <button className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-500">
        <BellIcon className="w-5 h-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
      </button>

      {/* 用户 */}
      <div className="relative">
        <button onClick={() => setShow(v => !v)}
          className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
            管
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-slate-800 leading-none">系统管理员</p>
            <p className="text-xs text-slate-400 mt-0.5">Admin</p>
          </div>
          <ChevronDownIcon className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
        </button>

        {show && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShow(false)} />
            <div className="absolute right-0 top-11 z-20 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800">系统管理员</p>
                <p className="text-xs text-slate-400">admin@smarthome.com</p>
              </div>
              <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                退出登录
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
