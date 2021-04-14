<template lang="">
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div class="social-box">
      <p class="p1">社交信息</p>
      <ul v-for="(item,index) in listItem" :key="index">
        <li v-if="item.cdosDebtorOther[0].strEmail != '' ">
          <span class="text">邮箱地址</span>
          <span class="content">{{item.cdosDebtorOther[0].strEmail}}</span>
        </li>
        <li v-if="item.cdosDebtorOther[0].strQQ != '' ">
          <span class="text">QQ账号</span>
          <span class="content">{{item.cdosDebtorOther[0].strQQ}}</span>
        </li>
        <li v-if="item.cdosDebtorOther[0].strWechat != '' ">
          <span class="text">微信</span>
          <span class="content">{{item.cdosDebtorOther[0].strWechat}}</span>
        </li>
        <!-- <li v-if="item.cdosDebtorOther[0].strMobile != '' ">
          <span class="text">电话</span>
          <span class="content">{{item.cdosDebtorOther[0].strMobile}}</span>
        </li> -->
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