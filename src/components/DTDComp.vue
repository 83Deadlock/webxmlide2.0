<template>
    <div class="dtd-middle">
        <DTDEditor />
    </div>
    <div class="dtd-bottom">
        <h3>DTD STATUS</h3>
        <h3>DTD ACTIONS</h3>
    </div>
</template>

<script>
//import {mapState, mapMutations} from "vuex";
import DTDEditor from './DTDEditor.vue';

export default {
    name: "DTDComp",
    components: { DTDEditor }
}
</script>

<style scoped>
.dtd-middle {
    background-color: green;
    height: 65vh;
    /*padding-left: 30px;*/
}

.dtd-bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 0px;
    /*padding-left: 30px;*/
    font-family: "Euclid";
    background-color: aqua;
    color: black;
}
</style>