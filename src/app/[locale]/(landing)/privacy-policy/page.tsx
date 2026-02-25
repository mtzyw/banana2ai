export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI 隐私政策
        </h1>
        <p className="text-white/40 text-sm mb-10">最后更新：2026年1月</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <div>
            <p className="text-white/70 leading-relaxed">
              欢迎使用 Banana Pro AI（也称为"公司"、"我们"或"本平台"）！您的隐私对我们至关重要。本隐私政策概述了当您访问我们的网站时，我们如何收集、使用和保护您的信息。
            </p>
          </div>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">简介</h2>
            <p className="text-white/70 leading-relaxed">
              我们承诺保护您的个人隐私。本政策说明了我们收集哪些数据、为何收集以及如何使用这些数据。使用我们的服务即表示您同意本隐私政策中所述的数据实践。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">我们收集的信息</h2>
            <h3 className="text-white font-semibold mb-2">个人数据</h3>
            <p className="text-white/70 leading-relaxed mb-4">我们收集以下个人信息：</p>
            <ul className="list-disc list-inside space-y-1 text-white/70 mb-4">
              <li>姓名</li>
              <li>电子邮件地址</li>
              <li>支付信息</li>
            </ul>
            <h3 className="text-white font-semibold mb-2">非个人数据</h3>
            <p className="text-white/70 leading-relaxed mb-4">我们还通过网络 Cookie 收集非个人数据，包括：</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>分析类 Cookie（Google Analytics、Microsoft Clarity）</li>
              <li>广告类 Cookie（Google Ads）</li>
              <li>性能和使用统计数据</li>
              <li>网站交互数据</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">您可以通过我们的 Cookie 同意横幅控制这些 Cookie。</p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">数据收集目的</h2>
            <p className="text-white/70 leading-relaxed mb-4">我们收集的信息用于：</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>订单处理和服务交付</li>
              <li>网站分析和性能改进</li>
              <li>个性化广告（需征得您的同意）</li>
              <li>提升用户体验和平台功能</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">数据共享</h2>
            <p className="text-white/70 leading-relaxed">
              我们不会与任何其他方共享您的个人数据。您的信息仅用于提供和改进我们的服务。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">儿童隐私</h2>
            <p className="text-white/70 leading-relaxed">
              我们不会有意收集儿童的任何数据。如果您认为我们无意中收集了儿童的个人信息，请立即联系我们，我们将采取措施删除相关信息。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">隐私政策更新</h2>
            <p className="text-white/70 leading-relaxed">
              如果本隐私政策有任何更新，我们将通过电子邮件通知您。我们建议您定期查看本页面以了解任何变更。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">选择退出</h2>
            <p className="text-white/70 leading-relaxed">
              您可以选择退出某些数据收集和使用行为，请通过以下联系方式与我们联系。我们将在合理时间内回复您的请求。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">联系信息</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
            </p>
            <p className="text-white/60">
              公司：WhaleSwing LLC<br />
              地址：30 N GOULD ST, STE N, SHERIDAN, WY 82801<br />
              网站：bananaproai.com
            </p>
          </section>

          <p className="text-white/40 text-sm text-center">
            Copyright 2026 © BananaProAI.com. All rights reserved. WhaleSwing LLC
          </p>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: '隐私政策 - Banana Pro AI',
  description: 'Banana Pro AI 隐私政策 - 了解我们如何收集、使用和保护您的个人信息。',
};
