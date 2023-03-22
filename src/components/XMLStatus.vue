<template>
    <div class="xml-status">
        <button
            :class="{ 'well-formed': (xmlWellFormed && xmlDeclPresent), 'not-well-formed': !(xmlWellFormed && xmlDeclPresent) }"
            :disabled="true">{{
                buttonMessage }}</button>
        <div :class="{'xml-status-indicator' : !xmlWellFormed}" style="cursor: default; padding-right: 2px;" @mouseenter="showPopup = true" @mouseleave="showPopup = false">
            <div id="xml-decl">
                <span>{{ xmlDeclMessage }} &nbsp;</span>
                <i :class="{ 'fas fa-check': xmlDeclPresent, 'fas fa-times': !xmlDeclPresent }"></i><br>
            </div>
            <div id="xml-wf"><!---->
                <span>{{ xmlWellFormedMessage }} &nbsp;</span>
                <i :class="{ 'fas fa-check': xmlWellFormed, 'fas fa-times': !xmlWellFormed }"></i><br>
                <div class="popup" v-show="showPopup && !xmlWellFormed">
                    <p v-html="errorString"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: 'XMLStatus',
    data() {
        return {
            // Status-related data
            xmlDeclPresent: false,
            xmlWellFormed: false,
            xmlWellFormedErrors: [],
            // Display-related data
            showPopup: false,
            errorString: '',
        }
    },
    watch: {
        xml_code: {
            handler: function () {
                this.WellFormedXML();
            }
        }
    },
    computed: {
        ...mapState(["xml_filename", "xml_code"]),
        isWellFormed() {
            return this.checkXMLWellFormed(this.xml_code);
        },
        buttonMessage() {
            return (this.xmlWellFormed && this.xmlDeclPresent) ? "Well-Formed XML" : "XML is not Well-Formed";
        },
        xmlDeclMessage() {
            return (this.xmlDeclPresent) ? "XML Declaration" : "Missing XML Declaration"
        },
        xmlWellFormedMessage() {
            return (this.xmlWellFormed) ? 'No Syntax Errors' : 'Syntax Errors Found'
        }
    },
    methods: {
        async isXMLWellFormed(xmlCode) {
            const response = await fetch('http://localhost:3000/xml-wellformed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    xml_code: xmlCode,
                }),
            });
            const data = await response.json();
            return data;
        },
        async WellFormedXML() {
            const firstLine = this.xml_code.split('\n')[0];
            const isXmlDeclaration = /^\s*<\?xml\s/.test(firstLine);

            if (!isXmlDeclaration) {
                this.xmlDeclPresent = false;
            } else {
                this.xmlDeclPresent = true;
            }

            let data = await this.isXMLWellFormed(this.xml_code);
            this.xmlWellFormed = data.wellFormed;
            this.xmlWellFormedErrors = data.errors;

            let str = '';

            this.xmlWellFormedErrors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            this.errorString = str;
        }
    },
    async created() {
        const firstLine = this.xml_code.split('\n')[0];
        const isXmlDeclaration = /^\s*<\?xml\s/.test(firstLine);

        if (!isXmlDeclaration) {
            this.xmlDeclPresent = false;
        } else {
            this.xmlDeclPresent = true;
        }

        let data = await this.isXMLWellFormed(this.xml_code);
        this.xmlWellFormed = data.wellFormed;
        this.xmlWellFormedErrors = data.errors;

        let str = '';

        this.xmlWellFormedErrors.forEach(function (err) {
            let tmp = err.charAt(0).toUpperCase() + err.slice(1);
            str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
        })

        this.errorString = str;
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

.xml-status>button {
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.fa-times {
    color: red;
}

.fa-check {
    color: #0092b2;
}

.popup {
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
    display: block;
    position: absolute;
    bottom: calc(20vh);
    left: calc(50% - 240px);
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

.popup > p {
    padding-left: 5px;
}

.xml-status-indicator{
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.xml-status-indicator:hover{
    color: #7c7c7c;
}

</style>