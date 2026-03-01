export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI 免责声明
        </h1>
        <p className="text-white/40 text-sm mb-10">最后更新：2026年1月</p>

        <div className="space-y-8">
          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">1. 独立平台声明</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI (banana2ai.net) 作为一个独立的 AI 创意平台运营，提供视频和图像生成服务。我们通过官方 API 集成各种 AI 技术，包括但不限于 Google Veo、OpenAI Sora 2、Nano Banana 以及其他领先的 AI 提供商，为我们的创意工具提供支持。
            </p>
            <p className="text-white/70 leading-relaxed">
              我们的平台、用户界面、积分系统、客户支持和业务运营均由 Banana Pro AI 独立开发和管理。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">2. 技术集成模式</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI 作为独立创意平台，集成了多种 AI 技术。我们使用这些 API 并不构成与任何 API 提供商的合作伙伴关系、合资企业或官方背书。
            </p>
            <p className="text-white/70 leading-relaxed">
              所有 AI 技术均通过官方授权渠道接入，我们严格遵守各 API 提供商的使用条款和政策。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">3. 品牌独立性</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI 作为一个独特且独立的品牌运营：
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>我们的品牌标识、营销和业务运营均独立进行</li>
              <li>用户应将 Banana Pro AI 视为提供各种 AI 技术访问的独立创意平台，而不是任何特定 AI 提供商的官方渠道</li>
              <li>Banana Pro AI 的品牌、业务运营和客户关系与我们集成的 API 提供商是分离的</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">4. 商标声明</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              "Google"、"Veo"、"Veo 3"、"OpenAI"、"Sora"、"Sora 2"、"Nano Banana" 以及所有相关商标、徽标和品牌名称均为其各自所有者的专有财产。
            </p>
            <p className="text-white/70 leading-relaxed">
              这些名称出现在我们的网站上仅用于描述我们集成的底层技术和 API。它们的出现并不暗示或表明 Banana Pro AI 与这些商标所有者之间存在任何商业合作伙伴关系、官方背书、授权、合资企业或附属关系。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">5. 用户理解</h2>
            <p className="text-white/70 leading-relaxed mb-4">用户应理解：</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>Banana Pro AI 是一个独立平台，通过官方 API 提供对多种 AI 技术的访问</li>
              <li>使用 Banana Pro AI 意味着通过我们独立开发的平台基础设施访问第三方 AI 技术</li>
              <li>Banana Pro AI 的品牌、业务运营和客户关系与我们集成的 API 提供商是分离的</li>
              <li>任何问题、疑虑或支持请求应直接联系 Banana Pro AI，而不是底层 API 提供商</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">6. 联系信息</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              如有关于本免责声明或我们服务的问题、疑虑或需要澄清，请通过以下方式联系我们：
            </p>
            <p className="text-white/60 mb-4">
              公司：WhaleSwing LLC<br />
              地址：30 N GOULD ST, STE N, SHERIDAN, WY 82801<br />
              网站：banana2ai.net
            </p>
            <p className="text-white/60 text-sm">
              我们保留定期更新本免责声明以反映服务集成或业务模式变化的权利。我们鼓励用户定期查看本页面以了解任何变化。
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
