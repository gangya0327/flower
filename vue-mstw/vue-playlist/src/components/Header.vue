<template>
  <header>
    <h1>{{title1}},,{{title}}</h1>
    <button v-on:click="changeTitle">修改title</button>
  </header>
</template>

<script>
export default {
  name: "app-header",
  props: {
    title: {
      type: String
    }
  },
  data() {
    return {
      title1: "Vue Demo"
    };
  },
  methods: {
    changeTitle() {
      // this.title = "i love vue";
      this.$emit("titleChanged", "子向父组件传值");
    }
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