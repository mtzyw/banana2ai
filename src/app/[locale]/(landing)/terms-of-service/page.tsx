import { getLocale } from 'next-intl/server';
export default async function TermsOfServicePage() {
  const isZh = (await getLocale()) === 'zh';
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI {isZh ? '服务条款' : 'Terms of Service'}
        </h1>
        <p className="text-white/40 text-sm mb-10">{isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}</p>

        <div className="space-y-8">
          <div className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <p className="text-white/70 leading-relaxed">
              {isZh ? '欢迎使用 Banana Pro AI（也称为"公司"、"我们"或"我方"）！使用我们的网站，即表示您同意以下服务条款。请仔细阅读。' : 'Welcome to Banana Pro AI (also referred to as the Company, we, or us)! By using our website, you agree to the following terms of service. Please read them carefully.'}
            </p>
          </div>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '接受条款' : 'Acceptance of Terms'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '访问或使用 Banana Pro AI 即表示您同意受这些服务条款的约束。如果您不同意这些条款，请停止使用我们的服务。' : 'By accessing or using Banana Pro AI, you agree to be bound by these terms of service. If you do not agree to these terms, please stop using our services.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '年龄限制' : 'Age Restriction'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '您必须年满18周岁（或您所在司法管辖区的法定成年年龄，以较大者为准）方可使用我们的服务。访问或使用 Banana Pro AI 即表示您声明并保证您已达到此年龄要求。如果您未达到规定年龄，严禁使用我们的服务。我们保留随时要求提供年龄证明的权利，并有权终止违反此要求的账户。' : 'You must be at least 18 years of age (or the legal age of majority in your jurisdiction, whichever is greater) to use our services. By accessing or using Banana Pro AI, you represent and warrant that you meet this age requirement. If you do not meet the specified age, use of our services is strictly prohibited. We reserve the right to request proof of age at any time and to terminate accounts that violate this requirement.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '服务说明' : 'Service Description'}</h2>
            <p className="text-white/70 leading-relaxed">
              Banana Pro AI {isZh ? '提供基于人工智能的图像和视频生成服务。我们保留随时修改、暂停或终止服务的权利，恕不另行通知。' : 'We provide AI-powered image and video generation services. We reserve the right to modify, suspend, or terminate services at any time without prior notice.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '禁止用途' : 'Prohibited Uses'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '您同意不将 Banana Pro AI 用于以下任何目的：' : 'You agree not to use Banana Pro AI for any of the following purposes:'}</p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>{isZh ? '任何非法、欺诈或欺骗性活动' : 'Any illegal, fraudulent, or deceptive activities'}</li>
              <li>{isZh ? '生成、上传或传播描绘未成年人或儿童性剥削材料的内容' : 'Generating, uploading, or disseminating content depicting minors or child sexual exploitation material'}</li>
              <li>{isZh ? '创建宣扬暴力、恐怖主义或自残的内容' : 'Creating content that promotes violence, terrorism, or self-harm'}</li>
              <li>{isZh ? '制作未经同意的私密影像或针对真实个人的深度伪造色情内容' : 'Producing non-consensual intimate imagery or deepfake pornography targeting real individuals'}</li>
              <li>{isZh ? '侵犯知识产权，包括未经授权复制受版权保护的材料' : 'Infringing intellectual property rights, including unauthorized reproduction of copyrighted material'}</li>
              <li>{isZh ? '骚扰、跟踪、欺凌或威胁他人' : 'Harassing, stalking, bullying, or threatening others'}</li>
              <li>{isZh ? '试图未经授权访问我们的系统、网络或其他用户的账户' : 'Attempting unauthorized access to our systems, networks, or other user accounts'}</li>
              <li>{isZh ? '传播恶意软件、病毒或其他有害软件' : 'Distributing malware, viruses, or other harmful software'}</li>
              <li>{isZh ? '从事违反适用出口管制或制裁法律的活动' : 'Engaging in activities that violate applicable export control or sanctions laws'}</li>
              <li>{isZh ? '未经事先书面同意使用自动化系统（机器人、爬虫）访问我们的服务' : 'Using automated systems (bots, crawlers) to access our services without prior written consent'}</li>
              <li>{isZh ? '未经授权转售、再许可或再分发我们的服务' : 'Unauthorized resale, sublicense, or redistribution of our services'}</li>
              <li>{isZh ? '任何干扰、损害或削弱我们服务功能的活动' : 'Any activity that interferes with, damages, or impairs the functionality of our services'}</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">
              {isZh ? '违反上述禁止用途可能导致账户立即暂停或终止，恕不事先通知或退款。' : 'Violation of the above prohibited uses may result in immediate account suspension or termination, without prior notice or refund.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '内容限制与标准' : 'Content Restrictions and Standards'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              {isZh ? '通过 Banana Pro AI 生成、上传或分享的所有内容必须符合我们的内容标准。我们保留自行审查、删除或限制访问任何违反标准的内容的权利。反复或严重违规可能导致账户被永久终止。' : 'All content generated, uploaded, or shared through Banana Pro AI must comply with our content standards. We reserve the right to review, remove, or restrict access to any content that violates these standards at our sole discretion. Repeated or severe violations may result in permanent account termination.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '内容安全政策' : 'Content Safety Policy'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI {isZh ? '致力于维护一个安全、专业的平台。我们采用多层技术和运营措施来防止生成、上传或传播成人/NSFW 内容：' : 'We are committed to maintaining a safe and professional platform. We employ multi-layered technical and operational measures to prevent the generation, upload, or dissemination of adult/NSFW content:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>{isZh ? '自动检测系统：实时扫描和过滤违规内容' : 'Automated Detection System: Real-time scanning and filtering of violating content'}</li>
              <li>{isZh ? '人工审核与举报机制' : 'Manual Review and Reporting Mechanism'}</li>
              <li>{isZh ? '持续更新的关键词黑名单' : 'Continuously Updated Keyword Blacklist'}</li>
              <li>AI {isZh ? '安全扫描模型' : 'Safety Scanning Model'}</li>
            </ul>
            <p className="text-white/60 text-sm mt-4">
              {isZh ? '我们定期更新检测算法，以应对不断演变的内容安全规避手段。我们对平台安全的承诺是持续而坚定的。' : 'We regularly update our detection algorithms to counter evolving content safety evasion methods. Our commitment to platform security is continuous and firm.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '用户数据收集' : 'User Data Collection'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '我们收集以下用户数据：' : 'We collect the following user data:'}</p>
            <ul className="list-disc list-inside space-y-1 text-white/70 mb-4">
              <li>{isZh ? '姓名' : 'Name'}</li>
              <li>{isZh ? '电子邮箱' : 'Email Address'}</li>
              <li>{isZh ? '支付信息' : 'Payment Information'}</li>
            </ul>
            <p className="text-white/70 leading-relaxed">{isZh ? '我们还通过网络 Cookie 收集非个人数据。' : 'We also collect non-personal data through web cookies.'}</p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '信息使用' : 'Information Use'}</h2>
            <p className="text-white/70 leading-relaxed">{isZh ? '收集的信息用于订单处理和改进我们的服务。' : 'Collected information is used for order processing and improving our services.'}</p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '数据共享' : 'Data Sharing'}</h2>
            <p className="text-white/70 leading-relaxed">{isZh ? '我们不会与任何其他方共享您的个人数据。' : 'We will not share your personal data with any other party.'}</p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '适用法律' : 'Applicable Law'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '本条款受美国法律管辖。任何争议应提交至美国法院解决。' : 'These terms are governed by US law. Any disputes shall be submitted to US courts for resolution.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '条款更新' : 'Terms Updates'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们可能会不时更新这些服务条款。任何变更将通过电子邮件通知用户，并在我们的网站上发布。继续使用服务即表示接受更新后的条款。' : 'We may update these service terms from time to time. Any changes will be notified to users via email and posted on our website. Continued use of the services constitutes acceptance of the updated terms.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '联系信息' : 'Contact Information'}</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              {isZh ? '如对这些条款有任何疑问，请通过以下方式联系我们：' : 'If you have any questions about these terms, please contact us via:'}
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
  title: '服务条款 - Banana Pro AI',
  description: 'Banana Pro AI 服务条款 - 了解使用我们服务的规则和条件。',
};
