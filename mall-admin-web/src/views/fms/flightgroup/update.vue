<template> 
  <flightgroup-detail :is-edit='true'></flightgroup-detail>
</template>
<script>
  import FlightgroupDetail from './components/FlightgroupDetail'
  export default {
    name: 'updateGroup',
    components: { FlightgroupDetail }
  }
</script>
<style>
</style>
