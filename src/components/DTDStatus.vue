<template>
    <div class="dtd-status">
        <div @mouseenter="showDTDPopup = true" @mouseleave="showDTDPopup = false">
            <button :class="{ 'valid': dtdCorrect, 'invalid': !dtdCorrect }" :disabled="true">{{ buttonMessageDTD
            }}</button>
        </div>
        <div @mouseenter="showXMLPopup = true" @mouseleave="showXMLPopup = false">
            <button :class="{ 'valid': xmlValid, 'invalid': !xmlValid }" :disabled="true">{{ buttonMessageXML }}</button>
        </div>

        <div class="popupDTD" v-show="showDTDPopup && !dtdCorrect">
            <p v-html="errorDTDString"></p>
        </div>
        <div class="popupXML" v-show="showXMLPopup && !xmlValid">
            <p v-html="errorXMLString"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "DTDStatus",
    data() {
        return {
            // Status-related data
            xmlValidation: false,
            dtdCorrect: false,
            xmlWellFormed: false,
            xmlToDtdLink: false,
            dtd_errors: [],
            validation_errors: [],
            // Display-related data
            showXMLPopup: false,
            errorXMLString: '',
            showDTDPopup: false,
            errorDTDString: '',
        }
    },
    watch: {
        xml_code: {
            handler: function () {
                this.validateXML();
            }
        },
        dtd_code: {
            handler: function () {
                this.validateXML();
            }
        },
        dtd_filename: {
            handler: function () {
                this.validateXML();
            }
        }
    },
    computed: {
        ...mapState(["dtd_code", "xml_code", "dtd_filename"]),
        buttonMessageXML() {
            return (!this.xmlWellFormed) ? "XML is Not Well-Formed" : (!this.xmlToDtdLink) ? "XML & DTD Unlinked" : (!this.xmlValidation && this.dtdCorrect) ? "Invalid XML" : "Valid XML";
        },
        buttonMessageDTD() {
            return this.dtdCorrect ? "Valid DTD" : "Invalid DTD";
        },
        xmlValid() {
            return !(!this.xmlWellFormed || !this.xmlToDtdLink || (!this.xmlValidation && this.dtdCorrect));
        }
    },
    methods: {
        async isXMLValid(xmlCode, dtdCode, dtdFilename) {
            const response = await fetch('http://localhost:3000/validate-dtd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    xml_code: xmlCode,
                    dtd_code: dtdCode,
                    dtd_filename: dtdFilename,
                }),
            });
            const data = await response.json();
            return data;
        },
        async validateXML() {
            let data = await this.isXMLValid(this.xml_code, this.dtd_code, this.dtd_filename);
            this.xmlValidation = data.xml_valid_on_dtd;
            this.dtdCorrect = data.dtd_correct;
            this.xmlToDtdLink = data.xml_to_dtd_link;
            this.xmlWellFormed = data.xml_wellformed;
            this.dtd_errors = data.dtd_errors;
            this.validation_errors = data.validation_errors;

            if(this.dtd_errors == undefined){
            this.dtd_errors = []
        }

        if(this.validation_errors == undefined){
            this.validation_errors = []
        }

            let str = '';

            this.dtd_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            this.errorDTDString = str;

            str = '';

            this.validation_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            if (!this.xmlToDtdLink) {
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp; XML Document and DTD are not linked<br>';
            }

            this.errorXMLString = str;
        }
    },
    async created() {
        let data = await this.isXMLValid(this.xml_code, this.dtd_code, this.dtd_filename);
        this.xmlValidation = data.xml_valid_on_dtd;
        this.dtdCorrect = data.dtd_correct;
        this.xmlToDtdLink = data.xml_to_dtd_link;
        this.xmlWellFormed = data.xml_wellformed;
        this.dtd_errors = data.dtd_errors;
        this.validation_errors = data.validation_errors;

        if(this.dtd_errors == undefined){
            this.dtd_errors = []
        }

        if(this.validation_errors == undefined){
            this.validation_errors = []
        }

        let str = '';

        this.dtd_errors.forEach(function (err) {
            let tmp = err.charAt(0).toUpperCase() + err.slice(1);
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
        })

        this.errorDTDString = str;

        str = '';

        this.validation_errors.forEach(function (err) {
            let tmp = err.charAt(0).toUpperCase() + err.slice(1);
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
        })

        if (!this.xmlToDtdLink) {
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp; XML Document and DTD are not linked<br>';
        }

        this.errorXMLString = str;
    }
}
</script>

<style scoped>
.valid {
    background-color: #0092b2;
    color: #111111;
    border: 1px solid #111111;
}

.invalid {
    background-color: #111111;
    color: #0092b2;
    border: 1px solid #0092b2;
}

button:disabled {
    cursor: default;
}

button {
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.dtd-status {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    gap: 5px;
    text-align: right;
}

.popupDTD,
.popupXML {
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
    display: block;
    position: absolute;
    bottom: calc(20vh);
    right: calc(50% - 240px);
    width: 210px;
    text-align: left;
    white-space: pre-wrap;
    padding: 10px;
    padding-top: 0px;
    font-size: 12px;
    line-height: 1.2;
    margin: 0;
    padding: 0;
    border-radius: 0px;
    background-color: #c7c7c7;
    color: #111111;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.8);
    z-index: 5;
}

.popupDTD > p,
.popupXML > p {
    padding-left: 5px;
}
</style>