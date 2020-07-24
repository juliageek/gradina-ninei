<template>
  <Layout>
    <h1>Hello, world!</h1>
    <p>
      Lala
    </p>
  </Layout>
</template>

<script>
import {mapActions} from "vuex";

export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  mounted() {
    this.setInitialProducts(this.$page.products.edges)
  },
  methods: {
    ...mapActions(['setInitialProducts', 'setInitalCategories']),
  },
}
</script>

<page-query>
query {
  	products: allPrismicProduct {
		edges {
          node {
            id,
            uid,
            data {
                title,
                description,
                relatedProducts,
                categories,
                price,
                weight,
                image {
                  main {
                    url
                  }
                }
              }
            }
        }
    }
}
</page-query>