<template>
    <div class="dtd-actions">
        <button @click="convertDTDtoXSD">Convert to XSD</button>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
    name: 'DTDActions',
    computed: mapState(["dtd_code", "dtd_filename"]),
    methods: {
        ...mapMutations(["updateXSDCode", "changeXSDFilename", "activateXSD"]),
        async convertDTDtoXSD() {

            const response = await fetch('http://localhost:3000/dtd-to-xsd', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dtd_code: this.dtd_code,
                    dtd_filename: this.dtd_filename,
                }),
            });
            const data = await response.json();
            this.$store.commit('updateXSDCode', data.xsd_code);
            this.$store.commit('changeXSDFilename', data.xsd_filename);
            this.$store.commit('activateXSD');

            console.log("THIS WILL CONVERT SOMETHING");
        }
    }
}
</script>

<style scoped>
.dtd-actions {
    padding-top: 20px;
    display: flex;
    justify-content: flex-end;
    flex-direction: row-reverse;
    gap: 5px;
    text-align: right;
}

button {
    background-color: #111111;
    border: 2px solid #0092b2;
    color: #0092b2;
    cursor: pointer;
    font-family: "Euclid";
    font-weight: lighter;
    border-radius: 40px;
    padding: 10px 20px;
    transition: all 0.2s cubic-bezier(.25, .50, .75, 1);
}

button:hover{
    background-color: #000000;
}
</style>