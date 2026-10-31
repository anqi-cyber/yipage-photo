<template>
  <view class="page packages-page">
    <yp-nav-bar title="套餐与价格" />

    <view class="section header">
      <text class="eyebrow">PRICE LIST / 2026</text>
      <view class="title serif">
        <text>把预算说清楚，</text>
        <text>把照片拍好看。</text>
      </view>
      <text class="desc">
        没有到店加价，也没有“底片另购”。选一个适合你的套餐，剩下的只管放松。
      </text>
    </view>

    <view class="section trust">
      <view v-for="item in TRUST_ITEMS" :key="item.title" class="trust-item">
        <text class="trust-title">{{ item.title }}</text>
        <text class="trust-desc">{{ item.desc }}</text>
      </view>
    </view>

    <view class="section package-list">
      <view v-for="pkg in PACKAGES" :key="pkg.id" class="package-wrap">
        <yp-package-card :pkg="pkg" :selected="selectedId === pkg.id" @select="selectPackage" />
      </view>
    </view>

    <view class="section included">
      <text class="block-en">EVERY PACKAGE INCLUDES</text>
      <text class="block-title serif">每个套餐，都包含</text>
      <view class="included-grid">
        <view class="included-item">
          <text class="included-no">01</text>
          <text class="included-name">拍摄策划</text>
          <text class="included-desc">提前沟通风格与场景</text>
        </view>
        <view class="included-item">
          <text class="included-no">02</text>
          <text class="included-name">原片调色</text>
          <text class="included-desc">套餐内底片全部赠送</text>
        </view>
        <view class="included-item">
          <text class="included-no">03</text>
          <text class="included-name">云盘交付</text>
          <text class="included-desc">7 天内发送下载链接</text>
        </view>
        <view class="included-item">
          <text class="included-no">04</text>
          <text class="included-name">隐私保护</text>
          <text class="included-desc">未经允许不使用照片</text>
        </view>
      </view>
    </view>

    <view class="section faq">
      <text class="block-en">BEFORE YOU BOOK</text>
      <text class="block-title serif">预约前，你可能想知道</text>
      <view class="faq-list">
        <view class="faq-item">
          <text class="faq-q">可以改期吗？</text>
          <text class="faq-a">拍摄前 48 小时可免费改期一次；当天改期需补 ¥80 档期费。</text>
        </view>
        <view class="faq-item">
          <text class="faq-q">定金怎么付？</text>
          <text class="faq-a">提交预约后到店支付定金锁档，尾款在拍摄当天结清。定金金额见套餐卡片。</text>
        </view>
        <view class="faq-item">
          <text class="faq-q">可以加片或加人吗？</text>
          <text class="faq-a">超出套餐的精修 ¥30/张；多人拍摄建议选择“双人纪念”套餐，或先联系客服确认。</text>
        </view>
      </view>
    </view>

    <view class="bottom-space"></view>

    <view class="bottom-bar">
      <view class="bar-info">
        <text class="bar-label">已选 · {{ selectedPackage.name }}</text>
        <view class="bar-price">
          <text class="bar-cur">¥</text>
          <text class="bar-num">{{ selectedPackage.price }}</text>
          <text class="bar-deposit">定金 ¥{{ selectedPackage.deposit }}</text>
        </view>
      </view>
      <view class="bar-btn" hover-class="btn-hover" @tap="goBooking">
        <text>去预约</text>
        <text class="bar-arrow">→</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { PACKAGES, TRUST_ITEMS, findPackage } from '@/common/data.js'
import { setBookingDraft } from '@/common/booking.js'

const selectedId = ref('signature')
const selectedPackage = computed(() => findPackage(selectedId.value))

onLoad((options) => {
  if (options && options.id) {
    selectedId.value = findPackage(options.id).id
  }
})

function selectPackage(pkg) {
  selectedId.value = pkg.id
}

function goBooking() {
  setBookingDraft({ packageId: selectedId.value })
  uni.switchTab({ url: '/pages/booking/create' })
}

onShareAppMessage(() => ({
  title: '一页写真 · 套餐与价格',
  path: '/pages/packages/list'
}))
</script>

<style scoped>
.packages-page {
  padding-bottom: 0;
}

.header {
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
  margin-top: 20rpx;
  color: var(--muted, #8d8175);
  font-size: 23rpx;
  line-height: 1.8;
}

.trust {
  display: flex;
  gap: 0;
  margin-top: 34rpx;
  padding-top: 22rpx;
  padding-bottom: 22rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.trust-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3rpx;
  padding: 0 12rpx;
  border-right: 1rpx solid var(--line, #e7ddd0);
  text-align: center;
}

.trust-item:first-child {
  padding-left: 0;
}

.trust-item:last-child {
  border-right: 0;
}

.trust-title {
  color: var(--ink, #211c17);
  font-size: 21rpx;
  font-weight: 600;
  line-height: 1.4;
}

.trust-desc {
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.4;
}

.package-list {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  margin-top: 34rpx;
}

.included,
.faq {
  margin-top: 60rpx;
}

.block-en {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.block-title {
  display: block;
  margin-top: 6rpx;
  color: var(--ink, #211c17);
  font-size: 39rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.included-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 22rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  border-left: 1rpx solid var(--line, #e7ddd0);
}

.included-item {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 22rpx 20rpx;
  border-right: 1rpx solid var(--line, #e7ddd0);
  border-bottom: 1rpx solid var(--line, #e7ddd0);
  background: rgba(255, 252, 247, 0.5);
}

.included-no {
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 18rpx;
  font-style: italic;
  line-height: 1.4;
}

.included-name {
  margin-top: 3rpx;
  color: var(--ink, #211c17);
  font-size: 24rpx;
  font-weight: 600;
  line-height: 1.5;
}

.included-desc {
  margin-top: 2rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.5;
}

.faq-list {
  margin-top: 18rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.faq-item {
  padding: 24rpx 0;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.faq-q {
  display: block;
  color: var(--ink, #211c17);
  font-size: 24rpx;
  font-weight: 600;
  line-height: 1.5;
}

.faq-a {
  display: block;
  margin-top: 5rpx;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.7;
}

.bottom-space {
  height: 190rpx;
}

.bottom-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 22rpx;
  padding: 18rpx 32rpx calc(18rpx + env(safe-area-inset-bottom));
  border-top: 1rpx solid rgba(231, 221, 208, 0.9);
  background: rgba(255, 252, 247, 0.96);
  backdrop-filter: blur(14rpx);
}

.bar-info {
  flex: 1;
  min-width: 0;
}

.bar-label {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
}

.bar-price {
  display: flex;
  align-items: baseline;
  color: var(--ink, #211c17);
}

.bar-cur {
  font-size: 22rpx;
  font-weight: 600;
}

.bar-num {
  font-family: 'Times New Roman', serif;
  font-size: 46rpx;
  font-weight: 700;
  line-height: 1.1;
}

.bar-deposit {
  margin-left: 12rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
}

.bar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 14rpx;
  width: 250rpx;
  height: 88rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 26rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.bar-arrow {
  font-size: 28rpx;
}
</style>
