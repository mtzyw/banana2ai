import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Qwen 图像编辑',
  modelSlug: 'qwen-image-edit',
  heroTitle: 'Qwen 图像编辑：智能 AI 图像编辑，精准修改每一处细节',
  heroSubtitle: '阿里云通义千问驱动的高级图像编辑引擎',
  heroDescription:
    'Qwen 图像编辑由阿里云通义千问多模态大模型驱动，支持通过自然语言指令精确编辑图像，包括背景替换、局部修改、风格迁移、对象添加/删除等高级编辑功能。',
  heroImage: '/images/banana/d5gn3mlwmm7n.jpeg',
  features: [
    {
      icon: '✏️',
      title: '自然语言指令驱动编辑',
      description: '用中文或英文描述你想要的修改，AI 自动识别并执行精确的图像编辑操作。',
    },
    {
      icon: '🎭',
      title: '局部内容精确修改',
      description: '支持对图像特定区域进行内容替换、风格修改，不影响其他区域。',
    },
    {
      icon: '🌅',
      title: '背景智能替换',
      description: '一键替换图像背景，从实验室到海滩，从城市到自然，随心切换场景。',
    },
    {
      icon: '🎨',
      title: '多风格智能转换',
      description: '将照片转换为油画、水彩、素描、赛博朋克等多种艺术风格。',
    },
    {
      icon: '➕',
      title: '对象智能添加/删除',
      description: '自然融合地添加或删除图像中的对象，保持视觉逻辑和光影一致。',
    },
    {
      icon: '🔍',
      title: '细节增强与修复',
      description: '自动识别并修复图像中的模糊、噪点等问题，输出高清增强版本。',
    },
  ],
  steps: [
    { title: '上传原始图像', description: '上传你想要编辑的图片，支持 JPG、PNG 等常见格式。' },
    { title: '描述编辑指令', description: '用自然语言描述你想要的修改内容，无需学习复杂操作。' },
    { title: 'AI 智能执行编辑', description: 'Qwen 模型精确理解指令，智能执行图像编辑操作。' },
    { title: '下载编辑成果', description: '查看编辑结果，满意后高清下载保存。' },
  ],
  useCases: [
    {
      title: '产品图背景优化',
      description: '为电商产品图快速替换不同场景背景，提升产品展示多样性。',
    },
    {
      title: '人像精修与美化',
      description: '通过自然语言指令对人像进行专业修饰，无需 Photoshop 技能。',
    },
    {
      title: '旧照片修复与上色',
      description: '修复受损旧照片，为黑白照片添加色彩，重现珍贵记忆。',
    },
    {
      title: '广告素材快速制作',
      description: '基于现有图片快速生成多版本广告素材，降低创作成本。',
    },
    {
      title: '设计原型快速调整',
      description: '对设计稿进行快速迭代调整，加速设计评审和决策流程。',
    },
    {
      title: '社交媒体内容升级',
      description: '将普通照片升级为专业视觉内容，提升社交媒体发布质量。',
    },
  ],
  testimonials: [
    {
      name: '沈悦',
      role: '电商视觉设计师',
      content: 'Qwen 图像编辑的背景替换功能太好用了！以前需要 PS 花一小时的操作，现在描述一句话就搞定，效率提升了十几倍。',
      rating: 5,
    },
    {
      name: '冯刚',
      role: '摄影师',
      content: '用 Qwen 来给照片做后期处理，只需要描述想要的效果，它能精准理解并执行，对摄影师来说是一个革命性的工具。',
      rating: 5,
    },
    {
      name: '许婷',
      role: '平面设计总监',
      content: '局部修改功能特别实用，可以精准控制只修改图像的某个特定区域，完全不影响其他部分，专业设计师也会爱上这个功能。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: 'Qwen 图像编辑与其他图生图工具有什么不同？',
      answer:
        'Qwen 图像编辑的核心优势在于精确的自然语言指令理解，可以执行精细的局部编辑操作，而不只是简单的全图风格转换。',
    },
    {
      question: '可以编辑哪些类型的图像？',
      answer: '支持 JPG、PNG 格式的任意图像，包括照片、插画、设计稿等，建议上传分辨率不低于 512×512 的图像以获得最佳效果。',
    },
    {
      question: '如何描述编辑指令效果更好？',
      answer: '描述时要具体明确，如"将图像背景替换为雪山场景，保留前景人物不变"，而不是简单的"换背景"。',
    },
    {
      question: '编辑后图像质量会下降吗？',
      answer: '不会。Qwen 图像编辑会保持原始图像的分辨率，并对编辑区域进行质量增强处理。',
    },
    {
      question: 'Qwen 图像编辑支持批量处理吗？',
      answer: '目前支持单张图像处理，每次上传一张图像进行编辑。专业版用户可享有更快的处理速度。',
    },
    {
      question: '编辑结果不满意可以重新生成吗？',
      answer: '可以。你可以修改描述指令后重新生成，也可以基于上一次的编辑结果继续进行新的编辑操作。',
    },
  ],
  ctaTitle: '用 Qwen 图像编辑释放图像创作潜力',
  ctaDescription: '只需一句话，让 AI 帮你完成专业级图像编辑操作，彻底改变你的创作方式。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
