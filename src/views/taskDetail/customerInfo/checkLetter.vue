<template lang="">
  <div class="letter-box">
    <MHeader @lClick="goBack" />
    <van-loading size="40px" text-size="30px" v-if="showflag"  class="v-load">加载中...</van-loading>
    <div v-if="imgurl== '' " class="no-data">暂无数据~</div>
    <img :src="imgurl" alt="">
  </div>
</template>
<script>
import { getCheckLetter } from '@/api/getDetailData'
import {loading} from 'vant';
import MHeader from '@/components/header'
export default {
  props:{

  },
  data(){
    return{
      imgurl:null,
      showflag:true
    }
  },
  created(){
    this.handleGetLetter()
  },
  methods:{
    async handleGetLetter(){
      let options ={
        lDebtorId: this.$route.query.lDebtorId,
        lCreditId:this.$route.query.lCreditId
      }
      const res = await getCheckLetter(options)
      if (!res) return;
      //console.log('委托函',res)
      this.imgurl = res.strImgUrl
      this.showflag = false
    },
    goBack(){
      this.$router.go(-1)
    },
  },
  components:{
    'vanLoading':loading,
    MHeader
  },
}
</script>
<style lang="scss">
  .letter-box{
    .no-data{
      font-size:0.32rem;
      padding:0.3rem;
    }
    img{
      width:100%;
    }
  }
</style>