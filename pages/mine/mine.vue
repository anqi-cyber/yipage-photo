<template>
  <view class="page mine-page">
    <yp-nav-bar title="我的" :back="false" />

    <view class="section profile">
      <view class="avatar-wrap">
        <image class="avatar" src="/static/images/avatar.jpg" mode="aspectFill"></image>
        <view class="online-dot"></view>
      </view>
      <view class="profile-copy">
        <text class="hello serif">拍照的同学</text>
        <text class="bio">今天也要好好记录自己。</text>
      </view>
    </view>

    <view class="section stats">
      <view class="stat" hover-class="stat--hover" @tap="goOrders('')">
        <text class="stat-num">{{ stats.active }}</text>
        <text class="stat-label">进行中</text>
      </view>
      <view class="stat-line"></view>
      <view class="stat" hover-class="stat--hover" @tap="goOrders('completed')">
        <text class="stat-num">{{ stats.completed }}</text>
        <text class="stat-label">已完成</text>
      </view>
      <view class="stat-line"></view>
      <view class="stat" hover-class="stat--hover" @tap="goOrders('')">
        <text class="stat-num">{{ stats.total }}</text>
        <text class="stat-label">全部预约</text>
      </view>
    </view>

    <view class="section">
      <view class="club-card">
        <text class="club-watermark serif">YIPAGE</text>
        <view class="club-top">
          <text class="club-en">YIPAGE / 2026</text>
          <text class="club-star">✳</text>
        </view>
        <text class="club-title serif">青春影像档案</text>
        <text class="club-desc">已收藏 {{ stats.total }} 次与镜头的见面</text>
        <view class="club-bottom">
          <text class="club-no">NO. 000{{ stats.total }}</text>
          <text class="club-slogan">YOUR PAGE, YOUR STORY</text>
        </view>
      </view>
    </view>

    <view class="section block">
      <text class="menu-en">MY YIPAGE</text>
      <view class="menu">
        <view class="menu-row" hover-class="menu-row--hover" @tap="goOrders('')">
          <text class="menu-no">01</text>
          <view class="menu-copy">
            <text class="menu-title">我的预约</text>
            <text class="menu-sub">查看档期、状态与拍摄信息</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-row" hover-class="menu-row--hover" @tap="goGuide">
          <text class="menu-no">02</text>
          <view class="menu-copy">
            <text class="menu-title">拍摄须知</text>
            <text class="menu-sub">服装、改期与交付说明</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-row" hover-class="menu-row--hover" @tap="contactStudio">
          <text class="menu-no">03</text>
          <view class="menu-copy">
            <text class="menu-title">联系客服</text>
            <text class="menu-sub">微信 {{ STUDIO_INFO.wechat }} · {{ STUDIO_INFO.hours }}</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-row" hover-class="menu-row--hover" @tap="showAbout">
          <text class="menu-no">04</text>
          <view class="menu-copy">
            <text class="menu-title">关于一页</text>
            <text class="menu-sub">我们如何理解一张照片</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <view class="section block">
      <view class="invite-card">
        <view class="invite-copy">
          <text class="invite-en">ONE MORE PAGE</text>
          <text class="invite-title serif">把这一页，留给现在的你</text>
          <text class="invite-desc">未来 14 天可约，挑一个没有课的下午。</text>
        </view>
        <view class="invite-btn" hover-class="btn-hover" @tap="goStyles">
          <text>去挑风格</text>
          <text>→</text>
        </view>
      </view>
    </view>

    <view class="section meta">
      <text class="clear" @tap="clearData">清空本机预约</text>
      <text class="version">v1.0.0 · 演示原型</text>
    </view>

    <view class="footer">
      <text class="footer-brand serif">一页写真 · YIPAGE</text>
      <text class="footer-note">广州 · 大学城店 / 东山口店</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { STUDIO_INFO } from '@/common/data.js'
import { clearLocalOrders, getOrderStats } from '@/common/order.js'

const stats = ref({
  active: 0,
  completed: 0,
  total: 0
})

onShow(() => {
  stats.value = getOrderStats()
})

function goOrders(status) {
  const suffix = status ? `?status=${status}` : ''
  uni.navigateTo({ url: `/pages/orders/list${suffix}` })
}

function goGuide() {
  uni.navigateTo({ url: '/pages/mine/guide' })
}

function goStyles() {
  uni.switchTab({ url: '/pages/styles/list' })
}

function contactStudio() {
  uni.showModal({
    title: '联系一页写真',
    content: `客服微信：${STUDIO_INFO.wechat}\n营业时间：${STUDIO_INFO.hours}\n\n添加时备注“小程序预约”，会更快通过。`,
    confirmText: '复制微信',
    success(result) {
      if (result.confirm) {
        uni.setClipboardData({
          data: STUDIO_INFO.wechat,
          success() {
            uni.showToast({ title: '微信号已复制', icon: 'none' })
          }
        })
      }
    }
  })
}

function showAbout() {
  uni.showModal({
    title: '关于一页写真',
    content:
      '一页写真是一间面向大学生的校园影像工作室。\n\n我们相信，照片不需要完美的姿势，只需要真实的你。不赶时间，不做流水线，把每一次见面拍成一页可以反复翻看的青春。',
    showCancel: false,
    confirmText: '知道了'
  })
}

function clearData() {
  uni.showModal({
    title: '清空本机预约？',
    content: '会删除本机保存的所有预约记录与演示数据，操作不可撤销。',
    confirmText: '清空',
    confirmColor: '#b94732',
    success(result) {
      if (!result.confirm) return
      clearLocalOrders()
      stats.value = getOrderStats()
      uni.showToast({ title: '本机预约已清空', icon: 'none' })
    }
  })
}
</script>

<style scoped>
.mine-page {
  padding-bottom: 44rpx;
}

.profile {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding-top: 24rpx;
}

.avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 136rpx;
  height: 136rpx;
  border: 5rpx solid var(--paper, #fffcf7);
  border-radius: 50%;
  box-shadow: 0 8rpx 24rpx rgba(57, 43, 31, 0.1);
}

.online-dot {
  position: absolute;
  right: 7rpx;
  bottom: 10rpx;
  width: 23rpx;
  height: 23rpx;
  border: 4rpx solid var(--bg, #f4eee5);
  border-radius: 50%;
  background: var(--accent, #d65b43);
}

.profile-copy {
  flex: 1;
  min-width: 0;
}

.hello {
  display: block;
  color: var(--ink, #211c17);
  font-size: 46rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.35;
}

.bio {
  display: block;
  margin-top: 4rpx;
  color: var(--muted, #8d8175);
  font-size: 20rpx;
  line-height: 1.6;
}

.stats {
  display: flex;
  align-items: center;
  margin-top: 32rpx;
  padding-top: 24rpx;
  padding-bottom: 24rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.stat {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 2rpx;
}

.stat--hover {
  opacity: 0.55;
}

.stat-num {
  color: var(--ink, #211c17);
  font-family: 'Times New Roman', serif;
  font-size: 44rpx;
  font-weight: 700;
  line-height: 1.1;
}

.stat-label {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.stat-line {
  width: 1rpx;
  height: 42rpx;
  background: var(--line, #e7ddd0);
}

.club-card {
  position: relative;
  overflow: hidden;
  margin-top: 28rpx;
  padding: 28rpx;
  border-radius: 26rpx;
  background: #272b21;
  color: #f4eedf;
}

.club-watermark {
  position: absolute;
  right: -20rpx;
  bottom: -42rpx;
  color: rgba(244, 238, 223, 0.06);
  font-size: 148rpx;
  font-weight: 700;
  letter-spacing: 4rpx;
  line-height: 1;
}

.club-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.club-en {
  color: rgba(244, 238, 223, 0.52);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.club-star {
  color: #e0b680;
  font-size: 24rpx;
}

.club-title {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 18rpx;
  font-size: 43rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.4;
}

.club-desc {
  position: relative;
  z-index: 1;
  display: block;
  margin-top: 3rpx;
  color: rgba(244, 238, 223, 0.55);
  font-size: 19rpx;
  line-height: 1.6;
}

.club-bottom {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 34rpx;
  padding-top: 16rpx;
  border-top: 1rpx solid rgba(244, 238, 223, 0.14);
}

.club-no {
  color: rgba(244, 238, 223, 0.7);
  font-family: 'Times New Roman', serif;
  font-size: 19rpx;
  letter-spacing: 1rpx;
}

.club-slogan {
  color: rgba(244, 238, 223, 0.32);
  font-size: 12rpx;
  letter-spacing: 2rpx;
}

.block {
  margin-top: 44rpx;
}

.menu-en {
  display: block;
  margin-bottom: 16rpx;
  color: var(--muted, #8d8175);
  font-size: 15rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
}

.menu {
  overflow: hidden;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
}

.menu-row {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 22rpx 24rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.menu-row:last-child {
  border-bottom: 0;
}

.menu-row--hover {
  background: var(--paper-deep, #f9f3ea);
}

.menu-no {
  flex-shrink: 0;
  width: 46rpx;
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 18rpx;
  font-style: italic;
  line-height: 1.5;
}

.menu-copy {
  flex: 1;
  min-width: 0;
}

.menu-title {
  display: block;
  color: var(--ink, #211c17);
  font-size: 24rpx;
  font-weight: 500;
  line-height: 1.5;
}

.menu-sub {
  display: block;
  margin-top: 1rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-arrow {
  flex-shrink: 0;
  color: var(--muted-light, #b5aa9e);
  font-size: 30rpx;
}

.invite-card {
  padding: 28rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
}

.invite-en {
  display: block;
  color: var(--accent, #d65b43);
  font-size: 13rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.invite-title {
  display: block;
  margin-top: 5rpx;
  color: var(--ink, #211c17);
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.invite-desc {
  display: block;
  margin-top: 3rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.6;
}

.invite-btn {
  display: inline-flex;
  align-items: center;
  gap: 10rpx;
  margin-top: 20rpx;
  padding: 14rpx 24rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 20rpx;
  font-weight: 600;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.clear {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  text-decoration: underline;
  text-underline-offset: 4rpx;
}

.version {
  color: var(--muted-light, #b5aa9e);
  font-size: 16rpx;
  letter-spacing: 1rpx;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 44rpx;
}

.footer-brand {
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  letter-spacing: 3rpx;
}

.footer-note {
  margin-top: 6rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 15rpx;
  letter-spacing: 2rpx;
}
</style>
