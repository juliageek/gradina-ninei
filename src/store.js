import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'query-string'
import debounce from 'lodash.debounce'

Vue.use(Vuex);

const categoryIsSelected = (categories, categoryName) => {
  return categories.find((t) => t.name === categoryName).selected
}

const noCategoriesSelected = (categories) => {
  let nothingSelected = true
  categories.forEach((category) => {
    if (category.selected) {
      nothingSelected = false
    }
  })

  return nothingSelected
}

const categoryInQS = (category) => {
  const categoriesInQS = qs.parse(location.search)

  if (Object.keys(categoriesInQS).length === 0) {
    return false
  } else {
    if (typeof categoriesInQS.category === 'string') {
      return categoriesInQS.category === category
    } else {
      return !!categoriesInQS.category.find((t) => t === category)
    }
  }
}

const setUrl = (selectedCategory) => {
  const baseUrl = [
    location.protocol,
    '//',
    location.host,
    location.pathname,
  ].join('')

  let params = ''
  let sep = ''

  if (selectedCategory) {
    params = qs.stringify({ category: selectedCategory })
    sep = '?'
  }

  window.history.replaceState({}, '', `${baseUrl}${sep}${params}`)
}

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    filteredProducts: [],
  },
  getters: {
    filteredProducts(state) {
      return state.filteredProducts
    },

    categories(state) {
      return state.categories
    },
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
      state.filteredProducts = products
    },

    setCategories(state) {
      const categories = []
      state.products.forEach((product) => {
        console.log('product----', product)
        product.categories.forEach((category) => {
          if (!categories.find((t) => t.name === category)) {
            categories.push({ name: category, selected: categoryInQS(category) })
          }
        })
      })
      state.categories = categories
    },

    updateCategory(state, category) {
      state.categories.forEach((cat) => {
        if (cat.name !== category.name) {
          cat.selected = false;
        } else {
          cat.selected = true;
        }
      });

      if (category.name === 'all-products') {
        state.categories.find((t) => t.name === category.name).selected = false;
      }

      let selectedCategory = category.name;

      setUrl(selectedCategory)
    },

    filterProducts(state) {
      state.filteredProducts = []
      state.products.forEach((product) => {
        product.categories.forEach((category) => {
          if(categoryIsSelected(state.categories, category)) {
            state.filteredProducts.push(product)
          }
        })
      })

      if (noCategoriesSelected(state.categories)) {
        state.filteredProducts = state.products
      } else {
        state.filteredProducts = [...new Set(state.filteredProducts)]
      }
    },

    filterProductsOnName(state, queryString) {
      state.filteredProducts = []

      state.products.forEach((product) => {
        if(product.title.toLowerCase()
            .includes(queryString.toLowerCase())) {
          state.filteredProducts.push(product)
        }
      })
    }
  },
  actions: {
    setInitialProducts({ commit }, productsFromPrismic) {
      const products = productsFromPrismic.map((edge) => {
        return {
          slug: edge.node.uid,
          categories: edge.node.data.categories,
          title: edge.node.data.title,
          image: edge.node.data.image,
          shown: true,
        }
      })

      commit('setProducts', products)
      commit('setCategories', products)
      commit('filterProducts')
    },

    filter({ commit }, category) {
      commit('updateCategory', category)
      commit('filterProducts')
    },

    filterOnProductName({ commit }, queryString) {
      commit('filterProductsOnName', queryString)
    }
  },
})
