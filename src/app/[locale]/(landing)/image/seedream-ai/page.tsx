import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Seedream AI',
  modelSlug: 'seedream-ai',
  heroTitle: 'Seedream AI：字节跳动出品的顶级图像生成模型',
  heroSubtitle: '东方美学与全球视野的完美融合',
  heroDescription:
    '字节跳动旗下 Seedream 图像生成模型，以卓越的中文语义理解和东方视觉美学见长，能够精准还原中国传统艺术风格，同时支持全球多元化视觉创作。',
  heroImage: '/images/banana/5aqwpua9noqi.jpeg',
  features: [
    {
      icon: '🌸',
      title: '卓越的中文语义理解',
      description: '原生中文语言模型支持，能精准理解汉语描述，无需翻译即可生成高质量图像。',
    },
    {
      icon: '🎎',
      title: '东方美学专项优化',
      description: '对中国画、水墨风格、国潮设计等东方视觉风格有专项优化，输出效果远超其他模型。',
    },
    {
      icon: '🎭',
      title: '人物与角色生成专长',
      description: '人物形象生成质量卓越，面部细节清晰，表情自然，适合角色设计和人像创作。',
    },
    {
      icon: '🔮',
      title: '创意风格探索能力',
      description: '支持古风、现代、赛博朋克、田园等多种跨越东西方的风格创作。',
    },
    {
      icon: '📱',
      title: '移动端优化的生成体验',
      description: '专为移动端使用场景优化，速度快，适合随时随地的创意灵感记录。',
    },
    {
      icon: '🌐',
      title: '多语言双向支持',
      description: '中英文双语提示词均可使用，无缝覆盖全球创作者的使用需求。',
    },
  ],
  steps: [
    { title: '选择创作主题', description: '描述图像的主体内容，支持中英文输入。' },
    { title: '选择视觉风格', description: '指定艺术风格，如水墨画、插画、写实照片等。' },
    { title: 'AI 智能生成', description: 'Seedream 模型快速理解语义并生成精美图像。' },
    { title: '下载或分享', description: '一键下载高清图像，用于设计、发布或商业用途。' },
  ],
  useCases: [
    {
      title: '国潮品牌设计',
      description: '生成国潮风格的品牌视觉素材，精准捕捉当下流行审美。',
    },
    {
      title: '古风插画创作',
      description: '生成中国传统文化主题插画，适用于出版、展览和数字内容平台。',
    },
    {
      title: '社交媒体配图',
      description: '快速生成符合东方审美的社交媒体配图，提升内容吸引力。',
    },
    {
      title: '影视概念设计',
      description: '为影视项目生成历史剧、武侠片等东方主题的概念设计图。',
    },
    {
      title: '文创产品设计',
      description: '生成文化创意产品的图案和视觉设计，助力文创产品开发。',
    },
    {
      title: '游戏美术与UI',
      description: '生成中国风游戏所需的角色、场景、UI等美术素材。',
    },
  ],
  testimonials: [
    {
      name: '周芳',
      role: '国潮品牌主理人',
      content: 'Seedream 对中国风视觉的理解令人惊叹！同样的提示词，它生成的效果比其他工具美太多了，非常适合我们品牌的调性。',
      rating: 5,
    },
    {
      name: '吴磊',
      role: '游戏美术设计师',
      content: '我在为一款国风 RPG 游戏创作概念图时发现了 Seedream，它生成的场景图有强烈的古典中国美感，完全符合项目需求。',
      rating: 5,
    },
    {
      name: '孙晓梅',
      role: '内容创作者',
      description: '中文提示词用起来很流畅，不需要翻译成英文，生成效果也很好，已经成为我日常创作的必备工具。',
      rating: 5,
    },
  ].map(t => ({ name: t.name, role: t.role, content: t.content ?? (t as any).description ?? '', rating: t.rating })),
  faqs: [
    {
      question: 'Seedream AI 和其他图像模型相比有什么优势？',
      answer:
        'Seedream 由字节跳动开发，在中文语义理解和东方视觉美学方面有显著优势，特别适合国风、古风、国潮等中国特色视觉创作。',
    },
    {
      question: 'Seedream 支持哪些图像尺寸？',
      answer: '支持正方形、横版（16:9）、竖版（9:16）等多种比例，最高分辨率可达 1024×1024。',
    },
    {
      question: '可以用中文提示词生成图像吗？',
      answer: '当然可以。Seedream 原生支持中文，且中文语义理解效果优于大多数其他模型。',
    },
    {
      question: 'Seedream 生成的图像可以商用吗？',
      answer: '是的，通过 Banana Pro AI 平台生成的 Seedream 图像享有完整商用权利。',
    },
    {
      question: 'Seedream 适合什么样的用户？',
      answer: '特别适合对东方美学有需求的设计师、内容创作者、品牌主理人和游戏美术师。',
    },
  ],
  ctaTitle: '用 Seedream AI 创作东方美学视觉作品',
  ctaDescription: '深度理解中文语义，精准还原东方美学，让你的创意无限绽放。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
