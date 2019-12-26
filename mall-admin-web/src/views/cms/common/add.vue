<template>
  <flight-detail :is-edit="false"></flight-detail>
</template>
<script>
import FlightDetail from "./components/FlightDetail";
export default {
  name: "addCommon",
  components: { FlightDetail }
};
</script>
<style>
</style>
