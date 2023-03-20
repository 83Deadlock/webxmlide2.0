<template>
    <div class="xsd-status">
        <button :class="{ 'well-formed': isWellFormed, 'not-well-formed': !isWellFormed }" :disabled="true">{{ buttonMessage
        }}</button>
        <div class="wellformed_error" v-html="wellFormedErrorMessage"></div>   
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'XSDStatus',
    data() {
        return {
            syntaxErrors: false,
            xmlDeclPresent: false,
        }
    },
    computed: {
        ...mapState(["xsd_filename", "xsd_code", "xml_code"]),
        isWellFormed() {
            return this.checkXSDWellFormed(this.xsd_code);
        },
        isValid() {
            return this.isValidXSD();
        },
        buttonMessage() {
            return this.isWellFormed ? "Well-Formed XSD" : "XSD is not Well-Formed";
        },
        isLinked() {
            return this.isLinkedXSD();
        },
        wellFormedErrorMessage() {
            var str = ''
            if (!this.xmlDeclPresent) {
                str += '<span>Missing XML Declaration &nbsp;</span>'
                str += '<i style="color: red;" class="fas fa-times"></i><br>'
            } else {
                str += '<span>XML Declaration &nbsp;</span>'
                str += '<i style="color: #0092b2; padding-top: 1px;" class="fas fa-check"></i><br>'
            }
            if (this.syntaxErrors) {
                str += '<span>Syntax Errors Found &nbsp;</span>'
                str += '<i style="color: red;" class="fas fa-times"></i>'
            } else {
                str += '<span>No Syntax Errors &nbsp;</span>'
                str += '<i style="color: #0092b2; padding-top: 1px;" class="fas fa-check"></i><br>'
            }
            return str
        }
    },
    methods: {
        isValidXSD() {
            return true;
        },
        isLinkedXSD() {
            const parser = new DOMParser();
            const serializer = new XMLSerializer();

            // Parse the xml_code and xsd_code strings into Document objects
            const xmlDoc = parser.parseFromString(this.xml_code, "text/xml");
            const xsdDoc = parser.parseFromString(this.xsd_code, "text/xml");

            // Get the root element of the xml_code document
            const rootElement = xmlDoc.documentElement;

            // Check if the schemaLocation attribute is set on the root element
            if (rootElement.hasAttribute("xsi:schemaLocation")) {
                // Get the value of the schemaLocation attribute
                const schemaLocation = rootElement.getAttribute("xsi:schemaLocation");

                // Split the schemaLocation value into an array of URIs
                const schemaLocationUris = schemaLocation.split(/\s+/);

                // Check if the xsd_filename is in the schemaLocation URI list
                const usingXsdCode = schemaLocationUris.includes(this.xsd_filename);

                // Return whether or not the xml_code is using the xsd_code as schema definition
                return usingXsdCode;
            } else {
                // If the schemaLocation attribute is not set, serialize the xml_code and xsd_code
                // documents as strings and compare them directly
                const xmlCodeString = serializer.serializeToString(xmlDoc);
                const xsdCodeString = serializer.serializeToString(xsdDoc);

                return xmlCodeString.includes(xsdCodeString);
            }
        },
        checkXSDWellFormed(xmlCode) {
            const firstLine = xmlCode.split('\n')[0];
            const isXmlDeclaration = /^\s*<\?xml\s/.test(firstLine);

            if (!isXmlDeclaration) {
                this.xmlDeclPresent = false;
            } else {
                this.xmlDeclPresent = true;
            }

            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlCode, "application/xml");
            const parseErrors = xmlDoc.querySelectorAll("parsererror");

            const errorMsgs = [];

            if (parseErrors.length > 0) {
                for (let i = 0; i < parseErrors.length; i++) {
                    const error = parseErrors[i];
                    errorMsgs.push(error.textContent.trim());
                }
            }

            if (parseErrors.length != 0) {
                this.syntaxErrors = true;
            } else {
                this.syntaxErrors = false;
            }

            return parseErrors.length == 0 && isXmlDeclaration;
        },
    }
}

</script>

<style scoped>
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

.xsd-status {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    gap: 5px;
    text-align: left;
}

.xsd-status > button {
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}
</style>