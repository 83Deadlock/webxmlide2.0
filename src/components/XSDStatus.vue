<template>
    <div class="xsd-status">
        <div @mouseenter="showXSDPopup = true" @mouseleave="showXSDPopup = false">
            <button :class="{ 'valid': xsdCorrect, 'invalid': !xsdCorrect }" :disabled="true">{{ buttonMessageXSD
            }}</button>
        </div>
        <div @mouseenter="showXMLPopup = true" @mouseleave="showXMLPopup = false">
            <button :class="{ 'valid': xmlValid, 'invalid': !xmlValid }" :disabled="true">{{ buttonMessageXML }}</button>
        </div>

        <div class="popupXSD" v-show="showXSDPopup && !xsdCorrect">
            <p v-html="errorXSDString"></p>
        </div>
        <div class="popupXML" v-show="showXMLPopup && !xmlValid">
            <p v-html="errorXMLString"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'XSDStatus',
    data() {
        return {
            // Status-related data
            xmlValidation: false,
            xsdCorrect: false,
            xmlWellFormed: false,
            xmlToXsdLink: false,
            xsd_errors: [],
            validation_errors: [],
            // Display-related data
            showXMLPopup: false,
            errorXMLString: '',
            showXSDPopup: false,
            errorXSDString: '',
        }
    },
    watch: {
        xml_code: {
            handler: function () {
                this.validateXML();
            }
        },
        xsd_code: {
            handler: function () {
                this.validateXML();
            }
        }
    },
    computed: {
        ...mapState(["xsd_code", "xml_code", "xsd_filename"]),
        buttonMessageXML() {
            return (!this.xmlWellFormed) ? "XML is Not Well-Formed" : (!this.xmlToXsdLink) ? "XML & XSD Unlinked" : (!this.xmlValidation && this.xsdCorrect) ? "Invalid XML" : "Valid XML";
        },
        buttonMessageXSD() {
            return this.xsdCorrect ? "Valid XSD" : "Invalid XSD";
        },
        xmlValid() {
            return !(!this.xmlWellFormed || !this.xmlToXsdLink || (!this.xmlValidation && this.xsdCorrect));
        }
    },
    methods: {
        async isXMLValid(xmlCode, xsdCode, xsdFilename) {
            const response = await fetch('http://localhost:3000/validate-xsd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    xml_code: xmlCode,
                    xsd_code: xsdCode,
                    xsd_filename: xsdFilename,
                }),
            });
            const data = await response.json();
            return data;
        },
        async validateXML() {
            let data = await this.isXMLValid(this.xml_code, this.xsd_code, this.xsd_filename);
            this.xmlValidation = data.xml_valid_on_xsd;
            this.xsdCorrect = data.xsd_correct;
            this.xmlToXsdLink = data.xml_to_xsd_link;
            this.xmlWellFormed = data.xml_wellformed;
            this.xsd_errors = data.xsd_errors;
            this.validation_errors = data.validation_errors;

            let str = '';

            if (this.xsd_errors != null) {
                this.xsd_errors.forEach(function (err) {
                    let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                    str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
                })

                this.errorXSDString = str;

                str = '';
            }



            this.validation_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            if (!this.xmlToXsdLink) {
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp; XML Document and XSD are not linked<br>';
            }

            this.errorXMLString = str;
        }
    },
    async created() {
        let data = await this.isXMLValid(this.xml_code, this.xsd_code, this.xsd_filename);
        this.xmlValidation = data.xml_valid_on_xsd;
        this.xsdCorrect = data.xsd_correct;
        this.xmlToXsdLink = data.xml_to_xsd_link;
        this.xmlWellFormed = data.xml_wellformed;
        this.xsd_errors = data.xsd_errors;
        this.validation_errors = data.validation_errors;

        let str = '';

        if (this.xsd_errors != null) {
            this.xsd_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            this.errorXSDString = str;

            str = '';
        }

        this.validation_errors.forEach(function (err) {
            let tmp = err.charAt(0).toUpperCase() + err.slice(1);
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
        })

        if (!this.xmlToXsdLink) {
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp; XML Document and XSD are not linked<br>';
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

.xsd-status {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    gap: 5px;
    text-align: right;
}

.popupXSD,
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

.popupXSD>p,
.popupXML>p {
    padding-left: 5px;
}
</style>