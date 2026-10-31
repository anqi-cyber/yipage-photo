const WEEKDAY_FULL = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const WEEKDAY_SHORT = ['日', '一', '二', '三', '四', '五', '六']

export function pad2(value) {
  return String(value).padStart(2, '0')
}

export function startOfDay(date = new Date()) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function addDays(date, amount) {
  const next = new Date(date)
  next.setDate(next.getDate() + amount)
  return next
}

export function dateKey(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`
}

export function fromDateKey(key) {
  const [year, month, day] = String(key).split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function getBookingDays(count = 14) {
  const today = startOfDay()
  const list = []

  for (let index = 1; index <= count; index += 1) {
    const current = addDays(today, index)
    list.push({
      key: dateKey(current),
      day: current.getDate(),
      month: current.getMonth() + 1,
      weekday: WEEKDAY_FULL[current.getDay()],
      weekdayShort: WEEKDAY_SHORT[current.getDay()],
      closed: current.getDay() === 1
    })
  }

  return list
}

export function formatDateCN(key) {
  if (!key) return ''
  const date = fromDateKey(key)
  return `${date.getMonth() + 1}月${date.getDate()}日 ${WEEKDAY_FULL[date.getDay()]}`
}

export function formatMonthDay(key) {
  if (!key) return ''
  const date = fromDateKey(key)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

export function getDateParts(key) {
  if (!key) {
    return { month: '', day: '', weekday: '', full: '' }
  }
  const date = fromDateKey(key)
  return {
    month: `${date.getMonth() + 1}月`,
    day: pad2(date.getDate()),
    weekday: WEEKDAY_FULL[date.getDay()],
    full: formatDateCN(key)
  }
}

export function nextOpenDateKey(offset) {
  let current = addDays(startOfDay(), offset)
  while (current.getDay() === 1) {
    current = addDays(current, 1)
  }
  return dateKey(current)
}
