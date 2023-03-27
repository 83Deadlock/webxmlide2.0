<template>
    <div class="dtd-middle">
        <DTDEditor :dtd-code="dtdProp"/>
    </div>
    <div class="dtd-bottom">
        <DTDStatus />
        <DTDActions />
    </div>
</template>

<script>
//import {mapState, mapMutations} from "vuex";
import DTDEditor from './DTDEditor.vue';
import DTDStatus from './DTDStatus.vue';
import DTDActions from './DTDActions.vue';

export default {
    name: "DTDComp",
    components: { DTDEditor, DTDStatus, DTDActions },
    props: {
        dtdProp: {
            default: '',
            type: String
        }
    }
}
</script>

<style scoped>
.dtd-middle {
    height: 65vh;
}

.dtd-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    font-family: "Euclid";
    background-color: transparent;
    color: #bbbbbb;
}
</style>