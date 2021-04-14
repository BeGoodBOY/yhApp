<template lang="">
  <div>
    <div class="bottom-box">
     <span class="attten-but" @click="toFollwed" v-if="detailData.nIsFollow === 0">关注</span>
     <span class="attten-but" @click="handleFollowed" v-if="detailData.nIsFollow === 1">已关注</span>
     <!-- <span class="attten-but" @click="handleFollowed">已关注</span> -->
     <!-- <router-link tag="a" class="apply-box" :to="{path:'/tasklist/taskdetail/transferApply'}">流转申请</router-link> -->
     <router-link tag="a" class="fill-box" :to="{path:'/tasklist/taskdetail/input_reminder', query:{lDebtorId:this.$route.query.lDebtorId,lEntrustId:this.$route.query.lEntrustId,strDebtorName:detailData.strName}}">填写催记</router-link>
    </div>
    <van-popup v-model="attFlag" position="bottom" class="type-box">
        <div class="d-com border">确定不再关注此案件？</div>
        <div class="d-com f-color" @click="noAtt">不再关注</div>
        <div class="t-bk"></div>
        <div class="d-com f-color" @click="goOnAtt">继续关注</div>
    </van-popup>
  </div>
</template>
<script>
import { Popup } from 'vant';
import { followOrder, cancelFollowOrder } from '@/api/data'
export default {
  data(){
    return{
      attFlag:false
    }
  },
  props:{
    detailData:{
      type:Object,
    }
  },
  mounted() {
    // console.log(this.detailData)
  },
  methods:{
    async toFollwed(){
      const res = await followOrder({
        lId: this.detailData.lEntrustId
      });
      if(!res) return;
      this.$toast('关注成功');
      this.detailData.nIsFollow = 1;
    },
    async handleFollowed(){
      this.attFlag = true;
    },
    goOnAtt(){ //继续关注
      this.attFlag = false;
    },
    async noAtt(){ //不在关注
      const res = await cancelFollowOrder({
        lId: this.detailData.lEntrustId
      });
      if(!res) return;
      this.$toast('取消关注成功')
      this.detailData.nIsFollow = 0;
      this.attFlag = false;
    }
  },
  components:{
    'vanPopup':Popup
  }
}
</script>
<style lang="scss" scoped>
  .bottom-box{
      height:0.88rem;
      line-height:0.88rem;
      position:fixed;
      bottom:0rem;
      left:0rem;
      right:0rem;
      background:#fff;
      text-align:center;
      a{
        display:inline-block;
        font-size:0.32rem;
      }
      .attten-but{
        width:40%;
        display:inline-block;
        font-size:0.32rem;
      }
      .apply-box{
        width:60%;
        background:#ff9f02;
        color:#fff;
      }
       .fill-box{
        width:60%;
        background:#09f;
        color:#fff;
      }
    }
    .type-box{
    .d-com{
      padding:0.3rem;
      font-size:0.32rem;
    }
    .border{
      border-bottom:.01rem solid #e2e2e2;
    }
    .t-bk{
      height:0.2rem;
      width:100%;
      background:#f7f7f7;
    }
    .f-color{
      color:#09f;
    }
  }
</style>