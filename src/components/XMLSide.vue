<template>
    <div class="xml-side">
        <div class="xml-top">
            <div class="xml-selector">
                <p id="xml-tag">XML</p>
                <i id="sep" class="fa-solid fa-chevron-right"></i>
                <input @blur="fileNameOnBlur" v-model="inputValue" ref="input" id="fileName" type="text" placeholder="Example.xml">
                <div v-if="hasError" class="error-icon" @mouseover="showErrorMessage" @mouseleave="hideErrorMessage">
                    <i class="fas fa-times"></i>
                    <div class="error-message" ref="errorMessage">File name should end with ".xml"</div>
                </div>
                <div v-else class="success-icon">
                    <i class="fas fa-check"></i>
                </div>
            </div>
            <div class="upload-download-buttons">
                <button id="upload_button" type="button" @click="handleUploadButtonClick"><i class="fas fa-upload"></i></button>
                <button id="download_button" type="button" @click="handleDownloadButtonClick" :disabled="hasError"><i class="fas fa-download"></i></button>
            </div>
            <!--Hidden file input to handle responding to the button click on the upload button-->
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileInputChange" accept=".xml" />
        </div>
        <div class="xml-middle">
            <XMLEditor :xml-code="xmlCode"/>
        </div>
        <div class="xml-bottom">
            <div class="hints">
                <div class="hint-icon" @mouseenter="showHints" @mouseleave="hideHints">
                    <i class="fa fa-question-circle"></i>
                </div>
                <div class="hints-box" :class="{ active: showHintsBox }">
                    <div class="hint-text">
                        <p>[Alt+Q] Fold at Cursor Level</p>
                        <p>[Alt+X] Insert XML Declaration</p>
                        <p>[Alt+I] Auto Indentation</p>
                        <p>[Ctrl+Space] Code Suggestion</p>
                    </div>
                </div>
            </div>
            <div class="xml-status">
                <button :class="{ 'well-formed': isWellFormed, 'not-well-formed': !isWellFormed }" :disabled="true">{{ buttonMessage }}</button>
                <div class="wellformed_error" v-html="wellFormedErrorMessage"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import XMLEditor from './XMLEditor.vue';
// import libxmljs from 'libxmljs';

export default {
    name: 'XMLSide',
    data() {
        return {
            inputValue: '',
            xmlCode: '',
            showHintsBox: false,
            syntaxErrors: false,
            xmlDeclPresent: false,
        };
    },
    computed: {
        ...mapState(["xml_filename","xml_code"]),
        hasError() {
            return this.inputValue && !this.inputValue.endsWith('.xml') && this.inputValue.length > 0;
        },
        isWellFormed() {
            return this.checkXMLWellFormed(this.xml_code);
        },
        buttonMessage() {
            return this.isWellFormed ? "Well-Formed XML" : "XML is not Well-Formed";
        },
        xmlCodeWatcher() {
            return this.xml_code;
        },
        wellFormedErrorMessage(){
            var str = ''
            if(!this.xmlDeclPresent){
                str += '<span>Missing XML Declaration &nbsp;</span>'
                str += '<i style="color: red;" class="fas fa-times"></i><br>'
            } else {
                str += '<span>XML Declaration &nbsp;</span>'
                str += '<i style="color: #0092b2; padding-top: 1px;" class="fas fa-check"></i><br>'
            }
            if(this.syntaxErrors){
                str += '<span>Syntax Errors Found &nbsp;</span>'
                str += '<i style="color: red;" class="fas fa-times"></i>'
            } else {
                str += '<span>No Syntax Errors &nbsp;</span>'
                str += '<i style="color: #0092b2; padding-top: 1px;" class="fas fa-check"></i><br>'
            }
            return str
        }
    },
    components: {
        XMLEditor
    },
    methods: {
        ...mapMutations(["changeXMLFilename"]),
        showHints(){
            this.showHintsBox = true;
        },
        hideHints(){
            this.showHintsBox = false;
        },
        fileNameOnBlur() {
            const inputElement = this.$refs.input;
            this.$store.commit("changeXMLFilename", this.inputValue);
            // Set the cursor position to the beginning of the inserted value
            inputElement.setSelectionRange(0, 0);
        },
        showErrorMessage() {
            this.$refs.errorMessage.style.display = 'block';
        },
        hideErrorMessage() {
            this.$refs.errorMessage.style.display = 'none';
        },
        handleUploadButtonClick() {
            // Open the file input dialog
            this.$refs.fileInput.click();
        },
        handleFileInputChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                // Set the value of the editor to the file content
                //this.$store.commit("updateXMLCode", content);
                this.xmlCode = content;
                console.log("xmlCode: ", this.xmlCode);
                // Update the input value to match the file name
                this.inputValue = file.name;
                this.$store.commit("changeXMLFilename", this.inputValue);
            };
            reader.readAsText(file);
        },
        handleDownloadButtonClick(){
            const code = this.xml_code;
            var filename = this.inputValue;

            if(filename == ''){
                filename = 'Example.xml';
            }

            // Create a new blob from the XML code
            const blob = new Blob([code], { type: 'text/xml' });

            // Create a link element to download the file
            const link = document.createElement('a');
            link.download = filename;
            link.href = window.URL.createObjectURL(blob);
            link.click();
        },
        checkXMLWellFormed(xmlCode) {
            const firstLine = xmlCode.split('\n')[0];
            const isXmlDeclaration = /^\s*<\?xml\s/.test(firstLine);

           if(!isXmlDeclaration){
                this.xmlDeclPresent = false;
            } else {
                this.xmlDeclPresent = true;
            }

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlCode, "application/xml");
            const parseErrors = xmlDoc.querySelectorAll("parsererror");

            const errorMsgs = [];

            if(parseErrors.length > 0){
                for(let i = 0; i < parseErrors.length; i++) {
                    console.log(i);
                    const error = parseErrors[i];
                    errorMsgs.push(error.textContent.trim());
                }
            }

            if(parseErrors.length != 0){
                this.syntaxErrors = true;
            } else {
                this.syntaxErrors = false;
            }

            console.log("syntaxErrors: ", this.syntaxErrors);
            console.log("isXMLDecl: ", this.xmlDeclPresent);

            return parseErrors.length == 0 && isXmlDeclaration;
        },
    },
    mounted() {
        this.inputValue = this.xml_filename;
    },
    watch: {
        xmlCodeWatcher(){
            const xmlCode = this.xml_code;
            if(xmlCode){
                this.checkXMLWellFormed(xmlCode);
            }
        }
    }
}
</script>

<style scoped>
.upload-download-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 0px;
    align-items: center;
}

#upload_button,
#download_button {
    background-color: transparent;
    border: none;
    color: #bbbbbb;
    transition: all 0.15s cubic-bezier(.25, .50, .75, 1);
}

#upload_button:hover,
#download_button:hover {
    color: #0092b2;
    cursor: pointer;
}

#download_button:disabled {
    color: #3c3c3c;
    cursor: default;
}

#download_button:not([disabled]):hover {
    color: #0092b2;
    cursor: pointer;
}

.xml-side {
    width: calc(50% - 60px);
    padding-right: 30px;
    padding-left: 30px;
    height: 100%;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    background-color: transparent;
}

.xml-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    /*padding-left: 30px;*/
    font-family: "Euclid";

}

.xml-selector {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
}

#sep,
#xml-tag {
    color: #0092b2;
    font-weight: bold;
    vertical-align: baseline;
    font-size: 16px;
    cursor: default;
}

#fileName {
    background-color: transparent;
    border: none;
    color: #bbbbbb;
    vertical-align: middle;
    font-size: 16px;
    overflow: scroll;
    text-align: left;
    font-family: "Euclid";
    width: 180px;
}

#fileName:focus {
    outline: none;
    /* this will change the background color of the input when active */
    box-shadow: none;
    /* this will change the border color of the input when active */
}

.xml-middle {
    background-color: transparent;
    height: 65vh;
    /*padding-left: 30px;*/
}

.xml-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    /*padding-left: 30px;*/
    font-family: "Euclid";
}
/*
#xml-status {
    background-color: #111111;
    padding: 10px;
    border-radius: 30px;
    font-size: 16px;
    font-weight: 100;
    outline: 1px solid #0092b2;
    vertical-align: middle;
    padding-top: 15px;
    color: #0092b2;
    transition: all 0.1s cubic-bezier(.25, .50, .75, 1);
}

#xml-status:hover {
    background-color: #0092b2;
    outline: 1px solid #111111;
    color: #111111;
}
*/
#tip {
    font-size: 12px;
    color: #3c3c3c;
}

.error-icon,
.success-icon {
    position: relative;
    left: 0;
}

.error-icon:hover .error-message {
    display: block;
}

.error-message {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #c7c7c7;
    color: #111111;
    width: 140px;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
    z-index: 9999;
    font-size: 14px;
}

.success-icon {
    color: #0092b2;
}

.error-icon {
    color: red;
}

.well-formed {
  background-color: #0092b2;
  color: #111111;
  border: 1px solid #111111;
}
.not-well-formed {
  background-color: #111111;
  color: #0092b2;
  border: 1px solid #0092b2;
}
button:disabled {
  cursor: default;
}

.xml-status {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    gap: 5px;
    text-align: right;
}

.xml-status > button{
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}


.hints {
  display: inline-block;
  position: relative;
}

.hint-icon {
  display: inline-block;
  color:#bbbbbb;
  padding-top: 10px;
  transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.hint-icon:hover {
    color: #3c3c3c;
}

.hints-box {
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
  display: none;
  position: absolute;
  top: -120px;
  left: -10px;
  width: 180px;
  white-space: pre-wrap;
  padding: 5px;
  border-radius: 0px;
  background-color: #c7c7c7;
  color: #111111;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
}

.hints-box.active {
  display: block;
}

.hint-text {
  font-size: 12px;
  line-height: 1.2;
  margin: 0;
  padding: 0;
}

.wellformed_error {
    color: #7c7c7c;
    padding-right: 5px;
}
</style>