export const STUDIO_INFO = {
  name: '一页写真',
  en: 'YIPAGE STUDIO',
  slogan: '把青春，拍成一页电影',
  wechat: 'yipage2026',
  phone: '400-026-2026',
  hours: '10:00–20:30（周一闭店）',
  since: 'EST. 2021'
}

export const STORES = [
  {
    id: 'campus',
    name: '大学城店',
    en: 'CAMPUS STUDIO',
    address: '番禺区 大学城中环西路 88 号 青创汇 2F',
    shortAddress: '大学城中环西路 88 号 2F',
    metro: '地铁 4 号线 大学城南站 C 口 · 步行约 6 分钟',
    hours: '10:00–20:30（周一闭店）',
    tags: ['离学校最近', '外景步行 5 分钟'],
    image: '/static/images/store.jpg'
  },
  {
    id: 'east',
    name: '东山口店',
    en: 'EAST STUDIO',
    address: '越秀区 庙前直街 16 号 3F',
    shortAddress: '庙前直街 16 号 3F',
    metro: '地铁 1 / 6 号线 东山口站 E 口 · 步行约 3 分钟',
    hours: '10:00–20:30（周一闭店）',
    tags: ['独立棚拍空间', '复古街景'],
    image: '/static/images/store.jpg'
  }
]

export const STYLE_CATEGORIES = [
  { key: 'all', name: '全部' },
  { key: 'fresh', name: '日系' },
  { key: 'film', name: '胶片' },
  { key: 'korean', name: '韩系' },
  { key: 'campus', name: '校园' },
  { key: 'night', name: '夜景' },
  { key: 'mood', name: '情绪' }
]

export const STYLES = [
  {
    id: 'fresh',
    category: 'fresh',
    name: '日系清新',
    en: 'FRESH BREEZE',
    badge: '本周人气',
    cover: '/static/images/style-fresh.jpg',
    priceFrom: 199,
    duration: '60–90 min',
    people: '1–2 人',
    retouch: '6 张起',
    tags: ['自然光', '校园', '轻写真'],
    tagline: '像一阵穿过走廊的风',
    quote: '不要看镜头，看向风来的方向。',
    desc:
      '不摆拍、不用力，在熟悉的校园里边走边拍。自然光、低饱和和轻轻的风，留下你最松弛的样子。',
    scenes: ['林荫道', '教学楼', '草坪'],
    suitable: '第一次拍写真、想要自然日常感的同学',
    palette: ['#dce6d2', '#f1e7d5', '#9eae8a']
  },
  {
    id: 'vintage',
    category: 'film',
    name: '复古胶片',
    en: 'FILM MEMORY',
    badge: '胶片限定',
    cover: '/static/images/style-vintage.jpg',
    priceFrom: 239,
    duration: '90 min',
    people: '1–2 人',
    retouch: '8 张起',
    tags: ['胶片感', '暖调', '文艺'],
    tagline: '旧照片里，永远十八岁',
    quote: '让时间在颗粒里，慢一点。',
    desc:
      '暖调、颗粒与轻微的漏光，像从旧相册里翻出的一页。适合有故事感的街道、咖啡馆和傍晚的天台。',
    scenes: ['老街区', '咖啡馆', '天台'],
    suitable: '喜欢复古质感、想拍一组有故事感照片的同学',
    palette: ['#7f3d32', '#d9c1a3', '#4b423b']
  },
  {
    id: 'korean',
    category: 'korean',
    name: '韩系简约',
    en: 'CLEAN FRAME',
    badge: '棚拍推荐',
    cover: '/static/images/style-korean.jpg',
    priceFrom: 259,
    duration: '90 min',
    people: '1 人',
    retouch: '8 张起',
    tags: ['棚拍', '极简', '高级感'],
    tagline: '干净、克制，也足够心动',
    quote: '少一点装饰，多一点你。',
    desc:
      '奶油色背景、干净的光和克制的构图。没有多余道具，把注意力全部留给你本身。',
    scenes: ['纯色背景', '自然光棚', '极简空间'],
    suitable: '想拍头像、简历照，或喜欢干净高级感的同学',
    palette: ['#e6ded1', '#b8a78f', '#6d655c']
  },
  {
    id: 'campus',
    category: 'campus',
    name: '校园纪实',
    en: 'CAMPUS DAYS',
    badge: '毕业季',
    cover: '/static/images/style-campus.jpg',
    priceFrom: 299,
    duration: '120 min',
    people: '1–4 人',
    retouch: '12 张起',
    tags: ['外景', '双人', '毕业季'],
    tagline: '在你最熟悉的路上，记录你',
    quote: '操场的风，会记得你跑过的样子。',
    desc:
      '教室、操场、宿舍楼下，边聊天边拍。适合毕业前和室友、朋友一起，把四年的日常收进同一组照片。',
    scenes: ['操场', '图书馆', '宿舍楼下'],
    suitable: '毕业季、宿舍合影、想记录校园日常的同学',
    palette: ['#c9d4b8', '#e9d9b6', '#777f63']
  },
  {
    id: 'night',
    category: 'night',
    name: '夜景闪光',
    en: 'NEON NIGHT',
    badge: '夜色闪光',
    cover: '/static/images/style-night.jpg',
    priceFrom: 269,
    duration: '90 min',
    people: '1–2 人',
    retouch: '8 张起',
    tags: ['闪光灯', '街头', '氛围'],
    tagline: '夜色是最好用的滤镜',
    quote: '城市亮起来的时候，你也是。',
    desc:
      '直闪、霓虹和一点点失焦，拍出电影截帧一样的夜晚。适合敢穿、敢表达、喜欢氛围感的同学。',
    scenes: ['霓虹街口', '便利店', '天台夜景'],
    suitable: '喜欢街头感、想拍一组不一样照片的同学',
    palette: ['#1f2a3a', '#d65b43', '#4a8f8a']
  },
  {
    id: 'mood',
    category: 'mood',
    name: '情绪肖像',
    en: 'MOOD STUDY',
    badge: '情绪肖像',
    cover: '/static/images/style-mood.jpg',
    priceFrom: 319,
    duration: '120 min',
    people: '1 人',
    retouch: '10 张起',
    tags: ['棚拍', '低饱和', '艺术'],
    tagline: '不说话的时候，照片在说话',
    quote: '把没说出口的那部分，留在照片里。',
    desc:
      '一束侧光、一面旧墙和一段安静的音乐。不追求标准笑容，只记录你真正处在当下的样子。',
    scenes: ['暗调棚拍', '一束侧光', '花艺装置'],
    suitable: '想拍更有表达欲、更个人化肖像的同学',
    palette: ['#cbb7c7', '#1f1b22', '#7c5d73']
  }
]

export const PACKAGES = [
  {
    id: 'light',
    name: '轻氧写真',
    en: 'LIGHT',
    price: 199,
    originalPrice: 299,
    duration: '60 分钟',
    people: '1 人',
    outfits: '1 套',
    retouch: '6 张',
    negatives: '30 张',
    scenes: '1 个',
    summary: '第一次拍，也能很自在',
    badge: '初次体验',
    deposit: 50,
    includes: [
      '1 对 1 拍摄引导',
      '6 张精修 + 30 张调色底片',
      '服装 1 套（可自带）',
      '7 天内云盘交付'
    ]
  },
  {
    id: 'signature',
    name: '一页主角',
    en: 'SIGNATURE',
    price: 399,
    originalPrice: 499,
    duration: '120 分钟',
    people: '1 人',
    outfits: '2 套',
    retouch: '12 张',
    negatives: '60 张',
    scenes: '2 个',
    summary: '把最喜欢的样子，拍得更完整',
    badge: '人气之选',
    deposit: 100,
    includes: [
      '1 对 1 拍摄策划与引导',
      '12 张精修 + 60 张调色底片',
      '服装 2 套（可自带）',
      '2 个场景 + 7 天内云盘交付'
    ]
  },
  {
    id: 'duo',
    name: '双人纪念',
    en: 'TOGETHER',
    price: 599,
    originalPrice: 699,
    duration: '150 分钟',
    people: '2 人',
    outfits: '2 套',
    retouch: '16 张',
    negatives: '80 张',
    scenes: '2 个',
    summary: '闺蜜、情侣或室友的共同纪念',
    badge: '双人纪念',
    deposit: 150,
    includes: [
      '双人互动拍摄引导',
      '16 张精修 + 80 张调色底片',
      '每人服装 2 套（可自带）',
      '2 个场景 + 7 天内云盘交付'
    ]
  }
]

export const ADDON_RETOUCH_PRICE = 30
export const ADDON_RETOUCH_MAX = 5

export const TIME_GROUPS = [
  { label: '上午', slots: ['10:00', '11:30'] },
  { label: '下午', slots: ['14:00', '15:30', '17:00'] },
  { label: '傍晚', slots: ['18:30'] }
]

export const PROCESS_STEPS = [
  {
    no: '01',
    title: '选风格',
    desc: '从 6 种影像语言里，挑一种最像你的'
  },
  {
    no: '02',
    title: '定套餐',
    desc: '按人数、时长和精修数量选择'
  },
  {
    no: '03',
    title: '约时间',
    desc: '选门店、日期与时段，提交预约'
  },
  {
    no: '04',
    title: '到店拍',
    desc: '提前 10 分钟到店，其他交给我们'
  }
]

export const REVIEWS = [
  {
    name: '阿梨',
    meta: '大二 · 第一次拍写真',
    initial: '梨',
    tone: '#dce6d2',
    text:
      '摄影师会一直跟我聊天、引导动作，完全不会尴尬。原片直出就很好看，发朋友圈被问了一整晚。'
  },
  {
    name: '小满和室友',
    meta: '大四 · 宿舍毕业照',
    initial: '满',
    tone: '#f1d8ce',
    text:
      '四个人在操场和教学楼拍了一下午，像把大学四年又走了一遍。套餐里精修数量也够分，不用抢图。'
  },
  {
    name: 'Kiki',
    meta: '研一 · 情绪肖像',
    initial: 'K',
    tone: '#d8d0df',
    text:
      '从选风格到到店都很顺，不会有推销。成片比我以为的更像我，是会一直存着的那种照片。'
  }
]

export const TRUST_ITEMS = [
  { title: '无隐形消费', desc: '价格即套餐内容' },
  { title: '底片不另售', desc: '套餐内全部赠送' },
  { title: '7 天交付', desc: '精修 + 调色底片' }
]

export function findStyle(id) {
  return STYLES.find((item) => item.id === id) || STYLES[0]
}

export function findPackage(id) {
  return PACKAGES.find((item) => item.id === id) || PACKAGES[0]
}

export function findStore(id) {
  return STORES.find((item) => item.id === id) || STORES[0]
}
