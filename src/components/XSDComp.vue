<template>
    <div class="xsd-middle">
        <XSDEditor :xsd-code="xsdProp"/>
    </div>
    <div class="xsd-bottom">
        <XSDStatus />
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
    height: 65vh;
}

.xsd-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    font-family: "Euclid";
    background-color: transparent;
    color: #bbbbbb;
}
</style>