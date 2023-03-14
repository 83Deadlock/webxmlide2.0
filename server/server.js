const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const libxmljs = require('libxmljs');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req,res) => {
    res.send('Hello from the server!');
});

const port = process.env.PORT || 3000;

app.post('/test', (req, res) => {
    console.log("\n\n\n\n\n");
    console.log("XMLCode: ", req.body.xml_code);
    console.log("\n\n");
    console.log("DTDCode: ", req.body.dtd_code);
    res.send('Hello World!');
});

app.post('/validateDTD', (req, res) => {
    const dtdCode = req.body.dtd_code;

  try {
    // Create a document object and parse the DTD code
    const xmlDoc = libxmljs.parseXml(`<!DOCTYPE ${dtdCode}>`);
    
    // Get the DTD object and check for syntax errors
    const dtd = xmlDoc.getInternalSubset();
    const syntaxErrors = dtd.validate();

    if (syntaxErrors.length > 0) {
      // Handle any syntax errors
      const errorMessages = syntaxErrors.map(error => error.toString());
      res.status(400).send({ error: errorMessages });
    } else {
      // DTD is valid
      res.send({ message: 'DTD is valid' });
    }
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(400).send({ error: 'Invalid DTD code' });
  }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});