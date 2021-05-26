<template lang="">
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div class="social-box" v-for="(item,index) in listItem" :key="index" ref="div">
      <p class="p1">新增信息 <span v-if="item.nDelFlag == 1" class="delete-btn" @click="handleDleteMsg(item.lId,item.lRecordId,index)">删除</span></p>
      <ul>
        <li>
          <span class="text">提交信息</span>
          <span class="content">{{item.dtCreateTime}}</span>
        </li>
        <li>
          <span class="text">联系人</span>
          <span class="content" v-if="item.nRelationship == 0">本人</span>
          <span class="content" v-if="item.nRelationship == 1">家庭成员</span>
          <span class="content" v-if="item.nRelationship == 2">第三方</span>
        </li>
        <li v-if="item.strContact0 !='' ">
          <span class="text" v-if="item.nContactType0 == 0">手机</span>
          <span class="text" v-if="item.nContactType0 == 1">家庭电话</span>
          <span class="text" v-if="item.nContactType0 == 2">单位电话</span>
          <span class="content">{{item.strContact0}}</span>
        </li>
        <li v-if="item.strContact1 !='' ">
          <span class="text" v-if="item.nContactType1 == 0">手机</span>
          <span class="text" v-if="item.nContactType1 == 1">家庭电话</span>
          <span class="text" v-if="item.nContactType1 == 2">单位电话</span>
          <span class="content">{{item.strContact1}}</span>
        </li>
        <li v-if="item.strContact2 !='' ">
          <span class="text" v-if="item.nContactType2 == 0">手机</span>
          <span class="text" v-if="item.nContactType2 == 1">家庭电话</span>
          <span class="text" v-if="item.nContactType2 == 2">单位电话</span>
          <span class="content">{{item.strContact2}}</span>
        </li>
        <li v-if="item.strAddress0 != ''">
          <span class="text" v-if="item.nAddressType0 == 0">现住地址</span>
          <span class="text" v-if="item.nAddressType0 == 1">单位地址</span>
          <span class="text" v-if="item.nAddressType0 == 2">其他地址</span>
          <span class="content">{{item.strAddress0}}</span>
        </li>
        <li v-if="item.strAddress1 != ''">
          <span class="text" v-if="item.nAddressType1 == 0">现住地址</span>
          <span class="text" v-if="item.nAddressType1 == 1">单位地址</span>
          <span class="text" v-if="item.nAddressType1 == 2">其他地址</span>
          <span class="content">{{item.strAddress1}}</span>
        </li>
        <li v-if="item.strAddress2 != ''">
          <span class="text" v-if="item.nAddressType2 == 0">现住地址</span>
          <span class="text" v-if="item.nAddressType2 == 1">单位地址</span>
          <span class="text" v-if="item.nAddressType2 == 2">其他地址</span>
          <span class="content">{{item.strAddress2}}</span>
        </li>
        <li v-if="item.strSocial0 != ''">
          <span class="text" v-if="item.nSocialType0 == 0">QQ</span>
          <span class="text" v-if="item.nSocialType0 == 1">微信</span>
          <span class="text" v-if="item.nSocialType0 == 2">邮箱</span>
          <span class="content">{{item.strSocial0}}</span>
        </li>
        <li v-if="item.strSocial1 != ''">
          <span class="text" v-if="item.nSocialType1 == 0">QQ</span>
          <span class="text" v-if="item.nSocialType1 == 1">微信</span>
          <span class="text" v-if="item.nSocialType1 == 2">邮箱</span>
          <span class="content">{{item.strSocial1}}</span>
        </li>
        <li v-if="item.strSocial2 != ''">
          <span class="text" v-if="item.nSocialType2 == 0">QQ</span>
          <span class="text" v-if="item.nSocialType2 == 1">微信</span>
          <span class="text" v-if="item.nSocialType2 == 2">邮箱</span>
          <span class="content">{{item.strSocial2}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
import { getNewContact,deleteNewContact } from '@/api/getDetailData'
export default {
  props:{

  },
  data(){
    return{
      listItem:[]
    }
  },
  created(){
    this.handleOtherFuc()
  },
  methods:{
    async handleOtherFuc(){
      let options ={
        lDebtorId: this.$route.query.id
      }
      const res = await getNewContact(options)
      this.listItem =res.cdosData
      //console.log(res.cdosData)
    },
    goBack(){
      this.$router.go(-1)
    },
    async handleDleteMsg(lId,lRecordId,index){
      let options ={
        lId:lId,
        lRecordId:lRecordId,
        lDebtorId:this.$route.query.id
      }
      const res = await deleteNewContact(options)
      console.log(res)
      if(!res) return;
      this.$toast('删除成功');
      this.listItem.splice(index, 1)
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
      .delete-btn{
        float:right;
        color:#09f;
      }
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