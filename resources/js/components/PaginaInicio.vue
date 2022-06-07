<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import CategoriaCafe from './CategoriaCafe.vue';
import CategoriaRestaurant from './CategoriaRestaurant.vue';
import CategoriaHotel from './CategoriaHotel.vue';

import store from '../store'

export default {
  store,
}

</script>

