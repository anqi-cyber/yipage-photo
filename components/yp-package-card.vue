<template>
  <view
    class="pkg"
    :class="{ 'pkg--selected': selected, 'pkg--compact': compact }"
    hover-class="pkg--hover"
    @tap="$emit('select', pkg)"
  >
    <view class="top">
      <view class="name-wrap">
        <view class="badge-row">
          <text class="en">{{ pkg.en }}</text>
          <text v-if="pkg.badge && !compact" class="badge">{{ pkg.badge }}</text>
        </view>
        <text class="name serif">{{ pkg.name }}</text>
        <text class="summary">{{ pkg.summary }}</text>
      </view>
      <view class="price">
        <view class="price-main">
          <text class="currency">¥</text>
          <text class="amount">{{ pkg.price }}</text>
        </view>
        <text v-if="pkg.originalPrice && !compact" class="original">¥{{ pkg.originalPrice }}</text>
      </view>
    </view>

    <view class="meta">
      <view class="meta-item">
        <text class="meta-value">{{ pkg.duration }}</text>
        <text class="meta-label">拍摄时长</text>
      </view>
      <view class="meta-item">
        <text class="meta-value">{{ pkg.people }}</text>
        <text class="meta-label">拍摄人数</text>
      </view>
      <view class="meta-item">
        <text class="meta-value">{{ pkg.retouch }}</text>
        <text class="meta-label">精修照片</text>
      </view>
      <view v-if="!compact" class="meta-item">
        <text class="meta-value">{{ pkg.negatives }}</text>
        <text class="meta-label">调色底片</text>
      </view>
    </view>

    <view v-if="!compact" class="includes">
      <view v-for="item in pkg.includes" :key="item" class="include">
        <text class="include-dot">✓</text>
        <text>{{ item }}</text>
      </view>
    </view>

    <view class="foot">
      <text class="deposit">定金 ¥{{ pkg.deposit }} · 到店支付</text>
      <view class="radio" :class="{ 'radio--on': selected }">
        <view v-if="selected" class="tick">✓</view>
      </view>
    </view>
  </view>
</template>

<script setup>
defineProps({
  pkg: {
    type: Object,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  compact: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<style scoped>
.pkg {
  position: relative;
  padding: 30rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 28rpx;
  background: var(--paper, #fffcf7);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.pkg--compact {
  padding: 24rpx;
  border-radius: 22rpx;
}

.pkg--selected {
  border-color: var(--ink, #211c17);
  background: #fffaf2;
  box-shadow: 0 10rpx 30rpx rgba(57, 43, 31, 0.06);
}

.pkg--hover {
  opacity: 0.92;
}

.top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18rpx;
}

.name-wrap {
  flex: 1;
  min-width: 0;
}

.badge-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
  flex-wrap: wrap;
}

.en {
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.badge {
  padding: 4rpx 12rpx;
  border-radius: 999rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-size: 17rpx;
  font-weight: 600;
  line-height: 1.5;
}

.name {
  display: block;
  margin-top: 6rpx;
  color: var(--ink, #211c17);
  font-size: 40rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.3;
}

.pkg--compact .name {
  font-size: 33rpx;
}

.summary {
  display: block;
  margin-top: 6rpx;
  color: var(--muted, #8d8175);
  font-size: 21rpx;
  line-height: 1.5;
}

.pkg--compact .summary {
  font-size: 19rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.price {
  flex-shrink: 0;
  text-align: right;
}

.price-main {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  color: var(--ink, #211c17);
}

.currency {
  margin-right: 2rpx;
  font-size: 20rpx;
  font-weight: 600;
}

.amount {
  font-family: 'Times New Roman', 'Songti SC', serif;
  font-size: 50rpx;
  font-weight: 700;
  line-height: 1;
}

.pkg--compact .amount {
  font-size: 42rpx;
}

.original {
  display: block;
  margin-top: 4rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 18rpx;
  text-decoration: line-through;
}

.meta {
  display: flex;
  margin-top: 24rpx;
  padding: 20rpx 0;
  border-top: 1rpx solid var(--line, #e7ddd0);
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.meta-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4rpx;
  min-width: 0;
  padding: 0 12rpx;
  border-right: 1rpx solid var(--line, #e7ddd0);
}

.meta-item:first-child {
  padding-left: 0;
}

.meta-item:last-child {
  border-right: 0;
}

.meta-value {
  overflow: hidden;
  color: var(--ink, #211c17);
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-label {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.4;
}

.includes {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
  margin-top: 22rpx;
}

.include {
  display: flex;
  align-items: flex-start;
  color: var(--ink-soft, #4d443b);
  font-size: 21rpx;
  line-height: 1.5;
}

.include-dot {
  margin-right: 10rpx;
  color: var(--olive, #6e7657);
  font-size: 18rpx;
  line-height: 1.7;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 22rpx;
}

.deposit {
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  letter-spacing: 1rpx;
}

.radio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36rpx;
  height: 36rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 50%;
  background: #fff;
}

.radio--on {
  border-color: var(--ink, #211c17);
  background: var(--ink, #211c17);
}

.tick {
  color: #fff9f1;
  font-size: 19rpx;
  line-height: 1;
}
</style>
