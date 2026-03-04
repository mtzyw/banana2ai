export interface VideoToolData {
  slug: string
  modelName: string
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroImage: string
  features: Array<{ icon: string; title: string; description: string }>
  steps: Array<{ title: string; description: string }>
  useCases: Array<{ title: string; description: string }>
  testimonials: Array<{ name: string; role: string; content: string; rating: number }>
  faqs: Array<{ question: string; answer: string }>
  ctaTitle: string
  ctaDescription: string
}

export const videoTools: Record<string, VideoToolData> = {
  'veo-3-1': {
    slug: 'veo-3-1',
    modelName: 'Veo 3.1',
    heroTitle: 'Unlock cinematic video creation with Veo 3.1',
    heroSubtitle: 'Explore long video consistency and motion centric camera control',
    heroDescription: 'Veo 3.1 is Google latest high quality AI video generation model, designed for professional creators who need long video consistency and precise motion control. Explore a new era of high quality video generation with AI motion control.',
    heroImage: 'https://static.banana2ai.net/images/showcase/canvas-workflow.webp',
    features: [
      { icon: '🎬', title: 'Veo 3.1 — High quality video generation with AI motion control', description: 'Advanced AI motion control technology, making every shot dynamic and professional.' },
      { icon: '🎞️', title: 'Long Video Consistency', description: 'Motion Centric Camera Control' },
      { icon: '📷', title: 'Multi Model Video Workflow Positioning', description: 'Veo 3.1 plays a core role in multi model video workflows, collaborating with other models.' },
      { icon: '🌟', title: 'High Quality Narrative Video Creation', description: 'Optimized for creators who need to produce high quality narrative video content.' },
      { icon: '🎯', title: 'Fast Generation and Iteration', description: 'Efficient generation speed allows creators to quickly iterate and optimize video content.' },
      { icon: '⚡', title: 'Describe Your Video Idea', description: 'Use detailed text to describe the video content, style, and motion you want to create.' },
    ],
    steps: [
      { title: 'Select Parameter Settings', description: 'Configure parameters such as video duration, resolution, and motion style.' },
      { title: 'Veo 3.1 AI Generation', description: 'AI model processes your request, generating high quality video content.' },
      { title: 'Preview and Download', description: 'Preview the generated result, and download the high quality video file once satisfied.' },
      { title: 'Film and Short Film Creation', description: 'Utilize Veo 3.1 precise motion control to create cinematic short films and narrative content.' },
    ],
    useCases: [
      { title: 'Brand Video Marketing', description: 'Generate high quality brand videos, enhancing the professionalism and appeal of marketing content.' },
      { title: 'Social Media Video Content', description: 'Quickly create platform optimized high quality video content.' },
      { title: 'Education and Training Videos', description: '快速创作各平台适配的高质量视频内容。' },
      { title: '教育与培训视频', description: 'Create clear, professional educational and training video content.' },
    ],
    testimonials: [
      { name: 'Director Zhang', role: 'Independent Film Director', content: 'Veo 3.1 motion control precision is astonishing, and its long video consistency exceeded my expectations, making it one of the best AI video tools available.', rating: 5 },
      { name: 'Brand Director Li', role: 'Brand Marketing Director', content: 'Using Veo 3.1 increased brand video generation efficiency by 5 times, with quality comparable to professional production teams.', rating: 5 },
      { name: 'Content Creator Wang', role: 'Video Content Creator', content: 'Veo 3.1 allows me to quickly create high-quality narrative videos, completely transforming my content creation workflow.', rating: 5 },
    ],
    faqs: [
      { question: 'What is Veo 3.1?', answer: 'Veo 3.1 is Google latest AI video generation model, focusing on long video consistency and precise AI motion control, suitable for professional video content creation.' },
      { question: 'How is Veo 3.1 used for long video creation?', answer: 'Veo 3.1 is specifically optimized for long video consistency, capable of maintaining visual coherence of characters and scenes over extended time sequences.' },
      { question: 'What resolutions does Veo 3.1 support?', answer: 'Veo 3.1 supports multiple resolution outputs, from standard HD to higher resolutions, meeting the needs of different platforms.' },
      { question: 'How to create high-quality narrative videos with Veo 3.1?', answer: 'Provide detailed text descriptions, including scene settings, character actions, camera movements, and emotional tone, and Veo 3.1 will generate high-quality narrative videos based on the descriptions.' },
    ],
    ctaTitle: 'Start creating with Veo 3.1 now',
    ctaDescription: 'Experience Google latest AI video generation technology and transform your ideas into cinematic video works.',
  },

  'veo-3-video-generator': {
    slug: 'veo-3-video-generator',
    modelName: 'Veo 3 Video Generator',
    heroTitle: 'Transform ideas into films, using Veo 3 Video Generator',
    heroSubtitle: 'Experience the breakthrough power of Google Veo 3 model',
    heroDescription: 'Veo 3 AI Video Generator is a professional video creation platform based on Google flagship Veo 3 model. Experience unprecedented video generation quality and create stunning cinematic visual works.',
    heroImage: 'https://static.banana2ai.net/images/showcase/ai-models.webp',
    features: [
      { icon: '🎬', title: 'Veo 3 AI Video Generator: Create Cinematic Masterpieces', description: 'Based on Google strongest Veo 3 model, generate high-quality videos that meet filmmaking standards.' },
      { icon: '🎙️', title: 'Native Audio-Video Generation', description: 'Realistic Physical Effects Simulation' },
      { icon: '🌊', title: '真实的物理效果模拟', description: '精准模拟水流、火焰、烟雾等物理效果，让视频更加真实。' },
      { icon: '👤', title: 'Precise Character Motion Capture', description: 'High precision character movement and expression restoration, suitable for character driven narrative content.' },
      { icon: '🎨', title: 'Diverse Visual Styles', description: 'Supports multiple visual styles from realistic documentary style to artistic animation.' },
      { icon: '🔊', title: 'Synchronized Sound Effect Generation', description: 'Automatically generates matching ambient sound effects and background music for video content.' },
    ],
    steps: [
      { title: 'How to Use Veo 3 Video Generator', description: 'Log in to the platform, enter your video description in the creation interface.' },
      { title: 'Enter Creative Description', description: 'Describe scene, characters, actions, and visual style in detail.' },
      { title: 'AI Generates Video', description: 'Veo 3 AI processes your description to generate high quality video content.' },
      { title: 'Download and Share', description: 'Download the generated video and share your creation on various platforms.' },
    ],
    useCases: [
      { title: 'Film and Visual Storytelling', description: 'Utilize Veo 3 cinematic quality to create professional short films and visual stories.' },
      { title: 'Advertising and Brand Marketing', description: 'Generate high quality advertising videos to enhance brand communication effectiveness.' },
      { title: 'Music Video Production', description: 'Create highly creative accompanying video content for musical works.' },
      { title: 'Gaming and Entertainment Content', description: 'Generate game trailers and entertainment content.' },
    ],
    testimonials: [
      { name: 'Chen Creative Director', role: 'Advertising Creative Director', content: 'Veo 3 video generator has completely transformed our ad creation process. Now we can produce ad videos comparable to large productions at extremely low cost.', rating: 5 },
      { name: 'Liu Video Creator', role: 'Independent Video Producer', content: 'Veo 3 audio video co generation feature is amazing, saving a lot of work on voiceovers and soundtracks.', rating: 5 },
      { name: 'James Director', role: 'Film Director', content: 'The visual quality of Veo 3 is genuinely cinematic. I use it for rapid prototyping of scenes before actual production.', rating: 5 },
    ],
    faqs: [
      { question: 'How to Use Veo 3 Video Generator?', answer: 'Enter a detailed video description in the text box, including scene, characters, actions, and style, then click generate. Veo 3 will generate high quality video in minutes.' },
      { question: 'What are the features of Veo 3?', answer: 'Veo 3 supports high-quality video generation, native audio co-generation, realistic physics simulation, precise character motion reproduction, and various visual styles.' },
      { question: 'How to unleash Veo 3 potential?', answer: 'Provide detailed creative descriptions, including cinematography style, lighting settings, emotional tone, and narrative rhythm, to allow Veo 3 to fully understand your creative intent.' },
      { question: 'Can videos generated by Veo 3 be used commercially?', answer: 'Yes, videos generated by Veo 3 can be used for commercial projects. Please refer to the platform terms of use for specific rights.' },
    ],
    ctaTitle: 'Create your cinematic videos with Veo 3.',
    ctaDescription: 'Experience Google most powerful AI video generation technology, transforming any idea into stunning visual works.',
  },

  'seedance-1-5-pro': {
    slug: 'seedance-1-5-pro',
    modelName: 'Seedance 1.5 Pro',
    heroTitle: 'Create Cinematic AI Videos with Seedance 1.5 Pro',
    heroSubtitle: 'Experience native audio-video generation with Seedance 1.5 Pro.',
    heroDescription: 'Seedance 1.5 Pro is the ultimate AI video creation platform featuring native audio-video generation, cinematic quality output, and professional-grade creative control. Transform your concepts into stunning video content instantly.',
    heroImage: 'https://static.banana2ai.net/images/showcase/video-generation.webp',
    features: [
      { icon: '🎬', title: 'Seedance 1.5 Pro Video Generator: The Ultimate AI Creation Platform', description: 'Professional-grade AI video generation with cinematic quality and native audio support.' },
      { icon: '🔊', title: 'Native Audio-Video Generation', description: 'Seamlessly generate synchronized audio and video content in one unified process.' },
      { icon: '📽️', title: 'Cinematic Quality Output', description: 'Every frame rendered with attention to film-quality lighting, composition, and motion.' },
      { icon: '🎯', title: 'Core Features of Seedance 1.5 Pro', description: 'Advanced motion dynamics, scene consistency, and character fidelity across all frames.' },
      { icon: '🌟', title: 'Why Choose Seedance 1.5 Pro?', description: 'Leading performance in video quality benchmarks with intuitive creative control.' },
      { icon: '🚀', title: 'Fast Generation Pipeline', description: 'Optimized inference pipeline delivers results faster than conventional video AI tools.' },
    ],
    steps: [
      { title: 'Describe Your Vision', description: 'Enter a detailed text prompt describing your desired video content, style, and mood.' },
      { title: 'Configure Parameters', description: 'Set duration, aspect ratio, and quality settings for your video project.' },
      { title: 'Generate Your Video', description: 'Seedance 1.5 Pro AI processes your prompt and generates cinematic video content.' },
      { title: 'Download and Publish', description: 'Download your high-quality video and publish across any platform.' },
    ],
    useCases: [
      { title: 'Cinematic Storytelling', description: 'Create film-quality narrative videos with consistent characters and compelling visuals.' },
      { title: 'Music Video Production', description: 'Generate creative music video content with synchronized visual styles.' },
      { title: 'Product Demos & Advertising', description: 'Produce professional product demonstration and advertising videos at scale.' },
      { title: 'Social Media Content', description: 'Generate high-quality short-form video content for all major platforms.' },
    ],
    testimonials: [
      { name: 'Alex Filmmaker', role: 'Independent Filmmaker', content: 'Seedance 1.5 Pro delivers genuine cinematic quality. The motion dynamics are incredibly fluid and the scene consistency is remarkable.', rating: 5 },
      { name: 'Creative Agency Head', role: 'Agency Creative Director', content: 'We use Seedance 1.5 Pro for rapid video prototyping. The native audio generation saves hours of post-production work.', rating: 5 },
      { name: 'Music Producer Lisa', role: 'Music Video Director', content: 'The visual style consistency in Seedance 1.5 Pro is perfect for music videos. My clients are always amazed by the results.', rating: 5 },
    ],
    faqs: [
      { question: 'What is Seedance 1.5 Pro?', answer: 'Seedance 1.5 Pro is a professional AI video generation model featuring native audio-video generation, cinematic quality output, and advanced motion control.' },
      { question: 'What makes Seedance 1.5 Pro different from other video AI tools?', answer: 'Seedance 1.5 Pro combines native audio generation, superior motion dynamics, and cinematic-quality rendering in a single platform, delivering professional results without complex post-production.' },
      { question: 'Can I use Seedance 1.5 Pro for commercial video production?', answer: 'Yes, videos generated with Seedance 1.5 Pro can be used for commercial purposes. Please review our terms of service for specific usage rights.' },
      { question: 'What video formats and resolutions does Seedance 1.5 Pro support?', answer: 'Seedance 1.5 Pro supports multiple aspect ratios and resolutions suitable for social media, streaming platforms, and professional video production.' },
    ],
    ctaTitle: 'Create Cinematic Videos with Seedance 1.5 Pro',
    ctaDescription: 'Experience the next generation of AI video creation. Generate professional cinematic content instantly.',
  },

  'sora-2': {
    slug: 'sora-2',
    modelName: 'Sora 2',
    heroTitle: 'Unlock the Full Potential of Sora 2 Video Generation',
    heroSubtitle: 'Join the revolution of AI-driven cinematography.',
    heroDescription: 'Sora 2 represents OpenAI\'s next evolution in hyper-realistic AI video generation. Experience unprecedented temporal consistency, photorealistic physics simulation, and cinematic storytelling capabilities that redefine what\'s possible with AI video.',
    heroImage: 'https://static.banana2ai.net/images/avatars/8pk4idwouhh0.webp',
    features: [
      { icon: '🎬', title: 'Sora 2: The Next Evolution in Hyper-Realistic AI Video Generation', description: 'OpenAI\'s most advanced video model delivers hyper-realistic video content with unprecedented quality.' },
      { icon: '🌊', title: 'Photorealistic Physics Simulation', description: 'Accurate simulation of real-world physics including fluid dynamics, lighting, and material properties.' },
      { icon: '⏱️', title: 'Superior Temporal Consistency', description: 'Maintains perfect visual consistency across extended video sequences for seamless storytelling.' },
      { icon: '🎭', title: 'Unlimited Creative Possibilities with Sora 2 Features', description: 'Extended video length, multi-scene generation, and diverse visual style support.' },
      { icon: '📝', title: 'Precise Prompt Understanding', description: 'Advanced language understanding translates complex creative descriptions into exactly the intended visuals.' },
      { icon: '🖼️', title: 'Cinematic Composition', description: 'Professional cinematography principles applied automatically for visually compelling output.' },
    ],
    steps: [
      { title: 'Write Your Creative Prompt', description: 'Describe your video scene in detail—setting, characters, action, and visual style.' },
      { title: 'Configure Video Settings', description: 'Set video duration, resolution, and camera movement preferences.' },
      { title: 'Generate with Sora 2', description: 'Sora 2 AI processes your vision and creates hyper-realistic video content.' },
      { title: 'Download Your Masterpiece', description: 'Download your Sora 2 generated video in high quality for any use.' },
    ],
    useCases: [
      { title: 'Professional Filmmakers', description: 'Rapidly prototype scenes and generate visual effects for film production.' },
      { title: 'Advertising & Brand Marketing', description: 'Create stunning product showcases and brand story videos with cinematic quality.' },
      { title: 'Game Cinematics', description: 'Generate game trailers, cutscenes, and promotional video content.' },
      { title: 'Educational Content', description: 'Visualize complex concepts and historical events through realistic AI-generated video.' },
    ],
    testimonials: [
      { name: 'Director Ryan M.', role: 'Film Director', content: 'Sora 2\'s temporal consistency is a game changer for AI video. I can now generate extended scene sequences that look completely coherent and cinematic.', rating: 5 },
      { name: 'Brand Manager Kate', role: 'Marketing Director', content: 'Our Sora 2 product videos look indistinguishable from professional productions. The ROI compared to traditional video production is extraordinary.', rating: 5 },
      { name: 'Game Studio Lead', role: 'Game Creative Director', content: 'We use Sora 2 for cinematic trailers. The hyper-realistic physics and character motion are exactly what our brand demands.', rating: 5 },
    ],
    faqs: [
      { question: 'What makes Sora 2 special compared to other AI video tools?', answer: 'Sora 2 excels in hyper-realistic physics simulation, superior temporal consistency for extended sequences, and precise prompt understanding that delivers exactly what you envision.' },
      { question: 'Who benefits from Sora 2?', answer: 'Filmmakers, content creators, advertisers, game developers, and educators all benefit from Sora 2\'s professional-grade video generation capabilities.' },
      { question: 'How long can Sora 2 videos be?', answer: 'Sora 2 supports extended video lengths suitable for professional storytelling and marketing applications.' },
      { question: 'Can I use Sora 2 generated videos commercially?', answer: 'Yes, videos generated with Sora 2 can be used for commercial purposes. Please review our terms of service for specific usage rights.' },
    ],
    ctaTitle: 'Experience Sora 2\'s Revolutionary Video Generation',
    ctaDescription: 'Create hyper-realistic AI videos with OpenAI\'s most advanced model. Start generating with Sora 2 today.',
  },
}
