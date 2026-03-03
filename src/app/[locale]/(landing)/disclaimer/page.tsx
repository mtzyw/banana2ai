import { getLocale } from 'next-intl/server';
export default async function DisclaimerPage() {
  const isZh = (await getLocale()) === 'zh';
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI {isZh ? '免责声明' : 'Disclaimer'}
        </h1>
        <p className="text-white/40 text-sm mb-10">{isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}</p>

        <div className="space-y-8">
          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">1. {isZh ? '独立平台声明' : 'Independent Platform Statement'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI (banana2ai.net) {isZh ? '作为一个独立的 AI 创意平台运营，提供视频和图像生成服务。我们通过官方 API 集成各种 AI 技术，包括但不限于 Google Veo、OpenAI Sora 2、Nano Banana 以及其他领先的 AI 提供商，为我们的创意工具提供支持。' : 'Operating as an independent AI creative platform, providing video and image generation services. We integrate various AI technologies through official APIs, including but not limited to Google Veo, OpenAI Sora 2, Nano Banana, and other leading AI providers, to power our creative tools.'}
            </p>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们的平台、用户界面、积分系统、客户支持和业务运营均由 Banana Pro AI 独立开发和管理。' : 'Our platform, user interface, credit system, customer support, and business operations are independently developed and managed by Banana Pro AI.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">2. {isZh ? '技术集成模式' : 'Technology Integration Model'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI {isZh ? '作为独立创意平台，集成了多种 AI 技术。我们使用这些 API 并不构成与任何 API 提供商的合作伙伴关系、合资企业或官方背书。' : 'As an independent creative platform, we integrate multiple AI technologies. Our use of these APIs does not constitute a partnership, joint venture, or official endorsement with any API provider.'}
            </p>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '所有 AI 技术均通过官方授权渠道接入，我们严格遵守各 API 提供商的使用条款和政策。' : 'All AI technologies are accessed through officially authorized channels, and we strictly adhere to the terms of use and policies of each API provider.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">3. {isZh ? '品牌独立性' : 'Brand Independence'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI {isZh ? '作为一个独特且独立的品牌运营：' : 'Operating as a unique and independent brand:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>{isZh ? '我们的品牌标识、营销和业务运营均独立进行' : 'Our brand identity, marketing, and business operations are conducted independently.'}</li>
              <li>{isZh ? '用户应将 Banana Pro AI 视为提供各种 AI 技术访问的独立创意平台，而不是任何特定 AI 提供商的官方渠道' : 'Users should regard Banana Pro AI as an independent creative platform providing access to various AI technologies, rather than an official channel for any specific AI provider.'}</li>
              <li>Banana Pro AI {isZh ? '的品牌、业务运营和客户关系与我们集成的 API 提供商是分离的' : 'Our brand, business operations, and customer relationships are separate from the API providers we integrate.'}</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">4. {isZh ? '商标声明' : 'Trademark Statement'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              "Google"、"Veo"、"Veo 3"、"OpenAI"、"Sora"、"Sora 2"、"Nano Banana" {isZh ? '以及所有相关商标、徽标和品牌名称均为其各自所有者的专有财产。' : 'All related trademarks, logos, and brand names are the exclusive property of their respective owners.'}
            </p>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '这些名称出现在我们的网站上仅用于描述我们集成的底层技术和 API。它们的出现并不暗示或表明 Banana Pro AI 与这些商标所有者之间存在任何商业合作伙伴关系、官方背书、授权、合资企业或附属关系。' : 'These names appear on our website solely to describe the underlying technologies and APIs we integrate. Their presence does not imply or indicate any commercial partnership, official endorsement, authorization, joint venture, or affiliation between Banana Pro AI and these trademark owners.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">5. {isZh ? '用户理解' : 'User Understanding'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '用户应理解：' : 'Users should understand:'}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Banana Pro AI {isZh ? '是一个独立平台，通过官方 API 提供对多种 AI 技术的访问' : 'This is an independent platform that provides access to multiple AI technologies through official APIs.'}</li>
              <li>{isZh ? '使用 Banana Pro AI 意味着通过我们独立开发的平台基础设施访问第三方 AI 技术' : 'Using Banana Pro AI means accessing third-party AI technologies through our independently developed platform infrastructure.'}</li>
              <li>Banana Pro AI {isZh ? '的品牌、业务运营和客户关系与我们集成的 API 提供商是分离的' : 'Our brand, business operations, and customer relationships are separate from the API providers we integrate.'}</li>
              <li>{isZh ? '任何问题、疑虑或支持请求应直接联系 Banana Pro AI，而不是底层 API 提供商' : 'Any questions, concerns, or support requests should be directed to Banana Pro AI, not the underlying API providers.'}</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">6. {isZh ? '联系信息' : 'Contact Information'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              {isZh ? '如有关于本免责声明或我们服务的问题、疑虑或需要澄清，请通过以下方式联系我们：' : 'For questions, concerns, or clarifications regarding this disclaimer or our services, please contact us via:'}
            </p>
            <p className="text-white/60 mb-4">
              {isZh ? '公司：WhaleSwing LLC' : 'Company: WhaleSwing LLC'}<br />
              {isZh ? '地址：30 N GOULD ST, STE N, SHERIDAN, WY 82801' : 'Address: 30 N GOULD ST, STE N, SHERIDAN, WY 82801'}<br />
              {isZh ? '网站：banana2ai.net' : 'Website: banana2ai.net'}
            </p>
            <p className="text-white/60 text-sm">
              {isZh ? '我们保留定期更新本免责声明以反映服务集成或业务模式变化的权利。我们鼓励用户定期查看本页面以了解任何变化。' : 'We reserve the right to regularly update this disclaimer to reflect changes in service integration or business models. We encourage users to periodically review this page for any changes.'}
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
  title: '免责声明 - Banana Pro AI',
  description: 'Banana Pro AI 免责声明 - 了解我们的平台独立性和技术集成模式。',
};
