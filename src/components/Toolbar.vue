<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouterStore } from '@/stores/router'
import { useCatalogStore } from '@/stores/catalog'

const storeRouter = useRouterStore()
const { page, saleType } = storeToRefs(storeRouter)
const {
  pages,
  saleTypes,
  toAllType,
  toByDirectSalesType,
  toAuctionType
} = storeRouter

const storeCatalog = useCatalogStore()
const { searchQuery } = storeToRefs(storeCatalog)
const { setSearchQuery, refresh } = storeCatalog

const searchRef = ref(null)

function search() {
  setSearchQuery(searchRef.value.value)
  refresh()
}

function clearSearchValue() {
  searchRef.value.value = null
}

</script>

<template>
  <div class="toolbar">
    <div class="toolbar__filter filter">
      <button @click="toAllType" type="button" :class="{ 'filter__button--active': saleType === saleTypes['Все типы'] }"
        class="filter__button">{{ saleTypes['Все типы']
        }}</button>
      <button @click="toByDirectSalesType" type="button"
        :class="{ 'filter__button--active': saleType === saleTypes['Разовая продажа'] }" class="filter__button">{{
            saleTypes['Разовая продажа']
        }}</button>
      <button @click="toAuctionType" type="button"
        :class="{ 'filter__button--active': saleType === saleTypes['Аукцион'] }" class="filter__button">{{
            saleTypes['Аукцион']
        }}</button>
    </div>
    <div v-if="page === pages.stock" class="toolbar__search search">
      <label for="search" class="search__label" aria-label="Поиск"></label>
      <input @keydown.enter="search" @keydown.esc="clearSearchValue" ref="searchRef" :value="searchQuery" id="search"
        class="search__input" type="text">
      <button @click="search" class="search__button" type="button" aria-label="Найти"></button>
    </div>
  </div>
</template>

<style>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-bottom: 40px;
}

.toolbar__filter {
  margin-right: auto;
}

.filter {
  padding: 13px 13px 14px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 15px;
  color: var(--c-manatee);
  background-color: var(--c-white-gray);
  outline: 1px solid var(--c-platinum);
  border-radius: var(--border-radius);
}

.filter__button {
  padding: 0;
  font: inherit;
  color: inherit;
  border: none;
  background-color: transparent;
  outline: none;
}

.filter__button:active {
  color: var(--c-blue-dark);
}

.filter__button:focus-visible {
  text-decoration: underline;
}

.filter__button--active {
  color: var(--c-blue-dark);
}

.search {
  position: relative;
  padding: 4px;
  display: flex;
  gap: 8px;
  align-items: center;
  outline: 1px solid var(--c-platinum);
  border-radius: var(--border-radius);
}

@media (max-width: 424px) {
  .search {
    width: 100%;
  }
}

.search__label {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.search__input {
  margin-left: 16px;
  min-width: 198px;
  font: inherit;
  font-size: 15px;
  color: inherit;
  border: none;
  outline: none;
  z-index: 2;
}

.search__input:focus-visible {
  box-shadow: 0 2px 0 var(--c-platinum);
}

@media (max-width: 424px) {
  .search__input {
    flex-grow: 1;
  }
}

.search__button {
  width: 40px;
  height: 40px;
  background-image: url(@/assets/img/search.svg);
  background-repeat: no-repeat;
  background-position: center;
  border-radius: var(--border-radius);
  background-color: var(--c-blue-dark);
  border: none;
  outline: none;
  z-index: 2;
}

.search__button:active {
  background-color: var(--c-blue-light);
}

.search__button:focus-visible {
  z-index: 1;
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-blue-dark);
}

.search__button:active:focus-visible {
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-blue-light);
}
</style>