<template>
  <div class="header">
    <span v-if="lFlag" class="l"><i @click="lClick" class="iconfont" v-html="lIcon"></i></span>
    <span class="tit"><slot name="main">{{ hdTit }}</slot></span>
    <span v-if="rFlag" @click="rClick" class="r">{{ rText }}</span>
    <span v-if="rIconFlag" @click="rClick" class="r"><i class="iconfont" v-html="rIcon" style="font-size: 0.3rem"></i></span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    tit: {
      type: String,
      default: '易回'
    },
    lFlag: {
      type: Boolean,
      default: true
    },
    rText: {
      type: String,
      default: ''
    },
    lIcon: {
      type: String,
      default: '&#xe605;'
    },
    rIcon: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      hdTit: this.tit,
    } 
  },
  created() {
    this.hdTit = this.$route.meta.tit;
  },
  computed: {
    rFlag() {
      return this.rText === '' ? false : true;
    },
    rIconFlag() {
      return this.rIcon === '' ? false : true;
    },
  },
  methods: {
    lClick() {
      this.$emit('lClick');
    },
    rClick() {
      this.$emit('rClick');
    }
  }
};
</script>
<style lang="scss" scoped>
@import '@/style/var.scss';
@import '@/style/mixin.scss';
.header {
  @include flex();
  position: relative;
  height: 0.86rem;
  width: 100%;
  font-size: 0.3rem;
  color: #fff;
  background: $color;
  span {
    flex: 1;
  }
  .l {
    position: absolute;
    left: 0;
    padding-left: 0.2rem;
    text-align: left;
    .iconfont {
      font-size: 0.32rem;
    }
  }
  .r{
    position: absolute;
    right: 0;
    padding-right: 0.2rem;
    font-size: 0.26rem;
    text-align: right;
  }
}
</style>
