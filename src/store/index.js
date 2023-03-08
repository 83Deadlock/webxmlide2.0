import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state: { 
    count: 1, // Test variable for numbers
    mensagem: "default", // Test variable for strings
    xml_code: "", // Stores the XML Editors code
    dtd_code: "", // Stores the DTD Editors code
    dtd_active: true,
    xsd_active: false,
    xslt_active: false,
    xpath_active: false,
    xml_filename: "", // Stores the XML Filename
    dtd_filename: "", // Stores the DTD Filename
    xsd_filename: "", // Stores the XSD Filename
    xslt_filename: "", // Stores the XSLT Filename
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
    updateDTDCode(state, code){
      state.dtd_code = code;
      console.log("DTD CODE IN STORE CHANGED");
    },
    changeXMLFilename(state, value){
      state.xml_filename = value;
    },
    changeDTDFilename(state,value){
      state.dtd_filename = value;
    },
    changeXSDFilename(state,value){
      state.xsd_filename = value;
    },
    changeXSLTFilename(state,value){
      state.xslt_filename = value;
    },
    activateDTD(state){
      state.dtd_active = true;
      state.xsd_active = state.xslt_active = state.xpath_active = false;
    },
    activateXSD(state){
      state.xsd_active = true;
      state.dtd_active = state.xslt_active = state.xpath_active = false;
    },
    activateXSLT(state){
      state.xslt_active = true;
      state.xsd_active = state.dtd_active = state.xpath_active = false;
    },
    activateXPath(state){
      state.xpath_active = true;
      state.xsd_active = state.xslt_active = state.dtd_active = false;
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState()],
});

export default store;
