// 模拟数据
import { z } from "zod";

// 类型定义
export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  coverImage: z.string(),
  chapters: z.number(),
  enrolled: z.number(),
});

export const DailyContentSchema = z.object({
  id: z.string(),
  type: z.enum(["quote", "question"]),
  content: z.string(),
  explanation: z.string(),
  source: z.string(),
  examples: z.string().optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.number().optional(),
 文案Suggestion: z.string().optional(),
});

export const EncyclopediaEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  definition: z.string(),
  originalText: z.string(),
  annotations: z.string(),
  application: z.string(),
  level: z.enum(["primary", "secondary", "adult"]),
});

export const CarouselItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string(),
  link: z.string(),
});

export type Course = z.infer<typeof CourseSchema>;
export type DailyContent = z.infer<typeof DailyContentSchema>;
export type EncyclopediaEntry = z.infer<typeof EncyclopediaEntrySchema>;
export type CarouselItem = z.infer<typeof CarouselItemSchema>;

// 课程详情类型
export const ChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(["article", "video"]),
  content: z.string().optional(),
  videoUrl: z.string().optional(),
});

export const CourseDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  coverImage: z.string(),
  intro: z.string(),
  chapters: z.array(ChapterSchema),
  related: z.array(z.string()).optional(),
});

export type Chapter = z.infer<typeof ChapterSchema>;
export type CourseDetail = z.infer<typeof CourseDetailSchema>;

// 课程详情数据
export const courseDetails: Record<string, CourseDetail> = {
  course1: {
    id: "course1",
    title: "中国传统节日10讲",
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20Chinese%20festival%20celebration&sign=a2fba4e4b68d6b7db84cf7bea782d3cc",
    intro: "系统梳理传统节日的起源、习俗与文化象征，理解节日背后的家国情怀。",
    chapters: [
      { id: "c1", title: "节日概览", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c2", title: "春节", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c3", title: "清明", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c4", title: "端午", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c5", title: "中秋", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
    ],
    related: ["course2", "course4"],
  },
  course2: {
    id: "course2",
    title: "30天论语精选",
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20ancient%20book%20Confucius&sign=115f35b3f982f4d48a6bb8f6696e5e42",
    intro: "精选语录，结合现代情境解析儒家修身、处世与治学之道。",
    chapters: [
      { id: "c1", title: "学而时习之", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c2", title: "三人行必有我师", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c3", title: "君子和而不同", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c4", title: "忠恕之道", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c5", title: "礼之用和为贵", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
    ],
    related: ["course3", "course5"],
  },
  course3: {
    id: "course3",
    title: "每天一首唐诗",
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20traditional%20poetry%20Tang%20Dynasty&sign=38fd4405be6b15d7b1c1a8bf444d344f",
    intro: "以代表性作品为线索，体味唐诗的意境与美学表达。",
    chapters: [
      { id: "c1", title: "春晓·孟浩然", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c2", title: "静夜思·李白", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c3", title: "黄鹤楼送孟浩然之广陵·李白", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c4", title: "登鹳雀楼·王之涣", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c5", title: "望庐山瀑布·李白", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
    ],
    related: ["course2", "course4"],
  },
  course4: {
    id: "course4",
    title: "中国传统礼仪入门",
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20etiquette%20ceremony&sign=baf2ffa83724dee04d5037710c3c3657",
    intro: "从日常的见面、餐桌、服饰到节庆典礼，理解礼的秩序与人伦之美。",
    chapters: [
      { id: "c1", title: "礼的起源与精神", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c2", title: "见面之礼", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c3", title: "餐桌礼仪", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c4", title: "服饰与仪容", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c5", title: "节庆与仪式", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
    ],
    related: ["course1", "course5"],
  },
  course5: {
    id: "course5",
    title: "中国茶文化基础课",
    coverImage:
      "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20tea%20ceremony&sign=9e8a3b8f3b204b7c9c2f1d1a5c3d7e10",
    intro: "从识茶到品茶，以礼入茶，体会清敬之美。",
    chapters: [
      { id: "c1", title: "识茶与分类", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c2", title: "器具与水", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c3", title: "泡茶步骤", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c4", title: "品饮礼仪", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
      { id: "c5", title: "常见误区", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1xx411c7mD&autoplay=0" },
    ],
    related: ["course2", "course3"],
  },
};

// 模拟数据
export const popularCourses: Course[] = [
  {
    id: "course1",
    title: "中国传统节日10讲",
    description: "深入了解中国十大传统节日的起源、习俗与文化内涵",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20Chinese%20festival%20celebration&sign=a2fba4e4b68d6b7db84cf7bea782d3cc",
    chapters: 10,
    enrolled: 12800,
  },
  {
    id: "course2",
    title: "30天论语精选",
    description: "每天学习一句论语，感悟儒家智慧在现代生活中的应用",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20ancient%20book%20Confucius&sign=115f35b3f982f4d48a6bb8f6696e5e42",
    chapters: 30,
    enrolled: 9600,
  },
  {
    id: "course3",
    title: "每天一首唐诗",
    description: "30天唐诗鉴赏，感受大唐诗歌的魅力与意境",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=chinese%20traditional%20poetry%20Tang%20Dynasty&sign=38fd4405be6b15d7b1c1a8bf444d344f",
    chapters: 30,
    enrolled: 8500,
  },
  {
    id: "course4",
    title: "中国传统礼仪入门",
    description: "了解见面礼、餐桌礼、服饰礼等基本礼仪与文化根源",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20etiquette%20ceremony&sign=baf2ffa83724dee04d5037710c3c3657",
    chapters: 8,
    enrolled: 7300,
  },
  {
    id: "course5",
    title: "中国茶文化基础课",
    description: "认识茶的分类与品饮之道，入门茶礼与泡茶步骤",
    coverImage: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20tea%20ceremony&sign=9e8a3b8f3b204b7c9c2f1d1a5c3d7e10",
    chapters: 6,
    enrolled: 6800,
  },
];

export const dailyContent: DailyContent = {
  id: "daily1",
  type: "quote",
  content: "三人行，必有我师焉。择其善者而从之，其不善者而改之。",
  explanation: "几个人一起走路，其中必定有人可以做我的老师。我选择他好的方面向他学习，看到他不好的方面就对照自己，改正自己的缺点。",
  source: "《论语·述而》",
  examples: "在团队合作中，每个人都有自己的长处和短处。我们应该善于发现并学习他人的优点，同时反思自己的不足并加以改进。",
 文案Suggestion: "今日感悟：三人行，必有我师。保持谦逊的学习态度，才能不断进步。",
};

export const encyclopediaEntries: EncyclopediaEntry[] = [
  {
    id: "entry1",
    title: "中秋节",
    definition: "中秋节，又称祭月节、月光诞、月夕、秋节、仲秋节、拜月节、月娘节、月亮节、团圆节等，是中国民间传统节日。",
    originalText: "《礼记·月令》：'仲秋之月养衰老，行糜粥饮食。'",
    annotations: "糜粥：粥的一种，煮得很烂的粥。",
    application: "中秋节以月之圆兆人之团圆，为寄托思念故乡，思念亲人之情，祈盼丰收、幸福，成为丰富多彩、弥足珍贵的文化遗产。",
    level: "primary",
  },
  {
    id: "entry2",
    title: "见素抱朴",
    definition: "保持平凡，坚守质朴。",
    originalText: "《道德经》：'见素抱朴，少私寡欲。'",
    annotations: "素：未染色的丝；朴：未加工的木。",
    application: "在现代社会，见素抱朴提醒我们保持内心的纯净和简单，不被物质欲望所迷惑，追求精神上的富足。",
    level: "secondary",
  },
];

export const carouselItems: CarouselItem[] = [
  {
    id: "carousel1",
    title: "中秋特别活动",
    description: "参与中秋知识问答，赢取精美礼品",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=mid-autumn%20festival%20celebration%20traditional%20chinese%20culture&sign=bdc603c84d2a665b02e81edb73ab26ad",
    link: "/events/mid-autumn",
  },
  {
    id: "carousel2",
    title: "新课程上线",
    description: "《中国传统礼仪》系列课程，带你了解中华文化精髓",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20etiquette%20ceremony&sign=baf2ffa83724dee04d5037710c3c3657",
    link: "/courses/course4",
  },
  {
    id: "carousel3",
    title: "每日签到",
    description: "连续签到30天，获得限量版传统文化主题书签",
    image: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=traditional%20chinese%20bookmarks%20cultural&sign=acad24d67321cadccc1b51710cd7c355",
    link: "/daily/sign-in",
  },
];

// 功能模块列表
export const featureModules = [
  {
    id: "module1",
    title: "问答百科",
    description: "搜索传统文化知识，获取专业解释",
    icon: "fas fa-book-open",
    color: "bg-red-700", // 朱砂红
    link: "/encyclopedia",
  },
  {
    id: "module2",
    title: "主题小课",
    description: "系统化学习传统文化知识",
    icon: "fas fa-graduation-cap",
    color: "bg-blue-700", // 青花蓝
    link: "/courses",
  },
  {
    id: "module3",
    title: "每日学习",
    description: "每日一句经典，日积月累提升修养",
    icon: "fas fa-calendar-check",
    color: "bg-green-700", // 翡翠绿
    link: "/daily",
  },
  {
    id: "module4",
    title: "互动测验",
    description: "检验学习成果，巩固知识记忆",
    icon: "fas fa-question-circle",
    color: "bg-amber-600", // 赤金黄
    link: "/quiz",
  },
  {
    id: "module5",
    title: "礼仪顾问",
    description: "了解传统礼仪，传承文化精髓",
    icon: "fas fa-handshake",
    color: "bg-purple-700", // 紫铜色
    link: "/etiquette",
  },
  {
    id: "module6",
    title: "个人中心",
    description: "查看学习进度，管理收藏内容",
    icon: "fas fa-user",
    color: "bg-slate-700", // 墨玉黑
    link: "/profile",
  },
];
