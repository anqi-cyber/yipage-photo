<template>
  <view v-if="visible" class="sheet-root">
    <view class="mask" @tap="close" @touchmove.stop.prevent></view>
    <view class="sheet">
      <view class="handle"></view>
      <view class="head">
        <view class="head-text">
          <text class="eyebrow">{{ eyebrow }}</text>
          <text class="title serif">{{ title }}</text>
          <text v-if="subtitle" class="subtitle">{{ subtitle }}</text>
        </view>
        <view class="close" hover-class="close--hover" @tap="close">
          <view class="close-line close-line--a"></view>
          <view class="close-line close-line--b"></view>
        </view>
      </view>
      <view class="body">
        <slot></slot>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  eyebrow: {
    type: String,
    default: 'PLEASE CHOOSE'
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}
</script>

<style scoped>
.sheet-root {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(24, 19, 14, 0.48);
  animation: mask-in 0.22s ease-out both;
}

.sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: 34rpx 34rpx 0 0;
  background: var(--bg, #f4eee5);
  animation: sheet-up 0.26s cubic-bezier(0.2, 0.75, 0.25, 1) both;
  padding-bottom: env(safe-area-inset-bottom);
}

.handle {
  width: 66rpx;
  height: 7rpx;
  margin: 16rpx auto 0;
  border-radius: 999rpx;
  background: rgba(33, 28, 23, 0.18);
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24rpx;
  padding: 26rpx 36rpx 22rpx;
}

.head-text {
  flex: 1;
  min-width: 0;
}

.eyebrow {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.title {
  display: block;
  margin-top: 6rpx;
  color: var(--ink, #211c17);
  font-size: 42rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.3;
}

.subtitle {
  display: block;
  margin-top: 5rpx;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.5;
}

.close {
  position: relative;
  flex-shrink: 0;
  width: 58rpx;
  height: 58rpx;
  border-radius: 50%;
  background: rgba(33, 28, 23, 0.05);
}

.close--hover {
  background: rgba(33, 28, 23, 0.1);
}

.close-line {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 24rpx;
  height: 2rpx;
  margin-left: -12rpx;
  background: var(--ink, #211c17);
}

.close-line--a {
  transform: rotate(45deg);
}

.close-line--b {
  transform: rotate(-45deg);
}

.body {
  max-height: 61vh;
  padding: 0 36rpx 36rpx;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

@keyframes mask-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sheet-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
