<template>
  <li class="list-item">
    <h3 class="item-header">
      {{ order.strName }}
      <span>出库倒计时：{{ caculateDay(order.dtEntrustExpireDate) }}天</span>
    </h3>
    <div class="item-body">
      <div class="item-money">
        <div class="money-val">{{ formatMoney(order.lShowShouldRefundTotal/100) }}元</div>
        <div class="money-key">欠款金额</div>
      </div>
      <div class="item-day">
        <div class="day-val">{{ order.nCustomerCurrentMaxOverdueDay }}天</div>
        <div class="day-key">逾期天数</div>
      </div>
      <span class="btn-order" @click="grabOrder">抢单</span>
    </div>
    <div class="item-footer">
      <div class="footer-l">
        <span class="address-key">{{ getAdressTit(order.nAddressType) }}：</span>
        <span class="address-val">{{ order.strAddress }}</span>
      </div>
      <div class="footer-r">{{ order.strDistance }}km</div>
    </div>
  </li>
</template>

<script>
import { formatMoney } from '@/config/utils';
export default {
  name: "listItem",
  props: {
    order: {
      type: Object,
      require: true
    }
  },
  methods: {
    grabOrder() {
      this.$emit('grab', this.order)
    },
    getAdressTit(index) {
      // 地址类型(0:身份证地址，1：现住地地址，2：工作单位地址)
      return  ['身份证地址','现住地地址','工作单位地址'][index] || '地址'
    },
    formatMoney(value) {
      return formatMoney(value);
    },
    caculateDay(value) {
      let outTime = new Date(value).getTime();
      let nowTime = Date.now();
      return Math.ceil((outTime - nowTime)/24/60/60/1000);
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
@import "@/style/mixin.scss";
.list-item {
  margin-bottom: 0.2rem;
  padding-left: 0.3rem;
  text-align: left;
  background: #fff;
  .item-header {
    padding: 0.3rem 0 0.4rem;
    font-size: 0.32rem;
    color: #000;
    span {
      float: right;
      padding-right: 0.3rem;
      font-size: 0.28rem;
    }
  }
  .item-body {
    @include flex(space-between, center);
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #e6e6e6;
    .money-val {
      font-size: 0.36rem;
      color: #e35756;
      font-weight: bolder;
    }
    .money-key,
    .day-key {
      margin-top: 0.2rem;
      font-size: 0.24rem;
      color: #999;
    }
    .day-val {
      font-size: 0.34rem;
      color: #000;
      line-height: 0.36rem;
    }
    .btn-order {
      width: 1.6rem;
      // height: 0.74rem;
      margin-right: 0.3rem;
      font-size: 0.3rem;
      color: $color;
      text-align: center;
      line-height: 0.74rem;
      border: 2px solid $color;
      border-radius: 1rem;
    }
  }
  .item-footer {
    @include flex(space-between, flex-start);
    padding: 0.32rem 0.3rem 0.32rem 0;
    .footer-l {
      @include flex(space-between, flex-start);
      font-size: 0.24rem;
      .address-key {
        white-space: nowrap;
      }
      .address-val {
        width: 3.68rem;
        margin-top: -0.1em;
        color: #999;
        line-height: 1.3em;
      }
    }
    .footer-r {
      font-size: 0.24rem;
    }
  }
}
</style>
