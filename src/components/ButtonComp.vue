<template>
    <button @click="onClick" :style="{ background: color }" class="btn">
      {{ text }}
    </button>
  </template>
  
  <script>
  export default {
    name: 'ButtonComp',
    props: {
      text: String,
      color: String,
    },
    methods: {
      onClick() {
        //console.log('btn-click');
      },
    },
  }
  </script>

<style scoped>
button {
    font-weight: bold;
    color: #0092b2;
    font-family: "Euclid", Helvetica, Arial;
    padding: 10px;
    border-radius: 20px;
    border: #0092b2 2px solid;
    transition: all 0.1s cubic-bezier(.25,.50,.75,1);
}

button:hover {
    color: #272727;
    background: #0092b2 !important;
    border: #272727 2px solid;
    cursor: pointer;

}
</style>