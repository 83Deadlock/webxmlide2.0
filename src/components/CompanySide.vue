<template>
    <div class="company-side">
        <div class="company-top">
            <div class="company-selectors">
                <div id="dtd_selector">
                    <p @click="dtd_activate" :class="dtdActive ? 'active_selector' : 'inactive_selector'">DTD</p>
                    <i v-if="dtdActive" id="sep" class="fa-solid fa-chevron-right"></i>

                    <input v-if="dtdActive" @blur="fileNameOnBlurDTD" v-model="fileNameDTD" ref="input" id="DTDfileName" type="text"
                        placeholder="Example.dtd">

                    <div v-if="hasErrorDTD && dtdActive" class="error-icon" @mouseover="showErrorMessage" @mouseleave="hideErrorMessage">
                        <i class="fas fa-times"></i>
                        <div class="error-message" ref="errorMessage">File name should end with ".dtd"</div>
                    </div>

                    <div v-if="!hasErrorDTD && dtdActive" class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>
                </div>

                <p :class="dtdActive || xsdActive? 'active_selectors_sep' : 'selectors_sep'">|</p>

                <div id="xsd_selector">
                    <p @click="xsd_activate" :class="xsdActive ? 'active_selector' : 'inactive_selector'">XSD</p>
                    <i v-if="xsdActive" id="sep" class="fa-solid fa-chevron-right"></i>

                    <input v-if="xsdActive" @blur="fileNameOnBlurXSD" v-model="fileNameXSD" ref="input" id="XSDfileName" type="text"
                        placeholder="Example.xsd">

                    <div v-if="hasErrorXSD && xsdActive" class="error-icon" @mouseover="showErrorMessage" @mouseleave="hideErrorMessage">
                        <i class="fas fa-times"></i>
                        <div class="error-message" ref="errorMessage">File name should end with ".xsd"</div>
                    </div>

                    <div v-if="!hasErrorXSD && xsdActive" class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>

                </div>

                <p :class="xsdActive || xsltActive ? 'active_selectors_sep' : 'selectors_sep'">|</p>

                <div id="xslt_selector">
                    <p @click="xslt_activate" :class="xsltActive ? 'active_selector' : 'inactive_selector'">XSLT</p>
                    <i v-if="xsltActive" id="sep" class="fa-solid fa-chevron-right"></i>

                    <input v-if="xsltActive" @blur="fileNameOnBlurXSLT" v-model="fileNameXSLT" ref="input" id="XSLTfileName" type="text"
                        placeholder="Example.xslt">

                    <div v-if="hasErrorXSLT && xsltActive" class="error-icon" @mouseover="showErrorMessage" @mouseleave="hideErrorMessage">
                        <i class="fas fa-times"></i>
                        <div class="error-message" ref="errorMessage">File name should end with ".xslt"</div>
                    </div>

                    <div v-if="!hasErrorXSLT && xsltActive" class="success-icon">
                        <i class="fas fa-check"></i>
                    </div>

                </div>

                <p :class="xpathActive || xsltActive ? 'active_selectors_sep' : 'selectors_sep'">|</p>

                <div id="xpath_selector">
                    <p @click="xpath_activate" :class="xpathActive ? 'active_selector' : 'inactive_selector'">XPath</p>
                </div>
            </div>
            <div v-if="!xpathActive" class="upload-download-buttons">
                <button id="upload_button" type="button" @click="handleUploadButtonClick"><i class="fas fa-upload"></i></button>
                <button id="download_button" type="button" @click="handleDownloadButtonClick" :disabled="hasError"><i class="fas fa-download"></i></button>
            </div>
            <input type="file" ref="fileInput" style="display: none;" @change="handleFileInputChange" :accept="dtdActive ? '.dtd' : (xsdActive ? '.xsd' : '.xslt')" />
        </div>
        <div class="company-mid-bot">
            <DTDComp v-if="dtdActive" :dtd-prop="dtdCode"/>
            <XSDComp v-if="xsdActive" :xsd-prop="xsdCode"/>
            <XSLTComp v-if="xsltActive" :xslt-prop="xsltCode"/>
            <XPathComp v-if="xpathActive"/>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import DTDComp from "./DTDComp.vue";
import XSDComp from "./XSDComp.vue";
import XSLTComp from "./XSLTComp.vue";
import XPathComp from "./XPathComp.vue";

export default {
    name: "CompanySide",
    components: {
        DTDComp,
        XSDComp,
        XSLTComp,
        XPathComp
    },
    data() {
        return {
            dtdActive: true,
            xsdActive: false,
            xsltActive: false,
            xpathActive: false,
            fileNameDTD: '',
            fileNameXSD: '',
            fileNameXSLT: '',
            dtdCode: '',
            xsdCode: '',
            xsltCode: ''
        }
    },
    methods: {
        ...mapMutations(["changeDTDFilename", "changeXSDFilename", "changeXSLTFilename"]),
        dtd_activate() {
            this.dtdActive = true;
            this.xsdActive = this.xsltActive = this.xpathActive = false;
            this.$store.commit("activateDTD");
        },
        xsd_activate() {
            this.xsdActive = true;
            this.dtdActive = this.xsltActive = this.xpathActive = false;
            this.$store.commit("activateXSD");
        },
        xslt_activate() {
            this.xsltActive = true;
            this.dtdActive = this.xsdActive = this.xpathActive = false;
            this.$store.commit("activateXSLT");
        },
        xpath_activate() {
            this.xpathActive = true;
            this.dtdActive = this.xsdActive = this.xsltActive = false;
            this.$store.commit("activateXPath");
        },
        fileNameOnBlurDTD() {
            const inputElement = this.$refs.input;
            this.$store.commit("changeDTDFilename", this.fileNameDTD);
            inputElement.setSelectionRange(0, 0);
        },
        fileNameOnBlurXSD() {
            const inputElement = this.$refs.input;
            this.$store.commit("changeXSDFilename", this.fileNameXSD);
            inputElement.setSelectionRange(0, 0);
        },
        fileNameOnBlurXSLT() {
            const inputElement = this.$refs.input;
            this.$store.commit("changeXSLTFilename", this.fileNameXSLT);
            inputElement.setSelectionRange(0, 0);
        },
        handleUploadButtonClick() {
            this.$refs.fileInput.click();
        },
        handleDownloadButtonClick(){
            var code = '';
            var filename = '';

            if(this.dtdActive){
                code = this.dtd_code;
                filename = this.dtd_filename;
                if(filename == ''){
                    filename = 'Example.dtd';
                }

                const blob = new Blob([code], {type: 'text/dtd'});
                const link = document.createElement('a');
                link.download = filename;
                link.href = window.URL.createObjectURL(blob);
                link.click();

            } else if(this.xsdActive){
                code = this.xsd_code;
                filename = this.xsd_filename;
                if(filename == ''){
                    filename = 'Example.xsd';
                }

                const blob = new Blob([code], {type: 'text/xsd'});
                const link = document.createElement('a');
                link.download = filename;
                link.href = window.URL.createObjectURL(blob);
                link.click();

            } else {
                console.log("NOT IMPLEMENTED YET!");
            }
        },
        handleFileInputChange(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                if(this.dtdActive){
                    this.dtdCode = content;
                    this.fileNameDTD = file.name;
                    this.$store.commit("changeDTDFilename", this.fileNameDTD);
                } else if(this.xsdActive){
                    this.xsdCode = content;
                    this.fileNameXSD = file.name;
                    this.$store.commit("changeXSDFilename", this.fileNameXSD);
                } else {
                    console.log("not implemented yet!");
                }
            };
            reader.readAsText(file);

        },
    },
    computed: {
        ...mapState(["dtd_active","xsd_active","xslt_active","xpath_active","dtd_filename", "xsd_filename", "xslt_filename", "dtd_code", "xsd_code"]),
        hasError() {
            return (this.hasErrorDTD && this.dtdActive) || (this.hasErrorXSD && this.xsdActive) || (this.hasErrorXSLT && this.xsltActive);
        },
        hasErrorDTD() {
            return !this.fileNameDTD.endsWith('.dtd') && this.fileNameDTD.length > 0;
        },
        hasErrorXSD() {
            return !this.fileNameXSD.endsWith('.xsd') && this.fileNameXSD.length > 0;
        },
        hasErrorXSLT() {
            return !this.fileNameXSLT.endsWith('.xslt') && this.fileNameXSLT.length > 0;
        },
    },
    mounted(){
        this.fileNameDTD = this.dtd_filename;
        this.fileNameXSD = this.xsd_filename;
        this.fileNameXSLT = this.xslt_filename;
        this.dtdActive = this.dtd_active;
        this.xsdActive = this.xsd_active;
        this.xsltActive = this.xslt_active;
        this.xpathActive = this.xpath_active;
        this.dtdCode = this.dtd_code;
        this.xsdCode = this.xsd_code;
    },
    watch: {
        dtd_code:{
            handler: function(){
                this.dtdCode = this.dtd_code;
            }
        },
        xsd_code:{
            handler: function(){
                this.xsdCode = this.xsd_code;
            }
        },
        xslt_code:{
            handler: function(){
                this.xsltCode = this.xslt_code;
            }
        },
        dtd_filename:{
            handler: function () {
                this.fileNameDTD = this.dtd_filename;
            }
        },
        xsd_filename:{
            handler: function () {
                this.fileNameXSD = this.xsd_filename;
            }
        },
        xslt_filename:{
            handler: function () {
                this.fileNameXSLT = this.xslt_filename;
            }
        },
        dtd_active: {
            handler: function(){
                if(this.dtd_active){
                    this.dtd_activate();
                }
            }
        },
        xsd_active: {
            handler: function(){
                if(this.xsd_active){
                    this.xsd_activate();
                }
            }
        },
        xslt_active: {
            handler: function(){
                if(this.xslt_active){
                    this.xslt_activate();
                }
            }
        },
        xpath_active: {
            handler: function(){
                if(this.xpath_active){
                    this.xpath_activate();
                }
            }
        }
    }
}
</script>

<style>
.company-side {
    width: calc(50% - 60px);
    padding-right: 30px;
    padding-left: 30px;
    height: calc(100vh - 82px);
    background-color: transparent;
    display: flex;
    flex-direction: column;
}

.company-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 10px;
    font-family: "Euclid";
    background-color: transparent;
}

.company-selectors {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 18px;
    background-color: transparent;
    font-weight: bold;
}

.active_selector {
    color: #0092b2;
    cursor: pointer;
}

.inactive_selector {
    color: #3c3c3c;
    cursor: pointer;
    transition: all 0.15s cubic-bezier(.25, .50, .75, 1);
}

.inactive_selector:hover {
    color: #7c7c7c;
}

#dtd_selector,
#xsd_selector,
#xslt_selector,
#xpath_selector {
    display: flex;
    justify-content: flex-start;
    gap: 8px;
    align-items: center;
    text-align: left;
}

#sep {
    color: #0092b2;
    font-weight: bold;
    vertical-align: baseline;
    font-size: 16px;
    cursor: default;
}

#DTDfileName,
#XSDfileName,
#XSLTfileName {
    background-color: transparent;
    border: none;
    color: #bbbbbb;
    vertical-align: middle;
    font-size: 16px;
    overflow: scroll;
    text-align: left;
    font-family: "Euclid";
    width: 120px;
}

#DTDfileName:focus,
#XSDfileName:focus,
#XSLTfileName:focus {
    outline: none;
    /* this will change the background color of the input when active */
    box-shadow: none;
    /* this will change the border color of the input when active */
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
    font-weight: 100;
}

.success-icon {
    color: #0092b2;
}

.error-icon {
    color: red;
}

.selectors_sep{
    color: #3c3c3c;
}

.active_selectors_sep{
    color: #7c7c7c;
}

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
</style>