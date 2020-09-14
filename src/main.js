import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueResource from 'vue-resource';
import Sweetalert2 from 'vue-sweetalert2';
import chartkick from 'vue-chartkick';
import chart from 'chart.js';

Vue.use(chartkick.use(chart));

const optionsSweetalert = {
    confirmButtonColor: '#41b882',
    //cancelButtonColor: '#ff7674',
};

Vue.use(Sweetalert2, optionsSweetalert);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'http://127.0.0.1:8085/api/'; //Injections de facon flobal notre url racine

//creation d'un intersepteur pour gerer le systeme de loading
Vue.http.interceptors.push((request, next)=>{
  next((response)=>{
    if (request.after){
      request.after.call(this, response)
    }
  })
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
