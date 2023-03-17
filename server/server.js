const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Libxml = require('node-libxml');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req, res) => {
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


app.post('/validate-dtd', async (req, res) => {
  const xml = req.body.xml_code;
  const dtd = req.body.dtd_code;
  const dtdFileName = req.body.dtd_filename;

  try {
    let correctFlag = false;

    const dtd_path = path.join(__dirname, 'temp', dtdFileName);

    if (!fs.existsSync(path.join(__dirname, 'temp'))) {
      fs.mkdirSync(path.join(__dirname, 'temp'));
    }

    await new Promise((resolve, reject) => {
      fs.writeFile(dtd_path, dtd, function (err) {
        if (err) {
          reject(err);
        } else {
          console.log("[DTD Temp File SAVED!]");
          resolve();
        }
      });
    });

    const validator = new Libxml();

    let xmlIsWellFormed = validator.loadXmlFromString(xml);

    if (validator.wellformedErrors) {
      console.log("[XML LOADING ERROR] ", validator.wellformedErrors);
    } else {
      console.log("[XML LOADING SUCCESSFUL]: ", xmlIsWellFormed);
    }

    validator.loadDtds([dtd_path]);

    if (validator.dtdsLoadedErrors) {
      console.log("[DTD LOADING ERROR] ", validator.dtdsLoadedErrors);
      correctFlag = false;
    } else {
      console.log("[DTD LOADING SUCCESS]");
      correctFlag = true;

    }

    const isValid = validator.validateAgainstDtds();

    validator.freeXml();
    validator.freeDtds();

    if (isValid) {
      console.log("[XML VALID AGAINST DTD]");
      res.send({ valid: true, correct: correctFlag });
    } else {
      console.log(validator.validationDtdErrors);
      res.send({ valid: false, correct: correctFlag });
    }

    fs.unlinkSync(dtd_path);
  } catch (error) {
    console.error(error);
    res.send({ valid: false, correct: false });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});