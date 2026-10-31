<template>
  <view class="page guide-page">
    <yp-nav-bar title="拍摄须知" />

    <view class="section intro">
      <text class="eyebrow">BEFORE THE SHOOT</text>
      <view class="title serif">
        <text>拍照前，</text>
        <text>先放松一点。</text>
      </view>
      <text class="desc">
        第一次拍写真也不用紧张。这里整理了一些常见问题，看完之后，带着自己来就好。
      </text>
    </view>

    <view class="section quick">
      <view class="quick-item">
        <text class="quick-label">营业时间</text>
        <text class="quick-value">10:00–20:30</text>
        <text class="quick-note">周一闭店</text>
      </view>
      <view class="quick-line"></view>
      <view class="quick-item">
        <text class="quick-label">到店建议</text>
        <text class="quick-value">提前 10 分钟</text>
        <text class="quick-note">留一点缓冲时间</text>
      </view>
      <view class="quick-line"></view>
      <view class="quick-item">
        <text class="quick-label">成片交付</text>
        <text class="quick-value">7 天以内</text>
        <text class="quick-note">云盘下载</text>
      </view>
    </view>

    <view class="section list">
      <view
        v-for="(section, index) in sections"
        :key="section.title"
        class="guide-item"
        :class="{ 'guide-item--open': openIndex === index }"
      >
        <view class="guide-head" @tap="toggle(index)">
          <text class="guide-no">0{{ index + 1 }}</text>
          <view class="guide-copy">
            <text class="guide-title">{{ section.title }}</text>
            <text class="guide-sub">{{ section.sub }}</text>
          </view>
          <view class="plus" :class="{ 'plus--open': openIndex === index }">
            <view class="plus-line plus-line--h"></view>
            <view class="plus-line plus-line--v"></view>
          </view>
        </view>
        <view v-if="openIndex === index" class="guide-body">
          <text v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex" class="guide-p">
            {{ paragraph }}
          </text>
          <view v-if="section.tips && section.tips.length" class="tips">
            <text v-for="tip in section.tips" :key="tip" class="tip">· {{ tip }}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="section contact">
      <view class="contact-card">
        <text class="contact-en">STILL HAVE QUESTIONS?</text>
        <text class="contact-title serif">直接问我们就好</text>
        <text class="contact-desc">客服微信 {{ STUDIO_INFO.wechat }}，营业时间内通常 10 分钟内回复。</text>
        <view class="contact-btn" hover-class="btn-hover" @tap="contactStudio">
          <text>复制客服微信</text>
          <text>→</text>
        </view>
      </view>
    </view>

    <view class="footer">
      <text>一页写真 · 把青春拍成一页电影</text>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
import { onShareAppMessage } from '@dcloudio/uni-app'
import { STUDIO_INFO } from '@/common/data.js'

const openIndex = ref(0)

const sections = [
  {
    title: '预约与改期',
    sub: '怎么约、怎么改、临时有事怎么办',
    paragraphs: [
      '建议提前 1–3 天预约。提交预约后，客服会在 30 分钟内通过电话或微信确认档期，确认后才算锁档。',
      '拍摄前 48 小时可免费改期一次；拍摄当天改期需补 ¥80 档期费。每单仅支持改期一次，改期后的档期以门店实际空档为准。'
    ],
    tips: ['周末与毕业季档期较紧，建议尽早预约。', '如遇不可抗力闭店，可免费改期或全额退还定金。']
  },
  {
    title: '到店准备',
    sub: '当天需要带什么、几点到',
    paragraphs: [
      '请提前 10 分钟到店，预留选服装、沟通拍摄和补妆的时间。迟到超过 30 分钟，拍摄时长会相应顺延，或由门店协助重新预约。',
      '门店不提供化妆服务，建议化好日常妆再来，也可以带自己的补妆用品。素颜也完全没问题，自然的状态本身就很上镜。'
    ],
    tips: ['带一件外套，棚拍空调可能偏冷。', '如果戴眼镜，可以带一副隐形或空镜框备用。']
  },
  {
    title: '服装建议',
    sub: '穿什么，才能拍出想要的感觉',
    paragraphs: [
      '套餐内包含服装，也可以自带。建议提前把想穿的衣服拍给客服，我们会根据风格和场景一起筛选。',
      '日系、韩系风格适合浅色、纯色和有垂坠感的衣服；复古胶片可以尝试饱和度高的颜色；夜景闪光适合皮衣、亮片或有轮廓感的外套。'
    ],
    tips: ['避免大面积细密条纹和小碎花，镜头里容易显乱。', '带一双舒服的鞋，校园外景需要走动。']
  },
  {
    title: '关于拍摄',
    sub: '不会摆姿势，也不会尴尬',
    paragraphs: [
      '你不需要提前学动作。摄影师会从聊天开始，引导你走、坐、回头，在自然的状态里抓拍。整个过程更像一次散步，而不是考试。',
      '可以带上有纪念意义的小道具：一束花、一本旧书、喜欢的相机，或者宿舍里那张合照。它们会让照片更像你。'
    ],
    tips: ['拍摄前一晚尽量少熬夜，皮肤状态会更好。', '如果紧张，可以直接告诉摄影师，我们会慢一点来。']
  },
  {
    title: '选片与交付',
    sub: '精修几张、多久能拿到',
    paragraphs: [
      '拍摄完成后，套餐内的调色底片会全部赠送，精修照片按套餐张数挑选。一般拍摄后 7 天内通过云盘发送下载链接。',
      '超出套餐的精修可按 ¥30/张加选，底片不单独售卖。加选精修会在原交付时间上顺延 2–3 天。'
    ],
    tips: ['云盘链接建议及时保存到自己的网盘。', '精修需求可以在选片时一次性告诉客服。']
  },
  {
    title: '隐私与版权',
    sub: '你的照片，由你决定',
    paragraphs: [
      '未经你的明确允许，门店不会将照片用于朋友圈、小红书或任何商业宣传。',
      '如果你愿意授权展示，我们会先发送选中的照片给你确认，并注明可随时撤回授权。'
    ],
    tips: ['拍摄前可主动告知不希望公开。', '如对交付有疑问，可在收到成片后 7 天内联系客服。']
  }
]

function toggle(index) {
  openIndex.value = openIndex.value === index ? -1 : index
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

onShareAppMessage(() => ({
  title: '一页写真 · 拍摄前需要知道的几件事',
  path: '/pages/mine/guide'
}))
</script>

<style scoped>
.guide-page {
  padding-bottom: 46rpx;
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
  line-height: 1.33;
}

.desc {
  display: block;
  max-width: 610rpx;
  margin-top: 18rpx;
  color: var(--muted, #8d8175);
  font-size: 22rpx;
  line-height: 1.8;
}

.quick {
  display: flex;
  align-items: stretch;
  margin-top: 34rpx;
  padding-top: 22rpx;
  padding-bottom: 22rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.quick-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2rpx;
  padding: 0 14rpx;
  text-align: center;
}

.quick-item:first-child {
  padding-left: 0;
}

.quick-item:last-child {
  padding-right: 0;
}

.quick-line {
  width: 1rpx;
  background: var(--line, #e7ddd0);
}

.quick-label {
  color: var(--muted, #8d8175);
  font-size: 16rpx;
  line-height: 1.5;
}

.quick-value {
  color: var(--ink, #211c17);
  font-size: 22rpx;
  font-weight: 600;
  line-height: 1.5;
}

.quick-note {
  color: var(--muted-light, #b5aa9e);
  font-size: 15rpx;
  line-height: 1.5;
}

.list {
  margin-top: 30rpx;
  border-top: 1rpx solid var(--line, #e7ddd0);
}

.guide-item {
  border-bottom: 1rpx solid var(--line, #e7ddd0);
}

.guide-item--open {
  background: rgba(255, 252, 247, 0.46);
}

.guide-head {
  display: flex;
  align-items: center;
  gap: 18rpx;
  padding: 24rpx 2rpx;
}

.guide-no {
  flex-shrink: 0;
  width: 48rpx;
  color: var(--accent, #d65b43);
  font-family: 'Times New Roman', serif;
  font-size: 18rpx;
  font-style: italic;
  line-height: 1.5;
}

.guide-copy {
  flex: 1;
  min-width: 0;
}

.guide-title {
  display: block;
  color: var(--ink, #211c17);
  font-size: 26rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.guide-sub {
  display: block;
  margin-top: 1rpx;
  overflow: hidden;
  color: var(--muted, #8d8175);
  font-size: 17rpx;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.plus {
  position: relative;
  flex-shrink: 0;
  width: 34rpx;
  height: 34rpx;
}

.plus-line {
  position: absolute;
  top: 50%;
  left: 50%;
  background: var(--ink-soft, #4d443b);
  transform: translate(-50%, -50%);
}

.plus-line--h {
  width: 20rpx;
  height: 2rpx;
}

.plus-line--v {
  width: 2rpx;
  height: 20rpx;
  transition: transform 0.2s ease;
}

.plus--open .plus-line--v {
  transform: translate(-50%, -50%) rotate(90deg);
}

.guide-body {
  padding: 0 2rpx 26rpx 66rpx;
}

.guide-p {
  display: block;
  color: var(--ink-soft, #4d443b);
  font-size: 21rpx;
  line-height: 1.8;
}

.guide-p + .guide-p {
  margin-top: 10rpx;
}

.tips {
  display: flex;
  flex-direction: column;
  gap: 4rpx;
  margin-top: 16rpx;
  padding: 12rpx 16rpx;
  border-left: 2rpx solid var(--accent-soft, #f4ddd4);
  background: rgba(244, 221, 212, 0.22);
}

.tip {
  color: var(--muted, #8d8175);
  font-size: 18rpx;
  line-height: 1.65;
}

.contact {
  margin-top: 40rpx;
}

.contact-card {
  padding: 28rpx;
  border-radius: 24rpx;
  background: #272b21;
  color: #f4eedf;
}

.contact-en {
  color: rgba(244, 238, 223, 0.42);
  font-size: 13rpx;
  font-weight: 600;
  letter-spacing: 3rpx;
}

.contact-title {
  display: block;
  margin-top: 5rpx;
  font-size: 33rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
  line-height: 1.5;
}

.contact-desc {
  display: block;
  margin-top: 4rpx;
  color: rgba(244, 238, 223, 0.56);
  font-size: 18rpx;
  line-height: 1.65;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 12rpx;
  margin-top: 20rpx;
  padding: 16rpx 26rpx;
  border-radius: 999rpx;
  background: #f6ecd9;
  color: var(--ink, #211c17);
  font-size: 20rpx;
  font-weight: 600;
}

.footer {
  display: flex;
  justify-content: center;
  margin-top: 36rpx;
  color: var(--muted-light, #b5aa9e);
  font-size: 15rpx;
  letter-spacing: 2rpx;
}
</style>
