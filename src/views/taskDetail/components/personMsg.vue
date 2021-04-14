<template>
  <div class="person-box">
    <ul class="basic-msg">
      <li>
        <span class="left-box">姓名</span>
        <span class="right-box">{{personData.strName}}</span>
      </li>
      <li>
        <span class="left-box">性别</span>
        <span class="right-box">{{personData.nSex == 0 ? '男' : '女'}}</span>
      </li>
      <li>
        <span class="left-box">身份证照片</span>
        <span class="right-box">
          <img :src="item" alt="" v-for="(item,index) in personData.arrIdentityImg" :key="index" @click="previewImg(personData.arrIdentityImg,index)">
        </span>
      </li>
      <li v-if="personData.arrDebtorImg === ''">
        <span class="left-box">客户照片</span>
        <span class="right-box">
          <img :src="item" alt="" v-for="(item,index) in personData.arrDebtorImg" :key="index" @click="previewImg(personData.arrDebtorImg,index)">
        </span>
      </li>
    </ul>
    <ul class="other-box">
      <li @click="toSelfdConatct">
        <span class="left-box">客户本人信息</span>
        <span class="right-box"></span>
      </li>
      <li @click="toRelatedConatct">
        <span class="left-box">相关联系人信息</span>
        <span class="right-box"></span>
      </li>
      <li @click="toClientAgree">
        <span class="left-box">委托协议信息</span>
        <span class="right-box"></span>
      </li>
      <li v-show="personData.nAddContactCount>0" @click="toOtherConcact">
        <span class="left-box">其它信息</span>
        <span class="right-box"></span>
      </li>
      <li @click="toLawuit" v-show="personData.nAddContactCount == 1">
        <span class="left-box">诉讼信息</span>
        <span class="right-box"></span>
      </li>
      <li @click="toRepalyChannel">
        <span class="left-box">还款渠道信息</span>
        <span class="right-box"></span>
      </li>
    </ul>
  </div>
</template>
<script>
import { ImagePreview, Toast } from 'vant';
export default {
  data(){
    return {
      show: false,
      index: 0,
      id:null
    }
  },
  props:{
   personData:{
     type:Object,
    }
  },
  created(){
    //console.log(this.$route.query.lDebtorId)
    this.id = this.$route.query.lDebtorId
  },
  methods:{
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
    toSelfdConatct(){ //跳转客户本人联系人页面
      this.$router.push({path:'/tasklist/taskdetail/selfContact',query:{id:this.id}})
    },
    toRelatedConatct(){ //跳转相关联系人页面
      this.$router.push({path:'/tasklist/taskdetail/relatedContact',query:{id:this.id}})
    },
    toClientAgree(){ //跳转委托协议
      Toast('该模块正在开发')
      return false;
      this.$router.push({path:'/tasklist/taskdetail/clientAgreet'})
    },
    toRepalyChannel(){ //跳转还款渠道
      this.$router.push({path:'/tasklist/taskdetail/replayChannel',query:{id:this.id}})
    },
    toOtherConcact(){ //跳转其它信息
      this.$router.push({path:'/tasklist/taskdetail/social',query:{id:this.id}})
    },
    toLawuit(){
      this.$router.push({path:'/tasklist/taskdetail/lawuit',query:{id:this.id}})
    }

  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  components:{
  }
}
</script>
<style lang="scss" scoped>
  .person-box{
    .basic-msg{
      background:#fff;
      padding:0 0.3rem;
      li{
        font-size:0.32rem;
        display:flex;
        padding: .4rem 0;
        border-bottom:0.02rem solid #e2e2e2;
        &:last-child{border:none;}
        .left-box{
          width:1.8rem;
          text-align:left;
          color:#999;
        }
        .right-box{
          flex:1;
          text-align:left;
        }
        img{
          width:2rem;height:2rem;
          margin-bottom: .15rem;
          &:nth-child(1){margin-right:0.4rem}
        }
      }
    }
    .other-box{
      background:#fff;
      padding:0 0.3rem;
      margin-top: 0.2rem;
      li{
        font-size:0.32rem;
        display:flex;
        padding: .4rem 0;
        border-bottom:0.02rem solid #e2e2e2;
        cursor:pointer;
        &:last-child{border:none;}
        .right-box{
            width: 0.18rem;
            height: 0.18rem;
            border-top: 0.02rem solid #999;
            border-right: 0.02rem solid #999;
            transform: rotate(45deg);
            margin-top:0.06rem;
        }
        .left-box{
          flex:1;
          text-align:left;
        }
      }
    }
  }
</style>