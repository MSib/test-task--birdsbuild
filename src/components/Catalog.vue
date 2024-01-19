<script setup>
import Card from '@/components/Card.vue'
import Toolbar from '@/components/Toolbar.vue'

import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'

const storeCatalog = useCatalogStore()
const { cards } = storeToRefs(storeCatalog)
</script>

<template>
  <Toolbar />
  <div v-if="cards?.length" class="catalog">
    <Card v-for="(card, index) in cards" :key="card.id" :index="index" :card="card.id" class="catalog__item" />
  </div>
  <div v-else class="catalog-empty">Пусто</div>
</template>
<style>
.catalog,
.catalog__item:not(:last-child) {
  margin-bottom: 40px;
}

.catalog-empty {
  font-size: 18px;
  text-align: center;
  line-height: 30px;
  border-bottom: 1px solid var(--c-manatee);
  margin-bottom: 40px;
}
</style>