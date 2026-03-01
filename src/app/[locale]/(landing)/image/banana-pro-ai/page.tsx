import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Banana Pro AI',
  modelSlug: 'banana-pro-ai',
  heroTitle: '使用 Banana Pro AI 图片，在数秒内将想法变成精美图像',
  heroSubtitle: '以革命性 AI 技术驱动你的创意',
  heroDescription:
    '基于 Google 最新多模态大模型，Banana Pro AI 提供业界领先的文生图与图生图能力。无论是品牌设计、产品渲染还是艺术创作，均可一键完成。',
  heroImage: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp',
  features: [
    {
      icon: '⚡',
      title: '极速生成，让你的工作流焕然一新',
      description: '平均 3 秒内完成一张高清图像生成，大幅提升创作效率，告别漫长等待。',
    },
    {
      icon: '🎨',
      title: '值得依赖的专业级画质',
      description: '输出分辨率最高可达 4K，色彩还原精准，细节丰富，满足商业级使用需求。',
    },
    {
      icon: '🔄',
      title: '多场景适配的双模式创作系统',
      description: '文生图与图生图无缝切换，支持上传参考图进行风格迁移或局部编辑。',
    },
    {
      icon: '📜',
      title: '真正永久免费且附带完整商用权利',
      description: '所有生成内容均归用户所有，可用于商业项目，无版权顾虑。',
    },
    {
      icon: '🛡️',
      title: '隐私保护与安全生成',
      description: '专业订阅用户享有私密生成模式，图像不会被用于训练或公开展示。',
    },
    {
      icon: '🌐',
      title: '多语言提示词支持',
      description: '中英文提示词均可精准理解，让全球用户都能轻松表达创意意图。',
    },
  ],
  steps: [
    { title: '表达你的创意愿景', description: '用自然语言描述你想要生成的图像，支持中英文输入。' },
    { title: 'AI 处理并驱动你的创作', description: '模型自动解析语义，生成符合预期的高质量图像。' },
    { title: '审阅、迭代并持续优化', description: '查看结果，调整提示词或参数，进行多轮优化迭代。' },
    { title: '下载并应用你的成果', description: '高清无水印下载，直接用于商业或个人项目。' },
  ],
  useCases: [
    {
      title: '数字营销与品牌策略',
      description: '快速生成广告素材、品牌视觉，降低设计成本，提升营销效率。',
    },
    {
      title: '电商与产品可视化',
      description: '为产品生成多角度展示图、场景图，提升转化率与用户信任感。',
    },
    {
      title: '内容创作与社交媒体运营',
      description: '批量生成高质量配图，保持内容更新节奏，吸引更多用户互动。',
    },
    {
      title: '出版与编辑设计',
      description: '为书籍、杂志、报告生成专业插图，快速实现视觉排版设计。',
    },
    {
      title: '教育与培训内容制作',
      description: '生成直观的教学配图，让复杂概念更易理解，提升学习体验。',
    },
    {
      title: '游戏与娱乐制作',
      description: '快速生成概念原画、角色设计、场景草图，加速游戏开发流程。',
    },
  ],
  testimonials: [
    {
      name: '李明',
      role: '自由设计师',
      content: 'Banana Pro AI 生成速度极快，画质媲美专业软件输出。我的客户都以为是真人设计的，非常满意！',
      rating: 5,
    },
    {
      name: '王雪',
      role: '电商运营',
      content: '用 Banana Pro AI 生成产品场景图，效果超出预期。以前需要一天的工作量，现在 30 分钟就搞定了。',
      rating: 5,
    },
    {
      name: '陈浩',
      role: '游戏概念设计师',
      content: '最喜欢它的图生图功能，可以基于我的草图直接生成精细化的角色设计图，迭代速度快了 10 倍。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: '什么是 Banana Pro AI 图片？',
      answer:
        'Banana Pro AI 图片是一款基于 Google 最新多模态大模型的 AI 图像生成工具，支持文生图和图生图两种模式，能够快速生成高质量的图像内容。',
    },
    {
      question: 'Text-to-Image 与 Image-to-Image 有什么区别？',
      answer:
        'Text-to-Image（文生图）是通过文字描述生成全新图像；Image-to-Image（图生图）则是基于你上传的参考图进行风格迁移、局部编辑或变体生成。',
    },
    {
      question: '如何为 Banana Pro AI 图片编写有效提示词？',
      answer:
        '建议包含主体描述、风格关键词、光照和构图要求。例如："一位年轻女性站在樱花树下，日系插画风格，柔和光线，俯视构图"。',
    },
    {
      question: 'Banana Pro AI 图片生成速度有多快？',
      answer: '普通模式下平均生成时间为 3-8 秒，专业版用户享有优先队列，速度更快。',
    },
    {
      question: '我可以将 Banana Pro AI 图片的输出用于商业用途吗？',
      answer:
        '是的，所有生成内容均归用户所有，可用于商业项目。专业版用户还可下载商业许可证文件。',
    },
    {
      question: '有免费版本可以体验吗？',
      answer: '有的。注册登录后即可获得 10 次免费额度，支持生成最多 2 张图片，无需信用卡。',
    },
  ],
  ctaTitle: '立即开启你的 AI 图像创作之旅',
  ctaDescription:
    '加入数百万创作者，用 Banana Pro AI 将无限创意转化为令人惊叹的视觉作品。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
