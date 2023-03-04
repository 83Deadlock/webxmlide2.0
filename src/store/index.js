import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: { 
    count: 1, // Test variable for numbers
    mensagem: "default", // Test variable for strings
    xml_code: "", // Stores the XML Editors code
    xml_filename: "", // Stores the XML Filename
  },
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
    },
    changeXMLFilename(state, value){
      state.xml_filename = value;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});

export default store;
