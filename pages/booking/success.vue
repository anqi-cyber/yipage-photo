<template>
  <view class="page success-page">
    <yp-nav-bar title="预约成功" :back="false" />

    <view v-if="order" class="content">
      <view class="success-hero">
        <view class="check-wrap">
          <view class="check-ring check-ring--outer"></view>
          <view class="check-ring check-ring--inner"></view>
          <view class="check-circle">
            <text class="check-glyph">✓</text>
          </view>
        </view>
        <text class="success-en">BOOKING CONFIRMED</text>
        <text class="success-title serif">预约已提交</text>
        <text class="success-desc">
          客服会在 30 分钟内通过电话或微信与你确认档期，请保持手机畅通。
        </text>
      </view>

      <view class="ticket">
        <view class="ticket-top">
          <view>
            <text class="ticket-label">预约编号</text>
            <text class="ticket-no">{{ order.id }}</text>
          </view>
          <text class="ticket-status">{{ statusMeta.label }}</text>
        </view>

        <view class="ticket-main">
          <view class="date-block">
            <text class="date-month">{{ dateParts.month }}</text>
            <text class="date-day">{{ dateParts.day }}</text>
            <text class="date-week">{{ dateParts.weekday }}</text>
          </view>
          <view class="ticket-info">
            <text class="ticket-time">{{ order.time }} 到店</text>
            <text class="ticket-store">{{ order.storeName }}</text>
            <text class="ticket-address">{{ order.storeAddress }}</text>
          </view>
        </view>

        <view class="ticket-divider">
          <view class="notch notch--left"></view>
          <view class="dash"></view>
          <view class="notch notch--right"></view>
        </view>

        <view class="ticket-detail">
          <view class="detail-row">
            <text class="detail-label">拍摄风格</text>
            <text class="detail-value">{{ order.styleName }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">套餐</text>
            <text class="detail-value">{{ order.packageName }} · ¥{{ order.packagePrice }}</text>
          </view>
          <view v-if="order.extraRetouch > 0" class="detail-row">
            <text class="detail-label">加选精修</text>
            <text class="detail-value">× {{ order.extraRetouch }} · ¥{{ order.extraFee }}</text>
          </view>
          <view class="detail-row detail-row--total">
            <text class="detail-label">合计</text>
            <view class="detail-total">
              <text class="detail-cur">¥</text>
              <text class="detail-num">{{ order.total }}</text>
            </view>
          </view>
          <view class="deposit-line">
            <text>到店支付定金 ¥{{ order.deposit }}</text>
            <text>尾款 ¥{{ order.balance }}</text>
          </view>
        </view>
      </view>

      <view class="next">
        <text class="next-en">WHAT HAPPENS NEXT</text>
        <view class="next-row">
          <text class="next-no">01</text>
          <view class="next-copy">
            <text class="next-title">客服确认</text>
            <text class="next-desc">30 分钟内联系你，确认摄影师与到店细节</text>
          </view>
        </view>
        <view class="next-row">
          <text class="next-no">02</text>
          <view class="next-copy">
            <text class="next-title">到店拍摄</text>
            <text class="next-desc">提前 10 分钟到店，支付定金并挑选服装</text>
          </view>
        </view>
        <view class="next-row">
          <text class="next-no">03</text>
          <view class="next-copy">
            <text class="next-title">选片交付</text>
            <text class="next-desc">7 天内通过云盘收到精修与调色底片</text>
          </view>
        </view>
      </view>

      <view class="actions">
        <view class="primary-btn" hover-class="btn-hover" @tap="goDetail">
          <text>查看预约详情</text>
          <text class="btn-arrow">→</text>
        </view>
        <view class="ghost-btn" hover-class="tap-hover" @tap="goHome">返回首页</view>
      </view>

      <text class="demo-note">
        演示原型：本次预约保存在本机，未连接真实支付与短信服务。
      </text>
    </view>

    <view v-else class="missing">
      <text class="missing-title serif">没有找到这条预约</text>
      <text class="missing-desc">可能已经被清理，回到首页重新预约吧。</text>
      <view class="missing-btn" @tap="goHome">返回首页</view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getDateParts } from '@/common/date.js'
import { getOrderById, getStatusMeta } from '@/common/order.js'

const order = ref(null)
const statusMeta = computed(() => getStatusMeta(order.value ? order.value.status : 'pending'))
const dateParts = computed(() => getDateParts(order.value ? order.value.date : ''))

onLoad((options) => {
  if (options && options.id) {
    order.value = getOrderById(options.id)
  }
})

function goDetail() {
  uni.navigateTo({ url: `/pages/orders/detail?id=${order.value.id}` })
}

function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  padding-bottom: 44rpx;
}

.content {
  padding: 0 32rpx;
}

.success-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34rpx 0 38rpx;
  text-align: center;
}

.check-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170rpx;
  height: 170rpx;
  margin-bottom: 26rpx;
}

.check-ring {
  position: absolute;
  border: 1rpx solid rgba(110, 118, 87, 0.24);
  border-radius: 50%;
}

.check-ring--outer {
  width: 170rpx;
  height: 170rpx;
  animation: ring-breathe 2.6s ease-in-out infinite;
}

.check-ring--inner {
  width: 132rpx;
  height: 132rpx;
  border-color: rgba(110, 118, 87, 0.38);
}

.check-circle {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 94rpx;
  height: 94rpx;
  border-radius: 50%;
  background: var(--olive, #6e7657);
  box-shadow: 0 8rpx 24rpx rgba(110, 118, 87, 0.24);
  animation: check-pop 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.3) both;
}

.check-glyph {
  margin-top: -4rpx;
  color: #fff9f1;
  font-size: 52rpx;
  font-weight: 300;
  line-height: 1;
}

.success-en {
  color: var(--olive, #6e7657);
  font-size: 15rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.success-title {
  margin-top: 8rpx;
  color: var(--ink, #211c17);
  font-size: 54rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.35;
}

.success-desc {
  max-width: 560rpx;
  margin-top: 12rpx;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.75;
}

.ticket {
  position: relative;
  overflow: hidden;
  border-radius: 26rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 12rpx 34rpx rgba(57, 43, 31, 0.06);
}

.ticket-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
  padding: 24rpx 26rpx 18rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.ticket-label {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 15rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.ticket-no {
  display: block;
  margin-top: 1rpx;
  color: var(--ink, #211c17);
  font-family: 'Times New Roman', serif;
  font-size: 23rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.ticket-status {
  flex-shrink: 0;
  padding: 5rpx 14rpx;
  border-radius: 999rpx;
  background: #f7ead5;
  color: #9a651f;
  font-size: 16rpx;
  font-weight: 500;
  line-height: 1.5;
}

.ticket-main {
  display: flex;
  align-items: center;
  gap: 22rpx;
  padding: 26rpx;
}

.date-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 128rpx;
  height: 148rpx;
  border-radius: 18rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.date-month {
  font-size: 16rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
  opacity: 0.62;
}

.date-day {
  margin: 2rpx 0;
  font-family: 'Times New Roman', serif;
  font-size: 56rpx;
  font-weight: 700;
  line-height: 1;
}

.date-week {
  font-size: 17rpx;
  line-height: 1.4;
  opacity: 0.72;
}

.ticket-info {
  flex: 1;
  min-width: 0;
}

.ticket-time {
  display: block;
  color: var(--ink, #211c17);
  font-family: 'Songti SC', 'STSong', serif;
  font-size: 32rpx;
  font-weight: 600;
  line-height: 1.4;
}

.ticket-store {
  display: block;
  margin-top: 3rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
  font-weight: 500;
  line-height: 1.5;
}

.ticket-address {
  display: block;
  margin-top: 3rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.5;
}

.ticket-divider {
  position: relative;
  display: flex;
  align-items: center;
}

.notch {
  position: absolute;
  width: 28rpx;
  height: 28rpx;
  border-radius: 50%;
  background: var(--bg, #f4eee5);
}

.notch--left {
  left: -14rpx;
}

.notch--right {
  right: -14rpx;
}

.dash {
  flex: 1;
  margin: 0 22rpx;
  border-top: 1rpx dashed var(--line, #e7ddd0);
}

.ticket-detail {
  padding: 20rpx 26rpx 24rpx;
}

.detail-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 20rpx;
  padding: 6rpx 0;
}

.detail-label {
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.detail-value {
  color: var(--ink-soft, #4d443b);
  font-size: 20rpx;
  line-height: 1.5;
  text-align: right;
}

.detail-row--total {
  margin-top: 8rpx;
  padding-top: 12rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.detail-total {
  display: flex;
  align-items: baseline;
  color: var(--ink, #211c17);
}

.detail-cur {
  font-size: 19rpx;
  font-weight: 600;
}

.detail-num {
  font-family: 'Times New Roman', serif;
  font-size: 42rpx;
  font-weight: 700;
  line-height: 1;
}

.deposit-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8rpx;
  padding-top: 12rpx;
  border-top: 1rpx dashed var(--line, #e7ddd0);
  color: var(--olive, #6e7657);
  font-size: 17rpx;
  line-height: 1.5;
}

.next {
  margin-top: 40rpx;
  padding: 26rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
}

.next-en {
  display: block;
  margin-bottom: 14rpx;
  color: var(--muted, #8d8175);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.next-row {
  display: flex;
  gap: 16rpx;
  padding: 10rpx 0;
}

.next-no {
  flex-shrink: 0;
  width: 44rpx;
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 19rpx;
  font-style: italic;
  line-height: 1.6;
}

.next-copy {
  flex: 1;
  min-width: 0;
}

.next-title {
  display: block;
  color: var(--ink, #211c17);
  font-size: 21rpx;
  font-weight: 600;
  line-height: 1.5;
}

.next-desc {
  display: block;
  margin-top: 1rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 14rpx;
  margin-top: 34rpx;
}

.primary-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14rpx;
  height: 92rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 25rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.btn-arrow {
  font-size: 27rpx;
}

.ghost-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 82rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
}

.demo-note {
  display: block;
  margin-top: 22rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 16rpx;
  line-height: 1.6;
  text-align: center;
}

.missing {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 140rpx 60rpx;
  text-align: center;
}

.missing-title {
  color: var(--ink, #211c17);
  font-size: 40rpx;
  font-weight: 600;
}

.missing-desc {
  margin-top: 14rpx;
  color: var(--muted, #8d8175);
  font-size: 22rpx;
  line-height: 1.7;
}

.missing-btn {
  margin-top: 36rpx;
  padding: 20rpx 40rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 23rpx;
}

@keyframes check-pop {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes ring-breathe {
  0%,
  100% {
    opacity: 0.55;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1.02);
  }
}
</style>
