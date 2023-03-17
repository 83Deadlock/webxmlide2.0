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
            return this.xmlValidation ? "Valid XML" : "Invalid XML";
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
            console.log(data);
            return data;
        },
        async validateXML() {
            let data = await this.isXMLValid(this.xml_code, this.dtd_code, this.dtd_filename);
            this.xmlValidation = data.valid;
            this.dtdCorrect = data.correct;
        }
    },
    async created() {
        let data = await this.isXMLValid(this.xml_code, this.dtd_code, this.dtd_filename);
        this.xmlValidation = data.valid;
        this.dtdCorrect = data.correct;
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