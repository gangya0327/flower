<template> 
  <hotel-detail :is-edit='true'></hotel-detail>
</template>
<script>
  import hotelDetail from './components/HotelDetail'
  export default {
    name: 'updateHotel',
    components: { hotelDetail }
  }
</script>
<style>
</style>


