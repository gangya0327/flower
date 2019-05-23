<!-- 模版 html结构 -->
<template>
  <div id="app">
    <ul>
      <li><router-link to='/'>Home</router-link></li>
      <li><router-link to='/helloworld'>HelloWorld</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<!-- 行为 处理逻辑 -->
<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- 样式 css -->
<style>
</style>
