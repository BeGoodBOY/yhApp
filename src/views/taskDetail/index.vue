<template>
  <div class="detail-box home-box" ref="scroller">
    <div class="inner">
      <MHeader :rText="rText" @lClick="goBack" @rClick="chargeBack" />
      <DHeader :detailData="detailList" :lDebtorId="lDebtorId"></DHeader>
      <TabList :personData="detailList"></TabList>
    </div>
      <DFooter :detailData="detailList"></DFooter>
  </div>
</template>
<script>
import DHeader from './components/dHeader'
import TabList from './components/detailTab'
import DFooter from './components/detailFooter'
import MHeader from '@/components/header'
import {getDetailData} from '@/api/getDetailData'
import { back } from '@/native'
import { bugScroll } from "@/config/utils"

export default {
  name: 'taskDetail',
  props:{
    attFlag:{
      type:Boolean
    }
  },
  data(){
    return {
      detailList:{},
      rText:"申请退单",
      lDebtorId:null,
      lDebtPoolId:null
    }
  },
  created(){
    this.lDebtorId= this.$route.query.lDebtorId
    this.handleGetDetailData(this.$route.query.lDebtorId)
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.scroller.scrollTop = 2;
    // })
  },
  methods:{
    async handleGetDetailData (lDebtorId) { //获取详情数据
      let options ={
        lDebtorId:lDebtorId
      }
      const res = await getDetailData(options);
      this.detailList = res;
      this.lDebtPoolId=res.lDebtPoolId
      //console.log(res)
    },
    goBack(){ //返回
      if(this.$route.query.from === 'native') {
        back();
      }else {
        this.$router.back();
      }
    },
    chargeBack(){ //申请退单
      this.$router.push({
        path:'/tasklist/taskdetail/applyRefund',
        query:{
          lDebtPoolId:this.lDebtPoolId,
          lEntrustId:this.detailList.lEntrustId
        }
      })
    },
  },
  components:{
    DHeader,
    TabList,
    DFooter,
    MHeader,
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  }
}
</script>
<style lang="scss" scoped>
</style>