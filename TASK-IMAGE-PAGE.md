# Task: Rewrite /image page

完全重写 `src/app/[locale]/(landing)/image/page.tsx`，精确复刻原站 bananaproai.com/zh/image 页面。

## 参考文件
- 完整HTML参考: `./reference-image-page.txt` (2865行，原站完整HTML源码，必须先读)
- 现有CSS动画类: `src/config/style/global.css` (gradient-glow-text, gradient-glow-bg, badge-gradient, highlight-button, gradient-text, scroll-fade-in 等已定义好)
- 现有图片生成器组件: `src/components/banana/ImageGenerator.tsx` (已有完整的文生图/图生图交互面板)
- 本地图片资源: `public/images/banana/` (已有jpeg和mp4文件)

## 原站页面完整结构 (11个section)

1. **Hero** - 渐变背景+毛玻璃光晕, h1 "Banana Pro AI：高级图生图编辑器", 左文字+CTA+4特性列表, max-w-[1400px], 两栏lg:grid-cols-2
2. **ImageGenerator Tool** - 引入 ImageGenerator 组件
3. **More AI Generators Grid** - "更多 AI 图像生成器", 4x2网格8模型卡片, hover:scale-105
4. **4 Steps** - "4个简单步骤", 4卡片水平排列+箭头, 图标MessageSquare/SlidersHorizontal/Sparkles/Download
5. **Models Explorer** - "探索我们的先进AI图像模型", 左标签+右详情, 5模型
6. **Why Choose** - "为什么选择Banana Pro AI", tab切换(双模式/专业品质/即时结果/无水印/云存储)
7. **Use Cases** - 4个交替layout(摄影师带before/after滑块, 营销, 电商, 内容创作者)
8. **Case Studies** - 2x2卡片(电商/社交/营销/艺术), icon+标题+描述
9. **Testimonials** - 4条轮播, 大引号, 头像+姓名+职位, 左右箭头
10. **FAQ** - 8个手风琴, maxHeight transition, 第一个默认展开
11. **CTA** - 左文字+右圆形遮罩图片(radial-gradient mask), cta-cover.jpeg

## 设计规范
- bg: #0f1117, card: #1c2030/#13151f, border: #363b4e
- highlight: #ffcc33, gradient: #ffcc33→#ff9900
- 每section有装饰性blur-3xl光球
- scroll-fade-in动画
- lucide-react图标, Next.js Image, 'use client'

## 约束
- 只改 `src/app/[locale]/(landing)/image/page.tsx`
- 从reference HTML提取真实中文内容
- 颜色用直接值: bg-[#0f1117] text-[#ffcc33]
- TypeScript + Tailwind only

完成后运行: `npx tsc --noEmit 2>&1 | head -20`

完全结束后运行: `openclaw system event --text 'Done: /image page rewritten' --mode now`
