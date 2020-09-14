import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    messageStore: '',
    numeroStrore:'',
    supprimerStore: false
  },
  mutations: {
    initializeStoreState(){
      this.state.messageStore= '';
      this.state.numeroStrore = '';
      this.state.supprimerStore = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
