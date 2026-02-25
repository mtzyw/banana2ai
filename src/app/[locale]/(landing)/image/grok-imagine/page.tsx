import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Grok Imagine',
  modelSlug: 'grok-imagine',
  heroTitle: 'Grok Imagine：xAI 打造的下一代视觉创作引擎',
  heroSubtitle: '每次请求生成 6 张独特图像，给你更多选择',
  heroDescription:
    'Grok Imagine 是由埃隆·马斯克旗下 xAI 开发的文生图模型，以独特的视觉语言和强烈的创意感著称。每次请求自动生成 6 张差异化图像，让你有更多灵感选择。',
  heroImage: '/images/banana/8pk4idwouhh0.jpeg',
  features: [
    {
      icon: '6️⃣',
      title: '一次请求，六张创意图像',
      description: '每次生成即提供 6 张差异化图像方案，让你从多角度探索同一主题。',
    },
    {
      icon: '🧠',
      title: 'xAI 前沿技术赋能',
      description: '由 xAI 最新研究成果驱动，理解能力强，尤其擅长处理复杂的创意描述。',
    },
    {
      icon: '🎪',
      title: '独特的视觉语言风格',
      description: 'Grok 的图像有独特的视觉美学，在众多 AI 图像工具中辨识度极高。',
    },
    {
      icon: '🚀',
      title: '概念艺术与科幻场景专长',
      description: '对科技感、未来主义、太空探索等主题有出色的视觉表达能力。',
    },
    {
      icon: '🎭',
      title: '写实与艺术的完美平衡',
      description: '同时具备照片级写实感和艺术化表达能力，覆盖更广泛的创作需求。',
    },
    {
      icon: '🔄',
      title: '快速多样化探索',
      description: '6 张图像版本让灵感探索更加高效，减少反复调整提示词的时间成本。',
    },
  ],
  steps: [
    { title: '描述你的创意场景', description: '输入富有创意的提示词，描述你想象中的视觉场景。' },
    { title: 'Grok 生成 6 张方案', description: '模型自动生成 6 张差异化的图像方案，供你选择。' },
    { title: '挑选最佳方案', description: '从 6 张图像中选择最符合需求的一张或多张。' },
    { title: '下载并投入使用', description: '高清下载选定图像，直接用于设计或创作项目。' },
  ],
  useCases: [
    {
      title: '科幻与概念艺术',
      description: '生成未来感十足的科幻场景、太空探索概念图等创意艺术作品。',
    },
    {
      title: '品牌创意探索',
      description: '快速生成多方向品牌视觉方案，辅助品牌策略的创意决策。',
    },
    {
      title: '游戏世界观设计',
      description: '生成游戏世界设定图、宏大场景图，帮助构建游戏宇宙观。',
    },
    {
      title: '封面与海报设计',
      description: '生成书籍封面、音乐专辑封面、活动海报等印刷物设计草案。',
    },
    {
      title: '创意头脑风暴',
      description: '每次 6 张图像，快速扩展创意视野，找到最具冲击力的视觉方向。',
    },
    {
      title: '社交媒体创意内容',
      description: '生成与众不同的视觉内容，在社交媒体上建立独特的内容识别度。',
    },
  ],
  testimonials: [
    {
      name: '胡军',
      role: '创意总监',
      content: '一次生成 6 张图真的很实用！可以同时看到多个创意方向，大大加速了我们团队的头脑风暴过程。',
      rating: 5,
    },
    {
      name: '赵晴',
      role: '科幻小说插画师',
      content: 'Grok 生成的科幻场景有一种独特的史诗感，是其他工具很难复制的。我的读者都很喜欢这种风格。',
      rating: 5,
    },
    {
      name: '钱明',
      role: '广告创意人',
      content: '每次请求 6 张，让我可以快速向客户展示多个视觉方向，提案效率提升了好几倍。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: 'Grok Imagine 为什么每次生成 6 张图像？',
      answer:
        '这是 Grok Imagine 的核心设计理念——给用户提供更多创意选择，减少因单张图像不满意而反复调整提示词的麻烦。',
    },
    {
      question: 'Grok Imagine 最擅长什么风格？',
      answer:
        'Grok 在概念艺术、科幻场景、未来主义设计等方面表现尤为出色，对富有想象力的创意描述有很强的理解能力。',
    },
    {
      question: '生成 6 张图像消耗积分是单张的 6 倍吗？',
      answer: '是的，每次 Grok Imagine 请求消耗的积分等于标准单张生成的 6 倍，但提供了更高的选择价值。',
    },
    {
      question: '可以基于 Grok 生成的图像继续编辑吗？',
      answer: '可以。你可以将 Grok 生成的图像作为参考图，结合图生图功能进行进一步优化或风格调整。',
    },
    {
      question: 'Grok Imagine 与其他 xAI 产品有什么关系？',
      answer: 'Grok Imagine 是 xAI 旗下 Grok AI 平台的图像生成功能，与 Grok 语言模型共享核心技术架构。',
    },
  ],
  ctaTitle: '用 Grok Imagine 探索无限创意可能',
  ctaDescription: '一次请求，六张独特图像，让你的创意探索更自由、更高效。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
