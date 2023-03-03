<template>
<nav>
    <img alt="Logo" src="@/assets/icon.png">

    <div id="menu">
      <router-link to="/">Editor</router-link>
      <router-link to="/doc">Docs</router-link>
      <router-link to="/about">About</router-link>
    
      <div id="project_buttons">
        <ButtonComp :text="'Download'" :color="'#272727'" />
        <ButtonComp :text="'Upload'" :color="'#272727'" />
      </div>
    </div>

    
    
  </nav>
</template>

<script>
    import ButtonComp from './ButtonComp.vue';

    export default{
        name: 'HeaderComp',
        components: {
            ButtonComp
        }

    }
</script>

<style scoped>
nav {
  padding: 20px;
  background-color: #111111;
  text-align: right;
  font-family: "Euclid";
}

nav img {
  position: absolute;
  left: 30px;
  top: 20px;
  height: 40px;
}

nav a {
  font-weight: bold;
  color: #7c7c7c;
  top: 10px;
  text-decoration: none;
  transition: all 0.1s cubic-bezier(.25,.50,.75,1);
}

nav a:hover {
  color: #bbbbbb;
}

nav a.router-link-exact-active {
  color: #0092b2;
}

nav a.router-link-exact-active:hover {
  color: #0092b2;
}

#menu {
    right: 0;
    display: flex;
    gap: 30px;
    justify-content: flex-end;
    align-items: center;
}

#project_buttons {
    display: flex;
    gap: 20px;
}
</style>