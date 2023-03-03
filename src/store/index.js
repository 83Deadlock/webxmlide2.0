import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: { count: 1, mensagem: "default", xml_code: "" },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    changeMessage(state) {
      state.mensagem = "changed";
    },
    resetMessage(state){
      state.mensagem = "default";
    },
    updateXMLCode(state, code){
      state.xml_code = code;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});

export default store;
