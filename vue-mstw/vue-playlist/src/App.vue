<!-- 模版 html结构 -->
<template>
  <div id="app">
    <span>Hello vue!{{title2}}</span>
    <app-header
      v-bind:title="title"
      v-on:titleChanged="updateTitle($event)"
    ></app-header>
    <users v-bind:users="users"></users>
    <users v-bind:users="users"></users>
    <span class="testCss">testCss</span>
    <app-footer v-bind:title="title"></app-footer>
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
      title2: "第一个vue脚手架",
      users: [
        { name: "peter", position: "web", show: false },
        { name: "raven", position: "web", show: false },
        { name: "hank", position: "boss", show: false },
        { name: "jeff", position: "lead", show: false },
        { name: "roma", position: "java", show: false },
        { name: "gin", position: "nginx", show: false }
      ],
      title: "传递的是一个值"
    };
  },
  components: {
    Users,
    appHeader: Header,
    appFooter: Footer
  },
  methods: {
    updateTitle(value) {
      this.title = value;
    }
  }
};
</script>

<!-- 样式 css -->
<style>
</style>
