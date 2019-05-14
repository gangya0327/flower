<!-- 模版 html结构 -->
<template>
  <div id="app">
    <span>Hello vue!{{title}}</span>
    <app-header></app-header>
    <users v-bind:users="users"></users>
    <app-footer></app-footer>
  </div>
</template>

<!-- 行为 处理逻辑 -->
<script>
//局部注册组件
import Users from "./components/Users";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      title: "第一个vue脚手架",
      users: [
        { name: "peter", position: "web", show: false },
        { name: "raven", position: "web", show: false },
        { name: "hank", position: "boss", show: false },
        { name: "jeff", position: "lead", show: false },
        { name: "roma", position: "java", show: false },
        { name: "gin", position: "nginx", show: false }
      ]
    };
  },
  components: {
    Users,
    appHeader: Header,
    appFooter: Footer
  }
};
</script>

<!-- 样式 css -->
<style>
</style>
