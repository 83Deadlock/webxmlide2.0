<template>
    <div class="xpath">
        <div class="input-wrapper">
            <div class="label">
                <p>XPath <strong>|</strong></p>
            </div>
            <input @blur="inputOnBlur" v-model="inputValue" ref="input" type="text" class="input-field"
                placeholder="Enter XPath expression">
            <button @click="runXPath" class="run-button">Run</button>
        </div>
        <div class="xpath-output">
            <p class="scrollable-text">{{ outputValue }}</p>
        </div>
        <div class="xpath-help">
            <p>XPath Functions, Examples and Documentation on the <span id="link" @click="redirectToDocumentation">XPath
                    Documentation Page</span>!</p>
            <button @click="clearPreview">Clear Results</button>
            
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    name: 'XPathComp',
    data() {
        return {
            inputValue: '',
            outputValue: 'This is where the output from running the XPath Expression will appear!'
        };
    },
    computed: {
        ...mapState(["xpath_code", "xpath_output", "xml_code"])
    },
    methods: {
        ...mapMutations(["changeXPathCode", "changeXPathOutput"]),
        redirectToDocumentation() {
            this.$router.push({ name: 'doc', path: '/doc' });
        },
        inputOnBlur() {
            const inputElement = this.$refs.input;
            this.$store.commit("changeXPathCode", this.inputValue);
            inputElement.setSelectionRange(0, 0);
        },
        async runXPath() {
            const response = await fetch('http://localhost:3000/run-xpath', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    xml_code: this.xml_code,
                    xpath: this.inputValue,
                }),
            });
            const data = await response.json();

            this.outputValue = data.output;
            this.$store.commit("changeXPathOutput", this.outputValue);
        },
        clearPreview() {
            this.$store.commit("changeXPathOutput", 'This is where the output from running the XPath Expression will appear!');
            this.outputValue = 'This is where the output from running the XPath Expression will appear!';
        }
    },
    mounted() {
        this.inputValue = this.xpath_code;
        this.outputValue = this.xpath_output;
    },
}
</script>

<style scoped>
.input-wrapper {
    display: flex;
    align-items: center;
    border-radius: 30px;
    background-color: #111111;
    color: #fff;
    width: 100%;
    height: 40px;
}

.label {
    flex: 0 0 auto;
    margin-right: 3px;
    margin-left: 15px;
    padding-top: 4px;
    color: #7c7c7c;
}

.input-field::placeholder {
    color: #7c7c7c;
}

strong {
    color: #0092b2;
    font-size: 20px;
    padding-bottom: 10px;
}

.input-field {
    flex: 1 1 auto;
    padding: 5px;
    background-color: transparent;
    outline: none;
    border: none;
    color: #c3c3c3;
}

.run-button {
    flex: 0 0 auto;
    background-color: #0092b2;
    color: #111111;
    padding: 5px 10px;
    border: 1px solid #111111;
    border-radius: 30px;
    cursor: pointer;
    height: 100%;
    width: 10%;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

.run-button:hover {
    background-color: #111111;
    color: #0092b2;
    border: 1px solid #0092b2;
}

.xpath-output {
    height: calc(65vh - 52px);
    width: 100%;
    background-color: #111111;
    overflow-y: auto;
}

.scrollable-text {
    padding-left: 15px;
    color: #c3c3c3;
    white-space: pre-line;
    overflow-wrap: break-word;
    /* Wrap long lines */
}

/* Customize the scrollbar */
.xpath-output::-webkit-scrollbar {
    width: 8px;
}

.xpath-output::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

.xpath-output::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

.xpath-output::-webkit-scrollbar-track {
    background-color: #333;
}

.xpath-output>p {
    padding-left: 15px;
    color: #c3c3c3;
}

.xpath {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.xpath-help {
    text-align: right;
    display: flex;
    justify-content: space-between;
}

#link {
    text-decoration: underline;
    cursor: pointer;
    color: #0092b2;
}

button {
    background-color: #111111;
    border: 1px solid #0092b2;
    color: #0092b2;

    cursor: pointer;
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
    margin-left: 10px;
}

button:hover {
    background-color: #000000;
}

</style>