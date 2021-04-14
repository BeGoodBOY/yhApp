<template>
  <div class="detail-box home-box">
    <MHeader :rText="rText" @lClick="goBack" @rClick="chargeBack" />
    <DHeader :detailData="detailList" :lDebtorId="lDebtorId"></DHeader>
    <TabList :personData="detailList"></TabList>
    <DFooter :detailData="detailList"></DFooter>
  </div>
</template>
<script>
import DHeader from './components/dHeader'
import TabList from './components/detailTab'
import DFooter from './components/detailFooter'
import MHeader from '@/components/header'
import {getDetailData} from '@/api/getDetailData'
import {getStore} from '@/config/utils'

export default {
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
    this.handleGetDetailData(this.$route.query.lDebtorId, this.$route.query.lEntrustId)
  },
  methods:{
    async handleGetDetailData (lDebtorId, lEntrustId) { //获取详情数据
      let options ={
        lDebtorId:lDebtorId,
        lCollectEmpId: lEntrustId
      }
      const res = await getDetailData(options);
      this.detailList = res;
      this.lDebtPoolId=res.lDebtPoolId
      //console.log(res.lDebtPoolId)
    },
    goBack(){ //返回
      this.$router.go(-1)
    },
    chargeBack(){ //申请退单
      this.$router.push({
        path:'/tasklist/taskdetail/applyRefund',
        query:{
          lDebtPoolId:this.lDebtPoolId,
          lEntrustId:this.$route.query.lEntrustId
        }
      })
    }
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
<style lang="scss">
</style>