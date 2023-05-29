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
    <h1 id="project-upload">Project Upload</h1>
    <div class="projup">
      <p>To upload a project into the IDE, use the "Upload" button at the top right of the page. 
        <br>The uploaded project should be in a .zip folder. 
        <br>The .zip folder should contain a <span>manifest.xml</span> file and a folder called "src" containing the project files.
        <br> <br>The following project structure should have the given <span>manifest.xml</span>:<br>
        <br><em>bookstore.zip</em><br>
        | -> <b>manifest.xml</b><br>
        | -> <em>src</em><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| -> <b>bookstore.xml</b><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| -> <b>bookstore.dtd</b><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| -> <b>bookstore.xsd</b><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| -> <b>bookstore.xslt</b><br>

      </p>

      <div class="xml-manifest">
        <p>&lt;?xml version="1.0" encoding="UTF-8"?><br>
          <span>&lt;project <span id="attribute">name</span>=<span id="attribute_value">"bookstore"</span>></span><br>
          &nbsp;&nbsp;<span>&lt;src></span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;xml></span>bookstore.xml<span>&lt;/xml></span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;dtd></span>bookstore.dtd<span>&lt;/dtd></span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;xsd></span>bookstore.xsd<span>&lt;/xsd></span><br>
          &nbsp;&nbsp;&nbsp;&nbsp;<span>&lt;xslt></span>bookstore.xslt<span>&lt;/xslt></span><br>
          &nbsp;&nbsp;<span>&lt;/src></span><br>
          <span>&lt;/project></span>
        </p>
      </div>
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
  margin-bottom: 6vh;
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

.projup > p {
  padding-left: 30px;
}

.projup span {
  color: #0092b2;
}

.xml-manifest span {
  color: #0092b2;
}

#attribute {
  color: orangered;
}

#attribute_value {
  color: darkgreen;
}

.xml-manifest{
  background-color: #111111;
  width: 40vw;
  margin-left: 30px;
  padding: 1vh;
}

</style>