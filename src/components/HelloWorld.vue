<template>
  <div class="hello">
    <h1>Count: {{ count }}</h1>
    <button @click="increment">Increment Count</button>
    <h1>Mensagem: {{ mensagem }}</h1>
    <button @click="changeMessage">Alterar Mensagem</button>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  computed: mapState(["count", "mensagem"]),
  methods: mapMutations(["increment", "changeMessage"]),
  mounted() {
    this.increment();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
