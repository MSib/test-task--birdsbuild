<script setup>
import Header from '@/layouts/Header.vue'
import Catalog from '@/components/Catalog.vue'

import { useCatalogStore } from '@/stores/catalog'

import mockedCards from '@/mocks/cards.json'

const storeCatalog = useCatalogStore()
const { initializeCards } = storeCatalog

initializeCards(mockedCards)
</script>

<template>
  <Header v-if="mockedCards" />
  <Catalog v-if="mockedCards" />
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
}
</style>
