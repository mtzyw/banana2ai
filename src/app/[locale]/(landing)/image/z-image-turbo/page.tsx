import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Z Image Turbo',
  modelSlug: 'z-image-turbo',
  heroTitle: 'Z Image Turbo：超快 AI 图像生成，媲美专业摄影',
  heroSubtitle: '通义-MAI 60亿参数旗舰文生图模型',
  heroDescription:
    'Z Image Turbo 基于通义-MAI 的超快 60 亿参数文生图模型，具备照片级真实感和中英文双语文本渲染能力，能够在极短时间内生成媲美专业摄影的高质量图像。',
  heroImage: '/images/banana/b88usp2lk4ef.jpeg',
  features: [
    {
      icon: '⚡',
      title: '超快生成速度',
      description: '60 亿参数优化架构，生成速度极快，支持高频批量图像创作需求。',
    },
    {
      icon: '📸',
      title: '照片级真实感输出',
      description: '先进的写实渲染技术，生成的图像质感逼真，难以与真实照片区分。',
    },
    {
      icon: '🔤',
      title: '中英文双语文本渲染',
      description: '业界领先的文字生成能力，可精确在图像中渲染中英文文字内容。',
    },
    {
      icon: '🎛️',
      title: '可调节的推理步数',
      description: '通过调整推理步数（1-49步）灵活平衡生成质量与速度。',
    },
    {
      icon: '🌟',
      title: '场景细节高度还原',
      description: '对复杂光影、材质纹理、空间感等写实要素有精准的细节还原能力。',
    },
    {
      icon: '💡',
      title: '智能优化模式',
      description: 'Turbo 模式下自动优化生成参数，降低学习门槛，适合各类用户使用。',
    },
  ],
  steps: [
    { title: '输入创作描述', description: '支持中英文双语输入，描述你想要生成的图像场景。' },
    { title: '设置生成参数', description: '选择推理步数和引导系数，精细控制生成质量。' },
    { title: '超快生成图像', description: 'Turbo 模型秒级响应，快速输出高质量图像。' },
    { title: '下载高清成果', description: '高清无水印下载图像，立即用于各类项目。' },
  ],
  useCases: [
    {
      title: '电商产品图生成',
      description: '快速生成真实感产品展示图，无需摄影棚即可获得专业级产品照片。',
    },
    {
      title: '带文字的视觉设计',
      description: '利用强大的文字渲染功能，生成带有标题、口号的完整视觉设计稿。',
    },
    {
      title: '新闻与媒体配图',
      description: '快速生成新闻报道配图，满足媒体平台的高频图像需求。',
    },
    {
      title: '真实场景可视化',
      description: '生成以假乱真的场景照片，适用于产品展示、广告创意等场景。',
    },
    {
      title: '批量内容生产',
      description: '超快生成速度支持批量图像创作，适合需要大量图像素材的项目。',
    },
    {
      title: '海报与封面设计',
      description: '结合文字渲染功能，直接生成包含完整排版文字的海报设计稿。',
    },
  ],
  testimonials: [
    {
      name: '杨帆',
      role: '电商运营总监',
      content: 'Z Image Turbo 的写实感太强了，生成的产品图质感完全可以直接用在产品页面上，节省了大量拍摄成本。',
      rating: 5,
    },
    {
      name: '黄莉',
      role: '平面设计师',
      content: '终于找到了一个能在图像里渲染中文文字的 AI 工具！以前这是所有 AI 图像工具的通病，Z Image Turbo 完美解决了这个问题。',
      rating: 5,
    },
    {
      name: '曹阳',
      role: '内容营销专员',
      content: '速度非常快，一天可以产出几百张图，完全满足我们平台的高频内容需求，品质也非常稳定。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: 'Z Image Turbo 与普通文生图模型有什么区别？',
      answer:
        'Z Image Turbo 专为速度优化，采用 60 亿参数的高效架构，在保持照片级画质的同时实现超快生成，特别适合高频批量创作场景。',
    },
    {
      question: 'Z Image Turbo 真的能渲染中文文字吗？',
      answer: '是的，Z Image Turbo 具备同类产品中领先的双语文字渲染能力，可在图像中精确生成中英文文字。',
    },
    {
      question: '推理步数应该设置多少？',
      answer: '步数越多质量越高但速度越慢。建议 Turbo 模式下将引导系数设置为 0，步数设置在 20-30 之间以平衡速度和质量。',
    },
    {
      question: 'Z Image Turbo 适合专业摄影替代吗？',
      answer: '对于部分场景，Z Image Turbo 的写实效果可替代专业摄影，特别适合产品背景图、场景图等标准化需求。',
    },
    {
      question: 'Z Image Turbo 的最高分辨率是多少？',
      answer: '支持最高 1024×1024 像素输出，支持多种宽高比，满足不同平台的图像尺寸需求。',
    },
  ],
  ctaTitle: '超快 AI 生图，立即体验 Z Image Turbo',
  ctaDescription: '秒级生成照片级真实感图像，带文字渲染，让创作效率全面升级。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
