import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: { count: 1, mensagem: "isto é um teste" },
  getters: {},
  mutations: {
    increment(state) {
      state.count++;
    },
    changeMessage(state) {
      state.mensagem = "Filipa";
    },
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});

export default store;
