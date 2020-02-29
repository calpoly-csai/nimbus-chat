import Vue from "vue";
import App from "./App.vue";
import "@/modules/axios-config.js";
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
