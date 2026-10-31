<template>
  <view class="page home">
    <yp-nav-bar brand :back="false" />

    <view class="hero">
      <image class="hero-img" src="/static/images/hero.jpg" mode="aspectFill"></image>
      <view class="hero-shade"></view>

      <view class="hero-kicker">
        <view class="kicker-dot"></view>
        <text>2026 毕业季 · 校园写真企划</text>
      </view>

      <view class="hero-stamp">
        <text class="stamp-en">THIS MONTH</text>
        <text class="stamp-num">12</text>
        <text class="stamp-label">组余位</text>
      </view>

      <view class="hero-content">
        <text class="hero-en">YIPAGE / VOL. 06</text>
        <view class="hero-title serif">
          <text>把青春，</text>
          <text>拍成一页电影</text>
        </view>
        <view class="hero-sub">
          <text>不赶时间，不摆姿势。</text>
          <text>在你熟悉的校园里，留下最像你的样子。</text>
        </view>
        <view class="hero-actions">
          <view class="hero-btn" hover-class="btn-hover" @tap="goStyles">
            <text>挑选风格</text>
            <text class="hero-arrow">→</text>
          </view>
          <view class="hero-link" hover-class="tap-hover" @tap="goBooking">直接预约</view>
        </view>
      </view>
    </view>

    <view class="ticker">
      <text>校园写真</text>
      <view class="ticker-dot"></view>
      <text>闺蜜双人</text>
      <view class="ticker-dot"></view>
      <text>毕业纪念</text>
      <view class="ticker-dot"></view>
      <text>情绪肖像</text>
    </view>

    <view class="section block">
      <yp-section-head
        eyebrow="STYLE LOOKBOOK"
        title="选一种心动风格"
        more="全部风格"
        @more="goStyles"
      />
      <scroll-view class="style-scroll" scroll-x :show-scrollbar="false">
        <view class="style-row">
          <view v-for="(item, index) in featuredStyles" :key="item.id" class="style-item">
            <yp-style-card
              :photo-style="item"
              variant="scroll"
              :index-label="'0' + (index + 1)"
              @tap="openStyle"
            />
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="section">
      <view class="manifesto">
        <text class="manifesto-mark serif">“</text>
        <view class="manifesto-text serif">
          <text>你不需要会摆姿势，</text>
          <text>只需要做你自己。</text>
        </view>
        <view class="manifesto-foot">
          <text class="manifesto-sign">— 一页写真 · 拍摄手记</text>
          <view class="manifesto-link" @tap="goGuide">
            <text>拍摄须知</text>
            <text class="mini-arrow">→</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section block">
      <yp-section-head
        eyebrow="PRICE & PACKAGE"
        title="拍摄套餐"
        more="查看全部"
        @more="goPackages"
      />
      <view class="pkg-list">
        <view
          v-for="(item, index) in PACKAGES"
          :key="item.id"
          class="pkg-row"
          hover-class="pkg-row--hover"
          @tap="goPackage(item)"
        >
          <text class="pkg-index">0{{ index + 1 }}</text>
          <view class="pkg-copy">
            <view class="pkg-title-row">
              <text class="pkg-name serif">{{ item.name }}</text>
              <text v-if="item.badge" class="pkg-badge">{{ item.badge }}</text>
            </view>
            <text class="pkg-desc">{{ item.summary }} · {{ item.duration }}</text>
          </view>
          <view class="pkg-price">
            <text class="pkg-cur">¥</text>
            <text class="pkg-num">{{ item.price }}</text>
          </view>
          <text class="pkg-arrow">›</text>
        </view>
      </view>
      <text class="pkg-note">所有套餐均含拍摄策划、原片调色与 7 天云盘交付</text>
    </view>

    <view class="section block">
      <yp-section-head eyebrow="HOW IT WORKS" title="从心动到成片" />
      <view class="process-card">
        <view
          v-for="(step, index) in PROCESS_STEPS"
          :key="step.no"
          class="process-row"
          :class="{ 'process-row--last': index === PROCESS_STEPS.length - 1 }"
        >
          <text class="process-no serif">{{ step.no }}</text>
          <view class="process-copy">
            <text class="process-title">{{ step.title }}</text>
            <text class="process-desc">{{ step.desc }}</text>
          </view>
          <view class="process-line"></view>
        </view>
      </view>
    </view>

    <view class="block">
      <view class="section">
        <yp-section-head eyebrow="THEY SAID" title="镜头里的她们" />
      </view>
      <scroll-view class="review-scroll" scroll-x :show-scrollbar="false">
        <view class="review-row">
          <view v-for="review in REVIEWS" :key="review.name" class="review-card">
            <text class="review-mark serif">“</text>
            <text class="review-text">{{ review.text }}</text>
            <view class="review-foot">
              <view class="review-avatar" :style="{ background: review.tone }">
                {{ review.initial }}
              </view>
              <view class="review-author">
                <text class="review-name">{{ review.name }}</text>
                <text class="review-meta">{{ review.meta }}</text>
              </view>
              <view class="review-stars">★★★★★</view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="section block">
      <yp-section-head eyebrow="OUR STUDIO" title="两家店，都在你生活半径里" />
      <view class="store-card" hover-class="store-card--hover" @tap="goBooking">
        <view class="store-media">
          <image class="store-img" src="/static/images/store.jpg" mode="aspectFill"></image>
          <view class="store-shade"></view>
          <view class="store-overlay">
            <text class="store-en">TWO STORES / GUANGZHOU</text>
            <text class="store-title serif">来店里，喝杯水再开拍</text>
          </view>
        </view>
        <view class="store-list">
          <view v-for="store in STORES" :key="store.id" class="store-item">
            <view class="store-item-main">
              <view class="store-name-row">
                <text class="store-name">{{ store.name }}</text>
                <text class="store-hours">{{ store.hours }}</text>
              </view>
              <text class="store-address">{{ store.address }}</text>
              <view class="store-tags">
                <text v-for="tag in store.tags" :key="tag" class="store-tag">{{ tag }}</text>
              </view>
            </view>
            <text class="store-arrow">›</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section block">
      <view class="final-card">
        <text class="final-en">YOUR PAGE, YOUR STORY</text>
        <view class="final-title serif">
          <text>这个周末，</text>
          <text>去拍一组照片吧。</text>
        </view>
        <text class="final-desc">提前 1–3 天预约，给自己留一个下午。</text>
        <view class="final-btn" hover-class="btn-hover" @tap="goBooking">
          <text>预约拍摄</text>
          <text>→</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <text class="footer-brand serif">一页写真 · YIPAGE</text>
      <text class="footer-note">把青春，拍成一页电影 · 广州</text>
    </view>
  </view>
</template>

<script setup>
import { onShareAppMessage, onShareTimeline } from '@dcloudio/uni-app'
import { PACKAGES, PROCESS_STEPS, REVIEWS, STORES, STYLES } from '@/common/data.js'

const featuredStyles = STYLES.slice(0, 4)

function goStyles() {
  uni.switchTab({ url: '/pages/styles/list' })
}

function goBooking() {
  uni.switchTab({ url: '/pages/booking/create' })
}

function goGuide() {
  uni.navigateTo({ url: '/pages/mine/guide' })
}

function goPackages() {
  uni.navigateTo({ url: '/pages/packages/list' })
}

function goPackage(pkg) {
  uni.navigateTo({ url: `/pages/packages/list?id=${pkg.id}` })
}

function openStyle(photoStyle) {
  uni.navigateTo({ url: `/pages/styles/detail?id=${photoStyle.id}` })
}

onShareAppMessage(() => ({
  title: '一页写真 · 把青春拍成一页电影',
  path: '/pages/index/index'
}))

onShareTimeline(() => ({
  title: '一页写真 · 把青春拍成一页电影'
}))
</script>

<style scoped>
.home {
  padding-bottom: 32rpx;
}

/* Hero */
.hero {
  position: relative;
  height: 808rpx;
  margin: 6rpx 28rpx 0;
  overflow: hidden;
  border-radius: 30rpx;
  background: #2a241e;
}

.hero-img {
  width: 100%;
  height: 100%;
}

.hero-shade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(18, 14, 10, 0.34) 0%,
    rgba(18, 14, 10, 0.04) 32%,
    rgba(18, 14, 10, 0.16) 56%,
    rgba(18, 14, 10, 0.76) 100%
  );
}

.hero-kicker {
  position: absolute;
  top: 28rpx;
  left: 28rpx;
  display: flex;
  align-items: center;
  padding: 10rpx 16rpx;
  border: 1rpx solid rgba(255, 249, 241, 0.26);
  border-radius: 999rpx;
  background: rgba(20, 15, 11, 0.28);
  color: rgba(255, 249, 241, 0.92);
  font-size: 17rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.kicker-dot {
  width: 9rpx;
  height: 9rpx;
  margin-right: 10rpx;
  border-radius: 50%;
  background: #e8a48e;
}

.hero-stamp {
  position: absolute;
  top: 26rpx;
  right: 26rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 126rpx;
  height: 134rpx;
  border-radius: 50%;
  background: #f6ecd9;
  color: #211c17;
  transform: rotate(7deg);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.16);
}

.stamp-en {
  font-size: 13rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.3;
}

.stamp-num {
  margin: 2rpx 0 0;
  font-family: 'Times New Roman', serif;
  font-size: 48rpx;
  font-weight: 700;
  line-height: 1;
}

.stamp-label {
  font-size: 16rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.hero-content {
  position: absolute;
  right: 34rpx;
  bottom: 38rpx;
  left: 34rpx;
  color: #fff9f1;
}

.hero-en {
  display: block;
  margin-bottom: 16rpx;
  color: rgba(255, 249, 241, 0.7);
  font-size: 16rpx;
  font-weight: 600;
  letter-spacing: 5rpx;
}

.hero-title {
  display: flex;
  flex-direction: column;
  font-size: 64rpx;
  font-weight: 600;
  letter-spacing: 2rpx;
  line-height: 1.22;
  text-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.16);
}

.hero-sub {
  display: flex;
  flex-direction: column;
  margin-top: 20rpx;
  color: rgba(255, 249, 241, 0.76);
  font-size: 22rpx;
  line-height: 1.75;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 28rpx;
  margin-top: 30rpx;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 22rpx 34rpx;
  border-radius: 999rpx;
  background: #fff9f1;
  color: #211c17;
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.hero-arrow {
  font-size: 27rpx;
}

.hero-link {
  color: rgba(255, 249, 241, 0.82);
  font-size: 22rpx;
  letter-spacing: 1rpx;
  text-decoration: underline;
  text-underline-offset: 6rpx;
}

/* Ticker */
.ticker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 24rpx 36rpx 0;
  padding: 20rpx 0;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  letter-spacing: 2rpx;
}

.ticker-dot {
  width: 5rpx;
  height: 5rpx;
  border-radius: 50%;
  background: var(--accent, #d65b43);
}

.block {
  margin-top: 62rpx;
}

/* Styles */
.style-scroll {
  width: 100%;
  white-space: nowrap;
}

.style-row {
  display: flex;
  gap: 20rpx;
  padding-right: 36rpx;
  padding-left: 36rpx;
}

.style-item {
  flex: 0 0 368rpx;
  width: 368rpx;
}

/* Manifesto */
.manifesto {
  position: relative;
  overflow: hidden;
  margin-top: 62rpx;
  padding: 44rpx 36rpx 38rpx;
  border-radius: 28rpx;
  background: #272b21;
  color: #f4eedf;
}

.manifesto::after {
  content: '';
  position: absolute;
  right: -50rpx;
  bottom: -100rpx;
  width: 300rpx;
  height: 300rpx;
  border: 1rpx solid rgba(244, 238, 223, 0.13);
  border-radius: 50%;
}

.manifesto-mark {
  position: absolute;
  top: 8rpx;
  right: 30rpx;
  color: rgba(244, 238, 223, 0.16);
  font-size: 150rpx;
  line-height: 1;
}

.manifesto-text {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  font-size: 42rpx;
  font-weight: 500;
  letter-spacing: 2rpx;
  line-height: 1.55;
}

.manifesto-foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid rgba(244, 238, 223, 0.14);
}

.manifesto-sign {
  color: rgba(244, 238, 223, 0.54);
  font-size: 17rpx;
  letter-spacing: 1rpx;
}

.manifesto-link {
  display: flex;
  align-items: center;
  gap: 8rpx;
  color: rgba(244, 238, 223, 0.88);
  font-size: 19rpx;
}

.mini-arrow {
  font-size: 22rpx;
}

/* Packages */
.pkg-list {
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.pkg-row {
  display: flex;
  align-items: center;
  padding: 26rpx 2rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.pkg-row--hover {
  opacity: 0.65;
}

.pkg-index {
  width: 60rpx;
  color: var(--muted-light, #b5aa9e);
  font-family: 'Times New Roman', serif;
  font-size: 22rpx;
  font-style: italic;
}

.pkg-copy {
  flex: 1;
  min-width: 0;
}

.pkg-title-row {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.pkg-name {
  color: var(--ink, #211c17);
  font-size: 33rpx;
  font-weight: 600;
}

.pkg-badge {
  padding: 2rpx 10rpx;
  border-radius: 4rpx;
  background: var(--accent-soft, #f4ddd4);
  color: var(--accent-deep, #b94732);
  font-size: 15rpx;
  font-weight: 500;
  line-height: 1.6;
}

.pkg-desc {
  display: block;
  margin-top: 4rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 20rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pkg-price {
  display: flex;
  align-items: baseline;
  flex-shrink: 0;
  margin-left: 16rpx;
  color: var(--ink, #211c17);
}

.pkg-cur {
  font-size: 18rpx;
  font-weight: 600;
}

.pkg-num {
  font-family: 'Times New Roman', serif;
  font-size: 38rpx;
  font-weight: 700;
}

.pkg-arrow {
  margin-left: 12rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 32rpx;
}

.pkg-note {
  display: block;
  margin-top: 18rpx;
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  letter-spacing: 1rpx;
  line-height: 1.6;
}

/* Process */
.process-card {
  overflow: hidden;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 26rpx;
  background: var(--paper, #fffcf7);
}

.process-row {
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 24rpx 28rpx;
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.process-row--last {
  border-bottom: 0;
}

.process-no {
  width: 78rpx;
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 28rpx;
  font-style: italic;
  line-height: 1.4;
}

.process-copy {
  flex: 1;
  min-width: 0;
}

.process-title {
  display: block;
  color: var(--ink, #211c17);
  font-size: 26rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.process-desc {
  display: block;
  margin-top: 3rpx;
  color: var(--muted, #8d8175);
  font-size: 20rpx;
  line-height: 1.55;
}

/* Reviews */
.review-scroll {
  width: 100%;
  white-space: nowrap;
}

.review-row {
  display: flex;
  gap: 18rpx;
  padding-right: 36rpx;
  padding-left: 36rpx;
}

.review-card {
  display: flex;
  flex: 0 0 520rpx;
  flex-direction: column;
  width: 520rpx;
  padding: 28rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 24rpx;
  background: var(--paper, #fffcf7);
  white-space: normal;
}

.review-mark {
  height: 49rpx;
  color: var(--accent, #d65b43);
  font-size: 76rpx;
  line-height: 0.9;
}

.review-text {
  display: block;
  min-height: 154rpx;
  margin-top: 4rpx;
  color: var(--ink-soft, #4d443b);
  font-size: 23rpx;
  line-height: 1.75;
}

.review-foot {
  display: flex;
  align-items: center;
  margin-top: 24rpx;
  padding-top: 20rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.review-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 62rpx;
  height: 62rpx;
  border-radius: 50%;
  color: #3c332a;
  font-family: 'Songti SC', serif;
  font-size: 27rpx;
}

.review-author {
  display: flex;
  flex-direction: column;
  margin-left: 14rpx;
}

.review-name {
  color: var(--ink, #211c17);
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.4;
}

.review-meta {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.4;
}

.review-stars {
  margin-left: auto;
  color: #c19450;
  font-size: 15rpx;
  letter-spacing: 1rpx;
}

/* Store */
.store-card {
  overflow: hidden;
  border-radius: 28rpx;
  background: var(--paper, #fffcf7);
  box-shadow: 0 10rpx 30rpx rgba(57, 43, 31, 0.05);
}

.store-card--hover {
  opacity: 0.9;
}

.store-media {
  position: relative;
  width: 100%;
  height: 310rpx;
  overflow: hidden;
}

.store-img {
  width: 100%;
  height: 100%;
}

.store-shade {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(18, 14, 10, 0.02) 30%, rgba(18, 14, 10, 0.62) 100%);
}

.store-overlay {
  position: absolute;
  right: 28rpx;
  bottom: 22rpx;
  left: 28rpx;
  display: flex;
  flex-direction: column;
  color: #fff9f1;
}

.store-en {
  font-size: 15rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
  line-height: 1.5;
}

.store-title {
  margin-top: 4rpx;
  font-size: 34rpx;
  letter-spacing: 1rpx;
  line-height: 1.4;
}

.store-list {
  padding: 0 28rpx;
}

.store-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.store-item-main {
  flex: 1;
  min-width: 0;
}

.store-name-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.store-name {
  color: var(--ink, #211c17);
  font-size: 25rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.store-hours {
  color: var(--muted, #8d8175);
  font-size: 17rpx;
}

.store-address {
  display: block;
  margin-top: 4rpx;
  color: var(--muted, #8d8175);
  font-size: 19rpx;
  line-height: 1.5;
}

.store-tags {
  display: flex;
  gap: 10rpx;
  margin-top: 10rpx;
}

.store-tag {
  padding: 2rpx 10rpx;
  border: 1rpx solid var(--line, #e7ddd0);
  border-radius: 4rpx;
  color: var(--olive, #6e7657);
  font-size: 15rpx;
  line-height: 1.6;
}

.store-arrow {
  margin-left: 16rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 32rpx;
}

/* Final */
.final-card {
  position: relative;
  overflow: hidden;
  padding: 42rpx 34rpx 36rpx;
  border-radius: 28rpx;
  background: var(--ink, #211c17);
  color: #fff9f1;
}

.final-card::before {
  content: '';
  position: absolute;
  top: -100rpx;
  right: -70rpx;
  width: 330rpx;
  height: 330rpx;
  border: 1rpx solid rgba(255, 249, 241, 0.14);
  border-radius: 50%;
}

.final-en {
  color: rgba(255, 249, 241, 0.48);
  font-size: 15rpx;
  font-weight: 600;
  letter-spacing: 4rpx;
}

.final-title {
  display: flex;
  flex-direction: column;
  margin-top: 16rpx;
  font-size: 42rpx;
  letter-spacing: 2rpx;
  line-height: 1.5;
}

.final-desc {
  display: block;
  margin-top: 14rpx;
  color: rgba(255, 249, 241, 0.58);
  font-size: 20rpx;
  line-height: 1.6;
}

.final-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30rpx;
  padding: 22rpx 30rpx;
  border-radius: 999rpx;
  background: #f6ecd9;
  color: var(--ink, #211c17);
  font-size: 24rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

/* Footer */
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60rpx;
  padding: 0 36rpx 28rpx;
}

.footer-brand {
  color: var(--muted, #8d8175);
  font-size: 22rpx;
  letter-spacing: 3rpx;
}

.footer-note {
  margin-top: 8rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 16rpx;
  letter-spacing: 2rpx;
}
</style>
