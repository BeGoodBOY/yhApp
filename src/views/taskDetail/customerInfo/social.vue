<template lang="">
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div class="social-box" v-for="(item,index) in listItem" :key="index">
      <p class="p1">社交信息</p>
      <ul>
        <li v-if="item.strEmail != '' ">
          <span class="text">邮箱地址</span>
          <span class="content">{{item.strEmail}}</span>
        </li>
        <li v-if="item.strMobile != '' ">
          <span class="text">电话</span>
          <span class="content">{{item.strMobile}}</span>
        </li>
        <li v-if="item.strQQ != '' ">
          <span class="text">QQ账号</span>
          <span class="content">{{item.strQQ}}</span>
        </li>
        <li v-if="item.strWechat != '' ">
          <span class="text">微信</span>
          <span class="content">{{item.strWechat}}</span>
        </li>
        <li style="height:0.3rem;padding:0;background:#f7f7f7"></li>
        <!-- <li>
           <span class="text">债权方</span>
          <span class="content">{{item.strCreditName}}</span>
        </li> -->
        <li>
          <span class="text">绑定银行卡</span>
          <span class="content">{{item.strBankCardNo}}</span>
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
import { getOtherContact } from '@/api/getDetailData'
export default {
  props:{

  },
  data(){
    return{
      listItem:null
    }
  },
  created(){
    this.handleOtherFuc()
  },
  methods:{
    async handleOtherFuc(){
      let options ={
        lDebtorId:this.$route.query.id
      }
      const res = await getOtherContact(options)
      this.listItem =res.cdosData
      console.log(res.cdosData)
    },
    goBack(){
      this.$router.go(-1)
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
        width:1.8rem;
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