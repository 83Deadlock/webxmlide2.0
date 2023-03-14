<template>
    <div class="xsd-middle">
        <XSDEditor :xsd-code="xsdProp"/>
    </div>
    <div class="xsd-bottom">
        <XSDStatus />
        <h3>XSD ACTIONS</h3>
    </div>
</template>

<script>
import XSDEditor from './XSDEditor.vue';
import XSDStatus from './XSDStatus.vue';

export default {
    name: 'XSDComp',
    components: { XSDEditor, XSDStatus },
    props: {
        xsdProp: {
            default: '',
            type: String
        }
    }
}
</script>

<style scoped>
.xsd-middle {
    background-color: green;
    height: 65vh;
    /*padding-left: 30px;*/
}

.xsd-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    /*padding-left: 30px;*/
    font-family: "Euclid";
    background-color: transparent;
    color: #bbbbbb;
}
</style>