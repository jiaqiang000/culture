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
    title: "汉字书法：书法审美与实践",
    coverImage: "/images/courses/course1.jpg",
    intro: "北京大学方建勋老师讲授书法审美与实践，带你领略汉字之美，掌握书写之道。",
    chapters: [
      { id: "c1-1", title: "01 书法的起源与汉字的构造", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=1&high_quality=1" },
      { id: "c1-2", title: "02 书法五体,各有其美", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=2&high_quality=1" },
      { id: "c1-3", title: "03 书法的日常应用", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=3&high_quality=1" },
      { id: "c1-4", title: "04 点画（线条、块面）之美", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=4&high_quality=1" },
      { id: "c1-5", title: "05 节奏（音乐性、时间性）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=5&high_quality=1" },
      { id: "c1-6", title: "06 章法和布白", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=6&high_quality=1" },
      { id: "c1-7", title: "07 神采和气息", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=7&high_quality=1" },
      { id: "c1-8", title: "08 骨、肉、血", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=8&high_quality=1" },
      { id: "c1-9", title: "09 个性与情绪", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=9&high_quality=1" },
      { id: "c1-10", title: "10 笔法", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=10&high_quality=1" },
      { id: "c1-11", title: "11 “书写”的过程和意义", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=11&high_quality=1" },
      { id: "c1-12", title: "12 临帖", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=12&high_quality=1" },
      { id: "c1-13", title: "13 创作", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=13&high_quality=1" },
      { id: "c1-14", title: "14 意境和境界", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=14&high_quality=1" },
      { id: "c1-15", title: "15 时代审美与个体选择", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV12w411R75u&page=15&high_quality=1" },
    ],
    related: ["course2", "course3"],
  },
  course2: {
    id: "course2",
    title: "中华国学典籍：《典籍里的中国》",
    coverImage: "/images/courses/course2.jpg",
    intro: "聚焦优秀中华文化典籍，通过时空对话的创新形式，讲述典籍在五千年历史长河中“源起、流转”的伟大进程。",
    chapters: [
      { id: "c2-1", title: "第一期《尚书》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=1&high_quality=1" },
      { id: "c2-2", title: "第二期《天工开物》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=2&high_quality=1" },
      { id: "c2-3", title: "第三期《史记》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=3&high_quality=1" },
      { id: "c2-4", title: "第四期《本草纲目》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=4&high_quality=1" },
      { id: "c2-5", title: "第五期《论语》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=5&high_quality=1" },
      { id: "c2-6", title: "第六期《孙子兵法》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=6&high_quality=1" },
      { id: "c2-7", title: "第七期《楚辞》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=7&high_quality=1" },
      { id: "c2-8", title: "第八期《徐霞客游记》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=8&high_quality=1" },
      { id: "c2-9", title: "第九期《道德经》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=9&high_quality=1" },
      { id: "c2-10", title: "第十期《周易》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=10&high_quality=1" },
      { id: "c2-11", title: "第十一期《传习录》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=11&high_quality=1" },
      { id: "c2-12", title: "第十二期《永乐大典》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=12&high_quality=1" },
      { id: "c2-13", title: "第十三期《汉书》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=13&high_quality=1" },
      { id: "c2-14", title: "第十四期《礼记》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=14&high_quality=1" },
      { id: "c2-15", title: "第十五期《诗经》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1D8411x792&page=15&high_quality=1" },
    ],
    related: ["course1", "course4"],
  },
  course3: {
    id: "course3",
    title: "中国传统建筑与美学：中国建筑史",
    coverImage: "/images/courses/course3.jpg",
    intro: "清华大学建筑学院公开课，系统讲授中国古代建筑发展历史与艺术特征，领略中国建筑之美。",
    chapters: [
      { id: "c3-1", title: "1.1 中国建筑概说-中国建筑特征", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=1&high_quality=1" },
      { id: "c3-2", title: "1.2 中国建筑概说-中国建筑历史分期", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=2&high_quality=1" },
      { id: "c3-3", title: "1.3 中国建筑概说-中国建筑类型学讨论", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=3&high_quality=1" },
      { id: "c3-4", title: "1.4 中国建筑概说-古代城市的规划思想理念", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=4&high_quality=1" },
      { id: "c3-5", title: "1.5 中国建筑概说-古代建筑原则", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=5&high_quality=1" },
      { id: "c3-6", title: "1.6 中国建筑概说-古代建筑思想1", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=6&high_quality=1" },
      { id: "c3-7", title: "1.7 中国建筑概说-古代建筑思想2", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=7&high_quality=1" },
      { id: "c3-8", title: "2.1 史前至秦汉-早期文明和建筑形态", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=8&high_quality=1" },
      { id: "c3-9", title: "2.2 史前至秦汉-夏商时期建筑1", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=9&high_quality=1" },
      { id: "c3-10", title: "2.3 史前至秦汉-夏商时期建筑2", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=10&high_quality=1" },
      { id: "c3-11", title: "2.4 史前至秦汉-周代建筑", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=11&high_quality=1" },
      { id: "c3-12", title: "2.5 史前至秦汉-秦汉时期的中国文明与城市", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=12&high_quality=1" },
      { id: "c3-13", title: "2.6 史前至秦汉-秦汉时期的宫室", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=13&high_quality=1" },
      { id: "c3-14", title: "2.7 史前至秦汉-住宅、墓葬与其它建筑类型", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=14&high_quality=1" },
      { id: "c3-15", title: "3.1 三国两晋南北朝-城市和宫殿1", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=15&high_quality=1" },
      { id: "c3-16", title: "3.2 三国两晋南北朝-城市和宫殿2", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=16&high_quality=1" },
      { id: "c3-17", title: "3.3 三国两晋南北朝-城市和宫殿3", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1vz4y1X7ZX&page=17&high_quality=1" },
    ],
    related: ["course2", "course4"],
  },
  course4: {
    id: "course4",
    title: "中华传统礼仪文化：中国古代礼仪文明",
    coverImage: "/images/courses/course4.jpg",
    intro: "清华大学彭林教授带你走进中国古代礼仪文明，重拾失落的优雅，理解礼乐文明的精神内核。",
    chapters: [
      { id: "c4-1", title: "第1集 民族文化与民族命运（一)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=1&high_quality=1" },
      { id: "c4-2", title: "第2集 民族文化与民族命运（二）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=2&high_quality=1" },
      { id: "c4-3", title: "第3集 民族文化与民族命运(三）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=3&high_quality=1" },
      { id: "c4-4", title: "第4集 民族文化与民族命运(四)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=4&high_quality=1" },
      { id: "c4-5", title: "第5集 民族文化与民族命运(五)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=5&high_quality=1" },
      { id: "c4-6", title: "第6集 民族文化与民族命运(六)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=6&high_quality=1" },
      { id: "c4-7", title: "第7集 礼者理也 德之则也(一)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=7&high_quality=1" },
      { id: "c4-8", title: "第8集 礼者理也 德之则也（二）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=8&high_quality=1" },
      { id: "c4-9", title: "第9集 礼者理也 德之则也(三)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=9&high_quality=1" },
      { id: "c4-10", title: "第10集 礼者理也 德之则也(四)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=10&high_quality=1" },
      { id: "c4-11", title: "第11集 礼者理也 德之则也(五)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=11&high_quality=1" },
      { id: "c4-12", title: "第12集 礼者理也 德之则也(六)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=12&high_quality=1" },
      { id: "c4-13", title: "第13集 处事以诚待人以敬(一)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=13&high_quality=1" },
      { id: "c4-14", title: "第14集 处事以诚待人以敬(二)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=14&high_quality=1" },
      { id: "c4-15", title: "第15集 处事以诚待人以敬(三)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=15&high_quality=1" },
      { id: "c4-16", title: "第16集 处事以诚待人以敬(四)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=16&high_quality=1" },
      { id: "c4-17", title: "第17集 处事以诚待人以敬(五)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=17&high_quality=1" },
      { id: "c4-18", title: "第18集 处事以诚待人以敬(六)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=18&high_quality=1" },
      { id: "c4-19", title: "第19集 礼乐皆得谓之有德(一)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=19&high_quality=1" },
      { id: "c4-20", title: "第20集 礼乐皆得谓之有德(二)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=20&high_quality=1" },
      { id: "c4-21", title: "第21集 礼乐皆得谓之有德(三)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=21&high_quality=1" },
      { id: "c4-22", title: "第22集 礼乐皆得谓之有德(四)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=22&high_quality=1" },
      { id: "c4-23", title: "第23集 文质彬彬然后君子(一)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=23&high_quality=1" },
      { id: "c4-24", title: "第24集 文质彬彬然后君子(二)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=24&high_quality=1" },
      { id: "c4-25", title: "第25集 文质彬彬然后君子(三)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=25&high_quality=1" },
      { id: "c4-26", title: "第26集 文质彬彬然后君子(四)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=26&high_quality=1" },
      { id: "c4-27", title: "第27集 文质彬彬 然后君子(五)", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV1ut411b7CB&page=27&high_quality=1" },
    ],
    related: ["course1", "course5"],
  },
  course5: {
    id: "course5",
    title: "中医理论：中医基础理论",
    coverImage: "/images/courses/course5.jpg",
    intro: "北京中医药大学《中医基础理论》课程，系统学习阴阳五行、藏象经络等中医核心理论。",
    chapters: [
      { id: "c5-1", title: "1.中医名称的由来", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=1&high_quality=1" },
      { id: "c5-2", title: "2.中医理论体系的概念及学科属性", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=2&high_quality=1" },
      { id: "c5-3", title: "3.中医学理论体系形成基础", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=3&high_quality=1" },
      { id: "c5-4", title: "4.中医学理论体系的形成", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=4&high_quality=1" },
      { id: "c5-5", title: "5.中医学理论体系的发展-一魏晋...", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=5&high_quality=1" },
      { id: "c5-6", title: "6.中医学基本特点—-整体观念", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=6&high_quality=1" },
      { id: "c5-7", title: "7.中医学基本特点—一辨证论治", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=7&high_quality=1" },
      { id: "c5-8", title: "8.贺娟教授《黄帝内经》访谈", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=8&high_quality=1" },
      { id: "c5-9", title: "9.钱会南教授《难经》访谈", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=9&high_quality=1" },
      { id: "c5-10", title: "10.高学敏教授《神农本草经》访谈", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=10&high_quality=1" },
      { id: "c5-11", title: "11.王庆国教授《伤寒杂病论》访谈", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=11&high_quality=1" },
      { id: "c5-12", title: "12.谷晓红教授《温病学的地位及其学习方法》", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=12&high_quality=1" },
      { id: "c5-13", title: "13.刘燕池教授金元四大家访谈一", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=13&high_quality=1" },
      { id: "c5-14", title: "14.刘燕池教授金元四大家访谈二", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=14&high_quality=1" },
      { id: "c5-15", title: "15.中医学的思维方法（一）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=15&high_quality=1" },
      { id: "c5-16", title: "16.中医学的思维方法（二）", type: "video", videoUrl: "https://player.bilibili.com/player.html?bvid=BV15AtyzMEWa&page=16&high_quality=1" },
    ],
    related: ["course2", "course3"],
  },
};

// 模拟数据
export const popularCourses: Course[] = [
  {
    id: "course1",
    title: "汉字书法：书法审美与实践",
    description: "北京大学方建勋老师讲授书法审美与实践，带你领略汉字之美",
    coverImage: "/images/courses/course1.jpg",
    chapters: 15,
    enrolled: 15600,
  },
  {
    id: "course2",
    title: "中华国学典籍：《典籍里的中国》",
    description: "聚焦优秀中华文化典籍，通过时空对话讲述典籍的故事",
    coverImage: "/images/courses/course2.jpg",
    chapters: 15,
    enrolled: 22000,
  },
  {
    id: "course3",
    title: "中国传统建筑与美学",
    description: "清华大学公开课，系统讲授中国古代建筑发展历史与艺术特征",
    coverImage: "/images/courses/course3.jpg",
    chapters: 17,
    enrolled: 9800,
  },
  {
    id: "course4",
    title: "中华传统礼仪文化",
    description: "清华大学彭林教授带你走进中国古代礼仪文明，重拾失落的优雅",
    coverImage: "/images/courses/course4.jpg",
    chapters: 27,
    enrolled: 11200,
  },
  {
    id: "course5",
    title: "中医理论：中医基础理论",
    description: "北京中医药大学《中医基础理论》课程，系统学习中医之道",
    coverImage: "/images/courses/course5.jpg",
    chapters: 16,
    enrolled: 8900,
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
    title: "问答百科",
    description: "搜索传统文化知识，获取专业解释",
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
    title: "每日学习",
    description: "日积月累提升修养",
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
    description: "日积月累提升修养",
    icon: "fas fa-calendar-check",
    color: "bg-green-700", // 翡翠绿
    link: "/daily",
  },
];
