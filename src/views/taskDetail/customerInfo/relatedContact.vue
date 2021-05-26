<template>
  <div>
    <MHeader @lClick="goBack" />
    <div v-for="item in list" :key="item.lCreditId" class="related-box">
      <!-- <div class="d-tit">相关联系人({{ item.strCreditName }})</div> -->
      <ul class="concat-list-box">
        <li v-for="(cItem,index) in item.cdosDebtorContactor" :key="index">
          <div class="d-list">
            <span class="s-left">姓名</span>
            <span class="s-right">{{cItem.strRealName}}({{cItem.strRelation}})</span>
          </div>
          <div class="d-list">
            <span class="s-left">电话</span>
            <span class="s-right"><a @click="mDial(cItem.strMobile)" :href="'tel:' + cItem.strMobile">{{cItem.strMobile}}</a></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { getRelatedContact } from '@/api/getDetailData'
import MHeader from '@/components/header'
import { mDial } from '@/native'
export default {
  data(){
    return {
      list:[]
    }
  },
  created(){
    this.getRelatedContact()
  },
  methods:{
    async getRelatedContact(){
      let options = {
        lDebtorId: this.$route.query.id
      }
      const res = await getRelatedContact(options)
      this.list= res.cdosData
    },
    goBack(){
      this.$router.go(-1)
    },
    mDial(num) {
      mDial(num)
      console.log(num)
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
  .related-box{
    background:#fff;
    margin-top:0.2rem;
    .d-tit{
      padding:0.2rem 0.3rem;
      border-bottom:0.01rem solid #e2e2e2;
      text-align:left;
      font-size:0.32rem;
    }
    .concat-list-box{
      li{
        padding:0.3rem 0.3rem;
        font-size:0.32rem;
        .d-list{
          &:first-child{
            padding-bottom:0.3rem;
          }
          display:flex;
          align-content: center;
          .s-left{
            width:1.8rem;
            text-align:left;
            color:#999;
          }
          .s-right{
            flex:1;
            text-align:left;
            a{
              color:#09f;
            }
          }
        }
      }
    }
  }
</style>