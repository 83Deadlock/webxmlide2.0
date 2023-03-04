<template>
  <div class="home">
    <XMLSide />
    <div class="black-border"></div>
    <HelloWorld />
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

<style>
.home{
  display: flex;
}

.black-border {
  height: 65vh;
  border-right: 2px solid #111111;
  top: 145px;
  position: absolute;
  left: 50%;

}
</style>
