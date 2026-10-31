<template>
  <view class="empty">
    <view class="orb">
      <view class="lens">
        <view class="glint"></view>
      </view>
      <view class="shutter"></view>
    </view>
    <text class="title serif">{{ title }}</text>
    <text class="desc">{{ desc }}</text>
    <view v-if="action" class="action" hover-class="action--hover" @tap="$emit('action')">
      <text>{{ action }}</text>
      <text class="arrow">→</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '这里还是空的'
  },
  desc: {
    type: String,
    default: '去挑一种喜欢的风格，拍下属于你的这一页。'
  },
  action: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>

<style scoped>
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100rpx 54rpx 120rpx;
  text-align: center;
}

.orb {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176rpx;
  height: 176rpx;
  margin-bottom: 40rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 50%;
  background: var(--paper, #fffcf7);
}

.lens {
  position: relative;
  width: 94rpx;
  height: 94rpx;
  border: 2rpx solid rgba(33, 28, 23, 0.38);
  border-radius: 50%;
}

.lens::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52rpx;
  height: 52rpx;
  border: 1rpx solid rgba(33, 28, 23, 0.22);
  border-radius: 50%;
  transform: translate(-50%, -50%);
}

.glint {
  position: absolute;
  left: 20rpx;
  top: 16rpx;
  width: 19rpx;
  height: 10rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  transform: rotate(-35deg);
}

.shutter {
  position: absolute;
  right: 27rpx;
  top: 30rpx;
  width: 13rpx;
  height: 13rpx;
  border-radius: 50%;
  background: var(--accent, #d65b43);
}

.title {
  color: var(--ink, #211c17);
  font-size: 40rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.desc {
  max-width: 500rpx;
  margin-top: 16rpx;
  color: var(--muted, #8d8175);
  font-size: 23rpx;
  line-height: 1.75;
}

.action {
  display: flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 42rpx;
  padding: 22rpx 38rpx;
  border-radius: 999rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.action--hover {
  opacity: 0.85;
}

.arrow {
  font-size: 26rpx;
}
</style>
