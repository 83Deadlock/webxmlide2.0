<template>
    <div class="xslt-top">
        <XSLTEditor :xslt-code="xsltProp"/>
    </div>
    <div class="xslt-middle">
        <XSLTStatus />
        <XSLTActions />
    </div>
    <div class="xslt-output">
        <p style="white-space: pre-line">{{ outputValue }}</p>
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
    components: {XSLTEditor, XSLTStatus, XSLTActions},
    props: {
        xsltProp: {
            default: '',
            type: String
        }
    },
    mounted() {
        //this.outputValue = this.xslt_output;
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
    height: 5vh;
}

.xslt-output {
    background-color: #111111;
    height: 28vh;
}

.xslt-output>p {
    padding: 10px;
    color: #c3c3c3;
}
</style>