<script setup>
import { storeToRefs } from 'pinia'
import { useCatalogStore } from '@/stores/catalog'

const storeCatalog = useCatalogStore()
const { cards } = storeToRefs(storeCatalog)
const {
  toFavorite,
  toDeals,
  toPaid,
  whetherToShowAddToDealsButton,
  whetherToShowPayButton,
  whetherToShowPaidButton,
  whetherToShowAddToFavoriteButton,
} = storeCatalog

const props = defineProps(['card', 'index'])
const { index } = props
const card = cards.value[index]

function splittingNumberByThreeDigits(inputPrice) {
  return inputPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>

<template>
  <div v-if="card" class="card">
    <div class="card__info">
      <div class="card__image-wrap">
        <picture>
          <source v-if="card.image.webp" :srcset="card.image.webp" type="image/webp">
          <img :src="card.image.img" :width="card.image.width" :alt="card.image.alt" class="card__image" />
        </picture>
      </div>
      <div class="card__data data-card">
        <p class="data-card__type">{{ card.saleType }}</p>
        <p class="data-card__title">{{ card.title }}</p>
        <div class="data-card__location-wrap">
          <p class="data-card__location">{{ card.location }}</p>
        </div>
        <dl class="data-card__seller">
          <dt class="data-card__label">Продавец</dt>
          <dd class="data-card__value">{{ card.seller }}</dd>
        </dl>
        <div class="data-card__product-type-wrap">
          <dl class="data-card__product-type">
            <dt class="data-card__label">Вид товара</dt>
            <dd class="data-card__value">{{ card.productType }}</dd>
          </dl>
        </div>
        <p class="data-card__description">{{ card.description }}</p>
      </div>
    </div>
    <div class="card__sell sell">
      <div class="sell__data">
        <p class="sell__price">{{ splittingNumberByThreeDigits(card.price * card.quantity) }} ₽</p>
        <dl class="sell__quantity">
          <dt class="sell__label">Количество</dt>
          <dd class="sell__value">{{ card.quantity }}<span class="sell__quantity-symbol">шт.</span></dd>
        </dl>
        <dl class="sell__quantity-per-piece">
          <dt class="sell__label">Стоимость за штуку</dt>
          <dd class="sell__value">{{ splittingNumberByThreeDigits(card.price) }} ₽</dd>
        </dl>
      </div>
      <div class="sell__actions">
        <button v-if="whetherToShowAddToDealsButton(card.id)" @click="toDeals(card.id)"
          class="sell__button sell__button--add-to-deals" type="button">Добавить в
          сделки</button>
        <button v-if="whetherToShowPayButton(card.id)" @click="toPaid(card.id)" class="sell__button sell__button--pay"
          type="button">Оплатить</button>
        <button v-if="whetherToShowPaidButton(card.id)" class="sell__button sell__button--paid" type="button"
          disabled>Оплачено</button>
        <button v-if="whetherToShowAddToFavoriteButton(card.id)" @click="toFavorite(card.id)"
          class="sell__button sell__button--add-to-favorite" type="button" aria-label="Добавить в избранное"></button>
      </div>
    </div>
  </div>
</template>

<style>
.card {
  min-height: 366px;
  display: flex;
  outline: 1px solid var(--c-platinum);
  border-radius: var(--border-radius-large);
}

@media (max-width: 767px) {
  .card {
    flex-direction: column;
  }
}

.card__info {
  padding: 20px;
  display: flex;
  gap: 20px;
  align-self: start;
}

@media (max-width: 1023px) {
  .card__info {
    flex-direction: column;
  }
}

@media (max-width: 767px) {
  .card__image-wrap {
    text-align: center;
    ;
  }
}

.card__image {
  border-radius: var(--border-radius);
}

.data-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.data-card__type {
  margin: 0;
  color: var(--c-manatee);
}

.data-card__title {
  margin: 0;
  margin-bottom: 10px;
  font-size: 15px;
  line-height: 1.25;
  font-weight: 500;
}

.data-card__location {
  margin: 0;
  padding: 4px;
  display: inline-block;
  color: var(--c-blue-light);
  background-color: var(--c-white-gray);
  border-radius: var(--border-radius-small);
}

.data-card__location::before {
  content: '';
  margin-inline: 2px;
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  background-image: url(@/assets/img/map-pin.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.data-card__seller {
  margin: 0;
  display: flex;
  gap: 4px;
}

.data-card__product-type {
  margin: 0;
  padding: 8px;
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  background-color: var(--c-white-gray);
  border-radius: var(--border-radius);
}

.data-card__label {
  color: var(--c-manatee);
}

.data-card__value {
  margin-inline-start: 0;
}

.data-card__product-type .data-card__value {
  color: var(--c-blue-light);
}

.data-card__description {
  margin: 0;
  line-height: 1.5;
  /* cut after 3 line */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.sell {
  padding: 20px;
  min-width: 314px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  box-sizing: border-box;
  outline: 1px solid var(--c-platinum);
  border-radius: var(--border-radius-large);
}

.sell__data {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex-grow: 1;
}

.sell__price {
  margin: 0;
  font-size: 20px;
  line-height: 1;
  font-weight: 500;
  margin-bottom: 3px;
}

.sell__quantity {
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.sell__quantity-symbol {
  margin-left: 4px;
}

.sell__quantity-per-piece {
  margin: 0;
  display: flex;
  justify-content: space-between;
}

.sell__label {
  color: var(--c-manatee);
}

.sell__value {
  margin-inline-start: 0;
}

.sell__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sell__button {
  padding: 10px;
  min-height: 40px;
  flex-grow: 1;
  font: inherit;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  border-radius: var(--border-radius);
  border: none;
  outline: none;
  background-color: initial;
}

.sell__button:active {
  background-color: var(--c-platinum);
}

.sell__button:focus-visible {
  z-index: 1;
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-blue-light);
}

.sell__button:active:focus-visible {
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-blue-dark);
}

.sell__button--add-to-deals {
  min-height: 50px;
  color: inherit;
  background-color: var(--c-white-gray);
}

.sell__button--add-to-favorite {
  min-width: 50px;
  min-height: 50px;
  margin-left: auto;
  flex-grow: 0;
  background-color: var(--c-white-gray);
  background-image: url(@/assets/img/favorite.svg);
  background-repeat: no-repeat;
  background-position: center;
}

.sell__button--add-to-favorite:hover {
  background-color: var(--c-platinum);
}

.sell__button--pay {
  color: var(--c-white);
  background-color: var(--c-service-green);
}

.sell__button--pay:active {
  color: var(--c-service-green);
  background-color: transparent;
  outline: 1px solid var(--c-service-green);
}

.sell__button--pay:focus-visible {
  z-index: 1;
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-service-green);
}

.sell__button--pay:active:focus-visible {
  box-shadow: 0 0 0 2px var(--c-white), 0 0 0 5px var(--c-service-green);
  outline: none;
}

.sell__button--paid,
.sell__button--paid:active {
  color: var(--c-manatee);
  background-color: transparent;
  outline: 1px solid var(--c-platinum);
  cursor: default;
}

.sell__button--hidden {
  display: none;
}
</style>