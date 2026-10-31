import { findPackage, findStore, findStyle } from './data.js'
import { nextOpenDateKey } from './date.js'

const ORDER_KEY = 'yipage_orders_v1'
const SEED_KEY = 'yipage_demo_seed_v1'

export const ORDER_STATUS = {
  pending: {
    label: '待确认',
    color: '#9a651f',
    bg: '#f7ead5',
    hint: '预约已提交，客服会在 30 分钟内与你确认档期。'
  },
  upcoming: {
    label: '待拍摄',
    color: '#49634a',
    bg: '#e6ecdf',
    hint: '档期已确认，请提前 10 分钟到店。'
  },
  completed: {
    label: '已完成',
    color: '#6e7657',
    bg: '#eceee1',
    hint: '这次拍摄已完成，成片已通过云盘交付。'
  },
  canceled: {
    label: '已取消',
    color: '#8d8175',
    bg: '#eee8e0',
    hint: '本次预约已取消，可以随时重新预约。'
  }
}

export const STATUS_FILTERS = [
  { key: 'all', name: '全部' },
  { key: 'pending', name: '待确认' },
  { key: 'upcoming', name: '待拍摄' },
  { key: 'completed', name: '已完成' },
  { key: 'canceled', name: '已取消' }
]

function readStorage(key) {
  try {
    return uni.getStorageSync(key)
  } catch (error) {
    return null
  }
}

function writeStorage(key, value) {
  try {
    uni.setStorageSync(key, value)
    return true
  } catch (error) {
    return false
  }
}

function makeOrderId() {
  const now = new Date()
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0')
  ].join('')
  const random = Math.floor(100 + Math.random() * 900)
  return `YP${stamp}${random}`
}

export function getOrders() {
  const value = readStorage(ORDER_KEY)
  return Array.isArray(value) ? value : []
}

export function saveOrders(orders) {
  return writeStorage(ORDER_KEY, Array.isArray(orders) ? orders : [])
}

export function getOrderById(id) {
  return getOrders().find((item) => item.id === id) || null
}

export function getStatusMeta(status) {
  return ORDER_STATUS[status] || ORDER_STATUS.pending
}

export function createOrder(payload) {
  const order = {
    ...payload,
    id: makeOrderId(),
    status: 'pending',
    createdAt: Date.now()
  }
  const next = [order, ...getOrders()]
  const saved = saveOrders(next)
  if (!saved) {
    throw new Error('本机存储不可用，预约未能保存')
  }
  return order
}

export function cancelOrder(id) {
  const orders = getOrders()
  const target = orders.find((item) => item.id === id)
  if (!target) return null
  if (target.status !== 'pending' && target.status !== 'upcoming') return target

  target.status = 'canceled'
  target.canceledAt = Date.now()
  saveOrders(orders)
  return target
}

export function getOrderStats() {
  const orders = getOrders()
  return {
    active: orders.filter((item) => item.status === 'pending' || item.status === 'upcoming')
      .length,
    completed: orders.filter((item) => item.status === 'completed').length,
    total: orders.length
  }
}

export function maskPhone(phone) {
  if (!phone) return ''
  return String(phone).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}

export function ensureDemoOrders() {
  const seeded = readStorage(SEED_KEY)
  if (seeded) return

  const existing = getOrders()
  if (existing.length) {
    writeStorage(SEED_KEY, 1)
    return
  }

  const styleA = findStyle('fresh')
  const packageA = findPackage('signature')
  const storeA = findStore('campus')
  const styleB = findStyle('vintage')
  const packageB = findPackage('light')
  const storeB = findStore('east')

  const demos = [
    {
      id: 'YP20260518026',
      status: 'upcoming',
      demo: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 26,
      styleId: styleA.id,
      styleName: styleA.name,
      styleEn: styleA.en,
      styleCover: styleA.cover,
      packageId: packageA.id,
      packageName: packageA.name,
      packagePrice: packageA.price,
      storeId: storeA.id,
      storeName: storeA.name,
      storeAddress: storeA.address,
      date: nextOpenDateKey(3),
      time: '14:00',
      contactName: '林小满',
      contactPhone: '13800002026',
      wechat: 'linxiaoman',
      note: '想拍一组有毕业氛围的照片，可以带一束花。',
      extraRetouch: 1,
      extraFee: 30,
      total: 429,
      deposit: 100,
      balance: 329
    },
    {
      id: 'YP20260412008',
      status: 'completed',
      demo: true,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 18,
      styleId: styleB.id,
      styleName: styleB.name,
      styleEn: styleB.en,
      styleCover: styleB.cover,
      packageId: packageB.id,
      packageName: packageB.name,
      packagePrice: packageB.price,
      storeId: storeB.id,
      storeName: storeB.name,
      storeAddress: storeB.address,
      date: nextOpenDateKey(-11),
      time: '15:30',
      contactName: '林小满',
      contactPhone: '13800002026',
      wechat: 'linxiaoman',
      note: '',
      extraRetouch: 0,
      extraFee: 0,
      total: 199,
      deposit: 50,
      balance: 149
    }
  ]

  saveOrders(demos)
  writeStorage(SEED_KEY, 1)
}

export function clearLocalOrders() {
  try {
    uni.removeStorageSync(ORDER_KEY)
    // 标记已清理，避免下次启动又自动写入演示预约
    uni.setStorageSync(SEED_KEY, 'cleared')
    return true
  } catch (error) {
    return false
  }
}
