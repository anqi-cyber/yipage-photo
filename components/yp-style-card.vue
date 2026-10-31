<template>
  <view
    class="card"
    :class="'card--' + variant"
    hover-class="card--hover"
    @tap="$emit('tap', photoStyle)"
  >
    <view class="cover-box">
      <image class="cover" :src="photoStyle.cover" mode="aspectFill" lazy-load></image>
      <view class="cover-shade"></view>
      <view v-if="photoStyle.badge" class="badge">{{ photoStyle.badge }}</view>
      <text v-if="indexLabel" class="index">{{ indexLabel }}</text>
      <view class="price">
        <text class="currency">¥</text>
        <text class="amount">{{ photoStyle.priceFrom }}</text>
        <text class="from">起</text>
      </view>
    </view>

    <view class="body">
      <text class="en">{{ photoStyle.en }}</text>
      <view class="name-row">
        <text class="name serif">{{ photoStyle.name }}</text>
        <view class="go">↗</view>
      </view>
      <text class="tagline">{{ photoStyle.tagline }}</text>
      <view class="tags">
        <text v-for="tag in photoStyle.tags" :key="tag" class="tag">#{{ tag }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  photoStyle: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'grid'
  },
  indexLabel: {
    type: String,
    default: ''
  }
})

defineEmits(['tap'])
</script>

<style scoped>
.card {
  width: 100%;
  overflow: hidden;
  border-radius: 26rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 10rpx 30rpx rgba(57, 43, 31, 0.05);
}

.card--hover {
  opacity: 0.9;
  transform: translateY(2rpx);
}

.cover-box {
  position: relative;
  width: 100%;
  height: 450rpx;
  overflow: hidden;
  background: #ddd3c6;
}

.card--grid .cover-box {
  height: 452rpx;
}

.card--scroll .cover-box {
  height: 456rpx;
}

.cover {
  width: 100%;
  height: 100%;
}

.cover-shade {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 190rpx;
  background: linear-gradient(180deg, rgba(20, 15, 11, 0) 0%, rgba(20, 15, 11, 0.48) 100%);
}

.badge {
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  padding: 8rpx 16rpx;
  border-radius: 999rpx;
  background: rgba(33, 28, 23, 0.64);
  color: #fff9f1;
  font-size: 17rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  line-height: 1.3;
  backdrop-filter: blur(8rpx);
}

.index {
  position: absolute;
  top: 18rpx;
  right: 22rpx;
  color: rgba(255, 255, 255, 0.82);
  font-family: 'Times New Roman', serif;
  font-size: 24rpx;
  font-style: italic;
  letter-spacing: 1rpx;
}

.price {
  position: absolute;
  left: 20rpx;
  bottom: 18rpx;
  display: flex;
  align-items: baseline;
  padding: 7rpx 16rpx 8rpx;
  border-radius: 999rpx;
  background: rgba(255, 252, 247, 0.94);
  color: var(--ink, #211c17);
}

.currency {
  margin-right: 2rpx;
  font-size: 18rpx;
  font-weight: 600;
}

.amount {
  font-family: 'Times New Roman', 'Songti SC', serif;
  font-size: 34rpx;
  font-weight: 700;
  line-height: 1;
}

.from {
  margin-left: 4rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
}

.body {
  padding: 22rpx 22rpx 24rpx;
}

.en {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.name-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12rpx;
  margin-top: 6rpx;
}

.name {
  overflow: hidden;
  color: var(--ink, #211c17);
  font-size: 35rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.go {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34rpx;
  height: 34rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 50%;
  color: var(--ink-soft, #4d443b);
  font-size: 18rpx;
  line-height: 1;
}

.tagline {
  display: block;
  margin-top: 7rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
  margin-top: 14rpx;
}

.tag {
  color: var(--olive, #6e7657);
  font-size: 18rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}
</style>
