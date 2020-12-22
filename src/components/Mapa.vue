<template>
<div>
    <div id="map"></div>
        <!-- panel content -->
    <div id="sidebar" class="leaflet-sidebar collapsed">
        <!-- nav tabs -->
        <div class="leaflet-sidebar-tabs">
            <!-- top aligned tabs -->
            <ul role="tablist">
                <li><a href="#home" role="tab"><i class="fa fa-bars active"></i></a></li>
                <li><a href="#autopan" role="tab"><i class="fa fa-arrows"></i></a></li>
            </ul>
            <!-- bottom aligned tabs -->
            <ul role="tablist">
                <li><a href="https://github.com/nickpeihl/leaflet-sidebar-v2"><i class="fa fa-github"></i></a></li>
            </ul>
        </div>
        <!-- panel content -->
        <div class="leaflet-sidebar-content">
            <div class="leaflet-sidebar-pane" id="home">
                <h1 class="leaflet-sidebar-header">
                    REGISTRO DE FEMINICIDIOS
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <div class="container mt-5">
                    <p>Visualización de <strong>feminicidios</strong> en Bolivia.</p>
                    <p>Base de datos de <strong>2013</strong> a <strong>2017</strong>.</p>
                </div>
            </div>

            <div class="leaflet-sidebar-pane" id="autopan">
                <h1 class="leaflet-sidebar-header">
                    FILTROS
                    <span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span>
                </h1>
                <h5 class="mt-2">
                    <strong>Filtrar por:</strong> 
                </h5>
                <filtro-select 
                    titulo="Relación Victimador-Víctima"
                    :opciones="valoresDiferentes('relacion_victima')"    
                />
                <filtro-select 
                    titulo="Causa de muerte"
                    :opciones="valoresDiferentes('causa_muerte')"    
                />
                <filtro-select 
                    titulo="Agresión previa"
                    :opciones="valoresDiferentes('agresion_previa')"    
                />
                <filtro-select 
                    titulo="Año"
                    :opciones="valoresDiferentes('anio')"    
                />
                <filtro-select 
                    titulo="Año"
                    :opciones="valoresDiferentes('anio')"    
                />
            </div>
            <!-- footer icon -->
            <div class="leaflet-sidebar-pane" id="messages">
                <h1 class="leaflet-sidebar-header">Messages<span class="leaflet-sidebar-close"><i class="fa fa-caret-left"></i></span></h1>
            </div>
        </div>
    </div>
</div>
</template>
<style lang="scss">
#map {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
}
html, body {
    margin: 0;
}
</style>
<script>
import L from 'leaflet'
import "leaflet/dist/leaflet.css";
require( 'leaflet-sidebar-v2/js/leaflet-sidebar')
require( 'leaflet-sidebar-v2/css/leaflet-sidebar.min.css')

import {mapGetters} from 'vuex'

import FiltroSelect from './filtros/FiltroSelect.vue';
export default {
  components: { FiltroSelect },
    data(){
        return {
            map: null,
            layerGroup: null,
            propiedad: 'relacion_victima',
            valor: 'Esposo',
        }
    },
    mounted(){
        //crear mapa con layer base
        this.map = L.map('map').setView([ -16.0810001373,-64.8611022949], 5);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        // var mysidebar = 
        L.control.sidebar({
            autopan: false,       // whether to maintain the centered map point when opening the sidebar
            closeButton: true,    // whether t add a close button to the panes
            container: 'sidebar', // the DOM container or #ID of a predefined sidebar container that should be used
                position: 'left',     // left or right
        }).addTo(this.map);
        //parte de los markers
        this.layerGroup = L.layerGroup([]);
        // jsn.map( ({id,geometry,properties}) => {
        this.agregarMarkers();
        var relacion_gp = this.valoresDiferentes('relacion_victima')
        var hijos_gp = this.valoresDiferentes('numero_hijos')
        console.log({relacion_gp})
        console.log({hijos_gp})
        console.log({asdasda: this.filtrado})
    },
    methods: {
        isFloat(n){
            return Number(n) === n && n % 1 !== 0;
        },
        valoresDiferentes(propiedad){
            const unique = [];
            let aux = this.get_original
            aux.map( x => 
                unique.filter( a => a == x[propiedad]).length > 0 ? null : unique.push(x[propiedad])
            );
            return unique
        },
        filtrarPor(propiedad, valor){
            console.log({from: 'filtrarpor', casos: this.get_casos})
            return this.get_casos.filter(item => item[propiedad] == valor)
        },
        cambiarValor(){
            this.valor = 'Novio'
            console.log({from: 'cambiarValor', valor: this.valor})
        },
        agregarMarkers(){
            var LeafIcon = L.Icon.extend({
            options: {
                    // shadowUrl: 'src/assets-prueba/logo.png',
                    iconSize:     [20, 20],
                    shadowSize:   [50, 64],
                    iconAnchor:   [5, 10],
                    shadowAnchor: [4, 62],
                    popupAnchor:  [0, -10]
                }
            });
            var greenIcon = new LeafIcon({iconUrl: 'https://www.flaticon.es/svg/static/icons/svg/3608/3608834.svg'})
            this.filtrado.map( ({
                geo,relacion_victima,nombre_victima,fecha,causa_muerte
            }) => {
                let aux = geo.split(',')
                // let auxoriginal = aux
                aux[0] = parseFloat(aux[0])
                aux[1] = parseFloat(aux[1])
                let [lat,long] = aux
                if( this.isFloat(aux[0])){
                    L.marker(
                        [lat,long], 
                        {icon: greenIcon}
                        // <b>Comunidad/Municipio: </b> Puerto Quijarro${Name}</br> 
                    )
                        // <img src="https://www.flaticon.com/svg/static/icons/svg/870/870620.svg" height="100px"></br> 
                    .bindPopup(`
                        <b>Fecha:</b>${fecha}</br>
                        <b>Nombre de la víctima:</b>${nombre_victima}</br>
                        <b>Victimador/Presunto:</b>${relacion_victima}</br>
                        <b>Causa de la muerte:</b>${causa_muerte}</br>
                    `).addTo(this.layerGroup);
                }else{
                    // console.log({nop:'nop', ax: aux[0], auxoriginal})
                }
            })
            this.layerGroup.addTo(this.map)
        }
    },
    computed:{
        ...mapGetters([
            'get_casos',
            'get_original',
            'lbl_relacion_victima',
        ]),
        filtrado: function(){
            console.log({from: 'filtrado', val: this.valor, pro: this.propiedad})
            return this.filtrarPor(this.propiedad,this.valor)
        },
    },
    watch: {
        valor: function(){
            this.layerGroup.clearLayers();
            this.agregarMarkers();
        },
    }
}
</script>