<template lang="">
  <div>
    <MHeader @lClick="goBack" />
    <div class="apply-box">
      <textarea placeholder="请填写退单原因"  contenteditable="true" class="area-text" maxlength="120" @input="descInput" v-model="payload.content" ></textarea>
      <div class="font-box"><span>{{remnant}}</span><span>/120</span></div>
    </div>
    <div class="btn-box">
      <input type="button" class="submit-btn" @click="submitBtn" value="提交">
      <!-- <button  type="submit" >提交</button> -->
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
import {applyRefundFuc} from '@/api/getDetailData'
import {getStore} from '@/config/utils'
import { Toast } from 'vant'
export default {
  data(){
    return{
      remnant:0,
      payload:{
        content:'',
      },
      lDebtPoolId:''
    }
  },
  created(){
    this.lDebtPoolId= this.$route.query.lDebtorId
  },
  components:{
    MHeader
  },
  methods:{
    goBack(){
      this.$router.go(-1)
    },
    descInput(){
      let txtVal = this.payload.content.length;
      this.remnant = txtVal;
    },
    async submitBtn(){
      let options ={
        lEntrustId:this.$route.query.lEntrustId,
        lDebtPoolId:this.$route.query.lDebtPoolId,
        strAbandonReason:this.payload.content
      }
      const res = await applyRefundFuc(options)
      if (!res) return;
      this.$store.commit('changeRefreshFlag', {flag: true});
      Toast('退单成功')
      this.$router.push({
        path:'/tasklist'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .apply-box{
    margin-top:0.3rem;
    background:#fff;
    .area-text{
      width:100%;
      height:2.5rem;
      overflow-y:auto;
      padding:0.3rem;
      box-sizing: border-box;
      border:none;
      resize: none;
      color:#2c3e50;
      font-size:0.32rem;
      cursor:pointer;
      line-height: 0.5rem;
      -webkit-text-size-adjust: none;
      &::-webkit-input-placeholder{
        font-size:0.32rem;
      }
    }
    .font-box{
      padding:0 0.3rem 0.3rem 0.3rem;
      font-size:0.32rem;
      text-align:right;
    } 
  }
  .btn-box{
    padding:0 0.5rem;
    margin-top:.6rem;
    .submit-btn{
      width:100%;
      background:#09f;
      height:0.8rem;
      color:#fff;
      font-size:.34rem;
      box-sizing: border-box;
      border-radius:30px;
    }
  }
  
</style>