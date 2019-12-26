<template> 
  <flightgroup-detail :is-edit='false'></flightgroup-detail>
</template>
<script>
  import FlightgroupDetail from './components/FlightgroupDetail'
  export default {
    name: 'addFlightgroup',
    components: { FlightgroupDetail }
  }
</script>
<style>
</style>
