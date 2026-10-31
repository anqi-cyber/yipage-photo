<template>
  <view class="page detail-page">
    <yp-nav-bar title="预约详情" />

    <view v-if="order" class="content">
      <view
        class="status-banner"
        :style="{ background: statusMeta.bg, borderColor: statusMeta.bg }"
      >
        <view class="status-head">
          <text class="status-en">SESSION STATUS</text>
          <text class="status-label" :style="{ color: statusMeta.color }">{{ statusMeta.label }}</text>
        </view>
        <text class="status-hint">{{ statusMeta.hint }}</text>
        <text class="status-no">NO. {{ order.id }}</text>
      </view>

      <view class="section">
        <view class="date-card">
          <view class="date-block">
            <text class="date-month">{{ dateParts.month }}</text>
            <text class="date-day">{{ dateParts.day }}</text>
            <text class="date-week">{{ dateParts.weekday }}</text>
          </view>
          <view class="date-info">
            <text class="date-time">{{ order.time }} 到店</text>
            <text class="date-full">{{ dateParts.full }}</text>
            <text class="date-store">{{ order.storeName }}</text>
            <view class="copy-link" @tap="copyAddress">
              <text>复制门店地址</text>
              <text class="copy-arrow">↗</text>
            </view>
          </view>
        </view>
      </view>

      <view class="section block">
        <view class="block-head">
          <text class="block-title">拍摄内容</text>
          <text class="block-en">SESSION</text>
        </view>
        <view class="service-card">
          <image class="service-cover" :src="order.styleCover" mode="aspectFill"></image>
          <view class="service-copy">
            <text class="service-style serif">{{ order.styleName }}</text>
            <text class="service-package">{{ order.packageName }}</text>
            <text class="service-price">套餐价 ¥{{ order.packagePrice }}</text>
            <text v-if="order.extraRetouch > 0" class="service-addon">
              含加选精修 × {{ order.extraRetouch }}
            </text>
          </view>
        </view>
      </view>

      <view class="section block">
        <view class="block-head">
          <text class="block-title">到店信息</text>
          <text class="block-en">DETAILS</text>
        </view>
        <view class="info-card">
          <view class="info-row">
            <text class="info-label">拍摄门店</text>
            <view class="info-value-wrap">
              <text class="info-value">{{ order.storeName }}</text>
              <text class="info-sub">{{ order.storeAddress }}</text>
            </view>
          </view>
          <view class="info-row">
            <text class="info-label">联系人</text>
            <text class="info-value">{{ order.contactName }}</text>
          </view>
          <view class="info-row">
            <text class="info-label">手机号</text>
            <text class="info-value">{{ maskPhone(order.contactPhone) }}</text>
          </view>
          <view v-if="order.wechat" class="info-row">
            <text class="info-label">微信</text>
            <text class="info-value">{{ order.wechat }}</text>
          </view>
          <view class="info-row info-row--note">
            <text class="info-label">想拍的感觉</text>
            <text class="info-value info-value--note">{{ order.note || '暂时没有备注，到店再聊也可以。' }}</text>
          </view>
        </view>
      </view>

      <view class="section block">
        <view class="block-head">
          <text class="block-title">费用明细</text>
          <text class="block-en">PAYMENT</text>
        </view>
        <view class="price-card">
          <view class="price-row">
            <text class="price-label">{{ order.packageName }} 套餐</text>
            <text class="price-value">¥{{ order.packagePrice }}</text>
          </view>
          <view v-if="order.extraRetouch > 0" class="price-row">
            <text class="price-label">加选精修 × {{ order.extraRetouch }}</text>
            <text class="price-value">¥{{ order.extraFee }}</text>
          </view>
          <view class="price-row price-row--total">
            <text class="price-total-label">合计</text>
            <view class="price-total">
              <text class="price-cur">¥</text>
              <text class="price-num">{{ order.total }}</text>
            </view>
          </view>
          <view class="pay-split">
            <view class="pay-item">
              <text class="pay-item-label">到店支付定金</text>
              <text class="pay-item-value">¥{{ order.deposit }}</text>
            </view>
            <view class="pay-item">
              <text class="pay-item-label">拍摄当天尾款</text>
              <text class="pay-item-value">¥{{ order.balance }}</text>
            </view>
          </view>
        </view>
      </view>

      <view class="section block">
        <view class="block-head">
          <text class="block-title">预约须知</text>
          <text class="block-en">NOTES</text>
        </view>
        <view class="notes">
          <text class="note-item">· 拍摄前 48 小时可免费改期一次，当天改期需补 ¥80。</text>
          <text class="note-item">· 请提前 10 分钟到店，迟到超过 30 分钟将顺延或重新预约。</text>
          <text class="note-item">· 套餐内底片全部赠送，精修 7 天内通过云盘交付。</text>
          <text class="note-item">· 未经允许，门店不会将照片用于宣传。</text>
        </view>
      </view>

      <view class="section actions">
        <view v-if="canCancel" class="action-ghost" hover-class="tap-hover" @tap="cancel">
          取消预约
        </view>
        <view class="action-dark" hover-class="btn-hover" @tap="rebook">
          <text>再次预约</text>
          <text class="action-arrow">→</text>
        </view>
      </view>

      <view class="section contact-row">
        <text>需要帮助？</text>
        <text class="contact-link" @tap="contactStore">联系门店客服 →</text>
      </view>

      <text v-if="order.demo" class="demo-note">这是一条演示预约，可在「我的」中清空本机数据。</text>
    </view>

    <yp-empty
      v-else
      title="没有找到这条预约"
      desc="预约记录可能已经被清理，去预约页重新选一个时间吧。"
      action="去预约"
      @action="goBooking"
    />
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getDateParts, formatDateCN } from '@/common/date.js'
import {
  cancelOrder,
  getOrderById,
  getStatusMeta,
  maskPhone
} from '@/common/order.js'
import { setBookingDraft } from '@/common/booking.js'

const orderId = ref('')
const order = ref(null)

onLoad((options) => {
  if (options && options.id) {
    orderId.value = options.id
    order.value = getOrderById(options.id)
  }
})

onShow(() => {
  if (orderId.value) {
    order.value = getOrderById(orderId.value)
  }
})

const statusMeta = computed(() => getStatusMeta(order.value ? order.value.status : 'pending'))
const dateParts = computed(() => getDateParts(order.value ? order.value.date : ''))
const canCancel = computed(() => {
  if (!order.value) return false
  return order.value.status === 'pending' || order.value.status === 'upcoming'
})

function copyAddress() {
  if (!order.value) return
  uni.setClipboardData({
    data: order.value.storeAddress,
    success() {
      uni.showToast({ title: '门店地址已复制', icon: 'none' })
    }
  })
}

function contactStore() {
  if (!order.value) return
  uni.showModal({
    title: `${order.value.storeName} · 客服`,
    content: `拍摄时间：${formatDateCN(order.value.date)} ${order.value.time}\n门店地址：${order.value.storeAddress}\n\n修改时间或咨询拍摄，请直接回复客服微信。`,
    confirmText: '复制地址',
    success(result) {
      if (result.confirm) copyAddress()
    }
  })
}

function cancel() {
  if (!order.value) return
  uni.showModal({
    title: '取消这次预约？',
    content: '取消后如需拍摄，需要重新选择档期。定金尚未支付，不会产生扣款。',
    confirmText: '确认取消',
    confirmColor: '#b94732',
    success(result) {
      if (!result.confirm) return
      cancelOrder(order.value.id)
      order.value = getOrderById(order.value.id)
      uni.showToast({ title: '预约已取消', icon: 'none' })
    }
  })
}

function rebook() {
  if (!order.value) return
  setBookingDraft({
    styleId: order.value.styleId,
    packageId: order.value.packageId,
    storeId: order.value.storeId
  })
  uni.switchTab({ url: '/pages/booking/create' })
}

function goBooking() {
  uni.switchTab({ url: '/pages/booking/create' })
}
</script>

<style scoped>
.detail-page {
  padding-bottom: 46rpx;
}

.content {
  padding-top: 6rpx;
}

.status-banner {
  margin: 0 36rpx;
  padding: 24rpx 26rpx;
  border: 1rpx solid transparent;
  border-radius: 22rpx;
}

.status-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20rpx;
}

.status-en {
  color: rgba(33, 28, 23, 0.45);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.status-label {
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.status-hint {
  display: block;
  margin-top: 5rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 20rpx;
  line-height: 1.6;
}

.status-no {
  display: block;
  margin-top: 14rpx;
  color: rgba(33, 28, 23, 0.42);
  font-family: 'Times New Roman', serif;
  font-size: 16rpx;
  letter-spacing: 1rpx;
}

.section {
  padding: 0 36rpx;
}

.date-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-top: 22rpx;
  padding: 24rpx;
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 8rpx 24rpx rgba(57, 43, 31, 0.04);
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 132rpx;
  height: 152rpx;
  border-radius: 18rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.date-month {
  font-size: 16rpx;
  letter-spacing: 1rpx;
  opacity: 0.62;
}

.date-day {
  margin: 2rpx 0;
  font-family: 'Times New Roman', serif;
  font-size: 58rpx;
  font-weight: 700;
  line-height: 1;
}

.date-week {
  font-size: 17rpx;
  opacity: 0.72;
}

.date-info {
  flex: 1;
  min-width: 0;
}

.date-time {
  display: block;
  color: var(--ink, #211c17);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 31rpx;
  font-weight: 600;
  line-height: 1.4;
}

.date-full {
  display: block;
  margin-top: 2rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 20rpx;
  line-height: 1.5;
}

.date-store {
  display: block;
  margin-top: 2rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.5;
}

.copy-link {
  display: flex;
  align-items: center;
  gap: 5rpx;
  margin-top: 10rpx;
  color: var(--accent-deep, #b94732);
  font-size: 17rpx;
  line-height: 1.5;
}

.copy-arrow {
  font-size: 18rpx;
}

.block {
  margin-top: 42rpx;
}

.block-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 16rpx;
}

.block-title {
  color: var(--ink, #211c17);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.block-en {
  color: var(--muted-light, #b5aa9e);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.service-card {
  display: flex;
  gap: 20rpx;
  padding: 20rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 22rpx;
  background: var(--paper, #fffcf7);
}

.service-cover {
  flex-shrink: 0;
  width: 170rpx;
  height: 210rpx;
  border-radius: 14rpx;
}

.service-copy {
  flex: 1;
  min-width: 0;
  padding-top: 2rpx;
}

.service-style {
  display: block;
  color: var(--ink, #211c17);
  font-size: 33rpx;
  font-weight: 600;
  line-height: 1.4;
}

.service-package {
  display: block;
  margin-top: 1rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 20rpx;
  line-height: 1.5;
}

.service-price {
  display: block;
  margin-top: 8rpx;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.service-addon {
  display: block;
  margin-top: 2rpx;
  color: var(--olive, #6e7657);
  font-size: 18rpx;
  line-height: 1.5;
}

.info-card {
  overflow: hidden;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 22rpx;
  background: var(--paper, #fffcf7);
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
  padding: 18rpx 22rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.info-row:last-child {
  border-bottom: 0;
}

.info-label {
  flex-shrink: 0;
  width: 130rpx;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.6;
}

.info-value-wrap {
  flex: 1;
  min-width: 0;
}

.info-value {
  flex: 1;
  color: var(--ink, #211c17);
  font-size: 20rpx;
  line-height: 1.6;
  word-break: break-all;
}

.info-sub {
  display: block;
  margin-top: 1rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
}

.info-value--note {
  color: var(--ink-soft, #4d443b);
  line-height: 1.7;
}

.price-card {
  padding: 20rpx 22rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 22rpx;
  background: var(--paper, #fffcf7);
}

.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20rpx;
  padding: 7rpx 0;
}

.price-label {
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.price-value {
  color: var(--ink-soft, #4d443b);
  font-size: 20rpx;
  line-height: 1.5;
}

.price-row--total {
  margin-top: 8rpx;
  padding-top: 14rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.price-total-label {
  color: var(--ink, #211c17);
  font-size: 23rpx;
  font-weight: 600;
}

.price-total {
  display: flex;
  align-items: baseline;
  color: var(--ink, #211c17);
}

.price-cur {
  font-size: 20rpx;
  font-weight: 600;
}

.price-num {
  font-family: 'Times New Roman', serif;
  font-size: 46rpx;
  font-weight: 700;
  line-height: 1;
}

.pay-split {
  display: flex;
  margin-top: 16rpx;
  padding-top: 14rpx;
  border-top: 1rpx dashed var(--line, #e7ddd0);
}

.pay-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rpx;
  padding: 0 14rpx;
  border-right: 1rpx solid var(--line, #e7ddd0);
}

.pay-item:first-child {
  padding-left: 0;
}

.pay-item:last-child {
  border-right: 0;
}

.pay-item-label {
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.5;
}

.pay-item-value {
  color: var(--olive, #6e7657);
  font-family: 'Times New Roman', serif;
  font-size: 25rpx;
  font-weight: 600;
  line-height: 1.4;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 7rpx;
  padding: 18rpx 22rpx;
  border-left: 3rpx solid var(--line, #e7ddd0);
  background: rgba(255, 252, 247, 0.52);
}

.note-item {
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.7;
}

.actions {
  display: flex;
  gap: 14rpx;
  margin-top: 38rpx;
}

.action-ghost {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 220rpx;
  height: 88rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
}

.action-dark {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 12rpx;
  height: 88rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 24rpx;
  font-weight: 600;
}

.action-arrow {
  font-size: 27rpx;
}

.contact-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  margin-top: 26rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
}

.contact-link {
  color: var(--accent-deep, #b94732);
  text-decoration: underline;
  text-underline-offset: 4rpx;
}

.demo-note {
  display: block;
  padding: 20rpx 36rpx 0;
  color: var(--muted-light, #b5aa9e);
  font-size: 16rpx;
  line-height: 1.6;
  text-align: center;
}
</style>
