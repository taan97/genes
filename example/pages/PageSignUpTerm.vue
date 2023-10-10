<template>
  <BaseHeader />

  <div class="p-5 border-t border-black-v-4">
    <template v-if="$i18n.locale === 'en'">
      <p class="py-3 text-yellow-v-1 text-size-5 font-bold">
        {{ $t('PageSignUpTerm.Title') }}
      </p>
      <p class="pb-3">{{ content.en.AnyInvestmentDecision }}</p>
      <p class="pb-3">
        <span class="text-yellow-v-1">
          {{ content.en.YourInvestmentDecision }}
        </span>
        :
        {{ content.en.YourInvestmentDecisionContent }}
      </p>

      <p class="pb-3">
        <span class="text-yellow-v-1">
          {{ content.en.VolatilityOfInvestments }}
        </span>
        :
        {{ content.en.VolatilityOfInvestmentsContent }}
      </p>

      <p class="pb-3">
        {{ content.en.AtTheDiscretionOfNordlys }}
      </p>

      <p class="pt-3 text-yellow-v-1 font-bold">
        {{ content.en.SubTitle }}
      </p>
      <ul class="list-disc px-5">
        <li
          v-for="message in content.en.subContent"
          :key="message"
          class="py-1.5"
        >
          {{ message }}
        </li>
      </ul>

      <p
        v-for="message in content.en.Footer"
        :key="message"
        class="py-1.5"
      >
        {{ message }}
      </p>
    </template>

    <template v-else>
      <p class="py-3 text-yellow-v-1 text-size-5 font-bold">
        {{ $t('PageSignUpTerm.Title') }}
      </p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <p v-html="content.zh.content"></p>
    </template>
  </div>
</template>

<script setup>
const content = {
  en: {
    AnyInvestmentDecision:
      'This document is for informational purposes only and is not independent research.',
    YourInvestmentDecision: 'Your investment decision',
    YourInvestmentDecisionContent:
      'Any investment decision by you should not be made based solely on the information contained in this document. The mere provision of this document for general informational purposes does not constitute an offer, recommendation or solicitation by Nordlys Investments Pty Ltd to you. It is desirable that you seek independent financial advice with respect to any investment in the funds referred to in this document.',
    VolatilityOfInvestments: 'Volatility of investments',
    VolatilityOfInvestmentsContent:
      'This document does not constitute a prediction of the likely future movements in rates or prices or any representation that such future movements will exceed those shown in this document. Investors may be exposed to exchange rate fluctuations which may cause the value of investments to go up or down. The value and income of your investment can fall as well as rise and you may get back less than invested.',
    AtTheDiscretionOfNordlys:
      'At the discretion of Nordlys Investments Pty Ltd, investors are allowed to withdraw their funds with an 5% handling fee, minimum withdrawal amount $50 USD and will reach investors’ account within 24 hours.',
    SubTitle: 'Risk Disclosure',
    subContent: [
      'Derivatives may be used by the Fund, and these can   behave unexpectedly. The pricing and volatility of many   derivatives may diverge from strictly reflecting the pricing or volatility of their underlying reference(s), instrument or asset.',
      'Investment Leverage occurs when the economic exposure is greater than the amount invested, such as when derivatives are used. A Fund that employs leverage may experience greater gains and/or losses due to the amplification effect from a movement in the price of the reference source',
      'Investment involves risk. Past performance figures shown are not indicative of future performance. Investors should read the prospectus (including the risk warnings) and the product highlights sheets, before investing. Daily price change percentage is based on bid-bid price.'
    ],
    Footer: [
      'Copyright Nordlys Investments Pty Ltd Limited 2022.',
      'Copyright in all materials, text, articles and information contained herein is the property of, and may only be reproduced, redistributed or forwarded with permission of an authorised signatory of Nordlys.',
      '©2022 Nordlys Investments Pty Ltd., all rights reserved.'
    ]
  },
  zh: {
    content:
      '有关基金应负担之费用已揭露于基金之公开说明书或投资人须知中，投资人可至公开信息观测站或官网查询。 <br><br>汇率走势亦可能影响所投资之海外资产价值变动。本基金得进行换汇或远期外汇等汇率避险交易，惟该等交易将增加基金运作成本，进而影响基金之报酬率。<br><br>本基金经澳大利亚证券投资委员会（ASIC）监管会核准，惟不表示绝无风险。 由于高收益债券之信用评等未达投资等级或未经信用评级，且对利率变动的敏感度甚高，故本基金可能会因利率上升、市场流动性下降，或债券发行机构违约不支付本金、利息而蒙受亏损。<br><br>本基金不适合无法承担相关风险之投资人。 基金经理公司以往之经理绩效不保证基金最低投资收益; 基金经理公司除尽善良管理人之注意义务外，不负责基金之盈亏，亦不保证最低之收益，投资人申购前应详阅基金公开说明书及投资人须知。<br><br>投资人应注意基金投资之风险包括汇率风险、利率风险、债券交易市场流动性不足之风险及投资无担保公司债之风险; 基金或有因利率变动、债券交易市场流动性不足及定期存单提前解约而影响基金净值下跌之风险，同时或有受益人大量赎回时，致延迟给付赎回价款之可能。 基金配息率不代表基金报酬率，且过去配息率不代表未来配息率; 基金净值可能因市场因素而上下波动。<br><br>本基金的配息可能由基金的收益或本金中支付，任何涉及由本金支出的部份，可能導致原始投资金额减损; 本基金进行配息前或未先扣除行政管理相关费用，各级别配息规定请详见公开说明书。<br><br>诺得利资产管理公司酌情允许投资人每天申请提现，收取5%手续费，最低提现金额为$50美元，24小时内到账。<br><br>基金配息率不等于基金报酬率，投资人获配息时，宜一并注意基金净值之变动。 投资人仍应注意所投资基金个别的风险。<br><br>本基金实施公平价格调整机制与反稀释机制，详请参见公开说明书与投资人须知一般资讯。<br><br>版权 2022诺得利资产管理公司版权所有。 所有在此包含之材料、文字、文章及资料为诺得利资产管理公司之财产，除非以诺得利资产管理公司之名义作业务用途，或得到授权签署人之书面认可，否则不得复制或使用。<br><br>©2022诺得利资产管理公司，保留所有权利'
  }
}
</script>

<style scoped></style>
