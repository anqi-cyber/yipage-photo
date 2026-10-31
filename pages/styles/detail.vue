<template>
  <view class="page detail-page">
    <yp-nav-bar title="风格详情" />

    <view class="gallery-wrap">
      <swiper
        class="gallery"
        circular
        :current="current"
        @change="onSwiperChange"
      >
        <swiper-item>
          <view class="slide">
            <image class="slide-img" :src="photoStyle.cover" mode="aspectFill"></image>
            <view class="slide-shade"></view>
            <view class="slide-label">
              <text>YIPAGE LOOKBOOK</text>
              <text class="slide-no">NO. 0{{ styleIndex + 1 }}</text>
            </view>
          </view>
        </swiper-item>
        <swiper-item>
          <view
            class="color-slide"
            :class="{ 'color-slide--light': darkColorSlide }"
            :style="{ background: colorSlideBackground }"
          >
            <text class="color-en">{{ photoStyle.en }}</text>
            <text class="color-quote serif">“{{ photoStyle.quote }}”</text>
            <view class="color-bottom">
              <view class="swatches">
                <view
                  v-for="color in photoStyle.palette"
                  :key="color"
                  class="swatch"
                  :style="{ background: color }"
                ></view>
              </view>
              <text class="color-caption">COLOR STUDY / YIPAGE</text>
            </view>
          </view>
        </swiper-item>
      </swiper>

      <view class="gallery-dots">
        <view
          v-for="dot in 2"
          :key="dot"
          class="dot"
          :class="{ 'dot--active': current === dot - 1 }"
        ></view>
      </view>
    </view>

    <view class="intro-wrap">
      <view class="intro-card">
        <view class="kicker-row">
          <text class="eyebrow">{{ photoStyle.en }}</text>
          <text class="style-badge">{{ photoStyle.badge }}</text>
        </view>
        <text class="style-name serif">{{ photoStyle.name }}</text>
        <text class="style-tagline">{{ photoStyle.tagline }}</text>
        <text class="style-quote serif">“{{ photoStyle.quote }}”</text>
        <text class="style-desc">{{ photoStyle.desc }}</text>

        <view class="meta">
          <view class="meta-item">
            <text class="meta-value">{{ photoStyle.duration }}</text>
            <text class="meta-label">拍摄时长</text>
          </view>
          <view class="meta-item">
            <text class="meta-value">{{ photoStyle.people }}</text>
            <text class="meta-label">适合人数</text>
          </view>
          <view class="meta-item">
            <text class="meta-value">{{ photoStyle.retouch }}</text>
            <text class="meta-label">精修照片</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section block">
      <text class="sub-en">SCENE NOTES</text>
      <text class="sub-title serif">镜头会去的地方</text>
      <view class="scene-tags">
        <text v-for="scene in photoStyle.scenes" :key="scene" class="scene-tag">{{ scene }}</text>
      </view>
      <view class="suitable">
        <text class="suitable-label">适合你，如果</text>
        <text class="suitable-text">{{ photoStyle.suitable }}</text>
      </view>
    </view>

    <view class="section block">
      <view class="package-head">
        <view>
          <text class="sub-en">CHOOSE A PACKAGE</text>
          <text class="sub-title serif">搭配你的套餐</text>
        </view>
        <view class="package-more" @tap="goPackages">套餐说明 →</view>
      </view>

      <view class="package-list">
        <yp-package-card
          v-for="pkg in PACKAGES"
          :key="pkg.id"
          :pkg="pkg"
          compact
          :selected="selectedPackageId === pkg.id"
          @select="selectPackage"
        />
      </view>

      <view class="promise">
        <text class="promise-item">无隐形消费</text>
        <view class="promise-dot"></view>
        <text class="promise-item">底片全送</text>
        <view class="promise-dot"></view>
        <text class="promise-item">7 天交付</text>
      </view>
    </view>

    <view class="bottom-space"></view>

    <view class="booking-bar">
      <view class="bar-price">
        <text class="bar-label">{{ selectedPackage.name }} · 定金 ¥{{ selectedPackage.deposit }}</text>
        <view class="bar-amount">
          <text class="bar-cur">¥</text>
          <text class="bar-num">{{ selectedPackage.price }}</text>
          <text class="bar-from">起</text>
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
import { PACKAGES, STYLES, findPackage, findStyle } from '@/common/data.js'
import { setBookingDraft } from '@/common/booking.js'

const photoStyle = ref(findStyle('fresh'))
const selectedPackageId = ref('light')
const current = ref(0)

const selectedPackage = computed(() => findPackage(selectedPackageId.value))
const styleIndex = computed(() =>
  Math.max(
    0,
    STYLES.findIndex((item) => item.id === photoStyle.value.id)
  )
)
const darkColorSlide = computed(() =>
  ['night', 'vintage'].includes(photoStyle.value.id)
)
const colorSlideBackground = computed(() => {
  const [light, mid, deep] = photoStyle.value.palette
  return `linear-gradient(145deg, ${light} 0%, ${mid} 58%, ${deep} 100%)`
})

onLoad((options) => {
  if (options && options.id) {
    photoStyle.value = findStyle(options.id)
  }
})

function onSwiperChange(event) {
  current.value = event.detail.current
}

function selectPackage(pkg) {
  selectedPackageId.value = pkg.id
}

function goPackages() {
  uni.navigateTo({
    url: `/pages/packages/list?id=${selectedPackageId.value}`
  })
}

function goBooking() {
  setBookingDraft({
    styleId: photoStyle.value.id,
    packageId: selectedPackageId.value
  })
  uni.switchTab({ url: '/pages/booking/create' })
}

onShareAppMessage(() => ({
  title: `一页写真 · ${photoStyle.value.name}`,
  path: `/pages/styles/detail?id=${photoStyle.value.id}`
}))
</script>

<style scoped>
.detail-page {
  padding-bottom: 0;
}

.gallery-wrap {
  position: relative;
  margin: 6rpx 28rpx 0;
}

.gallery {
  width: 100%;
  height: 760rpx;
  overflow: hidden;
  border-radius: 28rpx;
  background: #d9cec0;
}

.slide {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide-img {
  width: 100%;
  height: 100%;
}

.slide-shade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(20, 15, 11, 0.22), rgba(20, 15, 11, 0.02) 50%);
}

.slide-label {
  position: absolute;
  top: 24rpx;
  right: 24rpx;
  left: 24rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: rgba(255, 249, 241, 0.8);
  font-size: 15rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.slide-no {
  font-family: 'Times New Roman', serif;
  font-size: 20rpx;
  font-style: italic;
  letter-spacing: 1rpx;
}

.color-slide {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 50rpx;
  color: #211c17;
}

.color-slide--light {
  color: #fff9f1;
}

.color-slide--light .swatch {
  border-color: rgba(255, 249, 241, 0.3);
}

.color-slide--light .color-caption {
  color: rgba(255, 249, 241, 0.55);
}

.color-en {
  font-family: 'Times New Roman', serif;
  font-size: 34rpx;
  font-style: italic;
  letter-spacing: 4rpx;
}

.color-quote {
  max-width: 560rpx;
  margin-top: 28rpx;
  font-size: 45rpx;
  font-weight: 500;
  letter-spacing: 1rpx;
  line-height: 1.55;
}

.color-bottom {
  position: absolute;
  right: 50rpx;
  bottom: 44rpx;
  left: 50rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.swatches {
  display: flex;
  gap: 9rpx;
}

.swatch {
  width: 40rpx;
  height: 40rpx;
  border: 1rpx solid rgba(33, 28, 23, 0.15);
  border-radius: 50%;
}

.color-caption {
  color: rgba(33, 28, 23, 0.55);
  font-size: 14rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
}

.gallery-dots {
  position: absolute;
  bottom: 24rpx;
  left: 50%;
  display: flex;
  gap: 8rpx;
  transform: translateX(-50%);
}

.dot {
  width: 9rpx;
  height: 9rpx;
  border-radius: 999rpx;
  background: rgba(255, 249, 241, 0.44);
  transition: width 0.2s ease;
}

.dot--active {
  width: 28rpx;
  background: #fff9f1;
}

.intro-wrap {
  position: relative;
  z-index: 2;
  margin: -50rpx 28rpx 0;
}

.intro-card {
  padding: 32rpx;
  border-radius: 26rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 10rpx 34rpx rgba(57, 43, 31, 0.08);
}

.kicker-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.eyebrow {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
}

.style-badge {
  padding: 4rpx 14rpx;
  border-radius: 999rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-size: 16rpx;
  font-weight: 500;
  line-height: 1.5;
}

.style-name {
  display: block;
  margin-top: 8rpx;
  color: var(--ink, #211c17);
  font-size: 58rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.3;
}

.style-tagline {
  display: block;
  margin-top: 2rpx;
  color: var(--muted, #8d8175);
  font-size: 22rpx;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.style-quote {
  display: block;
  margin-top: 22rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  color: var(--accent-deep, #b94732);
  font-size: 28rpx;
  font-weight: 500;
  letter-spacing: 1rpx;
  line-height: 1.6;
}

.style-desc {
  display: block;
  margin-top: 12rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
  line-height: 1.8;
}

.meta {
  display: flex;
  margin-top: 26rpx;
  padding-top: 22rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.meta-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4rpx;
  padding: 0 16rpx;
  border-right: 1rpx solid var(--line, #e7ddd0);
}

.meta-item:first-child {
  padding-left: 0;
}

.meta-item:last-child {
  border-right: 0;
}

.meta-value {
  color: var(--ink, #211c17);
  font-size: 23rpx;
  font-weight: 600;
  line-height: 1.4;
}

.meta-label {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.4;
}

.block {
  margin-top: 48rpx;
}

.sub-en {
  display: block;
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
  line-height: 1.4;
}

.sub-title {
  display: block;
  margin-top: 6rpx;
  color: var(--ink, #211c17);
  font-size: 39rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.scene-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 20rpx;
}

.scene-tag {
  padding: 13rpx 24rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 999rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 21rpx;
  line-height: 1.4;
}

.suitable {
  margin-top: 22rpx;
  padding: 22rpx 24rpx;
  border-left: 3rpx solid var(--accent, #d65b43);
  background: rgba(255, 252, 247, 0.65);
}

.suitable-label {
  display: block;
  color: var(--accent-deep, #b94732);
  font-size: 18rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.suitable-text {
  display: block;
  margin-top: 3rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 22rpx;
  line-height: 1.7;
}

.package-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20rpx;
  margin-bottom: 24rpx;
}

.package-more {
  flex-shrink: 0;
  padding-bottom: 5rpx;
  color: var(--muted, #8d8175);
  font-size: 20rpx;
}

.package-list {
  display: flex;
  flex-direction: column;
  gap: 18rpx;
}

.promise {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14rpx;
  margin-top: 28rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  letter-spacing: 1rpx;
}

.promise-dot {
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: var(--accent, #d65b43);
}

.bottom-space {
  height: 190rpx;
}

.booking-bar {
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

.bar-price {
  flex: 1;
  min-width: 0;
}

.bar-label {
  display: block;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bar-amount {
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

.bar-from {
  margin-left: 4rpx;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
}

.bar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 14rpx;
  width: 278rpx;
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
