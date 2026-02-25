import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Flux AI 图像生成器',
  modelSlug: 'flux-ai-image-generator',
  heroTitle: 'Flux AI：专业级文生图，精准还原每一个创意细节',
  heroSubtitle: '由 Black Forest Labs 打造的顶级开源图像模型',
  heroDescription:
    'Flux 是目前业界最受专业设计师认可的开源文生图模型之一。凭借超强的提示词跟随能力和出色的构图控制，让每一次创作都精准落地。',
  heroImage: '/images/banana/3rh7in3ztrd9.jpeg',
  features: [
    {
      icon: '🎯',
      title: '极强的提示词跟随能力',
      description: '对复杂、详细的提示词有卓越的理解力，生成结果与描述高度吻合。',
    },
    {
      icon: '🖼️',
      title: '卓越的构图与细节控制',
      description: '支持精确指定构图、景深、光影等摄影级参数，输出专业摄影质感图像。',
    },
    {
      icon: '🌈',
      title: '多样化风格覆盖',
      description: '支持写实摄影、插画、数字艺术、水彩、油画等数十种视觉风格。',
    },
    {
      icon: '⚡',
      title: 'Flux Turbo 超快生成',
      description: 'Flux Schnell 版本可在 1-2 秒内生成高质量图像，适合高频批量创作。',
    },
    {
      icon: '🔧',
      title: '高级参数精细调控',
      description: '开放推理步数、引导强度等高级参数，满足专业用户的深度定制需求。',
    },
    {
      icon: '📐',
      title: '灵活的图像尺寸支持',
      description: '支持从 512×512 到 2048×2048 的多种分辨率，覆盖各种输出场景。',
    },
  ],
  steps: [
    { title: '输入详细提示词', description: '描述图像主体、风格、构图、光影等详细元素。' },
    { title: '选择模型版本', description: '根据需求选择 Flux Pro、Dev 或 Schnell 版本。' },
    { title: '调整生成参数', description: '自定义推理步数、引导强度和图像尺寸。' },
    { title: '下载或继续迭代', description: '查看结果，满意则下载，不满意则调整提示词重新生成。' },
  ],
  useCases: [
    {
      title: '产品概念设计',
      description: '快速将产品设计概念可视化，辅助设计师进行方案沟通和决策。',
    },
    {
      title: '摄影级广告素材',
      description: '生成媲美专业摄影棚拍摄效果的广告图，大幅降低拍摄成本。',
    },
    {
      title: '艺术品与收藏品创作',
      description: '创作独特的数字艺术作品，可用于 NFT 或数字收藏品发行。',
    },
    {
      title: '建筑与室内设计方案',
      description: '快速生成建筑外观效果图和室内设计方案图，加速客户沟通流程。',
    },
    {
      title: '游戏美术资源',
      description: '批量生成游戏原画、场景概念图、道具设计图等美术资源。',
    },
    {
      title: '时尚与服装设计',
      description: '生成服装款式图、面料纹理和时尚大片，辅助设计决策。',
    },
  ],
  testimonials: [
    {
      name: '张伟',
      role: '平面设计总监',
      content: 'Flux 的提示词跟随能力是我用过所有 AI 工具里最强的，生成结果和我的描述几乎完全一致，大大减少了修改次数。',
      rating: 5,
    },
    {
      name: '林小红',
      role: 'NFT 艺术家',
      content: '用 Flux 创作的数字艺术作品细节极其丰富，购买者都对质量非常满意，销售表现超出预期。',
      rating: 5,
    },
    {
      name: '刘强',
      role: '游戏美术主管',
      content: 'Flux 帮我们团队将概念原画阶段的效率提升了 5 倍以上，现在概念评审会更加高效。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: 'Flux AI 和其他图像模型有什么区别？',
      answer:
        'Flux 由 Black Forest Labs 开发，以超强的提示词跟随能力和高质量输出著称，在业界评测中多次排名第一，尤其擅长复杂构图和细节控制。',
    },
    {
      question: 'Flux 有哪些版本？',
      answer:
        'Flux 主要有三个版本：Flux Pro（最高质量）、Flux Dev（平衡质量与速度）、Flux Schnell（超快速，适合批量创作）。',
    },
    {
      question: '生成一张 Flux 图像需要多少积分？',
      answer: '标准分辨率 Flux Dev 约消耗 4 积分，Flux Pro 约消耗 8 积分，具体以当前定价页面为准。',
    },
    {
      question: 'Flux 支持图生图吗？',
      answer: '是的，Flux 支持通过上传参考图进行风格迁移和 img2img 生成，可以精确控制参考图的影响权重。',
    },
    {
      question: '如何让 Flux 生成效果更好？',
      answer:
        '建议使用英文提示词，并包含风格描述（如 photorealistic、oil painting）、构图（close-up、wide shot）、光线（golden hour、studio lighting）等关键词。',
    },
  ],
  ctaTitle: '用 Flux AI 创作你的下一件艺术品',
  ctaDescription: '体验业界最强文生图模型，将创意精准转化为令人惊叹的视觉作品。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
