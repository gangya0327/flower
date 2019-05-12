<template>
  <div
    class="cover"
    ref="cover"
  >
    <div
      class="pop-content"
      ref="slot"
      :style="{left: popx,top: popy}"
    >
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
    return { popx: 0, popy: 0 };
  },
  mounted: function() {
    var leftMargin = this.$refs.slot.clientWidth / 2;
    var topMargin = this.$refs.slot.clientHeight / 2;
    var lf = this.$refs.cover.clientWidth / 2;
    var tp = this.$refs.cover.clientHeight / 2;
    this.popy = tp - topMargin + "px";
    this.popx = lf - leftMargin + "px";
  },
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
  position: absolute;
  background-color: #fff;
  min-width: 180px;
  max-width: 800px;
  padding: 8px;
  box-sizing: border-box;
}
.pop-title {
  margin-right: 10px;
}
button {
  margin: 4px 12px;
}
</style>


