<template>
  <div class="hello">
    <h3>Count: {{ count }}</h3>
    <button @click="increment">Increment Count</button>
    <h3>Mensagem: {{ mensagem }}</h3>
    <button @click="changeMessage">Alterar Mensagem</button>
    <button @click="resetMessage">Reset Mensagem</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    /*testeProp : {
      default: '',
      type: String
    }*/
  },
  computed: mapState(["count", "mensagem"]),
  methods: mapMutations(["increment", "changeMessage", "resetMessage"]),
  mounted() {
    this.increment();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 50%;
}
h3 {
  color: #bbbbbb
}
button{
  width: min-content;
  height: min-content;
}
</style>
