import { getLocale } from 'next-intl/server';
export default async function RefundPolicyPage() {
  const isZh = (await getLocale()) === 'zh';
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI {isZh ? '退款政策' : 'Refund Policy'}
        </h1>
        <p className="text-white/40 text-sm mb-10">{isZh ? '最后更新：2026年1月' : 'Last updated: January 2026'}</p>

        <div className="space-y-8">
          <div className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <p className="text-white/70 leading-relaxed">
              {isZh ? '欢迎来到 Banana Pro AI（也称为"公司"、"我们"）！我们重视每一位客户，致力于提供高品质的 AI 创意服务。本退款政策概述了通过我们平台购买的服务的退款资格和流程。' : 'Welcome to Banana Pro AI (also referred to as the company or we)! We value every customer and are committed to providing high-quality AI creative services. This refund policy outlines the eligibility and process for refunds for services purchased through our platform.'}
            </p>
          </div>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '简介' : 'Introduction'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们的退款政策旨在保护用户权益，同时维护平台的可持续运营。请在购买前仔细阅读本政策。' : 'Our refund policy aims to protect user rights while maintaining the sustainable operation of the platform. Please read this policy carefully before making a purchase.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '积分制服务模式' : 'Credit-based Service Model'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI {isZh ? '采用积分制服务模式。用户购买积分包后，使用积分来访问 AI 图像和视频生成功能。每次生成任务会消耗相应数量的积分。' : 'Uses a credit-based service model. After users purchase credit packages, they use credits to access AI image and video generation features. Each generation task consumes a corresponding number of credits.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '退款资格' : 'Refund Eligibility'}</h2>
            <h3 className="text-white font-semibold mb-3">{isZh ? '符合退款条件' : 'Conditions for Refund'}</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              {isZh ? '如果满足以下条件，您可能有资格获得退款：' : 'You may be eligible for a refund if the following conditions are met:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 mb-6">
              <li>{isZh ? '在购买后7天内提出申请' : 'Application submitted within 7 days of purchase'}</li>
              <li>{isZh ? '尚未使用大量积分（未使用的积分比例超过80%）' : 'A significant amount of credits remains unused (unused credit ratio exceeds 80%)'}</li>
              <li>{isZh ? '能够提供有效的购买凭证' : 'Able to provide valid proof of purchase'}</li>
              <li>{isZh ? '技术问题导致服务不可用且我们无法在合理时间内解决' : 'Technical issues render the service unavailable and we are unable to resolve them within a reasonable timeframe'}</li>
            </ul>

            <h3 className="text-white font-semibold mb-3">{isZh ? '不予退款的情况' : 'Situations Not Eligible for Refund'}</h3>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>{isZh ? '积分已被大量使用' : 'Credits have been largely used'}</li>
              <li>{isZh ? '违反服务条款导致账户被终止' : 'Account termination due to violation of service terms'}</li>
              <li>{isZh ? '购买超过30天' : 'Purchase made over 30 days ago'}</li>
              <li>{isZh ? '对生成结果不满意（AI生成结果具有不可预测性，不构成退款理由）' : 'Dissatisfaction with generated results (AI generated results are unpredictable and do not constitute a reason for refund)'}</li>
              <li>{isZh ? '因用户操作失误导致的问题' : 'Issues caused by user operational errors'}</li>
            </ul>

            <h3 className="text-white font-semibold mb-3 mt-4">{isZh ? '退款计算' : 'Refund Calculation'}</h3>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '退款金额将根据未使用的积分比例计算，扣除相应的服务费用后退还。具体金额将在审核过程中确定并通知您。' : 'The refund amount will be calculated based on the proportion of unused credits, minus applicable service fees. The specific amount will be determined during the review process and communicated to you.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '如何申请退款' : 'How to Apply for a Refund'}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{isZh ? '请按照以下步骤提交退款申请：' : 'Please follow these steps to submit a refund request:'}</p>
            <ol className="list-decimal list-inside space-y-2 text-white/70">
              <li>{isZh ? '发送邮件至我们的客服邮箱' : 'Send an email to our customer service email address'}</li>
              <li>{isZh ? '在邮件中提供与您账户关联的电子邮件地址' : 'Provide the email address associated with your account in the email'}</li>
              <li>{isZh ? '提供您的订单或交易 ID（如有）' : 'Provide your order or transaction ID (if applicable)'}</li>
              <li>{isZh ? '说明购买日期' : 'Explain purchase date'}</li>
              <li>{isZh ? '详细说明退款原因' : 'Detail reason for refund'}</li>
            </ol>
            <p className="text-white/60 text-sm mt-4">
              {isZh ? '我们的客服团队将在3个工作日内回复您的申请。' : 'Our customer service team will respond to your application within 3 business days.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '退款处理' : 'Refund processing'}</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>{isZh ? '一旦批准，退款将通过原支付方式退回' : 'Once approved, the refund will be returned via the original payment method'}</li>
              <li>{isZh ? '退款到账可能需要5-10个工作日，具体取决于您的银行或支付平台' : 'Refunds may take 5-10 business days to appear, depending on your bank or payment platform'}</li>
              <li>{isZh ? '我们将通过电子邮件通知您退款状态' : 'We will notify you of the refund status via email'}</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '任务失败的积分退还' : 'Credit refund for failed tasks'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '如果 AI 生成任务因系统错误（非用户输入导致）而失败，该任务消耗的积分将自动退还至您的账户。积分退还通常在任务失败后24小时内完成。' : 'If an AI generation task fails due to a system error (not caused by user input), the credits consumed by that task will be automatically refunded to your account. Credit refunds are usually completed within 24 hours after the task failure.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '政策变更' : 'Policy changes'}</h2>
            <p className="text-white/70 leading-relaxed">
              {isZh ? '我们保留随时更新或修改本退款政策的权利。任何变更将发布在此页面上，并附上修订后的生效日期。我们建议您定期查看此页面。' : 'We reserve the right to update or modify this refund policy at any time. Any changes will be posted on this page with a revised effective date. We recommend you review this page periodically.'}
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">{isZh ? '联系我们' : 'Contact us'}</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              {isZh ? '如果您对本退款政策有任何疑问或顾虑，请通过以下方式联系我们：' : 'If you have any questions or concerns about this refund policy, please contact us via:'}
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
  title: '退款政策 - Banana Pro AI',
  description: 'Banana Pro AI 退款政策 - 了解我们的退款流程和资格要求。',
};
