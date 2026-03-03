import { getLocale } from 'next-intl/server';
export default async function PrivacyPolicyPage() {
  const isZh = (await getLocale()) === 'zh';
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI {isZh ? '隐私政策' : 'Privacy Policy'}
        </h1>
        <p className="text-white/40 text-sm mb-10">{isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}</p>

        <div className="prose prose-invert max-w-none space-y-8">
          <div>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '欢迎使用 Banana Pro AI（也称为"公司"、"我们"或"本平台"）！您的隐私对我们至关重要。本隐私政策概述了当您访问我们的网站时，我们如何收集、使用和保护您的信息。' : 'Welcome to Banana Pro AI (also referred to as the company, we, or this platform)! Your privacy is paramount to us. This privacy policy outlines how we collect, use, and protect your information when you visit our website.'}
            </p>
          </div>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '简介' : 'Introduction'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们承诺保护您的个人隐私。本政策说明了我们收集哪些数据、为何收集以及如何使用这些数据。使用我们的服务即表示您同意本隐私政策中所述的数据实践。' : 'We are committed to protecting your personal privacy. This policy explains what data we collect, why we collect it, and how we use this data. By using our services, you agree to the data practices described in this privacy policy.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '我们收集的信息' : 'Information We Collect'}</h2>
            <h3 className="text-white font-semibold mb-2">{isZh ? '个人数据' : 'Personal Data'}</h3>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '我们收集以下个人信息：' : 'We collect the following personal information:'}</p>
            <ul className="list-disc list-inside space-y-1 text-white/70 mb-4">
              <li>{isZh ? '姓名' : 'Name'}</li>
              <li>{isZh ? '电子邮件地址' : 'Email address'}</li>
              <li>{isZh ? '支付信息' : 'Payment information'}</li>
            </ul>
            <h3 className="text-white font-semibold mb-2">{isZh ? '非个人数据' : 'Non-Personal Data'}</h3>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '我们还通过网络 Cookie 收集非个人数据，包括：' : 'We also collect non-personal data through web cookies, including:'}</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>{isZh ? '分析类 Cookie（Google Analytics、Microsoft Clarity）' : 'Analytics cookies (Google Analytics, Microsoft Clarity)'}</li>
              <li>{isZh ? '广告类 Cookie（Google Ads）' : 'Advertising cookies (Google Ads)'}</li>
              <li>{isZh ? '性能和使用统计数据' : 'Performance and usage statistics'}</li>
              <li>{isZh ? '网站交互数据' : 'Website interaction data'}</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">{isZh ? '您可以通过我们的 Cookie 同意横幅控制这些 Cookie。' : 'You can control these cookies through our cookie consent banner.'}</p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '数据收集目的' : 'Data Collection Purposes'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '我们收集的信息用于：' : 'The information we collect is used for:'}</p>
            <ul className="list-disc list-inside space-y-1 text-white/70">
              <li>{isZh ? '订单处理和服务交付' : 'Order processing and service delivery'}</li>
              <li>{isZh ? '网站分析和性能改进' : 'Website analytics and performance improvement'}</li>
              <li>{isZh ? '个性化广告（需征得您的同意）' : 'Personalized advertising (with your consent)'}</li>
              <li>{isZh ? '提升用户体验和平台功能' : 'Enhancing user experience and platform functionality'}</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '数据共享' : 'Data Sharing'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们不会与任何其他方共享您的个人数据。您的信息仅用于提供和改进我们的服务。' : 'We do not share your personal data with any other parties. Your information is used solely to provide and improve our services.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '儿童隐私' : 'Childrens Privacy'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们不会有意收集儿童的任何数据。如果您认为我们无意中收集了儿童的个人信息，请立即联系我们，我们将采取措施删除相关信息。' : 'We do not knowingly collect any data from children. If you believe we have unintentionally collected personal information from a child, please contact us immediately and we will take steps to delete the relevant information.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '隐私政策更新' : 'Privacy Policy Updates'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '如果本隐私政策有任何更新，我们将通过电子邮件通知您。我们建议您定期查看本页面以了解任何变更。' : 'If there are any updates to this Privacy Policy, we will notify you via email. We recommend you periodically review this page for any changes.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '选择退出' : 'Opt Out'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '您可以选择退出某些数据收集和使用行为，请通过以下联系方式与我们联系。我们将在合理时间内回复您的请求。' : 'You can choose to opt out of certain data collection and usage practices. Please contact us using the information below. We will respond to your request within a reasonable timeframe.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '联系信息' : 'Contact Information'}</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              {isZh ? '如果您对本隐私政策有任何疑问，请通过以下方式联系我们：' : 'If you have any questions about this Privacy Policy, please contact us using the following methods:'}
            </p>
            <p className="text-white/60">
              {isZh ? '公司：WhaleSwing LLC' : 'Company: WhaleSwing LLC'}<br />
              {isZh ? '地址：30 N GOULD ST, STE N, SHERIDAN, WY 82801' : 'Address: 30 N GOULD ST, STE N, SHERIDAN, WY 82801'}<br />
              {isZh ? '网站：banana2ai.net' : 'Website: banana2ai.net'}
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
