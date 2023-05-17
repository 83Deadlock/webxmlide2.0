<template>
    <div class="xslt-wrapper">
        <div class="xslt-top">
            <XSLTEditor :xslt-code="xsltProp" />
        </div>
        <div class="xslt-middle">
            <XSLTStatus />
            <XSLTActions />
        </div>
        <div class="xslt-output">
            <p class="scrollable-text" v-html="outputValue"></p>
        </div>
    </div>
</template>

<script>
import XSLTEditor from './XSLTEditor.vue';
import XSLTStatus from './XSLTStatus.vue';
import XSLTActions from './XSLTActions.vue'
import { mapState } from 'vuex';

export default {
    name: 'XSLTComp',
    data() {
        return {
            outputValue: 'This is where the output from running the XSLT Transformations will appear!'
        };
    },
    computed: {
        ...mapState(["xslt_output"])
    },
    components: { XSLTEditor, XSLTStatus, XSLTActions },
    props: {
        xsltProp: {
            default: '',
            type: String
        }
    }, watch: {
        xslt_output(newOutput) {
            this.outputValue = newOutput;
        }
    },
    mounted() {
        this.outputValue = this.xslt_output;
    },
}
</script>

<style scoped>
.xslt-top {
    background-color: green;
    height: 30vh;
}

.xslt-middle {
    display: flex;
    justify-content: space-between;
    font-family: "Euclid";
    color: #bbbbbb;
    height: 7vh;
}

.xslt-output {
    background-color: #111111;
    height: 28vh;
    overflow-y: auto;
}

.xslt-output>p {
    padding: 10px;
    color: #c3c3c3;
}

.scrollable-text {
    padding-left: 15px;
    color: #c3c3c3;
    white-space: pre-line;
    overflow-wrap: break-word;
    /* Wrap long lines */
}

/* Customize the scrollbar */
.xslt-output::-webkit-scrollbar {
    width: 8px;
}

.xslt-output::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
}

.xslt-output::-webkit-scrollbar-thumb:hover {
    background-color: #555;
}

.xslt-output::-webkit-scrollbar-track {
    background-color: #333;
}
</style>