<template>
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div class="himself-box">
      <div class="tel-box">
        <ul>
          <li>
            <span class="s-tel">可展期目标还款金额(元): </span>
            <a>{{ lCommissionAmount }}</a>
          </li>
          <li>
            <span class="s-tel">已回款目标金额(元): </span>
            <a>{{ lRefundTotal }}</a>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>
<script>
import { getTargetInfo } from '@/api/getDetailData.js'
import MHeader from '@/components/header'
import { formatMoney } from '@/config/utils';
export default {
  data(){
    return {
      list:[],
      lCommissionAmount: '',
      lRefundTotal: '',
    }
  },
  created(){
    this.getTargetInfo();
  },
  methods:{
    async getTargetInfo () {
      let options ={
        lDebtPoolId: this.$route.query.id
      }
      const res = await getTargetInfo(options)
      if(!res) return;
      this.lCommissionAmount = formatMoney(res.lCommissionAmount/100)
      this.lRefundTotal = formatMoney(res.lRefundTotal/100)
    },
    goBack(){
      this.$router.go(-1)
    },
  },
  beforeCreate() {
    // document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  components:{
    MHeader
  }
}
</script>
<style lang="scss" scoped>
  .himself-box{
    margin-top:0.2rem;
    .d-msg{
        padding:0.2rem 0.3rem;
        text-align:left;
        border-bottom:0.01rem solid #e2e2e2;
      }
    .tel-box{
      background:#fff;
      font-size:0.32rem;
      li{
        display:flex;
        justify-content: space-between;
        padding: 0.3rem;
        font-size:0.32rem;
        text-align:left;
        .s-tel{
          // width:1.8rem;
          text-align:left;
          color:#999;
        }
        a{
          color:#09f;
        }
      }
    }
   
  }
</style>