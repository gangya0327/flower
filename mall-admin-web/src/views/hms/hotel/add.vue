<template> 
  <hotel-detail :is-edit='false'></hotel-detail>
</template>
<script>
  import HotelDetail from './components/HotelDetail'
  export default {
    name: 'addHotel',
    components: { HotelDetail }
  }
</script>
<style>
</style>


