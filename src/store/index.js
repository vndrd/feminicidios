import Vue from 'vue'
import Vuex from 'vuex'
import casos from './modules/casos.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    casos,
  }
})
