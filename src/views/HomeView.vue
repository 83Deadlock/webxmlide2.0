<template>
  <div class="home">
    <XMLSide />
    <div class="black-border"></div>
    <CompanySide />
    <!--<HelloWorld :teste-prop="test"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import XMLSide from '@/components/XMLSide.vue';
import CompanySide from "@/components/CompanySide.vue";


export default {
  name: "HomeView",
  components: {
    //HelloWorld,
    XMLSide,
    CompanySide,
  },
  /*data(){
    return {
      test: 'dadada',
    }
  }*/
};
</script>

<style>
.home{
  display: flex;
  flex-direction: row;
}

.black-border {
  height: 65vh;
  border-right: 2px solid #111111;
  top: 145px;
  position: absolute;
  left: calc(50% - 1px);

}
</style>
