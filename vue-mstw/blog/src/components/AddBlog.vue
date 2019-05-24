<template>
  <div class="add-blog">
    <h2>添加博客</h2>
    <form action>
      <label for>博客标题</label>
      <input type="text" v-model="blog.title" required>
      <label for>博客内容</label>
      <textarea v-model="blog.content"></textarea>
      <div id="checkboxes">
        <label for>Vue.js</label>
        <input type="checkbox" value="Vue.js" v-model="blog.categories">
        <label for>Node.js</label>
        <input type="checkbox" value="Node.js" v-model="blog.categories">
        <label for>Angular.js</label>
        <input type="checkbox" value="Angular.js" v-model="blog.categories">
        <label for>React.js</label>
        <input type="checkbox" value="React.js" v-model="blog.categories">
      </div>
    </form>
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题：{{blog.title}}</p>
      <p>博客内容：</p>
      <p>{{blog.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: ""
      }
    };
  }
};
</script>

<style>
</style>


