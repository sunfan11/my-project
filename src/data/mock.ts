import type {
  Customer, FollowUp, Product, StockRecord,
  Quote, Contract, Ticket
} from '@/types'

// ── 客户数据 ──────────────────────────────────────────────
export const customers: Customer[] = [
  {
    id: 'c001', name: '王建国', phone: '13512345678', email: 'wangjg@mail.com',
    address: '上海市浦东新区张江路88号', category: 'SMART_HOME', status: 'CLOSED',
    source: '朋友推荐', assignee: '张伟', tags: ['高意向', 'VIP'],
    createdAt: '2024-01-10', updatedAt: '2024-03-15',
  },
  {
    id: 'c002', name: '陈美丽', phone: '13698765432', email: 'chenmeil@mail.com',
    address: '上海市徐汇区漕河泾开发区', category: 'SMART_HOME', status: 'NEGOTIATION',
    source: '网络广告', assignee: '张伟', tags: ['中意向'],
    createdAt: '2024-02-01', updatedAt: '2024-03-10',
  },
  {
    id: 'c003', name: '刘大明', phone: '13811112222', email: 'liudm@mail.com',
    address: '北京市朝阳区国贸中心', category: 'JD_APPLIANCE', status: 'QUOTED',
    source: 'JD渠道', assignee: '李娜', tags: ['JD合作'],
    createdAt: '2024-02-15', updatedAt: '2024-03-12',
  },
  {
    id: 'c004', name: '赵雷', phone: '13933334444',
    address: '深圳市南山区科技园', category: 'SMART_HOME', status: 'INTENTION',
    source: '展会', assignee: '李娜',
    createdAt: '2024-03-01', updatedAt: '2024-03-18',
  },
  {
    id: 'c005', name: '孙晓燕', phone: '13766667777', email: 'sunxy@mail.com',
    address: '广州市天河区珠江新城', category: 'SMART_HOME', status: 'CLOSED',
    source: '老客转介', assignee: '张伟', tags: ['VIP', '已安装'],
    createdAt: '2024-01-20', updatedAt: '2024-02-28',
  },
  {
    id: 'c006', name: '周鑫', phone: '13988889999', email: 'zhoux@mail.com',
    address: '杭州市余杭区未来科技城', category: 'JD_APPLIANCE', status: 'NEGOTIATION',
    source: 'JD渠道', assignee: '王芳',
    createdAt: '2024-03-05', updatedAt: '2024-03-19',
  },
  {
    id: 'c007', name: '吴丽华', phone: '13100001111', email: 'wulh@mail.com',
    address: '苏州市工业园区', category: 'SMART_HOME', status: 'QUOTED',
    source: '网络广告', assignee: '王芳', tags: ['高意向'],
    createdAt: '2024-02-20', updatedAt: '2024-03-14',
  },
  {
    id: 'c008', name: '郑强', phone: '13200002222',
    address: '成都市高新区天府大道', category: 'SMART_HOME', status: 'INTENTION',
    source: '展会', assignee: '李娜',
    createdAt: '2024-03-10', updatedAt: '2024-03-20',
  },
]

// ── 跟进记录 ──────────────────────────────────────────────
export const followUps: FollowUp[] = [
  {
    id: 'f001', customerId: 'c001', customerName: '王建国',
    userId: 'u001', userName: '张伟', method: 'PHONE',
    content: '初次联系，客户对全屋智能方案感兴趣，计划新装修房子使用',
    result: '约定下周上门看房', nextFollowAt: '2024-01-18',
    createdAt: '2024-01-10T09:30:00',
  },
  {
    id: 'f002', customerId: 'c001', customerName: '王建国',
    userId: 'u001', userName: '张伟', method: 'VISIT',
    content: '上门勘察，三室两厅，约180平，给出初步智能家居规划方案',
    result: '客户非常满意，要求出详细报价单', nextFollowAt: '2024-01-25',
    createdAt: '2024-01-18T14:00:00',
  },
  {
    id: 'f003', customerId: 'c001', customerName: '王建国',
    userId: 'u001', userName: '张伟', method: 'WECHAT',
    content: '发送报价单，客户对部分产品有疑问，在微信上详细解答',
    result: '客户表示需要家人商量', nextFollowAt: '2024-02-01',
    createdAt: '2024-01-26T10:00:00',
  },
  {
    id: 'f004', customerId: 'c002', customerName: '陈美丽',
    userId: 'u001', userName: '张伟', method: 'PHONE',
    content: '回访客户，客户主要关注智能照明和安防系统',
    result: '发送了产品手册，约下周见面', nextFollowAt: '2024-03-15',
    createdAt: '2024-03-08T11:00:00',
  },
  {
    id: 'f005', customerId: 'c003', customerName: '刘大明',
    userId: 'u002', userName: '李娜', method: 'EMAIL',
    content: '通过邮件沟通JD渠道合作细节，对方需要详细报价',
    result: '已发送报价邮件', nextFollowAt: '2024-03-18',
    createdAt: '2024-03-12T15:30:00',
  },
  {
    id: 'f006', customerId: 'c004', customerName: '赵雷',
    userId: 'u002', userName: '李娜', method: 'PHONE',
    content: '初次电话沟通，客户在展会上留过名片，对智能家居感兴趣',
    result: '约定本周五上门演示', nextFollowAt: '2024-03-22',
    createdAt: '2024-03-18T09:00:00',
  },
  {
    id: 'f007', customerId: 'c005', customerName: '孙晓燕',
    userId: 'u001', userName: '张伟', method: 'VISIT',
    content: '上门进行售后回访，客户对系统整体满意，询问是否有新产品',
    result: '介绍了新款智能门锁和电动窗帘',
    createdAt: '2024-02-28T10:00:00',
  },
  {
    id: 'f008', customerId: 'c006', customerName: '周鑫',
    userId: 'u003', userName: '王芳', method: 'WECHAT',
    content: '微信沟通产品需求，客户想了解全屋智能的安装周期和售后保障',
    result: '详细介绍了安装流程和一年保修政策', nextFollowAt: '2024-03-25',
    createdAt: '2024-03-19T14:00:00',
  },
]

// ── 产品库 ──────────────────────────────────────────────
export const products: Product[] = [
  { id: 'p001', name: '智能门锁 Pro X1', sku: 'SH-001', category: '智能门锁', price: 1299, stock: 48, minStock: 10, unit: '套' },
  { id: 'p002', name: '全屋智能照明套装', sku: 'SH-002', category: '智能照明', price: 3800, stock: 22, minStock: 5, unit: '套' },
  { id: 'p003', name: '4路安防摄像系统', sku: 'SH-003', category: '智能安防', price: 2400, stock: 31, minStock: 5, unit: '套' },
  { id: 'p004', name: '中央空调智能控制', sku: 'SH-004', category: '智能控制', price: 5600, stock: 8, minStock: 3, unit: '套' },
  { id: 'p005', name: '智能电动窗帘电机', sku: 'SH-005', category: '智能遮阳', price: 680, stock: 3, minStock: 10, unit: '台' },
  { id: 'p006', name: '全宅Wi-Fi 6 Mesh套装', sku: 'SH-006', category: '网络设备', price: 2200, stock: 15, minStock: 5, unit: '套' },
  { id: 'p007', name: '智能背景音乐系统', sku: 'SH-007', category: '智能音视频', price: 4500, stock: 6, minStock: 3, unit: '套' },
  { id: 'p008', name: '智能晾衣机', sku: 'SH-008', category: '智能家居', price: 1680, stock: 0, minStock: 5, unit: '台' },
  { id: 'p009', name: '可视对讲门禁系统', sku: 'SH-009', category: '智能门禁', price: 3200, stock: 18, minStock: 5, unit: '套' },
  { id: 'p010', name: '智能烟感/燃气报警器', sku: 'SH-010', category: '智能安防', price: 380, stock: 65, minStock: 20, unit: '个' },
]

// ── 出入库记录 ──────────────────────────────────────────────
export const stockRecords: StockRecord[] = [
  { id: 'sr001', productId: 'p001', productName: '智能门锁 Pro X1', type: 'IN', quantity: 20, note: '补充库存', operator: '管理员', createdAt: '2024-03-01' },
  { id: 'sr002', productId: 'p001', productName: '智能门锁 Pro X1', type: 'OUT', quantity: 2, note: '王建国订单出库', operator: '张伟', createdAt: '2024-03-15' },
  { id: 'sr003', productId: 'p005', productName: '智能电动窗帘电机', type: 'OUT', quantity: 4, note: '孙晓燕项目安装', operator: '张伟', createdAt: '2024-02-28' },
  { id: 'sr004', productId: 'p008', productName: '智能晾衣机', type: 'OUT', quantity: 5, note: '促销活动销售', operator: '李娜', createdAt: '2024-03-10' },
  { id: 'sr005', productId: 'p002', productName: '全屋智能照明套装', type: 'IN', quantity: 10, note: '月度补货', operator: '管理员', createdAt: '2024-03-05' },
  { id: 'sr006', productId: 'p004', productName: '中央空调智能控制', type: 'OUT', quantity: 2, note: '刘大明样品', operator: '李娜', createdAt: '2024-03-12' },
]

// ── 报价单 ──────────────────────────────────────────────
export const quotes: Quote[] = [
  {
    id: 'q001', quoteNo: 'QT-2024-001', customerId: 'c001', customerName: '王建国',
    userName: '张伟', status: 'ACCEPTED', totalAmount: 18680, validDays: 30,
    notes: '含安装调试及1年免费保修',
    items: [
      { id: 'qi001', name: '智能门锁 Pro X1', quantity: 2, unitPrice: 1299, discount: 0.95, amount: 2468 },
      { id: 'qi002', name: '全屋智能照明套装', quantity: 1, unitPrice: 3800, discount: 1, amount: 3800 },
      { id: 'qi003', name: '4路安防摄像系统', quantity: 1, unitPrice: 2400, discount: 1, amount: 2400 },
      { id: 'qi004', name: '中央空调智能控制', quantity: 1, unitPrice: 5600, discount: 0.9, amount: 5040 },
      { id: 'qi005', name: '智能电动窗帘电机', quantity: 4, unitPrice: 680, discount: 0.9, amount: 2448 },
    ],
    createdAt: '2024-01-28',
  },
  {
    id: 'q002', quoteNo: 'QT-2024-002', customerId: 'c003', customerName: '刘大明',
    userName: '李娜', status: 'SENT', totalAmount: 12400, validDays: 15,
    items: [
      { id: 'qi006', name: '4路安防摄像系统', quantity: 2, unitPrice: 2400, discount: 1, amount: 4800 },
      { id: 'qi007', name: '智能门锁 Pro X1', quantity: 5, unitPrice: 1299, discount: 0.9, amount: 5846 },
      { id: 'qi008', name: '智能烟感/燃气报警器', quantity: 20, unitPrice: 380, discount: 1, amount: 7600 },
    ],
    createdAt: '2024-03-13',
  },
  {
    id: 'q003', quoteNo: 'QT-2024-003', customerId: 'c007', customerName: '吴丽华',
    userName: '王芳', status: 'DRAFT', totalAmount: 9800, validDays: 30,
    items: [
      { id: 'qi009', name: '全屋智能照明套装', quantity: 1, unitPrice: 3800, discount: 1, amount: 3800 },
      { id: 'qi010', name: '智能背景音乐系统', quantity: 1, unitPrice: 4500, discount: 1, amount: 4500 },
      { id: 'qi011', name: '可视对讲门禁系统', quantity: 1, unitPrice: 3200, discount: 0.47, amount: 1500 },
    ],
    createdAt: '2024-03-14',
  },
  {
    id: 'q004', quoteNo: 'QT-2024-004', customerId: 'c005', customerName: '孙晓燕',
    userName: '张伟', status: 'ACCEPTED', totalAmount: 7260, validDays: 30,
    items: [
      { id: 'qi012', name: '智能电动窗帘电机', quantity: 6, unitPrice: 680, discount: 0.9, amount: 3672 },
      { id: 'qi013', name: '全宅Wi-Fi 6 Mesh套装', quantity: 1, unitPrice: 2200, discount: 1, amount: 2200 },
      { id: 'qi014', name: '智能门锁 Pro X1', quantity: 1, unitPrice: 1299, discount: 0.91, amount: 1180 },
    ],
    createdAt: '2024-01-22',
  },
]

// ── 合同 ──────────────────────────────────────────────
export const contracts: Contract[] = [
  {
    id: 'ct001', contractNo: 'HT-2024-001', customerId: 'c001', customerName: '王建国',
    userName: '张伟', quoteNo: 'QT-2024-001', status: 'COMPLETED',
    totalAmount: 18680, signedAt: '2024-02-01', deliveryAt: '2024-03-10',
    createdAt: '2024-02-01',
  },
  {
    id: 'ct002', contractNo: 'HT-2024-002', customerId: 'c005', customerName: '孙晓燕',
    userName: '张伟', quoteNo: 'QT-2024-004', status: 'COMPLETED',
    totalAmount: 7260, signedAt: '2024-01-25', deliveryAt: '2024-02-20',
    createdAt: '2024-01-25',
  },
  {
    id: 'ct003', contractNo: 'HT-2024-003', customerId: 'c002', customerName: '陈美丽',
    userName: '张伟', status: 'ACTIVE',
    totalAmount: 15000, signedAt: '2024-03-10',
    createdAt: '2024-03-10',
  },
]

// ── 售后工单 ──────────────────────────────────────────────
export const tickets: Ticket[] = [
  {
    id: 't001', ticketNo: 'TK-2024-001', customerId: 'c001', customerName: '王建国',
    creatorName: '张伟', assigneeName: '张伟',
    title: '智能门锁无法连接APP', description: '安装后智能门锁反复提示连接失败，重启路由器无效',
    status: 'RESOLVED', priority: 'HIGH', satisfaction: 5,
    resolvedAt: '2024-03-12', createdAt: '2024-03-11', updatedAt: '2024-03-12',
  },
  {
    id: 't002', ticketNo: 'TK-2024-002', customerId: 'c005', customerName: '孙晓燕',
    creatorName: '客服', assigneeName: '李娜',
    title: '安防摄像头夜视效果差', description: '夜间画面噪点很多，看不清人脸',
    status: 'PROCESSING', priority: 'NORMAL',
    createdAt: '2024-03-15', updatedAt: '2024-03-16',
  },
  {
    id: 't003', ticketNo: 'TK-2024-003', customerId: 'c001', customerName: '王建国',
    creatorName: '王建国', assigneeName: undefined,
    title: '背景音乐某个房间无声音', description: '次卧音箱无声，其他房间正常',
    status: 'PENDING', priority: 'NORMAL',
    createdAt: '2024-03-18', updatedAt: '2024-03-18',
  },
  {
    id: 't004', ticketNo: 'TK-2024-004', customerId: 'c002', customerName: '陈美丽',
    creatorName: '张伟', assigneeName: '张伟',
    title: '智能照明场景无法保存', description: '设置好的回家模式每次重启后恢复默认',
    status: 'PENDING', priority: 'HIGH',
    createdAt: '2024-03-19', updatedAt: '2024-03-19',
  },
  {
    id: 't005', ticketNo: 'TK-2024-005', customerId: 'c005', customerName: '孙晓燕',
    creatorName: '王芳', assigneeName: '王芳',
    title: '电动窗帘运行有异响', description: '早上窗帘自动开启时有嘎吱声',
    status: 'PROCESSING', priority: 'LOW',
    createdAt: '2024-03-17', updatedAt: '2024-03-18',
  },
  {
    id: 't006', ticketNo: 'TK-2024-006', customerId: 'c001', customerName: '王建国',
    creatorName: '客服', assigneeName: '李娜',
    title: '空调控制面板触摸失灵', description: '右上角区域触摸无反应，其余正常',
    status: 'PENDING', priority: 'URGENT',
    createdAt: '2024-03-20', updatedAt: '2024-03-20',
  },
  {
    id: 't007', ticketNo: 'TK-2024-007', customerId: 'c005', customerName: '孙晓燕',
    creatorName: '张伟', assigneeName: '张伟',
    title: '网关固件升级失败', description: '按照提示升级后设备离线',
    status: 'RESOLVED', priority: 'URGENT', satisfaction: 4,
    resolvedAt: '2024-03-10', createdAt: '2024-03-09', updatedAt: '2024-03-10',
  },
  {
    id: 't008', ticketNo: 'TK-2024-008', customerId: 'c003', customerName: '刘大明',
    creatorName: '李娜', assigneeName: undefined,
    title: '样品设备安装咨询', description: '采购的样品需要现场安装指导',
    status: 'CLOSED', priority: 'NORMAL', satisfaction: 5,
    resolvedAt: '2024-03-14', createdAt: '2024-03-13', updatedAt: '2024-03-14',
  },
]

// ── 看板统计 ──────────────────────────────────────────────
export const dashboardStats = {
  totalCustomers: 128,
  todayFollowUps: 7,
  monthClosed: 14,
  monthRevenue: 342800,
  pendingTickets: 3,
  processingTickets: 2,
  resolvedTickets: 18,

  monthlySales: [
    { month: '10月', 成交数: 8, 营收: 185000 },
    { month: '11月', 成交数: 11, 营收: 248000 },
    { month: '12月', 成交数: 15, 营收: 312000 },
    { month: '1月', 成交数: 9, 营收: 198000 },
    { month: '2月', 成交数: 12, 营收: 276000 },
    { month: '3月', 成交数: 14, 营收: 342800 },
  ],

  categoryPie: [
    { name: '智能家居', value: 85, fill: '#3b82f6' },
    { name: 'JD家电', value: 43, fill: '#10b981' },
  ],

  funnel: [
    { label: '意向客户', count: 45, status: 'INTENTION' },
    { label: '洽谈中', count: 28, status: 'NEGOTIATION' },
    { label: '已报价', count: 19, status: 'QUOTED' },
    { label: '已成交', count: 36, status: 'CLOSED' },
  ],

  todos: [
    { id: 1, text: '跟进陈美丽 - 报价确认', time: '今天 14:00', type: 'follow' },
    { id: 2, text: '赵雷上门演示准备', time: '今天 15:30', type: 'visit' },
    { id: 3, text: '吴丽华报价单审核', time: '今天 17:00', type: 'quote' },
    { id: 4, text: '周鑫合同跟进', time: '明天 10:00', type: 'contract' },
    { id: 5, text: 'TK-2024-004 工单处理', time: '明天 14:00', type: 'ticket' },
  ],
}
