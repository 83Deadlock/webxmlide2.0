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
            return this.DTDisCorrect(this.xml_code, this.dtd_code);
        },
    },
    methods: {
        async DTDisCorrect(xmlCode, dtdCode) {
            const response = await fetch('http://localhost:3000/validateDTD', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dtd_code: dtdCode,
                }),
            });
            const message = await response.text();
            console.log(message);
            return true;
        },
    },
}
</script>