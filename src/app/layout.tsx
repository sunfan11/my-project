import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '智慧家居 CRM',
  description: '智能家居公司客户关系管理系统',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
