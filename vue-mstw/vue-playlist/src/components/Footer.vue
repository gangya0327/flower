<template>
  <footer>
    <h1>{{copyright}},,{{title}}</h1>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
  props: {
    title: {
      type: String
    }
  },
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