<template>
  <div class="single-blog">
    <h1>{{blog.title}}</h1>
    <article>{{blog.body}}</article>
  </div>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      id: this.$route.params.id,
      blog: {}
    };
  },
  created() {
    console.log(this);
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts/" + this.id)
      .then(res => {
        this.blog = res.body;
        console.log(this.blog);
      });
  }
};
</script>

<style scoped>
.single-blog {
  min-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #eee;
  border: 1px dotted #aaa;
}
</style>
