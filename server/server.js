const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Libxml = require('node-libxml');

const validator = new Libxml();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello from the server!');
});

const port = process.env.PORT || 3000;

app.post('/xml-wellformed', async(req, res) => {
  let logStr = "\n\n\nPOST ON /xml-wellformed";
  const xml = req.body.xml_code;

  let xmlWellFormed = validator.loadXmlFromString(xml);

  if (validator.wellformedErrors) {
    let WellFormedErrors = validator.wellformedErrors;
    let WellFormedErrorsStr = [];

    WellFormedErrors.forEach(function (obj) {
      let errorStr = obj.message.trim();
      errorStr += " at Line " + obj.line + ", Column " + obj.column;
      WellFormedErrorsStr.push(errorStr);
    });

    logStr += "\n\t[XML WELL FORMED] -> false";
    logStr +=  "\n\t\t[ERRORS]";
    
    WellFormedErrorsStr.forEach(function(str){
      logStr += "\n\t\t\t" + str;
    });

    validator.freeXml();
    console.log(logStr);

    res.send({ wellFormed: false, errors: WellFormedErrorsStr });    
  } else {
    logStr += "\n\t[XML WELL-FORMED] -> " + xmlWellFormed.toString();
    console.log(logStr);
    res.send({ wellFormed: true, errors: []});    
  }


});

app.post('/validate-dtd', async (req, res) => {
  let logStr = "\n\n\nPOST ON /validate-dtd";
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
          logStr += "\n\t[DTD Temp File Saved]";
          resolve();
        }
      });
    });

    let xmlIsWellFormed = validator.loadXmlFromString(xml);

    if (validator.wellformedErrors) {
      logStr += "\n\t[XML LOADING ERROR] " + validator.wellformedErrors;
    } else {
      logStr += "\n\t[XML LOADING SUCESSFUL] " + xmlIsWellFormed;
    }

    validator.loadDtds([dtd_path]);

    if (validator.dtdsLoadedErrors) {
      logStr += "\n\t[DTD LOADING ERROR] " + validator.dtdsLoadedErrors;
      correctFlag = false;
    } else {
      logStr += "\n\t[DTD LOADING SUCESS]";
      correctFlag = true;
    }

    const isValid = validator.validateAgainstDtds();

    validator.freeXml();
    validator.freeDtds();

    if (isValid) {
      logStr += "\n\t[XML VALID AGAINST DTD]";
      //console.log(logStr);
      res.send({ valid: true, correct: correctFlag });
    } else {
      logStr += "\n\t[XML INVALID AGAINST DTD] -> " + validator.validationDtdErrors;
      //console.log(logStr);
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