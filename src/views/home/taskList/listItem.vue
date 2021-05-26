<template>
  <li class="list-item" @click="goDetail(order.lDebtorId, order.lId, orderType)">
    <span class="item-status">
      <template v-if="orderType ===2">
        {{applyStatusOb[order.nStatus]}}
      </template>
      <template v-else>
        {{ order.strProgressDescribe }}
      </template>
    </span>
    <h3 class="item-header">{{ order.strDebtorName }}</h3>
    <div class="item-body">
      <div class="item-money">
        <div class="money-val">{{ formatMoney(order.lTotalAmount/100) }}元</div>
        <div class="money-key">欠款金额</div>
      </div>
      <div class="item-day">
        <div class="day-val">{{ order.nMaxOverdueDay }}天</div>
        <div class="day-key">逾期天数</div>
      </div>
      <div v-if="orderType!==2" class="item-day">
        <div class="day-val">{{ order.nCountDownDay }}天</div>
        <div class="day-key">倒计时</div>
      </div>
      <div v-else class="item-day">
        <div class="day-val">{{ order.nOutboundDay }}天</div>
        <div class="day-key">出库倒计时</div>
      </div>
    </div>
    <div class="item-footer">
      <div class="footer-l">
        <span class="address-key">{{ adressType[order.nAddressType] }}:</span>
        <span class="address-val">{{ order.strAddress }}</span>
      </div>
    </div>
    <div v-if="orderType===2" class="btm-supply">
      <span class="btm-supply-btn" @click.stop="cancelCase(order.lId)">撤回案件</span>
    </div>
    <div v-if="orderType!==2" class="item-tip">出库倒计时：{{ order.nOutboundDay }}天</div>
    <div class="item-btm" v-if="orderType!==2">
      <template v-if="order.nIsFollow===0">
        <span @click.stop="goFollow(order.lId)" class="btm-item">未关注</span>
      </template>
      <template v-else>
        <span @click.stop class="btm-item btm-item-gray">已关注</span>
      </template>
      <span class="btm-item" @click.stop="$emit('mobile', order.lDebtorId)">打电话</span>
      <span class="btm-item" @click.stop="goInputReminder(order.lDebtorId, order.strDebtorName, order.lId)">写催记</span>
    </div>
  </li>
</template>

<script>
import { formatMoney } from '@/config/utils';
import { adressType, applyStatusOb } from '@/api/base';

export default {
  name: "listItem",
  props: {
    order: {
      type: Object,
      require: true
    },
    // 任务但类型：申请案件:2做特殊处理
    orderType: {
      type: Number
    }
  },
  data() {
    return {
      adressType,
      applyStatusOb
    }
  },
  mounted() {
  },
  methods: {
    goInputReminder(id, name, lEntrustId) {
      this.$router.push({
        path: "/tasklist/taskdetail/input_reminder",
        query: {
          lDebtorId: id,
          strDebtorName: name,
          lEntrustId: lEntrustId 
        }
      });
    },
    goDetail(id, lEntrustId, nStatus) {
      if(nStatus === 2) {
        return;
      }
      this.$router.push({
        name: "TaskDetail",
        query: {
          lDebtorId: id,
          lEntrustId: lEntrustId
        }
      });
    },
    goFollow(lId) {
      this.$emit('follow', {lId});
    },
    cancelCase(lId) {
      this.$emit('cancelCase', {lId});
    },
    getStatus(nStatus) {
      return {
        0:'未委托',
        1:'已委托',
        2:'已完成'
      }[nStatus]
    },
    formatMoney(value) {
      return formatMoney(value)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
@import "@/style/var.scss";
.list-item {
  position: relative;
  margin-bottom: 0.2rem;
  padding-left: 0.3rem;
  text-align: left;
  background: #fff;
  &:last-child {
    margin-bottom: 0;
  }
  .item-status {
    position: absolute;
    right: 0;
    top: 0.3rem;
    padding: 0 0.1rem;
    font-size: 0.18rem;
    color: #fff;
    line-height: 0.36rem;
    background: #6bbef9;
  }
  .item-header {
    display: inline-block;
    padding: 0.3rem 0 0.4rem;
    font-size: 0.3rem;
    color: #000;
  }
  .item-body {
    @include flex(space-between, center);
    padding-right: 0.3rem;
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
  }
  .item-footer {
    @include flex(space-between, flex-start);
    padding: 0.3rem 0.3rem 0.2rem 0;
    .footer-l {
      @include flex(space-between, flex-start);
      font-size: 0.24rem;
      .address-key {
        white-space: nowrap;
      }
      .address-val {
        width: 3.68rem;
        margin-left: 0.1rem;
        margin-top: -0.1em;
        color: #999;
        line-height: 1.3em;
        white-space: nowrap;
      }
    }
    .footer-r {
      font-size: 0.24rem;
    }
  }
  .btm-supply {
    padding: 0 0.3rem 0.3rem;
    // padding-right: 0.3rem;
    text-align: right;
    .btm-supply-btn {
      display: inline-block;
      padding: 0.1rem 0.2rem;
      font-size: 0.3rem;
      color: $color;
      border: 1px solid $color;
      border-radius: 0.24rem;
    }
  }
  .item-tip {
    display: inline-block;
    padding: 0 0 0.32rem;
    font-size: 0.24rem;
  }
  .item-btm {
    @include flex();
    margin-left: -0.3rem;
    box-shadow: 0 0 10px 0 rgba(111,111,111,0.3);
    .btm-item {
      width: 33.33%;
      font-size: 0.32rem;
      color: #000;
      text-align: center;
      line-height: 0.94rem;
      &+.btm-item {
        border-left: 1px solid #efefef;
      }
      &.btm-item-gray {
        color: #999;
      }
    }
  }
}
</style>
