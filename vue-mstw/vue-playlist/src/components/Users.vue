<template>
  <div class="users">
    <ul>
      <li
        v-for="(user,index) in users"
        v-bind:key="index"
        v-on:click="user.show = !user.show"
      >
        <h2>{{user.name}}</h2>
        <h2 v-show="user.show">{{user.position}}</h2>
      </li>
    </ul>
    <button v-on:click="deleteUser">删除</button>
    <span class="testCss">testCss</span>
  </div>
</template>


<script>
// 传值：string,number,boolean
// 引用：array,object

export default {
  name: "Users",
  //   props: ['users'],
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    deleteUser() {
      this.users.pop();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.users {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  box-sizing: border-box;
}
.users ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.users ul li {
  flex-grow: 1;
  text-align: center;
  flex-basis: 100px;
  padding: 30px;
  border: 1px solid #222;
  margin: 20px;
}
.testCss {
  color: red;
}
</style>
