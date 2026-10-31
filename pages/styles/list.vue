<template>
  <view class="page styles-page">
    <yp-nav-bar title="风格灵感" :back="false" />

    <view class="section intro">
      <text class="eyebrow">STYLE LOOKBOOK / 06</text>
      <view class="title serif">
        <text>今天，想成为</text>
        <text>哪一种自己？</text>
      </view>
      <text class="desc">
        六种影像语言，没有标准答案。先选一种让你停下来的风格，剩下的交给镜头。
      </text>
    </view>

    <scroll-view class="filter-scroll" scroll-x :show-scrollbar="false">
      <view class="chips">
        <view
          v-for="category in STYLE_CATEGORIES"
          :key="category.key"
          class="chip"
          :class="{ 'chip--active': active === category.key }"
          hover-class="chip--hover"
          @tap="active = category.key"
        >
          <text>{{ category.name }}</text>
          <text class="chip-count">{{ countFor(category.key) }}</text>
        </view>
      </view>
    </scroll-view>

    <view class="section meta-line">
      <text>{{ filteredStyles.length }} 种风格</text>
      <text>单套 ¥199 起 · 均可自由搭配套餐</text>
    </view>

    <view class="grid">
      <view v-for="(item, index) in filteredStyles" :key="item.id" class="grid-item">
        <yp-style-card
          :photo-style="item"
          variant="grid"
          :index-label="'0' + (index + 1)"
          @tap="openStyle"
        />
      </view>
    </view>

    <view class="section">
      <view class="help-card">
        <view class="help-copy">
          <text class="help-en">NOT SURE YET?</text>
          <text class="help-title serif">选择困难也没关系</text>
          <text class="help-desc">把喜欢的照片发给客服，我们帮你一起挑风格和套餐。</text>
        </view>
        <view class="help-btn" hover-class="btn-hover" @tap="contactStudio">
          <text>联系客服</text>
          <text>→</text>
        </view>
      </view>
    </view>

    <view class="footer-note">
      <text>所有风格均可搭配任意套餐 · 具体档期以门店确认为准</text>
    </view>
  </view>
</template>

<script setup>
import { computed, ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import { STYLES, STYLE_CATEGORIES, STUDIO_INFO } from '@/common/data.js'

const active = ref('all')

const filteredStyles = computed(() => {
  if (active.value === 'all') return STYLES
  return STYLES.filter((item) => item.category === active.value)
})

function countFor(key) {
  if (key === 'all') return STYLES.length
  return STYLES.filter((item) => item.category === key).length
}

function openStyle(photoStyle) {
  uni.navigateTo({ url: `/pages/styles/detail?id=${photoStyle.id}` })
}

function contactStudio() {
  uni.showModal({
    title: '联系一页写真',
    content: `客服微信：${STUDIO_INFO.wechat}\n营业时间：${STUDIO_INFO.hours}\n\n添加时备注“小程序预约”会更快通过。`,
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

onShareAppMessage(() => ({
  title: '一页写真 · 六种校园写真风格',
  path: '/pages/styles/list'
}))
</script>

<style scoped>
.styles-page {
  padding-bottom: 40rpx;
}

.intro {
  padding-top: 16rpx;
}

.title {
  display: flex;
  flex-direction: column;
  margin-top: 14rpx;
  color: var(--ink, #211c17);
  font-size: 58rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.32;
}

.desc {
  display: block;
  max-width: 590rpx;
  margin-top: 22rpx;
  color: var(--muted, #8d8175);
  font-size: 23rpx;
  line-height: 1.8;
}

.filter-scroll {
  width: 100%;
  margin-top: 38rpx;
  white-space: nowrap;
}

.chips {
  display: flex;
  gap: 14rpx;
  padding: 0 36rpx 4rpx;
}

.chip {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 7rpx;
  padding: 14rpx 24rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  background: transparent;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
  line-height: 1.4;
}

.chip--hover {
  opacity: 0.65;
}

.chip--active {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.chip-count {
  font-family: 'Times New Roman', serif;
  font-size: 16rpx;
  opacity: 0.55;
}

.meta-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  letter-spacing: 1rpx;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 28rpx 36rpx 0;
}

.grid-item {
  width: calc(50% - 10rpx);
  margin-bottom: 26rpx;
}

.help-card {
  display: flex;
  align-items: center;
  gap: 22rpx;
  margin-top: 24rpx;
  padding: 28rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
}

.help-copy {
  flex: 1;
  min-width: 0;
}

.help-en {
  display: block;
  color: var(--accent, #d65b43);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  line-height: 1.4;
}

.help-title {
  display: block;
  margin-top: 4rpx;
  color: var(--ink, #211c17);
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1.4;
}

.help-desc {
  display: block;
  margin-top: 5rpx;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.6;
}

.help-btn {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 7rpx;
  padding: 16rpx 22rpx;
  border-radius: 999rpx;
  background: var(--accent, #d65b43);
  color: #fff;
  font-size: 20rpx;
  font-weight: 600;
}

.footer-note {
  padding: 26rpx 36rpx 10rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 17rpx;
  letter-spacing: 1rpx;
  text-align: center;
}
</style>
