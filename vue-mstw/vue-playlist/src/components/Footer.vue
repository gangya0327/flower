<template>
  <footer>
    <h1>{{copyright}}</h1>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
  data() {
    return {
      copyright: "Copyright 2019"
    };
  }
};
</script>

<style scope>
footer {
  background-color: #222;
  padding: 6px;
}
footer h1 {
  color: lightgreen;
  text-align: center;
}
</style>