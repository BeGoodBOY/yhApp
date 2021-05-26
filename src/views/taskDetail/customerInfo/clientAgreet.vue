<template lang="">
  <div>
    <MHeader @lClick="goBack" />
    <div class="client-box">
      <ul v-for="(item,index) in list" :key="index">
        <li>
          <span class="s-left">委托函</span>
          <span class="s-right"><router-link tag="a" :to="{path:'/tasklist/taskdetail/checkLetter',query:{lDebtorId:lDebtorId,lCreditId:item.lCreditId}}" >点击查看</router-link></span>
        </li>
        <!-- <li>
          <span class="s-left">债权方</span>
          <span class="s-right">{{item.strCreditName}}</span>
        </li> -->
        <li v-if="item.arrApplyImg.length>0">
          <span class="s-left">贷款申请表</span>
          <span class="s-right">
          <img :src="citem" class="img" alt="" v-for="(citem,idx) in item.arrApplyImg" :key="idx" @click="previewImg(item.arrApplyImg,idx)">
        </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import MHeader from '@/components/header'
import { getClientAgree } from '@/api/getDetailData'
import { ImagePreview, Toast } from 'vant';
export default {
  data(){
    return {
      index:0,
      list:[],
      lDebtorId:null,
    }
  },
  created(){
    this.handleGetClient();
    this.lDebtorId = this.$route.query.id
  },
  methods:{
    async handleGetClient () {
      let options= {
         lDebtorId:this.$route.query.id,
      }
      const res = await getClientAgree(options);
      //console.log(res)
      this.list = res.cdosData
    },
    goBack(){
      this.$router.go(-1)
    },
    previewImg(images,index){
      ImagePreview({
        images: images,
        startPosition: index,
        closeable: true,
      });
    },
    onChange(index) {
      this.index = index;
    },
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  components:{
    MHeader
  }
}
</script>
<style lang="scss" scoped>
  .client-box{
    background:#fff;
    margin-top:0.3rem;
    li{
      padding:0.3rem;
      display:flex;
      font-size:0.32rem;
      .s-left{
        width:2rem;
        text-align:left;
        color:#666;
      }
      .s-right{
        flex:1;
        text-align:left;
        a{
          color:#09f;
        }
        .img{
          width:1rem;
          height:1rem;
          margin-bottom: .15rem;
          margin-right:0.1rem;
        }
      }
    }
  }
</style>