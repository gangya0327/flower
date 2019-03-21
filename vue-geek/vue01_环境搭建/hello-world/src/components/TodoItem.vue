<template>
  <li class="text">{{todo.text}}</li>
</template>

<script>
export default {
  props: ["todo"]
};
</script>

<style scoped>
.text {
  color: #dd6699;
}
</style>



