import { useCatalogStore } from '@/stores/catalog'
import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', {
  state: () => ({
    pages: {
      favorite: 'favorite',
      stock: 'stock',
      deals: 'deals',
    },
    currentPage: null,
    saleTypes: {
      'Все типы': 'Все типы',
      'Разовая продажа': 'Прямые продажи',
      'Аукцион': 'Аукцион',
    },
    selectedSaleType: null,
  }),
  getters: {
    saleType: (state) => state.selectedSaleType ?? state.saleTypes['Все типы'],
    page: (state) => {
      if (!state.currentPage) {
        state.toStockPage()
      }
      return state.currentPage
    },
  },
  actions: {
    toDefaultSaleType() {
      this.selectedSaleType = this.saleTypes['Все типы']
    },
    
    // Change page
    toFavoritePage() {
      this.toDefaultSaleType()
      this.currentPage = this.pages.favorite
      const storeCatalog = useCatalogStore()
      storeCatalog.clearSearchQuery()
      storeCatalog.refresh()
    },
    toStockPage() {
      this.toDefaultSaleType()
      this.currentPage = this.pages.stock
      const storeCatalog = useCatalogStore()
      storeCatalog.clearSearchQuery()
      storeCatalog.refresh()
    },
    toDealsPage() {
      this.toDefaultSaleType()
      this.currentPage = this.pages.deals
      const storeCatalog = useCatalogStore()
      storeCatalog.clearSearchQuery()
      storeCatalog.refresh()
    },

    // Change type
    toAllType() {
      this.selectedSaleType = this.saleTypes['Все типы']
      const storeCatalog = useCatalogStore()
      storeCatalog.refresh()
    },
    toByDirectSalesType() {
      this.selectedSaleType = this.saleTypes['Разовая продажа']
      const storeCatalog = useCatalogStore()
      storeCatalog.refresh()
    },
    toAuctionType() {
      this.selectedSaleType = this.saleTypes['Аукцион']
      const storeCatalog = useCatalogStore()
      storeCatalog.refresh()
    },
  },
})
