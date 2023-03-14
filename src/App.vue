<template>
  <div>
    <button @click="handleTest">Test Server</button>
  </div>
  <HeaderComp />
  <router-view />
  <FooterComp />
</template>

<script>
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue';

export default{
  name: 'App',
  components: {
    HeaderComp,
    FooterComp
  },
  methods: {
    async handleTest() {
      const response = await fetch('http://localhost:3000/test');
      const message = await response.text();
      console.log(message);
    },
  },
}
</script>

<style>
body{
  margin: 0;
  background-color: #272727;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #bbbbbb;
}

@font-face {
  font-family: "Euclid";
  src: local("Euclid"),
   url(./fonts/Euclid\ Circular\ A\ Regular.ttf) format("truetype");
}
</style>
