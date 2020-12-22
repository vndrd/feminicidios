<template>
    <div>
        Según {{titulo}}:
        <div class="row mb-3">
            <div class="col-md-8">
                <select name="" id="" class="form-control">
                    <option v-for="opcion in opciones" :value="opcion" :key="opcion">
                        {{opcion}}
                    </option>
                </select>
            </div>
            <button class="btn btn-sm btn-secondary">Filtrar </button>
        </div>
    </div>
</template>
<script>

export default {
    props: {
        titulo: {
            type: String,
            defaut: '',
        },
        opciones: {
            type: Array(),
            default: [],
        }        
    },
    data(){
        return {
        
        }
    },
    mounted(){

    },
    computed: {
        
    }
}
</script>