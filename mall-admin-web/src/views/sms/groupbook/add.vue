<template>
  <groupbook-detail :is-edit="false"></groupbook-detail>
</template>
<script>
import GroupbookDetail from "./components/GroupbookDetail";
export default {
  name: "addGroupbook",
  components: {
    GroupbookDetail
  }
};
</script>
