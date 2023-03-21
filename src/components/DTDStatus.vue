<template>
    <div class="dtd-status">
        <button :class="{ 'valid': dtdCorrect, 'invalid': !dtdCorrect }" :disabled="true">{{ buttonMessageDTD }}</button>
        <button :class="{ 'valid': xmlValid, 'invalid': !xmlValid }" :disabled="true">{{ buttonMessageXML }}</button>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "DTDStatus",
    data() {
        return {
            xmlValidation: false,
            dtdCorrect: false,
            xmlWellFormed: false,
            xmlToDtdLink: false,
            dtd_errors: [],
            validation_errors: []
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
            return (!this.xmlWellFormed || (this.xmlWellFormed && !this.xmlValidation && this.xmlToDtdLink)) ? "Invalid XML" : (!this.xmlToDtdLink) ? "XML & DTD Unlinked" : "XML Valid"
            //(this.xmlValidation && this.xmlWellFormed && this.xmlToDtdLink) ? "Valid XML" : (this.xmlWellFormed && !this.xmlValidation && this.xmlToDtdLink) ? "Invalid XML" : "XML & DTD Unlinked";
        },
        buttonMessageDTD() {
            return this.dtdCorrect ? "Valid DTD" : "Invalid DTD";
        },
        xmlValid() {
            return this.xmlValidation;
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
</style>