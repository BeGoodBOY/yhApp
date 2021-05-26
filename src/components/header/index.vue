<template>
  <div class="header">
    <span v-if="lFlag" class="l"
      ><i @click="lClick" class="iconfont" v-html="lIcon"></i
    ></span>
    <span class="tit"
      ><slot name="main">{{ hdTit }}</slot></span
    >
    <span v-if="rFlag" @click="rClick" class="r">{{ rText }}</span>
    <span v-if="rIconFlag" @click="rClick" class="r"
      ><i class="iconfont" v-html="rIcon" :style="rStyle"></i
    ></span>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    tit: {
      type: String,
      default: "易回",
    },
    lFlag: {
      type: Boolean,
      default: true,
    },
    rText: {
      type: String,
      default: "",
    },
    lIcon: {
      type: String,
      default: "&#xe605;",
    },
    rIcon: {
      type: String,
      default: "",
    },
    rSize: {
      type: String,
      default: "0.3rem",
    },
  },
  data() {
    return {
      hdTit: this.tit,
    };
  },
  created() {
    this.hdTit = this.$route.meta.tit;
  },
  computed: {
    rFlag() {
      return this.rText === "" ? false : true;
    },
    rIconFlag() {
      return this.rIcon === "" ? false : true;
    },
    rStyle() {
      return {
        "font-size": this.rSize,
      };
    },
  },
  methods: {
    lClick() {
      this.$emit("lClick");
    },
    rClick() {
      this.$emit("rClick");
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/style/var.scss";
@import "@/style/mixin.scss";
.header {
  @include flex();
  z-index: 99;
  position: relative;
  height: 0.86rem;
  width: 100%;
  box-sizing: content-box;
  font-size: 0.3rem;
  color: #fff;
  background: $color;
  padding-top: calc(constant(safe-area-inset-top)*2);
  padding-top: calc(env(safe-area-inset-top)*2);
  // padding-bottom: constant(safe-area-inset-bottom);
  // padding-bottom: env(safe-area-inset-bottom);
  // padding-left: constant(safe-area-inset-left);
  // padding-left: env(safe-area-inset-left);
  // padding-right: constant(safe-area-inset-right);
  // padding-right: env(safe-area-inset-right);
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
  .r {
    position: absolute;
    right: 0;
    padding-right: 0.2rem;
    font-size: 0.26rem;
    text-align: right;
  }
}

// .menuBar{
//   height: 0.98rem;
//   height: calc(~'constant(safe-area-inset-bottom) + 0.98rem');
//   height: calc(~'env(safe-area-inset-bottom) + 0.98rem');
// }
</style>
