<template>
    <div class="xslt-status">
        <div @mouseenter="showXSLTPopup = true" @mouseleave="showXSLTPopup = false">
            <button :class="{ 'valid': xsltCorrect, 'invalid': !xsltCorrect }" :disabled="true">{{ buttonMessageXSLT
            }}</button>
        </div>
        <div class="popupXSLT" v-show="showXSLTPopup && !xsltCorrect">
            <p v-html="errorXSLTString"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "XSLTStatus",
    data() {
        return {
            // Status-related data
            xsltCorrect: false,
            xslt_errors: [],
            // Display-related data
            showXSLTPopup: false,
            errorXSLTString: '',
        }
    },
    watch: {
        xslt_code: {
            handler: function () {
                this.validateXML();
            }
        }
    },
    computed: {
        ...mapState(["xslt_code"]),
        buttonMessageXSLT() {
            return this.xsltCorrect ? "Valid XSLT" : "Invalid XSLT";
        },
    },
    methods: {
        async isXMLValid(xsltCode) {
            const response = await fetch('http://localhost:3000/validate-xslt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    xslt_code: xsltCode,
                }),
            });
            const data = await response.json();
            return data;
        },
        async validateXML() {
            let data = await this.isXMLValid(this.xslt_code);
            this.xsltCorrect = data.xslt_correct;
            this.xslt_errors = data.xslt_errors;

            let str = '';

            this.xslt_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            this.errorXSLTString = str;
        }
    },
    async created() {
        let data = await this.isXMLValid(this.xslt_code);
            console.log(data.xslt_correct);
            this.xsltCorrect = data.xslt_correct;
            this.xslt_errors = data.xslt_errors;

            let str = '';

            this.xslt_errors.forEach(function (err) {
                let tmp = err.charAt(0).toUpperCase() + err.slice(1);
                str += '<i class="fa-solid fa-triangle-exclamation"></i> &nbsp;' + tmp + "<br>";
            })

            this.errorXSLTString = str;
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

.xslt-status {
    padding-top: 12px;

}

.popupXSLT{
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
    display: block;
    position: absolute;
    top: calc(46vh);
    left: calc(58vw);
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

.popupXSLT > p{
    padding-left: 5px;
}
</style>