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
        console.log(res.data);
        console.log(res.body);
        this.blog = res.body;
        // console.log(this.blog);
      });
    this.$http
      .get(
        "https://leancloud.cn:443/1.1/classes/TestObject?limit=10&&order=-updatedAt&&"
      )
      .then(res => {
        console.log(res);
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
