<template>
  <flight-detail :is-edit="true"></flight-detail>
</template>
<script>
import FlightDetail from "./components/FlightDetail";
export default {
  name: "updateTicket",
  components: { FlightDetail }
};
</script>
<style>
</style>
