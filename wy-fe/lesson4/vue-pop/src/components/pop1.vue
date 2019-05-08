<template>
  <div class="cover">
    <div class="pop-content">
      <div class="pop-title">
        <span>x</span>
      </div>
      <div>
        <slot></slot>
      </div>
      <div class="pop-button">
        <button>确定</button>
        <button>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pop1",
  data: function() {
    return {};
  },
  mounted: function() {},
  methods: {}
};
</script>

<style scoped>
.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}
.pop-content {
  position: relative;
  background-color: #fff;
  min-width: 180px;
  max-width: 800px;
  padding: 8px;
}
.pop-title {
  margin-right: 15px;
}
</style>


