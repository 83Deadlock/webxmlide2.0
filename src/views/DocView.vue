<template>
  <div class="docs">
    <h1 id="tutorials">Tutorials</h1>
    <div class="single-row-cards">
      <div class="card">
        <div class="card-title">
          <h1>XML</h1>
        </div>
        <button role="link" @click="openInNewTab('https://www.w3schools.com/xml/')">XML Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>DTD</h1>
        </div>
        <button role="link" @click="openInNewTab('https://www.w3schools.com/xml/xml_dtd_intro.asp')">DTD Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XSD</h1>
        </div>
        <button role="link" @click="openInNewTab('https://www.w3schools.com/xml/schema_intro.asp')">XSD Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XSLT</h1>
        </div>
        <button role="link" @click="openInNewTab('https://www.w3schools.com/xml/xsl_intro.asp')">XSLT Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XPath</h1>
        </div>
        <button role="link" @click="openInNewTab('https://www.w3schools.com/xml/xpath_intro.asp')">XPath Tutorial</button>
      </div>
    </div>
    <h1 id="examples">Examples</h1>
    <div class="single-row-cards">
      <div class="card">
        <div class="card-title">
          <h1>Bookstore</h1>
        </div>
        <button role="link" @click="bookstoreClick">Show Example</button>
      </div>
      <!--<div class="card">
        <div class="card-title">
          <h1>PRH_EXample</h1>
        </div>
        <button role="link" @click="bookstoreClick">Show Example</button>
      </div>-->
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations(["updateXMLCode", "updateDTDCode", "updateXSDCode", "updateXSLTCode", "changeXMLFilename","changeDTDFilename", "changeXSDFilename", "changeXSLTFilename"]),
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
    async bookstoreClick() {

      const response = await fetch('http://localhost:3000/bookstore-example', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let data = await response.json();

      let xml_code = data.xml_code;
      let xml_filename = data.xml_filename;
      this.$store.commit("updateXMLCode", xml_code);
      this.$store.commit("changeXMLFilename", xml_filename);


      let dtd_code = data.dtd_code;
      let dtd_filename = data.dtd_filename;
      this.$store.commit("updateDTDCode", dtd_code);
      this.$store.commit("changeDTDFilename", dtd_filename);

      let xsd_code = data.xsd_code;
      let xsd_filename = data.xsd_filename;
      this.$store.commit("updateXSDCode", xsd_code);
      this.$store.commit("changeXSDFilename", xsd_filename);

      let xslt_code = data.xslt_code;
      let xslt_filename = data.xslt_filename;
      this.$store.commit("updateXSLTCode", xslt_code);
      this.$store.commit("changeXSLTFilename", xslt_filename);

      this.$router.push({ name: 'home' });

    }
  },
};
</script>
<style scoped>
.docs {
  display: flex;
  flex-direction: column;
  font-family: 'Euclid';
  margin-bottom: 3vh;
}

.docs>h1 {
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 0;
}

.single-row-cards {
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  grid-auto-rows: auto;

  grid-gap: 1rem;

  margin: 30px;
}

.card {
  background-color: #3c3c3c;

  border-radius: 4px;

  padding: .5rem;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  text-align: center;

  top: 40px;
}

.card-title {
  text-align: center;
  border-bottom: #272727 1px solid;
  margin-bottom: 25px;
}

button {
  font-family: "Euclid";
  font-weight: lighter;
  border-radius: 40px;
  padding: 10px 20px;
  transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
  margin-bottom: 20px;
  background-color: #0092b2;
  color: #111111;
  border: 1px solid #111111;
  font-size: large;
  cursor: pointer;
}

button:hover {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>