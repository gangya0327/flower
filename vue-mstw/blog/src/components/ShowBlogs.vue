<template>
  <div id="show-blogs" v-theme:column="'narrow'">
    <h2>总览博客</h2>
    <input type="text" v-model="search" placeholder="搜索内容">
    <div v-for="(blog,index) in filteredBlogs" v-bind:key="index" class="single-blog">
      <router-link :to="'/blog/'+blog.id">
        <h2 v-peter>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <article v-rainbow>{{blog.body | snippet }}</article>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowBlogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    this.$http.get("../../static/blogs.json").then(res => {
      this.blogs = res.data.slice(0, 10);
    });
  },
  computed: {
    filteredBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },
  filters: {
    toUpperCase: function(value) {
      return value.toUpperCase();
    },
    snippet(value) {
      if (value.length > 180) return value.slice(0, 180) + "...";
      else return value;
    }
  },
  directives: {
    rainbow: {
      bind(el, binding, vNode) {
        el.style.color =
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8);
      }
    }
  }
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
#show-blogs a{
  color: #444;
  text-decoration: none;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background-color: #eee;
  border: 1px dotted #aaa;
}
input {
  padding: 8px;
  width: 100%;
  line-height: 26px;
  box-sizing: border-box;
}
</style>