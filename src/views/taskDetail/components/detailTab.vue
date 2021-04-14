<template lang="">
  <div class="detail-tab">
      <van-tabs ref="tabs" v-model="active" sticky animated swipeable @click="getTitle">
        <van-tab title="客户信息">
          <PersonMsg :personData="personData"></PersonMsg>
        </van-tab>
        <van-tab title="还款记录">
          <RepayRecords :personData="personData"></RepayRecords>
        </van-tab>
        <van-tab title="催回记录">
          <RushRecords></RushRecords>
        </van-tab>
        <van-tab title="催收记录">
          <RecyRecords></RecyRecords>
        </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { Tab, Tabs } from 'vant'
import PersonMsg from './personMsg'
import RepayRecords from './repayRecords'
import RushRecords from './rushRecords'
import RecyRecords from './recyRecords'
export default {
   props:{
   personData:{
     type:Object,
    }
  },
  data(){
    return{
      active :0
    }
  },
  mounted(){
    
  },
  methods:{
    getTitle(title){
      this.active = title
    }
  },
  components:{
    'vanTabs': Tabs,
    'vanTab': Tab,
    PersonMsg,
    RepayRecords,
    RushRecords,
    RecyRecords
  }
}
</script>
<style lang="scss">
  .detail-tab{
    padding-bottom: 1.4rem;
  }
  .detail-tab .van-tabs--line .van-tabs__wrap{
    height:0.88rem;
  }
  .detail-tab .van-tab{
    font-size:0.32rem;
    line-height: 0.4rem;
  }
  .detail-tab .van-sticky{
    border:0.01rem solid #e2e2e2;
  }
  .detail-tab .van-tabs__line{
    background:#62a0f3;
  }
</style>