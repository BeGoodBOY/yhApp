<template>
  <div class="home-box">
    <MHeader @lClick="goBack" />
    <div ref="scroller" class="debt-box" v-show="list.length>0">
      <ul>
        <li class="li-box" v-for="(item,index) in list" :key="index">
          <div :class="classActive ==true ? 'active d-show-box' : 'd-show-box' ">
            <div class="show-content">
              <!-- <p class="show-name">{{item.strCreditName}}</p> -->
              <p class="show-money">欠款总额<span class="money-red">{{formatMoney(item.lTotalAmount/100)}}元</span></p>
            </div>
            <span class="icon" @click="showALLData(1)"></span>
          </div>
          <ul v-for="(cItem,idx) in item.cdosCreditDebt" :key="idx" :class="classActive ==true ? 'active detail-show' : 'detail-show' ">
            <li>
              <div class="show-left">
                <span class="text">借款本金</span>
                <span class="count">{{formatMoney(cItem.lBorrowIntentPrincipal/100)}}元</span>
              </div>
              <div class="show-right">
                <span class="text">逾期</span>
                <span class="count">{{cItem.nOverdueDay}}天</span>
              </div>
            </li>
            <li>
              <div class="show-left">
                <span class="text">逾期本金</span>
                <span class="count">{{formatMoney(cItem.lRefundPrincipal/100)}}元</span>
              </div>
              <div class="show-right">
                <span class="text">借款时间</span>
                <span class="count">{{cItem.strBorrowDate}}</span>
              </div>
            </li>
            <li>
              <div class="show-left">
                <span class="text">逾期利息</span>
                <span class="count">{{formatMoney(cItem.lRefundInterest/100)}}元</span>
              </div>
              <div class="show-right">
                <span class="text">应还日期</span>
                <span class="count">{{cItem.strRefundDate}}</span>
              </div>
            </li>
            <li>
              <div class="show-left">
                <span class="text">出库时间</span>
                <span class="count">{{cItem.dtEntrustExpireDate}}</span>
              </div>
              <div class="show-right">
                <span class="text">资金方</span>
                <span class="count">{{cItem.strFundsProvider}}</span>
              </div>
            </li>
            <li>
              <div class="show-left">
                <span class="text">线下还款</span>
                <span class="count ts-stle">{{cItem.nIsSupportLinePayment==0?'不支持': '支持'}}、{{cItem.nIsPartPayment==0?'不支持部分还款': '支持部分还款'}}</span>
              </div>
              <div class="show-right">
                <span class="text">任务编号</span>
                <span class="count ts-stle">{{cItem.strBorrowIntentId}}</span>
              </div>
            </li>
            <li>
              <div class="show-left">
                <span class="text">转分期</span>
                <span class="count">{{cItem.nIsInstalment == 0 ? '不支持' : '支持'}}</span>
              </div>
            </li>
          </ul>
        </li> 
      </ul>
    </div>
    <van-loading size="0.4rem" text-size="0.3rem" v-if="showflag"  class="v-load">加载中...</van-loading>
    <div class="no-data" v-show="list.length==0 && !showflag ">暂无记录~</div>
  </div>
</template>
<script>
import { getDebtData } from "@/api/getDetailData.js";
import MHeader from "@/components/header";
import { formatMoney } from '@/config/utils'
import { loading } from 'vant'
export default {
  data() {
    return {
      classActive: false,
      list: [],
      showflag:true,
      scroller: null
    };
  },
  created() {
    this.hadleGetDebtData();
    //console.log(this.$route.query)
  },
  mounted() {
  },
  methods: {
    async hadleGetDebtData(NoId) {
      let options = {
        NoId: this.$route.query.NoId,
      };
      const res = await getDebtData(options);
      if(res.nCode ==0){
        this.showflag = false
      }
      this.list = res.cdosData;
    },
    showALLData(k) {
      //上拉箭头切换
      this.classActive = !this.classActive;
      // this.$nextTick(() => {
      //   this.scroller.refresh();
      // })
    },
    goBack() {
      this.$router.go(-1);
    },
    formatMoney(value) {
      return formatMoney(value);
    }
  },
  components: {
    MHeader,
    'vanLoading':loading
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/mixin.scss";
.home-box {
  @include flex();
  flex-direction: column;
  width: 100%;
  & > div {
    width: 100%;
  }
  & > div:nth-child(2) {
    flex: 1;
  }
}
.v-load{
  margin-top:0.3rem
}
.no-data{
  padding:0.3rem;
  font-size:0.32rem;
}
.debt-box {
  background: #f7f7f7;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .li-box {
    background: #fff;
    text-align: left;
    border-bottom: 0.01rem solid #e2e2e2;
    &:last-child {
      border: none;
    }
  }
  .d-show-box {
    display: flex;
    padding: 0.3rem;
    &.active {
      border-bottom: 0.01rem solid #e2e2e2;
      .icon {
        transform: rotate(135deg);
      }
    }
    align-items: center;
    .show-content {
      flex: 1;
      .show-name {
        font-size: 0.32rem;
        padding-bottom: 0.4rem;
      }
      .show-money {
        font-size: 0.32rem;
        color: #999;
        .money-red {
          color: #f00;
          padding-left: 0.2rem;
        }
      }
    }
    .icon {
      width: 0.18rem;
      height: 0.18rem;
      border-top: 0.02rem solid #999;
      border-right: 0.02rem solid #999;
      transform: rotate(-45deg);
      transition: transform 0.25s linear;
    }
  }
  .detail-show {
    padding: 0.3rem 0.3rem 0 0.3rem;
    display: none;
    border-bottom: 1px solid #eee;
    &.active {
      display: block;
    }
    li {
      padding-bottom: 0.4rem;
      display: flex;
      align-items: center;
      font-size: 0.32rem;
      .show-left {
        width: 50%;
      }
      .show-right {
        width: 50%;
        padding-left: 0.15rem;
        box-sizing: border-box;
      }
      .text {
        color: #999;
        text-align: left;
        width: 50%;
        display: inline-block;
        vertical-align: top;
      }
      .count {
        text-align: left;
        width: 50%;
        display: inline-block;
        vertical-align: top;
        word-break: break-all;
      }
      .ts-stle {
        line-height: 0.46rem;
        margin-top: -0.06rem;
      }
    }
  }
}
</style>