<!-- 模版 html结构 -->
<template>
  <div id="app">
    Hello vue!{{title}}
  </div>
</template>

<!-- 行为 处理逻辑 -->
<script>
export default {
  name: "App",
  data(){
    return {
      title: '第一个vue脚手架'
    }
  }
};
</script>

<!-- 样式 css -->
<style>
</style>
