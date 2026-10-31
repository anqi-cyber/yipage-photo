import { TIME_GROUPS } from './data.js'

const DRAFT_KEY = 'yipage_booking_draft_v1'

function hashString(input) {
  let hash = 0
  const text = String(input)
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0
  }
  return hash
}

// 演示用的档期规则：同一门店、同一天、同一时段的结果稳定，
// 约 1/6 的时段显示为已约满，方便展示真实预约页的状态。
export function isSlotAvailable(date, time, storeId) {
  if (!date || !time || !storeId) return false
  return hashString(`${date}|${time}|${storeId}`) % 6 !== 0
}

export function findFirstAvailableTime(date, storeId) {
  for (const group of TIME_GROUPS) {
    for (const time of group.slots) {
      if (isSlotAvailable(date, time, storeId)) return time
    }
  }
  return ''
}

export function setBookingDraft(draft) {
  try {
    uni.setStorageSync(DRAFT_KEY, {
      ...draft,
      savedAt: Date.now()
    })
    return true
  } catch (error) {
    return false
  }
}

export function takeBookingDraft() {
  try {
    const draft = uni.getStorageSync(DRAFT_KEY)
    if (draft) uni.removeStorageSync(DRAFT_KEY)
    return draft || null
  } catch (error) {
    return null
  }
}

export function clearBookingDraft() {
  try {
    uni.removeStorageSync(DRAFT_KEY)
  } catch (error) {
    // 忽略缓存清理失败
  }
}
