<template>
  <div class="cover" ref="cover">
    <div class="pop-content" ref="slot" :style="{left:popy,top: popx}">
      <div class="pop-title">
        <span>x</span>
      </div>
      <div>
        <slot></slot>
      </div>
      <div class="pop-button">
        <button>确认</button>
        <button>取消</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pop",
  data: function() {
    return {
      popy: 0,
      popx: 0
    };
  },
  mounted: function() {
    var leftMargin = this.$refs.slot.clientWidth / 2;
    var topMargin = this.$refs.slot.clientHeight / 2;
    var lf = this.$refs.cover.clientWidth / 2;
    var tp = this.$refs.cover.clientHeight / 2;
    this.popy = lf - topMargin + "px";
    this.popx = tp - leftMargin + "px";
  },
  methods() {}
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.cover {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.pop-content {
  position: absolute;
  background-color: #fff;
  min-width: 180px;
  max-width: 800px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 5px;
}
.pop-title {
  text-align: right;
  padding-right: 15px;
}
.pop-button {
  margin-top: 10px;
}
button {
  padding: 4px 12px;
}
</style>

