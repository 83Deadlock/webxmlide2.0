<template>
    <div class="xslt-actions">
        <button @click="transformXML">Generate Preview</button>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'XSLTActions',
    computed: mapState(["xslt_code", "xml_code"]),
    methods: {
        ...mapMutations(["changeXSLTOutput"]),
        async transformXML() {

            const parser = new DOMParser();
            const xsltProcessor = new XSLTProcessor();
            const xmlDoc = parser.parseFromString(this.xml_code, "text/xml");
            const xsltDoc = parser.parseFromString(this.xslt_code, "text/xml");

            xsltProcessor.importStylesheet(xsltDoc);
            const transformedResult = xsltProcessor.transformToDocument(xmlDoc);

            const serializer = new XMLSerializer();
            const transformedHTML = serializer.serializeToString(transformedResult);
        
            this.$store.commit('changeXSLTOutput', transformedHTML);

            console.log(transformedHTML);
        }
    }
}
</script>

<style scoped>
.xslt-actions {
    padding-top: 12px;

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
}

button:hover {
    background-color: #000000;
}
</style>