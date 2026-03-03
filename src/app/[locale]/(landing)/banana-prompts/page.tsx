import { getLocale } from 'next-intl/server';
import BananaPromptsClient from './BananaPromptsClient';

export const metadata = {
  title: 'Banana Prompts - 最新香蕉图像生成提示词示例与最佳实践',
  description: '探索精彩的香蕉图像生成提示词及示例图片。从这些精心策划的提示词中获取灵感，创作出令人惊艳的图像。',
};

export default async function BananaPromptsPage() {
  const isZh = (await getLocale()) === 'zh';
  return <BananaPromptsClient />;
}
