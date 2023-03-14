<template>
    <div class="xml-status">
        <button :class="{ 'well-formed': isWellFormed, 'not-well-formed': !isWellFormed }" :disabled="true">{{ buttonMessage }}</button>
        <div class="wellformed_error" v-html="wellFormedErrorMessage"></div>
    </div>
    
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'XMLStatus',
    data(){
        return {
            syntaxErrors: false,
            xmlDeclPresent: false,
        }
    },
    computed: {
        ...mapState(["xml_filename","xml_code"]),
        isWellFormed() {
            return this.checkXMLWellFormed(this.xml_code);
        },
        buttonMessage() {
            return this.isWellFormed ? "Well-Formed XML" : "XML is not Well-Formed";
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
    methods: {
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
                    const error = parseErrors[i];
                    errorMsgs.push(error.textContent.trim());
                }
            }

            if(parseErrors.length != 0){
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
</style>