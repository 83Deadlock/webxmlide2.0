const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const Libxml = require('node-libxml');
const { type } = require('os');

const validator = new Libxml();

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello from the server!');
});

const port = process.env.PORT || 3000;

app.post('/xml-wellformed', async (req, res) => {
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

    logStr += "\n\t[XML IS NOT WELL FORMED]";

    validator.freeXml();
    console.log(logStr);

    res.send({ wellFormed: false, errors: WellFormedErrorsStr });
  } else {
    logStr += "\n\t[XML WELL-FORMED]";
    console.log(logStr);
    console.log('-#-#-#-#-#-#-#-#-#');
    res.send({ wellFormed: true, errors: [] });
  }

});

app.post('/validate-dtd', async (req, res) => {
  let logStr = "\n\n\nPOST ON /validate-dtd";
  const xml = req.body.xml_code;
  const dtd = req.body.dtd_code;
  let dtdFileName = req.body.dtd_filename;

  if (dtdFileName == '') {
    dtdFileName = "Example.dtd";
  }

  try {

    // Creating DTD Temp file

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

    // Analyzing XML

    let xmlIsWellFormed = validator.loadXmlFromString(xml);

    let xmlWellFormedFlag = false;

    if (validator.wellformedErrors) {
      logStr += "\n\t[XML LOADING ERROR]";
    } else {
      logStr += "\n\t[XML LOADING SUCESSFUL]";
      xmlWellFormedFlag = true;
    }

    //END

    // Analyzing DTD

    validator.loadDtds([dtd_path]);
    let dtdCorrectFlag = false;
    let dtdErrorsStrArr = [];
    if (validator.dtdsLoadedErrors) {
      logStr += "\n\t[DTD PARSING ERROR]";
      let dtdErrors = validator.dtdsLoadedErrors;
      dtdErrors.forEach(function (obj) {
        if (typeof (obj) != "string") {
          let errorStr = obj.message.trim();
          errorStr += " at Line " + obj.line + ", Column " + obj.column;
          dtdErrorsStrArr.push(errorStr);
        }
      });
    } else {
      logStr += "\n\t[DTD PARSING SUCESS]";
      dtdCorrectFlag = true;
    }

    //End

    // Checking if XML and DTD are linked

    let dtdCodeLines = dtd.split('\n');
    let dtdLines = dtdCodeLines.filter((line) => line.startsWith("<!ELEMENT"));
    const elementRegex = /<!ELEMENT\s(\w+)\s/;
    const elemsMap = new Map();
    let elems = [];
    dtdLines.forEach(function (line) {
      let match = line.match(elementRegex);
      elems.push(match[1]);
      elemsMap.set(match[1], 0);
    });
    let xmlElements = dtdLines.join();

    elems.forEach(function (elem) {
      let regex = new RegExp(elem, "g")
      var count = (xmlElements.match(regex) || []).length;
      elemsMap.set(elem, count);
    });

    // Min gets the element less mentioned which will be the root element
    const min = [...elemsMap.entries()].reduce((accumulator, element) => {
      return element[1] < accumulator[1] ? element : accumulator;
    });

    let nodeElement = min[0];

    let strExp = '<!DOCTYPE ' + nodeElement + ' SYSTEM "' + dtdFileName + '">'

    let xmlCodeLines = xml.split('\n');

    const xmlLines = xmlCodeLines.filter((str) => str !== ''); // Removes any empty lines

    let xmlToDdtLinkFlag = false;

    // The DTD link should be the second line in the XML Document

    if (xmlLines.length > 1) {
      const dtdLinkLine = xmlLines[1];
      if (dtdLinkLine == strExp) {
        xmlToDdtLinkFlag = true;
        logStr += "\n\t[XML AND DTD ARE LINKED]";
      } else {
        logStr += "\n\t[XML AND DTD ARE NOT LINKED]";
      }
    }

    //END

    // Validating XML against DTD

    let isValid = validator.validateAgainstDtds();
    let validationErrorsStr = [];

    if (isValid) {
      isValid = true;
      console.log("TESTE DE TRUE", isValid)
      logStr += "\n\t[XML VALID AGAINST DTD]";
    } else if (dtdCorrectFlag) {
      logStr += "\n\t[XML INVALID AGAINST DTD]";
      let validationErrorsTmp = validator.validationDtdErrors[dtd_path];

      validationErrorsTmp.forEach(function (obj) {
        if (typeof (obj) != "string") {
          let errorStr = obj.message.trim();
          errorStr += " at Line " + obj.line + ", Column " + obj.column;
          validationErrorsStr.push(errorStr);
        }
      });
    } else {
      isValid = false;
      logStr += "\n\t[XML INVALIDATION FAILED AGAINST INCORRECT DTD]";
    }

    validator.freeXml();
    validator.freeDtds();

    let responseObject = {
      xml_wellformed: xmlWellFormedFlag,
      dtd_correct: dtdCorrectFlag,
      xml_to_dtd_link: xmlToDdtLinkFlag,
      xml_valid_on_dtd: isValid,
      dtd_errors: dtdErrorsStrArr,
      validation_errors: validationErrorsStr
    };

    console.log(logStr);
    console.log("\n\t[SERVER RESPONSE] ", responseObject);
    console.log('-#-#-#-#-#-#-#-#-#');
    res.send(responseObject);

  } catch (error) {
    console.error(error);
    res.send({ valid: false, correct: false });
  }
});

app.post('/dtd-to-xsd', async (req, res) => {
  let logStr = "\n\n\nPOST ON /dtd-to-xsd";
  const dtd = req.body.dtd_code;
  let dtdFileName = req.body.dtd_filename;

  if (dtdFileName == '') {
    dtdFileName = "Example.dtd";
  }

  let xsdFileName = dtdFileName.replace(".dtd", ".xsd");

  try {

    // Creating DTD Temp file and XSD Path

    const dtd_path = path.join(__dirname, 'temp', dtdFileName);
    const xsd_path = path.join(__dirname, 'temp', xsdFileName);

    const jar_path = path.join(__dirname, 'trang.jar');

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

    const { exec } = require('child_process');

    exec(`java -jar ${jar_path} ${dtd_path} ${xsd_path}`, (err, stdout, stderr) => {
      if (err) {
        console.error(`Trang execution failed: ${err}`);
        return;
      }
      console.log("SUCCESS!");
    });

    let result = fs.readFileSync(xsd_path).toString();
    res.send({ xsd_code: result, xsd_filename: xsdFileName });

  } catch (error) {
    console.error(error);
    res.send({ xsd_code: '', xsd_filename: '' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});