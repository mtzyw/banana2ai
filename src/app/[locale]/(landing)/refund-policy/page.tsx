export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#ffcc33] to-[#ff9f43] bg-clip-text text-transparent">
          Banana Pro AI 退款政策
        </h1>
        <p className="text-white/40 text-sm mb-10">最后更新：2026年1月</p>

        <div className="space-y-8">
          <div className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <p className="text-white/70 leading-relaxed">
              欢迎来到 Banana Pro AI（也称为"公司"、"我们"）！我们重视每一位客户，致力于提供高品质的 AI 创意服务。本退款政策概述了通过我们平台购买的服务的退款资格和流程。
            </p>
          </div>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">简介</h2>
            <p className="text-white/70 leading-relaxed">
              我们的退款政策旨在保护用户权益，同时维护平台的可持续运营。请在购买前仔细阅读本政策。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">积分制服务模式</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Banana Pro AI 采用积分制服务模式。用户购买积分包后，使用积分来访问 AI 图像和视频生成功能。每次生成任务会消耗相应数量的积分。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">退款资格</h2>
            <h3 className="text-white font-semibold mb-3">符合退款条件</h3>
            <p className="text-white/70 leading-relaxed mb-4">
              如果满足以下条件，您可能有资格获得退款：
            </p>
            <ul className="list-disc list-inside space-y-2 text-white/70 mb-6">
              <li>在购买后7天内提出申请</li>
              <li>尚未使用大量积分（未使用的积分比例超过80%）</li>
              <li>能够提供有效的购买凭证</li>
              <li>技术问题导致服务不可用且我们无法在合理时间内解决</li>
            </ul>

            <h3 className="text-white font-semibold mb-3">不予退款的情况</h3>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>积分已被大量使用</li>
              <li>违反服务条款导致账户被终止</li>
              <li>购买超过30天</li>
              <li>对生成结果不满意（AI生成结果具有不可预测性，不构成退款理由）</li>
              <li>因用户操作失误导致的问题</li>
            </ul>

            <h3 className="text-white font-semibold mb-3 mt-4">退款计算</h3>
            <p className="text-white/70 leading-relaxed">
              退款金额将根据未使用的积分比例计算，扣除相应的服务费用后退还。具体金额将在审核过程中确定并通知您。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">如何申请退款</h2>
            <p className="text-white/70 leading-relaxed mb-4">请按照以下步骤提交退款申请：</p>
            <ol className="list-decimal list-inside space-y-2 text-white/70">
              <li>发送邮件至我们的客服邮箱</li>
              <li>在邮件中提供与您账户关联的电子邮件地址</li>
              <li>提供您的订单或交易 ID（如有）</li>
              <li>说明购买日期</li>
              <li>详细说明退款原因</li>
            </ol>
            <p className="text-white/60 text-sm mt-4">
              我们的客服团队将在3个工作日内回复您的申请。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">退款处理</h2>
            <ul className="list-disc list-inside space-y-2 text-white/70">
              <li>一旦批准，退款将通过原支付方式退回</li>
              <li>退款到账可能需要5-10个工作日，具体取决于您的银行或支付平台</li>
              <li>我们将通过电子邮件通知您退款状态</li>
            </ul>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">任务失败的积分退还</h2>
            <p className="text-white/70 leading-relaxed">
              如果 AI 生成任务因系统错误（非用户输入导致）而失败，该任务消耗的积分将自动退还至您的账户。积分退还通常在任务失败后24小时内完成。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">政策变更</h2>
            <p className="text-white/70 leading-relaxed">
              我们保留随时更新或修改本退款政策的权利。任何变更将发布在此页面上，并附上修订后的生效日期。我们建议您定期查看此页面。
            </p>
          </section>

          <section className="bg-[#13151f] border border-[#363b4e] rounded-xl p-6">
            <h2 className="text-xl font-bold text-[#ffcc33] mb-4">联系我们</h2>
            <p className="text-white/70 leading-relaxed mb-2">
              如果您对本退款政策有任何疑问或顾虑，请通过以下方式联系我们：
            </p>
            <p className="text-white/60">
              公司：WhaleSwing LLC<br />
              地址：30 N GOULD ST, STE N, SHERIDAN, WY 82801<br />
              网站：banana2ai.net
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
