import StudioClient from './StudioClient';

export const metadata = {
  title: 'AI 工作流画布工作室 - Banana Pro AI Studio',
  description: 'Banana Pro AI Studio 将多个 AI 生成模型与直观的可视化工作流画布相结合。创建图像、生成视频、连接节点构建创意流水线，全部在一个免费工作空间中完成。',
};

export default function StudioPage() {
  return <StudioClient />;
}
