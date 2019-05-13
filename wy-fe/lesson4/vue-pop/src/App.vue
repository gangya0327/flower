<template>
  <div id="app">
    <img src="./assets/logo.png">
    <Pop1>这是确认弹框。</Pop1>
  </div>
</template>

<script>
import Pop1 from "./components/pop1";

export default {
  name: "App",
  components: {
    Pop1
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
