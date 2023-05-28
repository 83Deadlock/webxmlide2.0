<template>
  <div class="about">
    <h1>WEBXMLIDE</h1>
    <div id="features">
      <h3>&lt; <span>Features</span> ></h3>
      <p>This application supports <span>XML</span>, <span>DTD</span>, <span>XSD</span>, <span>XSLT</span> & <span>XPath</span>.</p>
      <p>The <span>XML Editor</span> checks if the given <span>XML Document</span> is Well-Formed and reports any syntax errors found. The editor is equipped with <span>Code Suggestions</span>, <span>Syntax Highlighting</span> & <span>Auto-Completion</span>.</p>

      <p>The <span>DTD Editor</span> checks if the given <span>DTD File</span> is correct and reports any syntax errors found. It also checks if the <span>XML Document</span> is <span>valid</span> against the given <span>DTD</span>. The editor can also <span>convert DTD to Schemas (XSD)</span>.</p>

      <p>The <span>XSD Editor</span> checks if the given <span>XML Schema</span> is Well-Formed and reports any syntax errors found. It also checks if the <span>XML Document</span> is <span>valid</span> against the given <span>XSD</span>. The editor is equipped with <span>Code Suggestions</span>, <span>Syntax Highlighting</span> & <span>Auto-Completion</span>.</p>

      <p>The <span>XSLT Editor</span> checks if the given <span>Stylesheet</span> is Well-Formed and reports any syntax errors found. It also allows the user to <span>generate a preview</span>. The editor is equipped with <span>Code Suggestions</span>, <span>Syntax Highlighting</span> & <span>Auto-Completion</span>.</p>

      <p>The <span>XPath Editor</span> runs the given <span>XPath Expressions</span>on the <span>XML Documents</span> and presents the results to the user.</p>

      <p>You can <span>load/save all your files individually</span> or you can use the <span>project upload and download</span> feature!</p>


      <h3>&lt;/ <span>Features</span> ></h3>
    </div>
    <div id="authors">
      <h3>&lt; <span>Authors</span> ></h3>
      <p>This application was developed as a <span>Master Thesis Project</span> at <span>Univesidade do Minho</span></p>
      <p>José Pedro Ferreira<br>José Carlos Ramalho<br>Pedro Rangel Henriques</p>
      <h3>&lt;/ <span>Authors</span> ></h3>
    </div>
  </div>
</template>

<style scoped>
.about{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50vw;
  padding-left: 25vw;
  text-align: center;
  font-family: 'Euclid';
  gap: 3vh;
}

h1 {
  font-size: 56px;
  color: #0092b2;
  padding-bottom: 10px;
  border-bottom: #0092b2 2px solid;
  margin-bottom: 0;
}

h3{
  font-size: 36px;
  color: #0092b2;
  margin: 0;
}

h3 > span {
  color: #bbbbbb;
}

p {
  font-size: 18px;
}

p > span {
  color: #0092b2;
}

#features {
  border-bottom: #111111 1px solid;
  padding-bottom: 3vh;
}

#authors{
  margin-bottom: 8vh;
}

#authors > p {
  width: 30vw;
}
</style>