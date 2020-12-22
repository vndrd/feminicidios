<template>
    <div>
        <button class="btn btn-sm">Ver Relación </button>
        <select name="" id="" class="form-control">
            <option v-for="opcion in lbl_relacion_victima" :value="opcion" :key="opcion">
                {{opcion}}
            </option>
        </select>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    props: {
        
    },
    data(){
        return {
        
        }
    },
    mounted(){

    },
    computed: {
        ...mapGetters(['lbl_relacion_victima'])
    }
}
</script>