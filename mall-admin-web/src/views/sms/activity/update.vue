<template>
  <activity-detail :is-edit="true"></activity-detail>
</template>
<script>
import ActivityDetail from "./components/ActivityDetail";
export default {
  name: "updateActivity",
  components: {
    ActivityDetail
  }
};
</script>
