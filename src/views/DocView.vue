<template>
    <div class="single-row-cards">
      <div class="card">
        <div class="card-title">
          <h1>XML</h1>
        </div>
        <button role="link"
      @click="openInNewTab('https://www.w3schools.com/xml/')">XML Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>DTD</h1>
        </div>
        <button role="link"
      @click="openInNewTab('https://www.w3schools.com/xml/xml_dtd_intro.asp')">DTD Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XSD</h1>
        </div>
        <button role="link"
      @click="openInNewTab('https://www.w3schools.com/xml/schema_intro.asp')">XSD Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XSLT</h1>
        </div>
        <button role="link"
      @click="openInNewTab('https://www.w3schools.com/xml/xsl_intro.asp')">XSLT Tutorial</button>
      </div>
      <div class="card">
        <div class="card-title">
          <h1>XPath</h1>
        </div>
        <button role="link"
      @click="openInNewTab('https://www.w3schools.com/xml/xpath_intro.asp')">XPath Tutorial</button>
      </div>
    </div>  
</template>
<script>
export default {
  methods: {
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
  },
};
</script>
<style scoped>

.single-row-cards{
  font-family: "Euclid";
  display: grid;

  grid-template-columns: repeat(5, 1fr);

  grid-auto-rows: auto;

  grid-gap: 1rem;

  margin: 30px;
}

.card{
  background-color: #3c3c3c;

  border-radius: 4px;

  padding: .5rem;

  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  text-align: center;

  top:40px;
}

.card-title{
  text-align: center;
  border-bottom: #272727 1px solid;
  margin-bottom:25px;
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

button:hover{
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>