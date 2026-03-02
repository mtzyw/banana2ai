'use client';

import { useLocale } from 'next-intl';
import ModelDetailPage from '@/components/banana/ModelDetailPage';
import { BANANA_PRO_AI_EXAMPLES } from '@/data/page-examples';


export default function Page() {
  const isZh = useLocale() === 'zh';
  const modelData = {
    modelName: 'Banana Pro AI',
    modelSlug: 'banana-pro-ai',
    heroTitle: isZh ? '使用 Banana Pro AI 图片，在数秒内将想法变成精美图像' : 'Use Banana Pro AI images, turn ideas into stunning images in seconds',
    heroSubtitle: isZh ? '以革命性 AI 技术驱动你的创意' : 'Drive your creativity with revolutionary AI technology',
    heroDescription:
      isZh ? '基于 Google 最新多模态大模型，Banana Pro AI 提供业界领先的文生图与图生图能力。无论是品牌设计、产品渲染还是艺术创作，均可一键完成。' : 'Powered by Google latest multimodal large model, Banana Pro AI offers industry-leading text-to-image and image-to-image capabilities. Whether for brand design, product rendering, or artistic creation, it can all be done with one click.',
    heroImage: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp',
    features: [
      {
        icon: '⚡',
        title: isZh ? '极速生成，让你的工作流焕然一新' : 'Ultra-fast generation, refresh your workflow',
        description: isZh ? '平均 3 秒内完成一张高清图像生成，大幅提升创作效率，告别漫长等待。' : 'Generate a high-definition image in an average of 3 seconds, significantly boosting creative efficiency and saying goodbye to long waits.',
      },
      {
        icon: '🎨',
        title: isZh ? '值得依赖的专业级画质' : 'Reliable professional-grade image quality',
        description: isZh ? '输出分辨率最高可达 4K，色彩还原精准，细节丰富，满足商业级使用需求。' : 'Output resolution up to 4K, accurate color reproduction, rich details, meeting commercial-grade usage requirements.',
      },
      {
        icon: '🔄',
        title: isZh ? '多场景适配的双模式创作系统' : 'Dual-mode creation system adaptable to multiple scenarios',
        description: isZh ? '文生图与图生图无缝切换，支持上传参考图进行风格迁移或局部编辑。' : 'Seamless switching between text-to-image and image-to-image, supports uploading reference images for style transfer or partial editing.',
      },
      {
        icon: '📜',
        title: isZh ? '真正永久免费且附带完整商用权利' : 'Truly permanently free with full commercial rights',
        description: isZh ? '所有生成内容均归用户所有，可用于商业项目，无版权顾虑。' : 'All generated content belongs to the user, can be used for commercial projects, with no copyright concerns.',
      },
      {
        icon: '🛡️',
        title: isZh ? '隐私保护与安全生成' : 'Privacy protection and secure generation',
        description: isZh ? '专业订阅用户享有私密生成模式，图像不会被用于训练或公开展示。' : 'Professional subscribers enjoy private generation mode, images will not be used for training or public display.',
      },
      {
        icon: '🌐',
        title: isZh ? '多语言提示词支持' : 'Multilingual prompt support',
        description: isZh ? '中英文提示词均可精准理解，让全球用户都能轻松表达创意意图。' : 'Both Chinese and English prompts can be accurately understood, allowing global users to easily express creative intentions.',
      },
    ],
    steps: [
      { title: isZh ? '表达你的创意愿景' : 'Express your creative vision', description: isZh ? '用自然语言描述你想要生成的图像，支持中英文输入。' : 'Describe the image you want to generate using natural language, supports Chinese and English input.' },
      { title: isZh ? 'AI 处理并驱动你的创作' : 'AI processes and drives your creation', description: isZh ? '模型自动解析语义，生成符合预期的高质量图像。' : 'The model automatically parses semantics, generating high-quality images that meet expectations.' },
      { title: isZh ? '审阅、迭代并持续优化' : 'Review, iterate, and continuously optimize', description: isZh ? '查看结果，调整提示词或参数，进行多轮优化迭代。' : 'View results, adjust prompts or parameters, and perform multiple rounds of optimization and iteration.' },
      { title: isZh ? '下载并应用你的成果' : 'Download and apply your results', description: isZh ? '高清无水印下载，直接用于商业或个人项目。' : 'High-definition watermark-free download, directly usable for commercial or personal projects.' },
    ],
    useCases: [
      {
        title: isZh ? '数字营销与品牌策略' : 'Digital marketing and brand strategy',
        description: isZh ? '快速生成广告素材、品牌视觉，降低设计成本，提升营销效率。' : 'Quickly generate advertising materials, brand visuals, reduce design costs, and improve marketing efficiency.',
      },
      {
        title: isZh ? '电商与产品可视化' : 'E-commerce and product visualization',
        description: isZh ? '为产品生成多角度展示图、场景图，提升转化率与用户信任感。' : 'Generate multi-angle display images and scene images for products, increasing conversion rates and user trust.',
      },
      {
        title: isZh ? '内容创作与社交媒体运营' : 'Content creation and social media operations',
        description: isZh ? '批量生成高质量配图，保持内容更新节奏，吸引更多用户互动。' : 'Batch generate high-quality illustrations, maintain content update rhythm, and attract more user engagement.',
      },
      {
        title: isZh ? '出版与编辑设计' : 'Publishing and editorial design',
        description: isZh ? '为书籍、杂志、报告生成专业插图，快速实现视觉排版设计。' : 'Generate professional illustrations for books, magazines, and reports, quickly achieving visual layout design.',
      },
      {
        title: isZh ? '教育与培训内容制作' : 'Education and Training Content Creation',
        description: isZh ? '生成直观的教学配图，让复杂概念更易理解，提升学习体验。' : 'Generate intuitive educational illustrations to make complex concepts easier to understand and enhance the learning experience.',
      },
      {
        title: isZh ? '游戏与娱乐制作' : 'Game and Entertainment Production',
        description: isZh ? '快速生成概念原画、角色设计、场景草图，加速游戏开发流程。' : 'Quickly generate concept art, character designs, and scene sketches, accelerating the game development process.',
      },
    ],
    testimonials: [
      {
        name: isZh ? '李明' : 'Li Ming',
        role: isZh ? '自由设计师' : 'Freelance Designer',
        content: isZh ? 'Banana Pro AI 生成速度极快，画质媲美专业软件输出。我的客户都以为是真人设计的，非常满意！' : 'Banana Pro AI generates extremely fast, with image quality comparable to professional software output. My clients all thought it was designed by a real person, very satisfied!',
        rating: 5,
      },
      {
        name: isZh ? '王雪' : 'Wang Xue',
        role: isZh ? '电商运营' : 'E-commerce Operations',
        content: isZh ? '用 Banana Pro AI 生成产品场景图，效果超出预期。以前需要一天的工作量，现在 30 分钟就搞定了。' : 'Using Banana Pro AI to generate product scene images, the results exceeded expectations. What used to take a full day of work is now done in 30 minutes.',
        rating: 5,
      },
      {
        name: isZh ? '陈浩' : 'Chen Hao',
        role: isZh ? '游戏概念设计师' : 'Game Concept Designer',
        content: isZh ? '最喜欢它的图生图功能，可以基于我的草图直接生成精细化的角色设计图，迭代速度快了 10 倍。' : 'I like its image-to-image feature the most; it can directly generate refined character design images based on my sketches, speeding up iteration by 10 times.',
        rating: 5,
      },
    ],
    faqs: [
      {
        question: isZh ? '什么是 Banana Pro AI 图片？' : 'What is Banana Pro AI Image?',
        answer:
          isZh ? 'Banana Pro AI 图片是一款基于 Google 最新多模态大模型的 AI 图像生成工具，支持文生图和图生图两种模式，能够快速生成高质量的图像内容。' : 'Banana Pro AI Image is an AI image generation tool based on Google latest multimodal large model, supporting both text-to-image and image-to-image modes, capable of quickly generating high-quality image content.',
      },
      {
        question: isZh ? 'Text-to-Image 与 Image-to-Image 有什么区别？' : 'What is the difference between Text-to-Image and Image-to-Image?',
        answer:
          isZh ? 'Text-to-Image（文生图）是通过文字描述生成全新图像；Image-to-Image（图生图）则是基于你上传的参考图进行风格迁移、局部编辑或变体生成。' : 'Text-to-Image generates new images through text descriptions; Image-to-Image performs style transfer, local editing, or variant generation based on your uploaded reference image.',
      },
      {
        question: isZh ? '如何为 Banana Pro AI 图片编写有效提示词？' : 'How to write effective prompts for Banana Pro AI Image?',
        answer:
          isZh ? '建议包含主体描述、风格关键词、光照和构图要求。例如："一位年轻女性站在樱花树下，日系插画风格，柔和光线，俯视构图"。' : 'It is recommended to include subject description, style keywords, lighting, and composition requirements. For example: "A young woman standing under a cherry blossom tree, Japanese illustration style, soft light, top-down composition."',
      },
      {
        question: isZh ? 'Banana Pro AI 图片生成速度有多快？' : 'How fast is Banana Pro AI Image generation?',
        answer: isZh ? '普通模式下平均生成时间为 3-8 秒，专业版用户享有优先队列，速度更快。' : 'In normal mode, the average generation time is 3-8 seconds, and Pro version users enjoy a priority queue for faster speed.',
      },
      {
        question: isZh ? '我可以将 Banana Pro AI 图片的输出用于商业用途吗？' : 'Can I use Banana Pro AI Image output for commercial purposes?',
        answer:
          isZh ? '是的，所有生成内容均归用户所有，可用于商业项目。专业版用户还可下载商业许可证文件。' : 'Yes, all generated content belongs to the user and can be used for commercial projects. Pro version users can also download commercial license files.',
      },
      {
        question: isZh ? '有免费版本可以体验吗？' : 'Is there a free version to try?',
        answer: isZh ? '有的。注册登录后即可获得 10 次免费额度，支持生成最多 2 张图片，无需信用卡。' : 'Yes. After registering and logging in, you will receive 10 free credits, supporting the generation of up to 2 images, no credit card required.',
      },
    ],
    ctaTitle: isZh ? '立即开启你的 AI 图像创作之旅' : 'Start your AI image creation journey now',
    ctaDescription:
      isZh ? '加入数百万创作者，用 Banana Pro AI 将无限创意转化为令人惊叹的视觉作品。' : 'Join millions of creators and transform unlimited creativity into stunning visual works with Banana Pro AI.',
  };

  return <ModelDetailPage {...modelData} examples={BANANA_PRO_AI_EXAMPLES} />;
}
