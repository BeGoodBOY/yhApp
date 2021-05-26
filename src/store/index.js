import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    refreshFlag: false,
  },
  mutations: {
    changeRefreshFlag(state, paras) {
      state.refreshFlag = paras.flag;
    }
  },
  actions: {},
  modules: {},
});
