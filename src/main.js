import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/config/rem'
import { Toast } from 'vant'
import '@/style/iconfont.css'

Vue.config.productionTip = false;
Vue.prototype.toast = Toast;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

window.$store = store;
