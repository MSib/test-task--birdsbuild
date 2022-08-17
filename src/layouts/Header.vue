<script setup>
import { storeToRefs } from 'pinia'
import { useRouterStore } from '@/stores/router'

const storeRouter = useRouterStore()
const { page } = storeToRefs(storeRouter)
const { pages, toFavoritePage, toStockPage, toDealsPage } = storeRouter
</script>

<template>
  <header class="header">
    <div class="header-top"></div>
    <div class="header-menu">
      <button type="button" class="header-menu__button" aria-expanded="false">
        <span class="header-menu__icon"></span>
        Каталог
      </button>
    </div>
    <div class="header-tools">
      <button @click="toFavoritePage()" :class="{ 'header-tools__item--active': page === pages.favorite }"
        type="button" class="header-tools__item header-tools__item--favorite">Избранное</button>
      <button @click="toStockPage()" :class="{ 'header-tools__item--active': page === pages.stock }"
        type="button" class="header-tools__item header-tools__item--stock">Склад</button>
      <button @click="toDealsPage()" :class="{ 'header-tools__item--active': page === pages.deals }"
        type="button" class="header-tools__item header-tools__item--deals">Сделки</button>
    </div>
  </header>
</template>

<style>
.header {
  margin-bottom: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.header-top {
  width: 100%;
  min-height: 40px;
  background-color: var(--c-platinum);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}

.header-menu__button {
  display: flex;
  gap: 12px;
  padding: 15px 12px;
  align-items: center;
  font: inherit;
  font-weight: 500;
  font-size: 15px;
  color: inherit;
  background-color: transparent;
  border: none;
  border-radius: var(--border-radius);
}

.header-menu__button:hover,
.header-menu__button:focus-visible {
  background-color: var(--c-white-gray);
}

.header-menu__button:focus-visible {
  outline-color: var(--c-platinum);
}

.header-menu__button:active {
  background-color: var(--c-platinum);
}

.header-menu__icon {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 2px;
  border-radius: 1px;
  background-color: var(--c-blue-dark);
}

.header-menu__icon::before,
.header-menu__icon::after {
  content: '';
  position: absolute;
  display: block;
  width: 18px;
  height: 2px;
  background-color: var(--c-blue-dark);
  border-radius: 1px;
}

.header-menu__icon::before {
  top: -5px;
}

.header-menu__icon::after {
  bottom: -5px;
}

.header-tools {
  margin-block: 20px;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
}

.header-tools__item {
  padding: 5px;
  min-width: 86px;
  font: inherit;
  font-weight: 500;
  color: inherit;
  text-align: center;
  background-color: transparent;
  border: none;
  border-radius: var(--border-radius);
}

.header-tools__item:hover,
.header-tools__item:focus-visible {
  background-color: var(--c-white-gray);
}

.header-tools__item:focus-visible {
  outline-color: var(--c-platinum);
  z-index: 1;
}

.header-tools__item:active {
  background-color: var(--c-platinum);
}

.header-tools__item--active {
  background-color: var(--c-white-gray);
}

.header-tools__item--favorite::before {
  background-image: url(@/assets/img/favorite.svg);
}

.header-tools__item--stock::before {
  background-image: url(@/assets/img/stock.svg);
}

.header-tools__item--deals::before {
  background-image: url(@/assets/img/deals.svg);
}

.header-tools__item::before {
  content: '';
  display: block;
  margin-inline: auto;
  margin-bottom: 2px;
  width: 24px;
  height: 24px;
  background-position: center;
  background-repeat: no-repeat;
}
</style>