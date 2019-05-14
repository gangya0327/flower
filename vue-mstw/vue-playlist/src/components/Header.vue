<template>
  <header>
    <h1>{{title}}</h1>
  </header>
</template>

<script>
export default {
  name: "app-header",
  data() {
    return {
      title: "Vue Demo"
    };
  }
};
</script>

<style scope>
header {
  background-color: lightgreen;
  padding: 10px;
}
header h1 {
  color: #222;
  text-align: center;
}
</style>