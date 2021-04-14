<template>
  <div>
    <MHeader @lClick="goBack"></MHeader>
    <div v-for="(item,index) in list" :key="index" class="himself-box">
      <div class="tel-box">
        <div class="d-msg">电话信息({{ item.strCreditName }})</div>
        <ul>
          <li>
            <span class="s-tel">联系电话1</span>
            <a :href="'tel:' + item.strMobile">{{ item.strMobile }}</a>
          </li>
        </ul>
      </div>
      <div class="address-box">
        <div class="d-msg">地址信息({{ item.strCreditName }})</div>
        <ul>
          <li v-for="(cItem,idx) in item.cdosDebtorAddress" :key="idx">
            <div class="dw-address" v-if="cItem.nType == 1">身份证地址</div>
            <div class="dw-address" v-else-if="cItem.nType == 2">现住地址</div>
            <div class="dw-address" v-else-if="cItem.nType == 3">单位地址</div>
            <div class="map-box">
              <div class="add-desc">{{cItem.strAddress}}</div>
              <div class="add-distance">{{ cItem.strDistance }}</div>
              <!-- <div class="km-box">
                <span class="span1">10.68km</span>
                <a href="#" class="span2">导航</a>
              </div> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getSelfInfo } from '@/api/getDetailData.js'
import MHeader from '@/components/header'
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.getSelfInfo();
  },
  methods:{
    async getSelfInfo () {
      let options ={
        lDebtorId: this.$route.query.id
      }
      const res = await getSelfInfo(options);
      if(!res) return;
      this.list = res.cdosData
    },
    goBack(){
      this.$router.go(-1)
    }
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
  .himself-box{
    margin-top:0.2rem;
    .d-msg{
        padding:0.2rem 0.3rem;
        text-align:left;
        border-bottom:0.01rem solid #e2e2e2;
      }
    .tel-box{
      background:#fff;
      font-size:0.32rem;
      li{
        display:flex;
        padding: 0.3rem;
        font-size:0.32rem;
        text-align:left;
        .s-tel{
          width:1.8rem;
          text-align:left;
          color:#999;
        }
        a{
          color:#09f;
        }
      }
    }
    .address-box{
      background:#fff;
      margin-top:0.2rem;
      font-size:0.32rem;
      li{
        display:flex;
        font-size:0.32rem;
        padding: 0.3rem;
        border-bottom:0.01rem solid #e2e2e2;
        &:last-child{
          border:none;
        }
        .dw-address{
          width:1.6rem;
          text-align:left;
          color:#999;
        }
        .map-box{
          flex:1;
          padding-left:0.3rem;
          box-sizing: border-box;
          text-align: left;
        }
        .add-desc{
          text-align: left;
          line-height: 1.2em;
        }
        .add-distance {
          margin-top: 0.3rem;
        }
        .km-box{
          align-items: center;
          display:flex;
          .span1{
            flex:1;
            text-align:left;
          }
          .span2{
            width: 1.6rem;
            border: 1px solid #09f;
            display: inline-block;
            padding: 0.15rem 0;
            border-radius: 0.3rem;
            color:#09f;
          }
        }
      }
    }
  }
</style>