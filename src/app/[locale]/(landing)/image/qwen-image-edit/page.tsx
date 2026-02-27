import ModelDetailPage from '@/components/banana/ModelDetailPage';

const modelData = {
  modelName: 'Qwen Image Edit',
  modelSlug: 'qwen-image-edit',
  heroTitle: 'Qwen Image Edit - 高级开源 AI 编辑，免费在线使用',
  heroSubtitle: 'AI 驱动的图像编辑大师 —— 解锁精准文字渲染、语义级变换与外观控制',
  heroDescription:
    'Qwen Image Edit 是由阿里巴巴 Qwen 团队推出的 200 亿参数开源基础模型。通过 Qwen2.5-VL 的语义控制与 VAE Encoder 的外观精度控制双通道架构，实现卓越的图像编辑效果。采用 Apache 2.0 协议，支持风格迁移、对象编辑、中英双语文本处理与像素级修改，全面赋能专业创作者。',
  heroImage: '/images/banana/f4ru78usquup.jpeg',
  features: [
    {
      icon: '🔀',
      title: '双通道编辑架构，带来灵活而强大的控制能力',
      description:
        'Qwen Image Edit 的双通道架构融合 Qwen2.5-VL 的语义控制与 VAE Encoder 的精度编辑能力。既能完成风格迁移、艺术化渲染等概念级修改，也能实现对象移除、颜色调整等像素级操作，在创意理解与技术准确性之间取得平衡。',
    },
    {
      icon: '🈶',
      title: '卓越的中英文双语文本渲染与编辑能力',
      description:
        'Qwen Image Edit 在中英文文本编辑方面表现出色，可添加、修改或移除文字，并自动匹配字体、字号与样式。轻松应对复杂书法、混合语言设计和高排版要求的项目，是跨文化内容与国际品牌的理想选择。',
    },
    {
      icon: '🎯',
      title: '具备上下文理解的高级对象编辑能力',
      description:
        'Qwen Image Edit 通过上下文智能，实现自然的对象添加与移除。模型理解光照、透视与场景关系，生成协调统一的视觉效果，非常适合电商、房地产、人像摄影和创意合成。',
    },
    {
      icon: '🔓',
      title: '基于 Apache 2.0 的开源创新与商业自由',
      description:
        'Qwen Image Edit 采用 Apache 2.0 协议，允许无限制的商业使用。可在 Hugging Face 上获取并进行微调、定制和部署，无需支付授权费用，适合初创团队、创意机构和企业级应用。',
    },
    {
      icon: '🧠',
      title: 'Qwen2.5-VL 语义理解引擎',
      description:
        'Qwen Image Edit 基于 Qwen2.5-VL 视觉语言模型，实现高层次语义理解与控制。能够解析自然语言指令，完成风格迁移、艺术渲染和氛围调整，在尊重画面构图的前提下进行智能修改。',
    },
    {
      icon: '🔬',
      title: 'VAE Encoder 外观精度控制',
      description:
        'VAE Encoder 为 Qwen Image Edit 提供像素级外观控制能力，实现精确的颜色调整、纹理修改与细节润色。配合语义理解，确保创意表达与技术精度高度一致。',
    },
    {
      icon: '🏗️',
      title: '200 亿参数的基础模型架构',
      description:
        'Qwen Image Edit 构建于阿里巴巴 200 亿参数基础模型之上，具备企业级理解能力，能够处理复杂视觉关系和多样化场景，支持云端与本地部署。',
    },
  ],
  steps: [
    {
      title: '上传图片并描述你的编辑需求',
      description:
        '将图片上传至 Qwen Image Edit，用自然语言描述你想要的修改内容。无论是添加文字、更换背景、风格转换还是对象调整，Qwen Image Edit 都能理解英文和中文的语义与外观层级指令。',
    },
    {
      title: 'Qwen Image Edit 智能解析你的请求',
      description:
        'Qwen Image Edit 的 200 亿参数模型通过双通道架构处理输入。Qwen2.5-VL 负责语义理解与风格层面的修改，VAE Encoder 则实现像素级精细控制，全面分析画面构图、光照与上下文，确保编辑自然无缝。',
    },
    {
      title: '高级 AI 处理完成图像变换',
      description:
        'Qwen Image Edit 结合扩散模型等先进算法，在保持画质的同时完成编辑。文本渲染精准匹配字体与样式，对象移除采用智能填充，新元素通过上下文理解自然融合。',
    },
    {
      title: '下载专业级编辑后的图像',
      description:
        '下载无明显瑕疵的高分辨率成品图像，适用于电商、营销推广、社交媒体或创意作品集。Qwen Image Edit 采用 Apache 2.0 协议，支持完全自由的商业使用。',
    },
  ],
  useCases: [
    {
      title: '电商商品优化与背景替换',
      description:
        '使用 Qwen Image Edit 优化商品图片，快速去除背景、替换为棚拍场景，并修改文字标签以保持品牌一致性，无需重新拍摄即可提升商品表现力。',
    },
    {
      title: '营销活动适配与本地化',
      description:
        '借助 Qwen Image Edit 快速完成营销素材的本地化，将文本在中英文之间切换，同时保持设计风格一致，实现季节性与区域化营销。',
    },
    {
      title: '社交媒体内容优化与个性化',
      description:
        'Qwen Image Edit 针对不同平台快速调整图片背景、文字与光效，从一张原图生成适配 Instagram、TikTok、YouTube 的多种版本，提升内容表现力。',
    },
    {
      title: '房地产与建筑可视化增强',
      description:
        'Qwen Image Edit 通过智能去除杂物、改善光照与虚拟布置，提升房产图片质量，无需昂贵实景布置即可呈现理想效果。',
    },
    {
      title: '出版与编辑设计优化',
      description:
        'Qwen Image Edit 用于封面设计迭代、文字调整与系列视觉统一，支持中英双语内容，适合出版社、编辑团队与独立作者。',
    },
    {
      title: '创意作品集与艺术探索',
      description:
        '快速尝试不同风格与构图方案，提升作品集质量。开源特性鼓励艺术家与创作者进行更多实验与创新。',
    },
  ],
  testimonials: [
    {
      name: '陈明华',
      role: '电商运营总监',
      content:
        'Qwen Image Edit 彻底改变了我们的电商流程！管理 5000 多张商品图片变得非常轻松，中英文标签切换精准无误。背景移除节省了大量拍摄成本，转化率提升了 28%。',
      rating: 5,
    },
    {
      name: '李雪梅',
      role: '营销总监',
      content:
        '快速迭代和本地化不可或缺的工具。双通道架构同时应对创意与技术需求，两天内完成整套亚洲市场活动物料，制作周期缩短 60%。',
      rating: 5,
    },
    {
      name: '王浩然',
      role: '封面设计师',
      content:
        'Qwen Image Edit 彻底革新了我的书籍封面设计流程。中英文排版效果非常出色，语义模式激发创意，精度控制确保专业度，效率提升了 40%。',
      rating: 5,
    },
    {
      name: '张伟',
      role: '房地产经纪人',
      content:
        'Qwen Image Edit 对房地产来说是颠覆性的工具。无需昂贵布置就能提升照片品质，房源更具吸引力，成交速度提升了 35%。',
      rating: 5,
    },
    {
      name: '刘晓雨',
      role: '内容创作者',
      content:
        'Qwen Image Edit 让多平台内容创作变得高效一致。快速适配不同平台风格，在保证专业度的同时测试创意，粉丝增长了 150%。',
      rating: 5,
    },
  ],
  faqs: [
    {
      question: '什么是 Qwen Image Edit？它是如何工作的？',
      answer:
        'Qwen Image Edit 是阿里巴巴 Qwen 团队推出的 200 亿参数开源 AI 图像编辑模型，采用双通道架构。只需上传图片并用自然语言描述修改需求，即可完成文本编辑、风格转换与对象操作。系统融合 Qwen2.5-VL 的语义理解和 VAE Encoder 的像素级控制，确保每次编辑自然、精准、高质量。',
    },
    {
      question: 'Qwen Image Edit 的双语文本编辑有什么优势？',
      answer:
        'Qwen Image Edit 在中英文文本编辑方面表现卓越，可精准匹配字体、字号与样式，支持复杂书法与混合语言设计，非常适合跨文化营销与设计项目。无论是中文书法字体还是英文品牌字体，Qwen Image Edit 都能自动识别并保持一致的视觉风格。',
    },
    {
      question: 'Qwen Image Edit 的双通道架构是如何工作的？',
      answer:
        'Qwen Image Edit 采用两条协同处理通道：语义模式（Qwen2.5-VL）负责风格与创意层面的理解，外观模式（VAE Encoder）负责像素级精细控制，两者结合实现创意与精度兼顾。这种架构确保无论是高层次的风格转换还是细微的颜色调整，都能得到最佳处理效果。',
    },
    {
      question: 'Qwen Image Edit 的编辑质量如何？',
      answer:
        'Qwen Image Edit 适用于电商、营销、出版与房地产等专业场景，保持原始分辨率的同时实现自然、真实的修改效果。模型经过大量专业图像训练，能够理解光照、透视与场景关系，确保每次编辑都无缝融合。',
    },
    {
      question: '我可以将 Qwen Image Edit 用于商业项目吗？',
      answer:
        '可以。Qwen Image Edit 的 Apache 2.0 协议允许完全自由的商业使用，无需额外授权费用，适合商业项目与客户服务。无论是初创团队还是大型企业，都可以放心地将 Qwen Image Edit 集成到商业工作流程中。',
    },
    {
      question: '如何为 Qwen Image Edit 编写高质量的编辑提示词？',
      answer:
        '建议为 Qwen Image Edit 使用清晰、具体的描述，例如指定颜色、位置与风格，就像在向一位设计师下达需求一样。比如"将背景替换为白色棚拍场景，保留产品不变，调整光照使其均匀柔和"这样的描述比简单的"换背景"效果更好。',
    },
    {
      question: 'Qwen Image Edit 背后采用了哪些先进技术？',
      answer:
        'Qwen Image Edit 基于 200 亿参数模型，融合 Qwen2.5-VL、VAE Encoder、扩散模型与智能填充等先进技术。这些技术的结合使模型能够理解复杂的视觉关系，实现文本精准渲染、对象智能处理与风格无缝转换。',
    },
    {
      question: 'Qwen Image Edit 最适合哪些使用场景？',
      answer:
        '非常适合电商、营销本地化、社交媒体、房地产、出版与创意设计等领域，尤其适用于跨语言与国际化项目。任何需要高质量图像编辑、文本处理或风格转换的专业场景，都是 Qwen Image Edit 的理想应用场合。',
    },
    {
      question: '我该如何获取并部署 Qwen Image Edit？',
      answer:
        'Qwen Image Edit 可通过 Hugging Face、GitHub 及官方 Qwen 仓库获取，支持本地部署或云端 API 使用，并可进行定制与集成。您也可以直接在本平台免费体验 Qwen Image Edit 的核心功能，无需自行部署。',
    },
  ],
  ctaTitle: '使用 Qwen Image Edit，开启专业级 AI 图像编辑体验',
  ctaDescription:
    '加入全球专业用户行列，使用 Qwen Image Edit 重塑工作流程。双通道 AI 融合语义智能与外观精度，只需上传图片并描述修改需求即可完成编辑。支持中英文文本、风格转换与对象操作，Apache 2.0 协议保障商业自由，全面提升效率并释放无限创意潜能。',
};

export default function Page() {
  return <ModelDetailPage {...modelData} />;
}
