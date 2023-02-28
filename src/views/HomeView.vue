<template>
  <div class="home">
    <XMLSide />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import XMLSide from '@/components/XMLSide.vue';


export default {
  name: "HomeView",
  components: {
    HelloWorld,
    XMLSide,
  },
};
</script>
