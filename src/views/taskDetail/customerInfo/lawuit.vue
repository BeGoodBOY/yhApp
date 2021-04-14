<template lang="">
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div class="social-box" v-if="listItem">
      <ul v-for="(item,index) in listItem.cdoData" :key="index">
        <li>
          <span class="text">执行案号</span>
          <span class="content">{{item.strCaseNo}}</span>
        </li>
        <li>
          <span class="text">法院名称</span>
          <span class="content">{{item.strCourtName}}</span>
        </li>
        <li>
          <span class="text">执行法院金额(分)</span>
          <span class="content">{{formatMoney(item.strExecuteAmount/100)}}</span>
        </li>
        <li>
          <span class="text">案件对接人</span>
          <span class="content">{{item.strDockerName}}</span>
        </li>
         <li>
          <span class="text">案件对接人电话</span>
          <span class="content">{{item.strDockerPhone}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
import { getlawuitMsg } from '@/api/getDetailData'
import { outputmoney } from '@/config/common'
import { formatMoney } from '@/config/utils'
export default {
  props:{

  },
  data(){
    return{
      listItem:null
    }
  },
  created(){
    this.handleLawuitFuc()
  },
  methods:{
    async handleLawuitFuc(){
      let options ={
        lDebtorId:this.$route.query.id
      }
      const res = await getlawuitMsg(options)
      this.listItem =res
    },
    goBack(){
      this.$router.go(-1)
    },
    formatMoney(value) {
      return formatMoney(value);
    }
  },
  components:{
    MHeader
  }
}
</script>
<style lang="scss" scoped>
  .social-box{
    background:#fff;
    margin-top:0.3rem;
    .p1{
      padding:0.3rem;
      font-size:0.32rem;
      text-align:left;
      border-bottom:0.01rem solid #e2e2e2;
    }
    li{
      display:flex;
      align-items: center;
      padding:0.3rem;
      border-bottom:0.01rem solid #e2e2e2;
      &:last-child{
        border:none;
      }
      .text{
        width:2.6rem;
        color:#999;
        font-size:0.32rem;
        text-align:left;
      }
      .content{
        flex:1;
        font-size:0.32rem;
        text-align:left;
      }
    }
  }
</style>