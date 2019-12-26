<template> 
  <travels-detail :is-edit='true'></travels-detail>
</template>
<script>
  import TravelsDetail from './components/TravelsDetail'
  export default {
    name: 'updateTravels',
    components: { TravelsDetail }
  }
</script>
<style>
</style>


