<template>
  <view class="page booking-page">
    <yp-nav-bar title="预约拍摄" :back="false" />

    <view class="section intro">
      <text class="eyebrow">BOOK A SESSION</text>
      <view class="title serif">
        <text>留一个下午，</text>
        <text>给现在的自己。</text>
      </view>
      <text class="desc">选好风格与时间，我们会在 30 分钟内与你确认档期。</text>
    </view>

    <view class="section step-head">
      <text class="step-no">01</text>
      <text class="step-title">选择风格与套餐</text>
    </view>

    <view class="section">
      <view class="service-card">
        <view class="style-row" hover-class="row--hover" @tap="openSheet('style')">
          <image class="style-thumb" :src="selectedStyle.cover" mode="aspectFill"></image>
          <view class="style-copy">
            <text class="row-en">PHOTO STYLE</text>
            <text class="row-title serif">{{ selectedStyle.name }}</text>
            <text class="row-sub">{{ selectedStyle.tagline }}</text>
          </view>
          <view class="change">更换</view>
        </view>

        <view class="divider"></view>

        <view class="package-row" hover-class="row--hover" @tap="openSheet('package')">
          <view class="package-copy">
            <text class="row-en">PACKAGE</text>
            <text class="row-title serif">{{ selectedPackage.name }}</text>
            <text class="row-sub">{{ selectedPackage.summary }}</text>
          </view>
          <view class="package-price">
            <text class="package-cur">¥</text>
            <text class="package-num">{{ selectedPackage.price }}</text>
          </view>
          <view class="change">更换</view>
        </view>

        <view class="addon">
          <view class="addon-copy">
            <text class="addon-title">加选精修</text>
            <text class="addon-sub">¥{{ ADDON_RETOUCH_PRICE }} / 张 · 最多 {{ ADDON_RETOUCH_MAX }} 张</text>
          </view>
          <view class="stepper">
            <view
              class="stepper-btn"
              :class="{ 'stepper-btn--disabled': extraRetouch === 0 }"
              @tap="changeExtra(-1)"
            >
              −
            </view>
            <text class="stepper-value">{{ extraRetouch }}</text>
            <view
              class="stepper-btn"
              :class="{ 'stepper-btn--disabled': extraRetouch >= ADDON_RETOUCH_MAX }"
              @tap="changeExtra(1)"
            >
              ＋
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="section step-head">
      <text class="step-no">02</text>
      <text class="step-title">选择到店时间</text>
    </view>

    <view class="section">
      <view class="booking-card">
        <view class="field-head">
          <text class="field-title">门店</text>
          <text class="field-hint">{{ selectedStore.hours }}</text>
        </view>

        <view class="store-select" hover-class="row--hover" @tap="openSheet('store')">
          <view class="store-mark">
            <text>{{ selectedStore.name.slice(0, 2) }}</text>
          </view>
          <view class="store-copy">
            <text class="store-name">{{ selectedStore.name }}</text>
            <text class="store-address">{{ selectedStore.shortAddress }}</text>
            <text class="store-metro">{{ selectedStore.metro }}</text>
          </view>
          <text class="change">切换</text>
        </view>

        <view class="field-head field-head--date">
          <text class="field-title">日期</text>
          <text class="field-hint">未来 14 天 · 周一闭店</text>
        </view>

        <scroll-view class="date-scroll" scroll-x :show-scrollbar="false">
          <view class="date-row">
            <view
              v-for="day in days"
              :key="day.key"
              class="date-item"
              :class="{
                'date-item--active': selectedDate === day.key,
                'date-item--closed': day.closed
              }"
              @tap="pickDate(day)"
            >
              <text class="date-week">{{ day.weekdayShort }}</text>
              <text class="date-day">{{ day.day }}</text>
              <text class="date-month">{{ day.month }}月</text>
              <text v-if="day.closed" class="date-closed">闭店</text>
            </view>
          </view>
        </scroll-view>

        <view class="field-head field-head--time">
          <text class="field-title">时段</text>
          <text class="field-hint">每场拍摄约 60–150 分钟</text>
        </view>

        <view class="slot-groups">
          <view v-for="group in TIME_GROUPS" :key="group.label" class="slot-group">
            <text class="slot-label">{{ group.label }}</text>
            <view class="slot-grid">
              <view
                v-for="time in group.slots"
                :key="time"
                class="slot"
                :class="{
                  'slot--active': selectedTime === time,
                  'slot--full': !isAvailable(time)
                }"
                @tap="pickTime(time)"
              >
                <text>{{ time }}</text>
                <text v-if="!isAvailable(time)" class="slot-full">已满</text>
              </view>
            </view>
          </view>
        </view>

        <view class="selection-summary">
          <text v-if="selectedTime">{{ formatDateCN(selectedDate) }} {{ selectedTime }}</text>
          <text v-else class="selection-empty">请选择一个到店时段</text>
          <text class="selection-store">{{ selectedStore.name }}</text>
        </view>
      </view>
    </view>

    <view class="section step-head">
      <text class="step-no">03</text>
      <text class="step-title">留下联系方式</text>
    </view>

    <view class="section">
      <view class="form-card">
        <view class="form-row">
          <text class="form-label">称呼</text>
          <input
            v-model="form.name"
            class="form-input"
            type="text"
            maxlength="12"
            placeholder="怎么称呼你"
            placeholder-style="color:#b5aa9e"
            cursor-spacing="24"
          />
        </view>
        <view class="form-row">
          <text class="form-label">手机号</text>
          <input
            v-model="form.phone"
            class="form-input"
            type="number"
            maxlength="11"
            placeholder="用于确认档期，不会外泄"
            placeholder-style="color:#b5aa9e"
            cursor-spacing="24"
          />
        </view>
        <view class="form-row">
          <text class="form-label">微信</text>
          <input
            v-model="form.wechat"
            class="form-input"
            type="text"
            maxlength="30"
            placeholder="选填，方便发送拍摄提醒"
            placeholder-style="color:#b5aa9e"
            cursor-spacing="24"
          />
        </view>
        <view class="form-note">
          <view class="note-head">
            <text class="form-label">想拍的感觉</text>
            <text class="note-count">{{ form.note.length }}/120</text>
          </view>
          <textarea
            v-model="form.note"
            class="note-textarea"
            maxlength="120"
            placeholder="比如：想拍得自然一点，想带一束花，或者有特别想拍的场景…"
            placeholder-style="color:#b5aa9e"
            :auto-height="true"
            cursor-spacing="24"
          />
        </view>
      </view>

      <view class="agreement" @tap="agreed = !agreed">
        <view class="checkbox" :class="{ 'checkbox--on': agreed }">
          <text v-if="agreed" class="checkbox-tick">✓</text>
        </view>
        <text class="agreement-text">我已阅读并同意</text>
        <text class="agreement-link" @tap.stop="showRules">《预约须知》</text>
      </view>
    </view>

    <view class="section step-head step-head--last">
      <text class="step-no">04</text>
      <text class="step-title">确认预约信息</text>
    </view>

    <view class="section">
      <view class="summary-card">
        <view class="summary-line">
          <text class="summary-label">拍摄套餐</text>
          <text class="summary-value">{{ selectedPackage.name }} · ¥{{ selectedPackage.price }}</text>
        </view>
        <view v-if="extraRetouch > 0" class="summary-line">
          <text class="summary-label">加选精修 × {{ extraRetouch }}</text>
          <text class="summary-value">¥{{ extraRetouch * ADDON_RETOUCH_PRICE }}</text>
        </view>
        <view class="summary-line">
          <text class="summary-label">拍摄时间</text>
          <text class="summary-value">{{ formatDateCN(selectedDate) }} {{ selectedTime || '待选择' }}</text>
        </view>
        <view class="summary-line">
          <text class="summary-label">拍摄门店</text>
          <text class="summary-value">{{ selectedStore.name }}</text>
        </view>
        <view class="summary-total">
          <text class="summary-total-label">合计</text>
          <view class="summary-total-price">
            <text class="summary-cur">¥</text>
            <text class="summary-num">{{ total }}</text>
          </view>
        </view>
        <view class="deposit-note">
          <text>到店支付定金 ¥{{ deposit }} · 尾款 ¥{{ balance }}</text>
          <text>无隐形消费</text>
        </view>
      </view>

      <view class="submit-area">
        <view
          class="submit-btn"
          :class="{ 'submit-btn--loading': submitting }"
          hover-class="btn-hover"
          @tap="submitBooking"
        >
          <text>{{ submitting ? '正在锁定档期…' : '确认预约' }}</text>
          <text v-if="!submitting" class="submit-arrow">→</text>
        </view>
        <text class="submit-tip">客服将在 30 分钟内通过电话或微信与你确认档期</text>
      </view>
    </view>

    <yp-sheet
      :visible="sheet !== ''"
      :title="sheetTitle"
      :subtitle="sheetSubtitle"
      @close="sheet = ''"
    >
      <view v-if="sheet === 'style'" class="sheet-list">
        <view
          v-for="item in STYLES"
          :key="item.id"
          class="sheet-style"
          :class="{ 'sheet-style--active': styleId === item.id }"
          @tap="chooseStyle(item)"
        >
          <image class="sheet-thumb" :src="item.cover" mode="aspectFill"></image>
          <view class="sheet-copy">
            <view class="sheet-name-row">
              <text class="sheet-name serif">{{ item.name }}</text>
              <text class="sheet-price">¥{{ item.priceFrom }} 起</text>
            </view>
            <text class="sheet-sub">{{ item.tagline }}</text>
            <text class="sheet-tags">{{ item.tags.join(' · ') }}</text>
          </view>
          <view class="sheet-radio" :class="{ 'sheet-radio--on': styleId === item.id }">
            <text v-if="styleId === item.id">✓</text>
          </view>
        </view>
      </view>

      <view v-if="sheet === 'package'" class="package-sheet">
        <yp-package-card
          v-for="pkg in PACKAGES"
          :key="pkg.id"
          :pkg="pkg"
          compact
          :selected="packageId === pkg.id"
          @select="choosePackage"
        />
        <text class="sheet-footnote">所有套餐均含拍摄策划、原片调色与 7 天云盘交付。</text>
      </view>

      <view v-if="sheet === 'store'" class="sheet-list">
        <view
          v-for="store in STORES"
          :key="store.id"
          class="store-sheet-item"
          :class="{ 'store-sheet-item--active': storeId === store.id }"
          @tap="chooseStore(store)"
        >
          <view class="store-sheet-head">
            <text class="store-sheet-name">{{ store.name }}</text>
            <text v-if="storeId === store.id" class="store-sheet-current">当前门店</text>
          </view>
          <text class="store-sheet-address">{{ store.address }}</text>
          <text class="store-sheet-metro">{{ store.metro }}</text>
          <view class="store-sheet-tags">
            <text v-for="tag in store.tags" :key="tag">{{ tag }}</text>
          </view>
        </view>
        <text class="sheet-footnote">两家门店均需提前预约，周一闭店。</text>
      </view>
    </yp-sheet>
  </view>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { onShareAppMessage, onShow, onUnload } from '@dcloudio/uni-app'
import {
  ADDON_RETOUCH_MAX,
  ADDON_RETOUCH_PRICE,
  PACKAGES,
  STORES,
  STYLES,
  TIME_GROUPS,
  findPackage,
  findStore,
  findStyle
} from '@/common/data.js'
import {
  findFirstAvailableTime,
  isSlotAvailable,
  takeBookingDraft
} from '@/common/booking.js'
import { formatDateCN, getBookingDays } from '@/common/date.js'
import { createOrder } from '@/common/order.js'

const days = getBookingDays(14)
const initialDay = days.find((item) => !item.closed) || days[0]

const styleId = ref('fresh')
const packageId = ref('light')
const storeId = ref('campus')
const selectedDate = ref(initialDay.key)
const selectedTime = ref(findFirstAvailableTime(initialDay.key, 'campus'))
const extraRetouch = ref(0)
const agreed = ref(false)
const sheet = ref('')
const submitting = ref(false)

const form = reactive({
  name: '',
  phone: '',
  wechat: '',
  note: ''
})

const selectedStyle = computed(() => findStyle(styleId.value))
const selectedPackage = computed(() => findPackage(packageId.value))
const selectedStore = computed(() => findStore(storeId.value))
const total = computed(
  () => selectedPackage.value.price + extraRetouch.value * ADDON_RETOUCH_PRICE
)
const deposit = computed(() => selectedPackage.value.deposit)
const balance = computed(() => Math.max(0, total.value - deposit.value))

const sheetTitle = computed(() => {
  if (sheet.value === 'style') return '选择风格'
  if (sheet.value === 'package') return '选择套餐'
  return '选择门店'
})

const sheetSubtitle = computed(() => {
  if (sheet.value === 'style') return '选一个最像你的影像风格'
  if (sheet.value === 'package') return '价格含精修与调色底片，定金到店支付'
  return '两家门店，选离你更近的那家'
})

watch(sheet, (value) => {
  // 预约页带原生 TabBar，弹层打开时先收起 TabBar，避免遮住列表底部
  if (value) {
    uni.hideTabBar({ animation: false })
  } else {
    uni.showTabBar({ animation: false })
  }
})

onUnload(() => {
  uni.showTabBar({ animation: false })
})

onShow(() => {
  const draft = takeBookingDraft()
  if (!draft) return

  if (draft.styleId) styleId.value = findStyle(draft.styleId).id
  if (draft.packageId) packageId.value = findPackage(draft.packageId).id
  if (draft.storeId) storeId.value = findStore(draft.storeId).id
  if (draft.date && days.some((day) => day.key === draft.date && !day.closed)) {
    selectedDate.value = draft.date
  }
  if (draft.time && isSlotAvailable(selectedDate.value, draft.time, storeId.value)) {
    selectedTime.value = draft.time
  } else if (
    !selectedTime.value ||
    !isSlotAvailable(selectedDate.value, selectedTime.value, storeId.value)
  ) {
    selectedTime.value = findFirstAvailableTime(selectedDate.value, storeId.value)
  }

  // 从风格/套餐页跳转过来时，回到预约页顶部
  setTimeout(() => {
    uni.pageScrollTo({ scrollTop: 0, duration: 0 })
  }, 60)
})

function openSheet(type) {
  sheet.value = type
}

function chooseStyle(item) {
  styleId.value = item.id
  sheet.value = ''
}

function choosePackage(pkg) {
  packageId.value = pkg.id
  sheet.value = ''
}

function chooseStore(store) {
  storeId.value = store.id
  if (
    selectedTime.value &&
    !isSlotAvailable(selectedDate.value, selectedTime.value, storeId.value)
  ) {
    selectedTime.value = findFirstAvailableTime(selectedDate.value, storeId.value)
  }
  sheet.value = ''
}

function pickDate(day) {
  if (day.closed) {
    uni.showToast({ title: '周一闭店，换一天吧', icon: 'none' })
    return
  }
  selectedDate.value = day.key
  selectedTime.value = findFirstAvailableTime(day.key, storeId.value)
}

function isAvailable(time) {
  return isSlotAvailable(selectedDate.value, time, storeId.value)
}

function pickTime(time) {
  if (!isAvailable(time)) {
    uni.showToast({ title: '这个时段刚被约走啦', icon: 'none' })
    return
  }
  selectedTime.value = time
}

function changeExtra(delta) {
  const next = extraRetouch.value + delta
  if (next < 0 || next > ADDON_RETOUCH_MAX) return
  extraRetouch.value = next
}

function showRules() {
  uni.showModal({
    title: '预约须知',
    content:
      '1. 提交预约后，客服会在 30 分钟内确认档期。\n2. 拍摄前 48 小时可免费改期一次；当天改期需补 ¥80。\n3. 到店支付定金锁档，尾款拍摄当天结清。\n4. 未经允许，门店不会将照片用于宣传。',
    showCancel: false,
    confirmText: '我知道了'
  })
}

function resetBooking() {
  const nextDay = days.find((item) => !item.closed) || days[0]
  selectedDate.value = nextDay.key
  selectedTime.value = findFirstAvailableTime(nextDay.key, storeId.value)
  extraRetouch.value = 0
  form.name = ''
  form.phone = ''
  form.wechat = ''
  form.note = ''
  agreed.value = false
}

function submitBooking() {
  if (submitting.value) return

  const name = form.name.trim()
  const phone = form.phone.trim()

  if (!selectedTime.value) {
    uni.showToast({ title: '请选择一个到店时段', icon: 'none' })
    return
  }
  if (!isAvailable(selectedTime.value)) {
    selectedTime.value = findFirstAvailableTime(selectedDate.value, storeId.value)
    uni.showToast({ title: '这个时段刚被约走啦，请重新选择', icon: 'none' })
    return
  }
  if (!name) {
    uni.showToast({ title: '请填写你的称呼', icon: 'none' })
    return
  }
  if (!/^1[3-9]\d{9}$/.test(phone)) {
    uni.showToast({ title: '请填写正确的手机号', icon: 'none' })
    return
  }
  if (!agreed.value) {
    uni.showToast({ title: '请先阅读并同意预约须知', icon: 'none' })
    return
  }

  submitting.value = true
  uni.showLoading({ title: '正在锁定档期', mask: true })

  setTimeout(() => {
    try {
      const pkg = selectedPackage.value
      const order = createOrder({
        styleId: selectedStyle.value.id,
        styleName: selectedStyle.value.name,
        styleEn: selectedStyle.value.en,
        styleCover: selectedStyle.value.cover,
        packageId: pkg.id,
        packageName: pkg.name,
        packagePrice: pkg.price,
        storeId: selectedStore.value.id,
        storeName: selectedStore.value.name,
        storeAddress: selectedStore.value.address,
        date: selectedDate.value,
        time: selectedTime.value,
        contactName: name,
        contactPhone: phone,
        wechat: form.wechat.trim(),
        note: form.note.trim(),
        extraRetouch: extraRetouch.value,
        extraFee: extraRetouch.value * ADDON_RETOUCH_PRICE,
        total: total.value,
        deposit: deposit.value,
        balance: balance.value
      })

      uni.hideLoading()
      submitting.value = false
      resetBooking()
      uni.navigateTo({
        url: `/pages/booking/success?id=${order.id}`
      })
    } catch (error) {
      uni.hideLoading()
      submitting.value = false
      uni.showToast({ title: '提交失败，请稍后再试', icon: 'none' })
    }
  }, 480)
}

onShareAppMessage(() => ({
  title: '一页写真 · 预约一次属于你的拍摄',
  path: '/pages/booking/create'
}))
</script>

<style scoped>
.booking-page {
  padding-bottom: 50rpx;
}

.intro {
  padding-top: 16rpx;
}

.title {
  display: flex;
  flex-direction: column;
  margin-top: 14rpx;
  color: var(--ink, #211c17);
  font-size: 56rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.35;
}

.desc {
  display: block;
  max-width: 610rpx;
  margin-top: 18rpx;
  color: var(--muted, #8d8175);
  font-size: 23rpx;
  line-height: 1.8;
}

.step-head {
  display: flex;
  align-items: baseline;
  gap: 18rpx;
  margin-top: 52rpx;
  margin-bottom: 20rpx;
}

.step-head--last {
  margin-top: 48rpx;
}

.step-no {
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 22rpx;
  font-style: italic;
  letter-spacing: 1rpx;
}

.step-title {
  color: var(--ink, #211c17);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.service-card,
.booking-card,
.form-card,
.summary-card {
  overflow: hidden;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 26rpx;
  background: var(--paper, #fffcf7);
}

.service-card {
  padding: 24rpx;
}

.style-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
}

.row--hover {
  opacity: 0.7;
}

.style-thumb {
  flex-shrink: 0;
  width: 122rpx;
  height: 150rpx;
  border-radius: 16rpx;
}

.style-copy {
  flex: 1;
  min-width: 0;
}

.row-en {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  line-height: 1.5;
}

.row-title {
  display: block;
  margin-top: 2rpx;
  color: var(--ink, #211c17);
  font-size: 34rpx;
  font-weight: 600;
  line-height: 1.35;
}

.row-sub {
  display: block;
  margin-top: 2rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.change {
  flex-shrink: 0;
  padding: 8rpx 15rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 17rpx;
  line-height: 1.4;
}

.divider {
  height: 1rpx;
  margin: 22rpx 0;
  background: var(--line, #e7ddd0);
}

.package-row {
  display: flex;
  align-items: center;
  gap: 14rpx;
}

.package-copy {
  flex: 1;
  min-width: 0;
}

.package-price {
  display: flex;
  align-items: baseline;
  flex-shrink: 0;
  color: var(--ink, #211c17);
}

.package-cur {
  font-size: 18rpx;
  font-weight: 600;
}

.package-num {
  font-family: 'Times New Roman', serif;
  font-size: 40rpx;
  font-weight: 700;
  line-height: 1;
}

.addon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 22rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.addon-title {
  display: block;
  color: var(--ink, #211c17);
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.5;
}

.addon-sub {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
}

.stepper {
  display: flex;
  align-items: center;
  gap: 4rpx;
  padding: 4rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
}

.stepper-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
  background: var(--paper-deep, #f9f3ea);
  color: var(--ink, #211c17);
  font-size: 27rpx;
  font-weight: 500;
  line-height: 1;
}

.stepper-btn--disabled {
  color: var(--muted-light, #b5aa9e);
  opacity: 0.55;
}

.stepper-value {
  width: 48rpx;
  color: var(--ink, #211c17);
  font-family: 'Times New Roman', serif;
  font-size: 26rpx;
  text-align: center;
}

.booking-card {
  padding: 24rpx;
}

.field-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12rpx;
}

.field-head--date {
  margin-top: 28rpx;
}

.field-head--time {
  margin-top: 28rpx;
}

.field-title {
  color: var(--ink, #211c17);
  font-size: 23rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.field-hint {
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.5;
}

.store-select {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 18rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 18rpx;
  background: var(--paper-deep, #f9f3ea);
}

.store-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
  background: var(--ink, #211c17);
  color: #f6ecd9;
  font-family: 'Songti SC', serif;
  font-size: 20rpx;
}

.store-copy {
  flex: 1;
  min-width: 0;
}

.store-name {
  display: block;
  color: var(--ink, #211c17);
  font-size: 23rpx;
  font-weight: 600;
  line-height: 1.4;
}

.store-address {
  display: block;
  margin-top: 1rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 18rpx;
  line-height: 1.4;
}

.store-metro {
  display: block;
  margin-top: 1rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.date-scroll {
  width: 100%;
  white-space: nowrap;
}

.date-row {
  display: flex;
  gap: 10rpx;
}

.date-item {
  position: relative;
  display: flex;
  flex: 0 0 92rpx;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 92rpx;
  height: 144rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 16rpx;
  background: #fff;
}

.date-item--active {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.date-item--closed {
  opacity: 0.48;
}

.date-week {
  font-size: 17rpx;
  line-height: 1.4;
}

.date-day {
  margin: 2rpx 0;
  font-family: 'Times New Roman', serif;
  font-size: 38rpx;
  font-weight: 700;
  line-height: 1.1;
}

.date-month {
  font-size: 15rpx;
  line-height: 1.4;
  opacity: 0.62;
}

.date-closed {
  position: absolute;
  right: 7rpx;
  bottom: 7rpx;
  color: var(--accent, #d65b43);
  font-size: 13rpx;
  line-height: 1.3;
}

.date-item--active .date-closed {
  color: #f0b6a5;
}

.slot-groups {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.slot-group {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.slot-label {
  flex-shrink: 0;
  width: 52rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.4;
}

.slot-grid {
  display: flex;
  flex: 1;
  gap: 10rpx;
}

.slot {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 72rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 12rpx;
  background: #fff;
  color: var(--ink, #211c17);
  font-family: 'Times New Roman', serif;
  font-size: 23rpx;
  line-height: 1.2;
}

.slot--active {
  border-color: var(--accent, #d65b43);
  background: var(--accent, #d65b43);
  color: #fff;
}

.slot--full {
  color: var(--muted-light, #b5aa9e);
  background: rgba(249, 243, 234, 0.5);
}

.slot-full {
  margin-top: 1rpx;
  font-family: -apple-system, 'PingFang SC', sans-serif;
  font-size: 13rpx;
  line-height: 1.2;
}

.selection-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 22rpx;
  padding-top: 18rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  color: var(--ink, #211c17);
  font-size: 20rpx;
  font-weight: 500;
  line-height: 1.5;
}

.selection-empty {
  color: var(--accent-deep, #b94732);
  font-weight: 400;
}

.selection-store {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  font-weight: 400;
}

.form-card {
  padding: 0 24rpx;
}

.form-row {
  display: flex;
  align-items: center;
  min-height: 92rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.form-label {
  flex-shrink: 0;
  width: 130rpx;
  color: var(--ink, #211c17);
  font-size: 22rpx;
  font-weight: 500;
  line-height: 1.5;
}

.form-input {
  flex: 1;
  height: 88rpx;
  color: var(--ink, #211c17);
  font-size: 23rpx;
}

.form-note {
  padding: 22rpx 0 24rpx;
}

.note-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.note-count {
  color: var(--muted-light, #b5aa9e);
  font-size: 16rpx;
}

.note-textarea {
  width: 100%;
  min-height: 120rpx;
  margin-top: 10rpx;
  padding: 16rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 14rpx;
  background: var(--paper-deep, #f9f3ea);
  color: var(--ink, #211c17);
  font-size: 21rpx;
  line-height: 1.65;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 10rpx;
  margin-top: 20rpx;
  padding: 0 2rpx;
}

.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 30rpx;
  height: 30rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 6rpx;
  background: #fff;
}

.checkbox--on {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
}

.checkbox-tick {
  color: #fff9f1;
  font-size: 17rpx;
  line-height: 1;
}

.agreement-text {
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.agreement-link {
  color: var(--accent-deep, #b94732);
  font-size: 19rpx;
  text-decoration: underline;
  text-underline-offset: 4rpx;
}

.summary-card {
  padding: 24rpx;
}

.summary-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20rpx;
  padding: 8rpx 0;
}

.summary-label {
  color: var(--muted, #8d8175);
  font-size: 20rpx;
  line-height: 1.5;
}

.summary-value {
  color: var(--ink-soft, #4d443b);
  font-size: 21rpx;
  line-height: 1.5;
  text-align: right;
}

.summary-total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 16rpx;
  padding-top: 18rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.summary-total-label {
  color: var(--ink, #211c17);
  font-size: 24rpx;
  font-weight: 600;
}

.summary-total-price {
  display: flex;
  align-items: baseline;
  color: var(--ink, #211c17);
}

.summary-cur {
  font-size: 22rpx;
  font-weight: 600;
}

.summary-num {
  font-family: 'Times New Roman', serif;
  font-size: 52rpx;
  font-weight: 700;
  line-height: 1;
}

.deposit-note {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  margin-top: 10rpx;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.5;
}

.deposit-note text:last-child {
  color: var(--olive, #6e7657);
}

.submit-area {
  margin-top: 26rpx;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16rpx;
  width: 100%;
  height: 96rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 27rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
}

.submit-btn--loading {
  opacity: 0.65;
}

.submit-arrow {
  font-size: 30rpx;
}

.submit-tip {
  display: block;
  margin-top: 14rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.6;
  text-align: center;
}

/* Sheet */
.sheet-list {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.sheet-style {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 16rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 20rpx;
  background: var(--paper, #fffcf7);
}

.sheet-style--active {
  border-color: var(--ink, #211c17);
  background: #fffaf2;
}

.sheet-thumb {
  flex-shrink: 0;
  width: 100rpx;
  height: 124rpx;
  border-radius: 12rpx;
}

.sheet-copy {
  flex: 1;
  min-width: 0;
}

.sheet-name-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12rpx;
}

.sheet-name {
  color: var(--ink, #211c17);
  font-size: 29rpx;
  font-weight: 600;
  line-height: 1.4;
}

.sheet-price {
  flex-shrink: 0;
  color: var(--accent-deep, #b94732);
  font-size: 19rpx;
  font-weight: 600;
}

.sheet-sub {
  display: block;
  margin-top: 1rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sheet-tags {
  display: block;
  margin-top: 4rpx;
  color: var(--olive, #6e7657);
  font-size: 16rpx;
  line-height: 1.4;
}

.sheet-radio {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 50%;
  background: #fff;
  color: #fff9f1;
  font-size: 16rpx;
}

.sheet-radio--on {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
}

.package-sheet {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
}

.sheet-footnote {
  display: block;
  margin-top: 12rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.6;
  text-align: center;
}

.store-sheet-item {
  padding: 20rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 20rpx;
  background: var(--paper, #fffcf7);
}

.store-sheet-item--active {
  border-color: var(--ink, #211c17);
  background: #fffaf2;
}

.store-sheet-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.store-sheet-name {
  color: var(--ink, #211c17);
  font-size: 27rpx;
  font-weight: 600;
}

.store-sheet-current {
  padding: 2rpx 10rpx;
  border-radius: 999rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-size: 15rpx;
}

.store-sheet-address {
  display: block;
  margin-top: 6rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 19rpx;
  line-height: 1.5;
}

.store-sheet-metro {
  display: block;
  margin-top: 2rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
}

.store-sheet-tags {
  display: flex;
  gap: 10rpx;
  margin-top: 10rpx;
}

.store-sheet-tags text {
  padding: 2rpx 10rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 4rpx;
  color: var(--olive, #6e7657);
  font-size: 15rpx;
  line-height: 1.6;
}
</style>
