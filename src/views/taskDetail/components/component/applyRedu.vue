<template lang="">
  <div class="box-content">
    <div class="basic-box">
      <img class="img" src="https://dafyossfile.dafy.com/OSS/20210326/adefbf30827e449b8f60c59bb6c9516c.jpg" alt="">
      <span class="name"></span>
      <span class="time"></span>
    </div>
    <ul>
      <li>
        <span class="s-text">催收结果</span>
        <span>申请减免</span>
      </li>
      <li>
        <span class="s-text">结清金额</span>
        <span class="s-red">{{items.money}}</span>
      </li>
      <li>
        <span class="s-text">催收方式</span>
        <span>电话催收</span>
      </li>
      <li>
        <span class="s-text s-top">还款凭证</span>
        <span>
          <img src="../../../../assets/expamle.png" alt="" @click="previewImg(item.strsUrl,index)">
        </span>
      </li>
      <li>
        <span class="s-text">备注</span>
        <span>{{}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { formatMoney } from '@/config/utils'
export default {
  props:{
    items:{
      type:Object
    }
  },
  data(){
    return{
      index:0
    }
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
    formatMoney(value){
       return formatMoney(value)
    }
  }
}
</script>
<style lang="scss" scoped>
  .box-content{
    margin-bottom:0.2rem;
    background:#fff;
    padding:0 0.3rem;
    .basic-box{
      padding:0.3rem 0;
      text-align: left;
      display:flex;
      font-size:.32rem;
      align-items: center;
      .img{
        width:120px;
        height:120px;
        border-radius:50%;
      }
      .name{
        flex:1;
        padding:0 .2rem;
        box-sizing: border-box;
      }
      .time{
        width:2.6rem;
        text-align: right;
        color:#999;
      }
    }
    li{
      display:flex;
      padding:0.25rem 0;
      font-size:0.32rem;
      text-align:left;
      align-items: center;
      img{
      width:140px;
      height:170px;
      margin-right:0.1rem;
      }
      .s-text{
      color:#999;
      width:2rem;
      }
      .s-red{
        color:#f00;
      }
      .s-top{
        vertical-align:top;
      }
    } 
  }
</style>