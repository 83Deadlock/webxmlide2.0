<template>
    <h3>DTD STATUS</h3>
    <div v-if="dtdIsWellFormed">
        <p>Missing DTD Parser</p>
    </div>
    <div v-else>
        <p>INCORRETO</p>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: "DTDStatus",
    computed: {
        ...mapState(["dtd_code", "xml_code"]),
        dtdIsWellFormed() {
            return this.DTDisCorrect(this.dtd_code);
        },
    },
    methods: {
        DTDisCorrect() {
            return true;
        },
    },
}
</script>