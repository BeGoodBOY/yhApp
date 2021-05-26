<template lang="">
  <div class="tranfer-box">
    <MHeader :rText="rText" @lClick="goBack" @rClick="chargeBack" />
    <ul class="u-box">
      <li @click="applyShow">
        <span class="s-left">申请类型</span>
        <input placeholder="请选择" disabled class='s-right' ref="applayType" />
        <span class="arrow"></span>
      </li>
       <li @click="creditShow">
        <span class="s-left">债权方选择</span>
         <input placeholder="请选择" disabled class='s-right' ref="creditType" />
        <span class="arrow"></span>
      </li>
    </ul>
    <div class="area-box">
      <textarea placeholder= "请填写留案原因(必填)" contenteditable="true" class="area-text"  maxlength="120" ref="textareas" @input="descInput" v-model="payload.content"></textarea>
      <div class="font-box"><span>{{remnant}}</span><span>/120</span></div>
    </div>
    <!-- <van-button type="primary" size="large" @click="submitBtn">提交</van-button> -->
    <div class="history-box">
      <div class="d-tit">历史申请记录</div>
      <ul class="d-box">
        <li>
          <span class="text">申请时间</span>
          <span class="cont">2021.6.3</span>
        </li>
        <li>
          <span class="text">申请人</span>
          <span class="cont">收到</span>
        </li>
        <li>
          <span class="text">申请类型</span>
          <span class="cont">申请留案</span>
        </li>
        <li>
          <span class="text">债务人</span>
          <span class="cont">王者</span>
        </li>
        <li>
          <span class="text">债权法</span>
          <span class="cont">王者</span>
        </li>
      </ul>
    </div>
    <van-popup v-model="oType" position="bottom" class="type-box">
      <ul>
        <li v-for="(item,index) in listType" :key="index" @click="surnTypeBtn(item)">{{item}}</li>
      </ul>
      <div class="t-bk"></div>
      <div class="cancel-box" @click="cancleTypeBtn">取消</div>
    </van-popup>
    <van-popup v-model="zqfType" position="bottom" class="cretid-box" :close-on-click-overlay="showTrue">
      <div class="check-top">债权方选择(可多选)</div>
      <van-checkbox-group v-model="result">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in listCheck"
            clickable
            :key="item"
            :title="item"
            @click="toggle(index)"
          >
            <template #right-icon>
              <van-checkbox :name="item" ref="checkboxes" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <!-- <ul>
        <li v-for="(item ,index) in listCheck" :key="index" @click="toggle(index)">
          <span class="text">{{item}}</span>
          <span class="checkbox"><van-checkbox :name="item" ref="checkboxes" ></van-checkbox></span>
        </li>
      </ul> -->
       <div class="t-bk"></div>
      <div class="cancel-box">
        <button class="cancel" @click="cancelCheckBtn">取消</button>
        <button class="sure" @click="sureCheckBtn">确定</button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Popup ,Checkbox,CheckboxGroup,Cell,CellGroup,Button,Toast} from 'vant';
import MHeader from '@/components/header'
export default {
  data() {
    return {
      oType: false,
      zqfType:false,
      checked: false,
      showTrue:false,
      listType:['申请流案','转入诉讼','申请催停'],
      listCheck:['达飞','忆名'],
      result: [],
      rText:"提交",
      remnant:0,
      payload:{
        content:'',
      }
    };
  },
  methods: {
    descInput(){
      let txtVal = this.payload.content.length;
      this.remnant = txtVal;
    },
    goBack(){
      this.$router.go(-1)
    },
    applyShow() { //申请类型显隐
      this.oType = true;
    },
    cancleTypeBtn(){ //取消
      this.oType = false;
    },
    surnTypeBtn(item){
      this.$refs.applayType.value = item;
      this.oType = false;
    },
    creditShow() { //债权方显隐
      this.zqfType = true;
    },
    cancelCheckBtn(){ //取消
      this.zqfType = false;
    },
     toggle(index) { //复选框
      this.$refs.checkboxes[index].toggle();
    },
    sureCheckBtn(){ //确定
      let str =''
      this.result.map((item) =>{
        str +=item +','
      })
      str =str.substr(0,str.length-1);
      this.$refs.creditType.value= str;
      this.zqfType = false;
    },
    chargeBack(){ //提交
      if(this.$refs.applayType.value ==''){
        Toast('请选择申请类型')
        return false;
      }
      if(this.$refs.creditType.value ==''){
        Toast('请选择债权方')
        return false;
      }
      if(this.payload.content ==''){
        Toast('请填写留案原因')
        return false;
      }
    }
  },
  beforeCreate(){
    document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
  },
  components:{
    'vanPopup' :Popup,
    'vanCheckbox' : Checkbox,
    'vanCheckboxGroup':CheckboxGroup,
    'vanCell' :Cell,
    'vanCellGroup':CellGroup,
    //'vanButton' :Button,
    MHeader
  }
}
</script>
<style lang="scss" scoped>
  .tranfer-box{
    .u-box{
      background:#fff;
      li{
        padding:0.3rem;
        border-bottom:0.01rem solid #e2e2e2;
        display:flex;
        align-items: center;
        font-size:0.32rem;
        &:last-child{
          border:none;
        }
        .s-left{
          width:1.8rem;
          text-align:left;
        }
        .s-right{
          flex:1;
          text-align:right;
          color:#666;
          position:relative;
          font-size:0.32rem;
          background:none;
          &::placeholder{
            color:#999
          }
        }
        .arrow{
            width: 0;
            height: 0;
            border-width: 0.1rem;
            border-style: solid;
            border-color: #999 transparent transparent transparent;
            margin-left: 0.2rem;
            margin-top: 0.14rem;
            display: inline-block;
            vertical-align: middle;
          }
      }
    }
    .area-box{
      background:#fff;
      margin-top:0.2rem;
      textarea{
        width:100%;
        height:2.5rem;
        overflow-y:auto;
        border:none;
        padding: 0.3rem 0.3rem;
        font-size:0.32rem;
        box-sizing: border-box;
        line-height: 0.4rem;
        -webkit-text-size-adjust: none;
      }
      .font-box{
        padding:0 0.3rem 0.3rem 0.3rem;
        font-size:0.32rem;
        text-align:right;
      } 
    }
    .type-box{
      li{
        padding:0.25rem 0.2rem;
        border-bottom:0.01rem solid #e2e2e2;
        font-size:0.32rem;
        &:last-child{
          border:none;
        }
      }
      .cancel-box{
        padding:0.3rem;
        color:#666;
      }
    }
    .cretid-box{
      font-size:0.32rem;
      .check-top{
        padding:0.2rem 0;
        color:#999;
        background:#f7f7f7;
      }
      li{
        display:flex;
        align-items: center;
        padding:0.25rem .2rem;
        font-size:0.32rem;
        border-bottom:0.01rem solid #e2e2e2;
        &:last-child{
          border:none;
        }
        .text{
          flex:1;
          text-align:left;
          padding-right:0.2rem;
          box-sizing: border-box;
        }
        .checkbox{
          width:0.4rem;
        }
      }
      .cancel-box{
        display:flex;
        align-items: center;
        height:0.8rem;
        button{
          width:50%;
          color:#999;
          height:100%;
          &:first-child{
            border-right:0.01px solid #e2e2e2;
          }
          &.sure{
            color:#09f;
          }
        }
      }
      .van-cell__title{
        text-align:left;
        font-size:0.32rem;
      }
    }
    .t-bk{
      height:0.2rem;
      width:100%;
      background:#f7f7f7;
    }
    .history-box{
      .d-tit{
        font-size:0.32rem;
        padding:0.3rem 0;
      }
      .d-box{
        background:#fff;
        padding:0.2rem 0;
        border-bottom:0.01rem solid #e2e2e2;
        &:last-child{
          border:none;
        }
        li{
          padding:0.15rem 0.3rem;
          display:flex;
          font-size:0.31rem;
          .text{
            width:1.8rem;
            text-align:left;
            color:#999;
          }
          .cont{
            flex:1;
            text-align:left;
          }
        }
      }
    }
  }
</style>