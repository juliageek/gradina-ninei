<template>
    <div class="product-card">
        <g-link :to="`/products/${product.slug}`">
            {{ product.title }}
        </g-link>
    </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
     product: {
         type: Object,
         required: true
     },
  }
}
</script>

<style lang="scss">
.product-card {
  background-color: $mint-cream;
  border-radius: 15px;
}
</style>