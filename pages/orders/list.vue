<template>
  <view class="page orders-page">
    <yp-nav-bar title="我的预约" />

    <view class="section header">
      <text class="eyebrow">MY SESSIONS</text>
      <view class="title-row">
        <view class="title serif">
          <text>和镜头约好的</text>
          <text>那些日子。</text>
        </view>
        <text v-if="orders.length" class="count">{{ orders.length }}</text>
      </view>
      <text class="desc">查看预约状态、到店时间与拍摄信息。</text>
    </view>

    <scroll-view class="tabs-scroll" scroll-x :show-scrollbar="false">
      <view class="tabs">
        <view
          v-for="tab in STATUS_FILTERS"
          :key="tab.key"
          class="tab"
          :class="{ 'tab--active': active === tab.key }"
          @tap="active = tab.key"
        >
          <text>{{ tab.name }}</text>
          <text v-if="counts[tab.key]" class="tab-count">{{ counts[tab.key] }}</text>
        </view>
      </view>
    </scroll-view>

    <view v-if="filteredOrders.length" class="section list">
      <view
        v-for="order in filteredOrders"
        :key="order.id"
        class="order-card"
        hover-class="order-card--hover"
        @tap="openOrder(order)"
      >
        <view class="card-top">
          <view class="order-no-row">
            <text class="order-no">NO. {{ order.id }}</text>
            <text v-if="order.demo" class="demo-tag">DEMO</text>
          </view>
          <text
            class="status"
            :style="{
              color: getStatusMeta(order.status).color,
              background: getStatusMeta(order.status).bg
            }"
          >
            {{ getStatusMeta(order.status).label }}
          </text>
        </view>

        <view class="card-body">
          <image class="cover" :src="order.styleCover" mode="aspectFill"></image>
          <view class="info">
            <text class="style-name serif">{{ order.styleName }}</text>
            <text class="package-name">{{ order.packageName }} · ¥{{ order.total }}</text>
            <view class="date-line">
              <text class="date">{{ formatDateCN(order.date) }}</text>
              <text class="time">{{ order.time }}</text>
            </view>
            <text class="store">{{ order.storeName }} · {{ order.storeAddress }}</text>
          </view>
        </view>

        <view class="card-foot" @tap.stop>
          <view class="actions">
            <view
              v-if="canCancel(order.status)"
              class="mini-btn mini-btn--ghost"
              hover-class="mini-btn--hover"
              @tap="cancel(order)"
            >
              取消预约
            </view>
            <view
              v-if="canRebook(order.status)"
              class="mini-btn mini-btn--ghost"
              hover-class="mini-btn--hover"
              @tap="rebook(order)"
            >
              再次预约
            </view>
            <view class="mini-btn mini-btn--dark" hover-class="mini-btn--hover" @tap="openOrder(order)">
              查看详情
            </view>
          </view>
        </view>
      </view>
    </view>

    <yp-empty
      v-else
      :title="emptyTitle"
      :desc="emptyDesc"
      action="去挑一种风格"
      @action="goStyles"
    />

    <view class="section new-booking">
      <view class="new-card" hover-class="new-card--hover" @tap="goBooking">
        <view class="new-copy">
          <text class="new-en">ONE MORE PAGE?</text>
          <text class="new-title serif">再约一次，记录新的你</text>
          <text class="new-desc">未来 14 天档期已开放，选个下午来拍照吧。</text>
        </view>
        <view class="new-arrow">→</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { formatDateCN } from '@/common/date.js'
import {
  STATUS_FILTERS,
  cancelOrder,
  getOrders,
  getStatusMeta
} from '@/common/order.js'
import { setBookingDraft } from '@/common/booking.js'

const orders = ref([])
const active = ref('all')

onLoad((options) => {
  if (options && options.status && STATUS_FILTERS.some((tab) => tab.key === options.status)) {
    active.value = options.status
  }
})

onShow(() => {
  orders.value = getOrders()
})

const counts = computed(() => {
  const result = { all: orders.value.length }
  STATUS_FILTERS.forEach((tab) => {
    if (tab.key !== 'all') {
      result[tab.key] = orders.value.filter((order) => order.status === tab.key).length
    }
  })
  return result
})

const filteredOrders = computed(() => {
  if (active.value === 'all') return orders.value
  return orders.value.filter((order) => order.status === active.value)
})

const emptyTitle = computed(() => {
  if (active.value === 'all') return '还没有预约'
  return '这个状态下还没有记录'
})

const emptyDesc = computed(() => {
  if (active.value === 'pending') return '提交预约后会出现在这里，客服确认前也可以取消。'
  if (active.value === 'upcoming') return '档期确认后的预约会显示在这里，记得提前 10 分钟到店。'
  if (active.value === 'completed') return '拍完的照片会一直留在这里，等你回来翻看。'
  if (active.value === 'canceled') return '取消的预约会保留记录，方便你重新选择时间。'
  return '去挑一种喜欢的风格，把这一页留给现在的自己。'
})

function canCancel(status) {
  return status === 'pending' || status === 'upcoming'
}

function canRebook(status) {
  return status === 'completed' || status === 'canceled'
}

function openOrder(order) {
  uni.navigateTo({ url: `/pages/orders/detail?id=${order.id}` })
}

function cancel(order) {
  uni.showModal({
    title: '取消这次预约？',
    content: `${formatDateCN(order.date)} ${order.time} · ${order.storeName}\n取消后如需拍摄，需要重新选择档期。`,
    confirmText: '确认取消',
    confirmColor: '#b94732',
    success(result) {
      if (!result.confirm) return
      cancelOrder(order.id)
      orders.value = getOrders()
      uni.showToast({ title: '预约已取消', icon: 'none' })
    }
  })
}

function rebook(order) {
  setBookingDraft({
    styleId: order.styleId,
    packageId: order.packageId,
    storeId: order.storeId
  })
  uni.switchTab({ url: '/pages/booking/create' })
}

function goStyles() {
  uni.switchTab({ url: '/pages/styles/list' })
}

function goBooking() {
  uni.switchTab({ url: '/pages/booking/create' })
}
</script>

<style scoped>
.orders-page {
  padding-bottom: 46rpx;
}

.header {
  padding-top: 16rpx;
}

.title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20rpx;
  margin-top: 14rpx;
}

.title {
  display: flex;
  flex-direction: column;
  color: var(--ink, #211c17);
  font-size: 54rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.32;
}

.count {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 54rpx;
  height: 54rpx;
  padding: 0 14rpx;
  margin-top: 8rpx;
  border-radius: 999rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-family: 'Times New Roman', serif;
  font-size: 24rpx;
  font-weight: 700;
}

.desc {
  display: block;
  margin-top: 16rpx;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.7;
}

.tabs-scroll {
  width: 100%;
  margin-top: 28rpx;
  white-space: nowrap;
}

.tabs {
  display: flex;
  gap: 10rpx;
  padding: 0 36rpx 4rpx;
}

.tab {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 6rpx;
  padding: 12rpx 22rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 21rpx;
  line-height: 1.4;
}

.tab--active {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.tab-count {
  font-family: 'Times New Roman', serif;
  font-size: 15rpx;
  opacity: 0.58;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  margin-top: 24rpx;
}

.order-card {
  overflow: hidden;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 8rpx 24rpx rgba(57, 43, 31, 0.04);
}

.order-card--hover {
  opacity: 0.92;
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  padding: 18rpx 22rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.order-no-row {
  display: flex;
  align-items: center;
  gap: 10rpx;
  min-width: 0;
}

.order-no {
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-family: 'Times New Roman', serif;
  font-size: 17rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-tag {
  flex-shrink: 0;
  padding: 1rpx 7rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 3rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 12rpx;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.status {
  flex-shrink: 0;
  padding: 4rpx 13rpx;
  border-radius: 999rpx;
  font-size: 16rpx;
  font-weight: 500;
  line-height: 1.5;
}

.card-body {
  display: flex;
  gap: 20rpx;
  padding: 22rpx;
}

.cover {
  flex-shrink: 0;
  width: 156rpx;
  height: 196rpx;
  border-radius: 14rpx;
}

.info {
  flex: 1;
  min-width: 0;
  padding-top: 2rpx;
}

.style-name {
  display: block;
  color: var(--ink, #211c17);
  font-size: 31rpx;
  font-weight: 600;
  line-height: 1.4;
}

.package-name {
  display: block;
  margin-top: 1rpx;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.date-line {
  display: flex;
  align-items: baseline;
  gap: 12rpx;
  margin-top: 14rpx;
}

.date {
  color: var(--ink, #211c17);
  font-size: 21rpx;
  font-weight: 500;
  line-height: 1.4;
}

.time {
  color: var(--accent-deep, #b94732);
  font-family: 'Times New Roman', serif;
  font-size: 23rpx;
  font-weight: 600;
  line-height: 1.4;
}

.store {
  display: block;
  margin-top: 4rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-foot {
  padding: 0 22rpx 18rpx;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12rpx;
  padding-top: 14rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.mini-btn {
  padding: 12rpx 22rpx;
  border-radius: 999rpx;
  font-size: 19rpx;
  line-height: 1.4;
}

.mini-btn--ghost {
  border: 1rpx solid var(--line, #e7ddd0);
  color: var(--ink-soft, #4d443b);
}

.mini-btn--dark {
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.mini-btn--hover {
  opacity: 0.6;
}

.new-booking {
  margin-top: 34rpx;
}

.new-card {
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 26rpx;
  border-radius: 22rpx;
  background: #272b21;
  color: #f4eedf;
}

.new-card--hover {
  opacity: 0.88;
}

.new-copy {
  flex: 1;
  min-width: 0;
}

.new-en {
  display: block;
  color: rgba(244, 238, 223, 0.42);
  font-size: 13rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  line-height: 1.4;
}

.new-title {
  display: block;
  margin-top: 4rpx;
  font-size: 27rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.new-desc {
  display: block;
  margin-top: 2rpx;
  color: rgba(244, 238, 223, 0.52);
  font-size: 17rpx;
  line-height: 1.5;
}

.new-arrow {
  flex-shrink: 0;
  color: rgba(244, 238, 223, 0.82);
  font-size: 30rpx;
}
</style>
