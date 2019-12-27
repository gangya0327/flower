<template> 
  <travels-detail :is-edit='false'></travels-detail>
</template>
<script>
  import TravelsDetail from './components/TravelsDetail'
  export default {
    name: 'addTravels',
    components: { TravelsDetail }
  }
</script>
<style>
</style>


