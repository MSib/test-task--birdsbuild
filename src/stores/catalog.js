import { defineStore } from 'pinia'
import { useRouterStore } from '@/stores/router'

function checkingSalesType(saleTypes, saleType, itemType) {
  if (saleTypes['Все типы'] === saleType) {
    // All types
    return true
  } else if (
    saleTypes['Разовая продажа'] === saleType &&
    saleTypes[itemType] === saleType
  ) {
    // Direct sales type
    return true
  } else if (
    saleTypes['Аукцион'] === saleType &&
    saleTypes[itemType] === saleType
  ) {
    // Auction type
    return true
  }
  // Unknown type
  return false
}

function compareSearch(title, query) {
  return title.toLowerCase().indexOf(query?.toLowerCase() ?? '') !== -1
    ? true
    : false
}

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    cards: null,
    initialCards: null,
    searchQuery: null,
  }),
  getters: {},
  actions: {
    defineCard(id) {
      return this.cards.filter((item) => item.id === id)[0]
    },
    initializeCards(cards) {
      this.cards = this.initialCards = cards
    },
    setCards(cards) {
      this.cards = cards
    },
    setSearchQuery(query) {
      this.searchQuery = query
    },
    clearSearchQuery() {
      this.searchQuery = null
    },
    refresh() {
      const storeRouter = useRouterStore()
      const { currentPage, pages, saleType, saleTypes } = storeRouter

      const pageKey = Object.keys(pages).find(key => pages[key] === currentPage)

      if (pageKey === pages.favorite) {
        // Favorite page
        this.cards = this.initialCards.filter(
          (item) =>
            item.isFavorite === true &&
            item.isPaid === false &&
            checkingSalesType(saleTypes, saleType, item.saleType)
        )
      } else if (pageKey === pages.stock) {
        // Stock page
        this.cards = this.initialCards.filter(
          (item) =>
            item.isDeals === false &&
            item.isPaid === false &&
            checkingSalesType(saleTypes, saleType, item.saleType) &&
            compareSearch(item.title, this.searchQuery)
        )
      } else if (pageKey === pages.deals) {
        // Deals page
        this.cards = this.initialCards.filter(
          (item) =>
            (item.isDeals === true || item.isPaid === true) &&
            checkingSalesType(saleTypes, saleType, item.saleType)
        )
      } else {
        this.cards = []
      }
    },

    // Button action
    toFavorite(id) {
      this.defineCard(id).isFavorite = true
      this.refresh()
    },
    toDeals(id) {
      this.defineCard(id).isDeals = true
      this.refresh()
    },
    toPaid(id) {
      this.defineCard(id).isPaid = true
      this.refresh()
    },

    // Button display conditions
    whetherToShowAddToDealsButton(id) {
      const router = useRouterStore()
      return this.defineCard(id)
        ? (router.page === router.pages.stock ||
            router.page === router.pages.favorite) &&
            this.defineCard(id).isDeals === false
        : false
    },
    whetherToShowPayButton(id) {
      const router = useRouterStore()
      return this.defineCard(id)
        ? (router.page === router.pages.deals ||
            router.page === router.pages.favorite) &&
            this.defineCard(id).isDeals === true &&
            this.defineCard(id).isPaid === false
        : false
    },
    whetherToShowPaidButton(id) {
      const router = useRouterStore()
      return this.defineCard(id)
        ? router.page === router.pages.deals &&
            this.defineCard(id).isPaid === true
        : false
    },
    whetherToShowAddToFavoriteButton(id) {
      const router = useRouterStore()
      return this.defineCard(id)
        ? (router.page === router.pages.deals ||
            router.page === router.pages.stock) &&
            this.defineCard(id).isFavorite === false &&
            this.defineCard(id).isPaid === false
        : false
    },
  },
})
