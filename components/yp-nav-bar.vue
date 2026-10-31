<template>
  <view class="nav-root">
    <view class="nav-wrap" :class="{ 'nav-wrap--transparent': transparent }">
      <view :style="{ height: statusBarHeight + 'px' }"></view>
      <view class="nav-main">
        <view v-if="back" class="nav-back" hover-class="nav-back--hover" @tap="handleBack">
          <view class="chev"></view>
        </view>

        <view v-if="brand" class="brand">
          <text class="brand-cn serif">一页写真</text>
          <text class="brand-en">YIPAGE STUDIO</text>
        </view>
        <text v-else class="nav-title">{{ title }}</text>

        <view class="nav-right">
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <view class="nav-placeholder" :style="{ height: placeholderHeight + 'px' }"></view>
  </view>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: ''
  },
  back: {
    type: Boolean,
    default: true
  },
  brand: {
    type: Boolean,
    default: false
  },
  transparent: {
    type: Boolean,
    default: false
  }
})

const statusBarHeight = ref(0)
const placeholderHeight = ref(48)

try {
  const systemInfo = uni.getSystemInfoSync()
  statusBarHeight.value = systemInfo.statusBarHeight || 0
  // 固定导航占用：状态栏 + 96rpx 的 nav-main；换算成 px 便于占位高度精确
  const rpx = (systemInfo.windowWidth || 375) / 750
  placeholderHeight.value = statusBarHeight.value + 96 * rpx
} catch (error) {
  statusBarHeight.value = 0
  placeholderHeight.value = 48
}

function handleBack() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
    return
  }
  uni.switchTab({
    url: '/pages/index/index'
  })
}
</script>

<style scoped>
.nav-root {
  width: 100%;
}

.nav-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  background: var(--bg, #f4eee5);
}

.nav-wrap--transparent {
  background: transparent;
}

.nav-placeholder {
  width: 100%;
  pointer-events: none;
}

.nav-main {
  position: relative;
  display: flex;
  align-items: center;
  height: 96rpx;
  padding: 0 36rpx;
}

.nav-back {
  position: absolute;
  left: 20rpx;
  top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68rpx;
  height: 68rpx;
  border-radius: 50%;
  transform: translateY(-50%);
}

.nav-back--hover {
  background: rgba(33, 28, 23, 0.06);
}

.chev {
  width: 19rpx;
  height: 19rpx;
  margin-left: 6rpx;
  border-left: 3rpx solid var(--ink, #211c17);
  border-bottom: 3rpx solid var(--ink, #211c17);
  transform: rotate(45deg);
}

.nav-title {
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 430rpx;
  overflow: hidden;
  color: var(--ink, #211c17);
  font-size: 30rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
  transform: translate(-50%, -50%);
}

.brand {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 1;
}

.brand-cn {
  color: var(--ink, #211c17);
  font-size: 36rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.brand-en {
  margin-top: 9rpx;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
}

.nav-right {
  margin-left: auto;
}
</style>
