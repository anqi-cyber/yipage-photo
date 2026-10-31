<script>
import { ensureDemoOrders } from '@/common/order.js'

export default {
  onLaunch() {
    ensureDemoOrders()
  },
  onShow() {},
  onHide() {}
}
</script>

<style>
page,
body {
  --bg: #f4eee5;
  --paper: #fffcf7;
  --paper-deep: #f9f3ea;
  --ink: #211c17;
  --ink-soft: #4d443b;
  --muted: #8d8175;
  --muted-light: #b5aa9e;
  --line: #e7ddd0;
  --accent: #d65b43;
  --accent-deep: #b94732;
  --accent-soft: #f4ddd4;
  --olive: #6e7657;
  --gold: #b99558;
  background: var(--bg);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Helvetica Neue',
    'Microsoft YaHei', sans-serif;
  font-size: 28rpx;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

view,
text,
image,
button,
input,
textarea,
scroll-view,
swiper,
swiper-item {
  box-sizing: border-box;
}

image {
  display: block;
}

button {
  margin: 0;
  padding: 0;
  border-radius: 0;
  background: transparent;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
}

button::after {
  border: 0;
}

input,
textarea {
  font-family: inherit;
  color: var(--ink);
}

.page {
  min-height: 100vh;
  background: var(--bg);
}

.section {
  padding-left: 36rpx;
  padding-right: 36rpx;
}

.serif {
  font-family: 'Songti SC', 'STSong', 'Noto Serif SC', 'SimSun', serif;
}

.eyebrow {
  display: block;
  color: var(--muted);
  font-size: 19rpx;
  font-weight: 600;
  letter-spacing: 5rpx;
  line-height: 1.4;
}

.muted {
  color: var(--muted);
}

.tap-hover {
  opacity: 0.78;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 92rpx;
  padding: 0 40rpx;
  border-radius: 999rpx;
  font-size: 27rpx;
  font-weight: 600;
  letter-spacing: 1rpx;
}

.btn--dark {
  background: var(--ink);
  color: #fff9f1;
}

.btn--accent {
  background: var(--accent);
  color: #fff;
}

.btn--ghost {
  border: 1rpx solid var(--line);
  background: transparent;
  color: var(--ink);
}

.btn-hover {
  opacity: 0.86;
  transform: translateY(1px);
}

.hairline {
  height: 1rpx;
  background: var(--line);
}

.safe-bottom {
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
}

/* #ifdef H5 */
html,
body,
#app {
  min-height: 100%;
  background: #f4eee5;
}
/* #endif */
</style>
