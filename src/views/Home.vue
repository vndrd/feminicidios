<template>
  <div class="home">
    
    <Mapa />
  </div>
</template>

<script>
// @ is an alias to /src
import Mapa from '@/components/Mapa.vue'
import jsn from '../assets/bd_fem.json'

export default {
  name: 'Home',
  components: {
    Mapa
  },
  mounted(){
    console.log({jsn})
  }
}
</script>
