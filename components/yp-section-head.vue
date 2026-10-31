<template>
  <view class="head">
    <view class="head-main">
      <text v-if="eyebrow" class="eyebrow">{{ eyebrow }}</text>
      <view class="title-row">
        <text class="title serif">{{ title }}</text>
        <text v-if="count" class="count">{{ count }}</text>
      </view>
    </view>
    <view v-if="more" class="more" hover-class="more--hover" @tap="$emit('more')">
      <text>{{ more }}</text>
      <text class="arrow">→</text>
    </view>
  </view>
</template>

<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  more: {
    type: String,
    default: ''
  },
  count: {
    type: [Number, String],
    default: ''
  }
})

defineEmits(['more'])
</script>

<style scoped>
.head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24rpx;
  margin-bottom: 30rpx;
}

.head-main {
  flex: 1;
  min-width: 0;
}

.eyebrow {
  display: block;
  margin-bottom: 13rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  font-weight: 600;
  letter-spacing: 5rpx;
  line-height: 1.4;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.title {
  color: var(--ink, #211c17);
  font-size: 46rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.25;
}

.count {
  min-width: 38rpx;
  padding: 0 10rpx;
  border-radius: 999rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-size: 20rpx;
  font-weight: 700;
  line-height: 34rpx;
  text-align: center;
}

.more {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-bottom: 4rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 23rpx;
}

.more--hover {
  opacity: 0.6;
}

.arrow {
  margin-left: 8rpx;
  font-size: 26rpx;
}
</style>
