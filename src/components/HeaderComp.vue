<template>
  <nav>
    <img alt="Logo" src="@/assets/icon.png">

    <div id="menu">
      <router-link to="/">Editor</router-link>
      <router-link to="/doc">Docs</router-link>
      <router-link to="/about">About</router-link>

      <div id="project_buttons">
        <button @click="onClickDownload" class="btn">Download</button>
        <button @click="onClickUpload" class="btn">Upload</button>
      </div>
    </div>

    <!-- Download Modal -->
    <div v-if="showDownloadModal" class="modal" @click.self="closeModal">
      <div class="modal-content" tabindex="0" @keydown.esc="closeModal">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Which files do you want to include in your download?</h3>
        <div class="project-input">
          <label for="projectName">Project Name:</label>
          <input type="text" id="projectName" v-model="projectName" ref="input" @blur="fileNameOnBlur"
            placeholder="Example" />
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="includeXML" />
            XML ({{ xml_filename }})
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="includeDTD" />
            DTD ({{ dtd_filename }})
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="includeXSD" />
            XSD ({{ xsd_filename }})
          </label>
        </div>
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="includeXSLT" />
            XSLT ({{ xslt_filename }})
          </label>
        </div>
        <div class="modal-bot">
          <span class="Esc">Press 'Esc' to close</span>
          <button @click="downloadFiles" class="btn">Download</button>
        </div>

      </div>
    </div>

    <!-- Custom modal -->
    <div v-if="uploadFinished" class="modalR">
      <div class="modalR-content">
        <h3>Upload Finished!</h3>
        <p>Refresh the page to see the uploaded content.</p>
        <div class="RefreshButton">

          <button @click="refreshPage">Refresh</button>
        </div>

      </div>
    </div>
  </nav>
</template>

<script>

import { mapState, mapMutations } from 'vuex';
import JSZip from 'jszip';

export default {
  name: 'HeaderComp',
  computed: {
    ...mapState([
      'xml_filename',
      'dtd_filename',
      'xsd_filename',
      'xslt_filename',
      'xml_code',
      'dtd_code',
      'xsd_code',
      'xslt_code'
    ])
  },
  data() {
    return {
      showDownloadModal: false,
      includeXML: false,
      includeDTD: false,
      includeXSD: false,
      includeXSLT: false,
      uploadFinished: false
    };
  },
  methods: {
    ...mapMutations(["updateXMLCode", "updateDTDCode", "updateXSDCode", "updateXSLTCode", "changeXMLFilename", "changeDTDFilename", "changeXSDFilename", "changeXSLTFilename"]),
    fileNameOnBlur() {
      const inputElement = this.$refs.input;
      inputElement.setSelectionRange(0, 0);
    },
    onClickDownload() {
      this.showDownloadModal = true;
    },
    closeModal() {
      console.log('ESC worked');
      this.showDownloadModal = false;
    },
    onClickUpload() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.zip';
      input.addEventListener('change', this.handleFileUpload);
      input.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const zipContent = reader.result;
        this.processZipFile(zipContent);
      };
      reader.readAsArrayBuffer(file);
    },
    downloadFiles() {

      let projectName = this.projectName.trim();
      if (!projectName) {
        projectName = 'Example';
      }
      // Construct an array with selected file types
      const selectedFiles = [];
      if (this.includeXML) selectedFiles.push({ name: this.xml_filename, content: this.xml_code });
      if (this.includeDTD) selectedFiles.push({ name: this.dtd_filename, content: this.dtd_code });
      if (this.includeXSD) selectedFiles.push({ name: this.xsd_filename, content: this.xsd_code });
      if (this.includeXSLT) selectedFiles.push({ name: this.xslt_filename, content: this.xslt_code });

      // Perform the download action
      // Replace with your actual download implementation
      if (selectedFiles.length == 0) {
        alert('You need to select at least one file to be downloaded!');
      } else {
        const zip = new JSZip();
        const srcFolder = zip.folder('src');
        selectedFiles.forEach((file) => {
          srcFolder.file(file.name, file.content);
        });

        const manifest = `<?xml version="1.0" encoding="UTF-8"?><project name="${projectName}"><src>${selectedFiles.map((file) => `<${file.name.split('.')[1]}>${file.name}</${file.name.split('.')[1]}>`).join('')}</src></project>`;

        zip.file('manifest.xml', manifest);
        zip.generateAsync({ type: 'blob' }).then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${projectName}.zip`;
          a.click();
          window.URL.revokeObjectURL(url);
        });

        // Close the modal
        this.showDownloadModal = false;
      }

    },
    processZipFile(zipContent) {
      JSZip.loadAsync(zipContent)
        .then((zip) => {
          const manifest = zip.file('manifest.xml');
          const srcFolder = zip.folder('src');

          if (!manifest || !srcFolder) {
            alert('Invalid project structure. Please upload a valid .zip file.');
            return;
          }

          manifest.async('text').then((manifestContent) => {
            // Parse the manifest.xml content
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(manifestContent, 'text/xml');
            //const projectName = xmlDoc.querySelector('project').getAttribute('name');
            const srcFiles = xmlDoc.querySelectorAll('src > *');

            // Check if the src folder contains all the files mentioned in the manifest
            const missingFiles = Array.from(srcFiles).filter((file) => !srcFolder.file(file.textContent));
            if (missingFiles.length > 0) {
              const missingFileNames = Array.from(missingFiles).map((file) => file.textContent).join(', ');
              alert(`The following files mentioned in the manifest are missing in the src folder: ${missingFileNames}`);
              return;
            }

            // Update component data based on src files and manifest
            this.updateComponentData(srcFolder, srcFiles);
          });
        })
        .catch((error) => {
          console.error('Error loading the zip file:', error);
          alert('An error occurred while processing the zip file. Please try again.');
        });
    },
    updateComponentData(srcFolder, srcFiles) {
      // Clear existing component data if necessary
      this.clearComponentData();

      // Update component data based on src files and manifest
      srcFiles.forEach((file) => {
        const fileType = file.tagName;
        const fileName = file.textContent;
        const fileContentPromise = srcFolder.file(fileName).async('text');

        switch (fileType) {
          case 'xml':
            fileContentPromise.then((content) => {
              this.updateXMLCode(content);
              this.changeXMLFilename(fileName);
            });
            break;
          case 'dtd':
            fileContentPromise.then((content) => {
              this.updateDTDCode(content);
              this.changeDTDFilename(fileName);
            });
            break;
          case 'xsd':
            fileContentPromise.then((content) => {
              this.updateXSDCode(content);
              this.changeXSDFilename(fileName);
            });
            break;
          case 'xslt':
            fileContentPromise.then((content) => {
              this.updateXSLTCode(content);
              this.changeXSLTFilename(fileName);
            });
            break;
          default:
            break;
        }

      });

      this.uploadFinished = true;
    },
    clearComponentData() {
      // Clear existing component data
      this.updateXMLCode('');
      this.changeXMLFilename('');
      this.updateDTDCode('');
      this.changeDTDFilename('');
      this.updateXSDCode('');
      this.changeXSDFilename('');
      this.updateXSLTCode('');
      this.changeXSLTFilename('');
    },
    refreshPage() {
      // Reload the page to see the uploaded content
      location.reload();
      this.uploadFinished = false;
    }
  }
}
</script>

<style scoped>
nav {
  padding: 20px;
  background-color: #111111;
  text-align: right;
  font-family: "Euclid";
}

nav img {
  position: absolute;
  left: 30px;
  top: 20px;
  height: 40px;
}

nav a {
  font-weight: bold;
  color: #7c7c7c;
  top: 10px;
  text-decoration: none;
  transition: all 0.1s cubic-bezier(.25, .50, .75, 1);
}

nav a:hover {
  color: #bbbbbb;
}

nav a.router-link-exact-active {
  color: #0092b2;
}

nav a.router-link-exact-active:hover {
  color: #0092b2;
}

#menu {
  right: 0;
  display: flex;
  gap: 30px;
  justify-content: flex-end;
  align-items: center;
}

#project_buttons {
  display: flex;
  gap: 20px;
}

button {
  font-weight: bold;
  color: #3c3c3c;
  font-family: "Euclid", Helvetica, Arial;
  padding: 10px;
  border-radius: 20px;
  background-color: #0092b2;
  border: #3c3c3c 2px solid;
  transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.RefreshButton {
  text-align: right;
}

button:hover {
  background-color: black !important;
  cursor: pointer;
  color: #0092b2;
  border: #0092b2 2px solid;

}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modalR {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.modal-content {
  background-color: #272727;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  border-radius: 5px;
}

.modalR-content {
  background-color: #272727;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  border-radius: 5px;
  text-align: left;
}

.checkbox {
  margin-bottom: 10px;
  text-align: left;
}

.close {
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 32px;
  cursor: pointer;
}

.modal-bot {
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  color: #3c3c3c;
  vertical-align: bottom;
}

.modal-bot>span {
  padding-top: 20px;
}

.project-input {
  text-align: left;
  border-bottom: 1px solid #111111;
  padding: 5px;
  margin-bottom: 5px;
  display: flex;
  gap: 5px;
}

#projectName:focus {
  outline: none;
  /* this will change the background color of the input when active */
  box-shadow: none;
  /* this will change the border color of the input when active */
}

#projectName {
  background-color: transparent;
  border: none;
  color: #bbbbbb;
  vertical-align: middle;
  font-size: 16px;
  overflow: scroll;
  text-align: left;
  font-family: "Euclid";
  width: 150px;
  background-color: #111111;
  border-radius: 5px;
}
</style>