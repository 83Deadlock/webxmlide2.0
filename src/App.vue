<template>
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
  }
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
