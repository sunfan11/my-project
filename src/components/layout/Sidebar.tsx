'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Squares2X2Icon,
  UsersIcon,
  ChatBubbleLeftEllipsisIcon,
  DocumentCurrencyYenIcon,
  ClipboardDocumentListIcon,
  WrenchScrewdriverIcon,
  ArchiveBoxIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

const nav = [
  { href: '/dashboard',  label: '数据看板', icon: Squares2X2Icon },
  { href: '/customers',  label: '客户管理', icon: UsersIcon },
  { href: '/follow-ups', label: '跟进记录', icon: ChatBubbleLeftEllipsisIcon },
  { href: '/quotes',     label: '报价 / 合同', icon: DocumentCurrencyYenIcon },
  { href: '/tickets',    label: '售后工单', icon: WrenchScrewdriverIcon },
  { href: '/inventory',  label: '库存管理', icon: ArchiveBoxIcon },
]

function NavLinks({ onClick }: { onClick?: () => void }) {
  const path = usePathname()
  return (
    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = path === href || (href !== '/dashboard' && path.startsWith(href))
        return (
          <Link key={href} href={href} onClick={onClick}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
              active
                ? 'bg-blue-600 text-white shadow-sm shadow-blue-300'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
            )}>
            <Icon className="w-[18px] h-[18px] flex-shrink-0" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

function Brand() {
  return (
    <div className="flex items-center gap-3 px-5 h-16 border-b border-slate-100 flex-shrink-0">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
        <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-bold text-slate-900 leading-none">智慧家居 CRM</p>
        <p className="text-[11px] text-slate-400 mt-0.5">Enterprise Edition</p>
      </div>
    </div>
  )
}

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* 桌面端 */}
      <aside className="hidden lg:flex flex-col w-56 bg-white border-r border-slate-200 h-screen sticky top-0 flex-shrink-0">
        <Brand />
        <NavLinks />
        <div className="px-5 py-4 border-t border-slate-100">
          <p className="text-xs text-slate-400">© 2024 智慧家居科技</p>
        </div>
      </aside>

      {/* 移动端抽屉 */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <aside className="relative w-60 bg-white h-full shadow-2xl flex flex-col">
            <Brand />
            <NavLinks onClick={onClose} />
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100">
              <XMarkIcon className="w-5 h-5 text-slate-500" />
            </button>
          </aside>
        </div>
      )}
    </>
  )
}
