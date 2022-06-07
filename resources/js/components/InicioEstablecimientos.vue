<template>
  <div>
    <listado-categorias></listado-categorias>
    <mapa-establecimientos></mapa-establecimientos>
    <categoria-cafe></categoria-cafe>
    <categoria-restaurant></categoria-restaurant>
    <categoria-hotel></categoria-hotel>
  </div>
</template>

<script>
import ListadoCategorias from './ListadoCategorias.vue';
import MapaEstablecimientos from './MapaEstablecimientos.vue';
import CategoriaCafe from './CategoriaCafe.vue';
import CategoriaRestaurant from './CategoriaRestaurant.vue';
import CategoriaHotel from './CategoriaHotel.vue';


export default {

  components: {
    ListadoCategorias,
    MapaEstablecimientos,
    CategoriaCafe,
    CategoriaRestaurant,
    CategoriaHotel
  }
}

</script>