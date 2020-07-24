<template>
    <Layout>
        <div class="wrapper">
            <ProductCard
                v-for="(product, i) in filteredProducts"
                :key="i"
                :product="product"
            >
            </ProductCard>
        </div>
    </Layout>
</template>

<script>
import ProductCard from '../components/ProductCard';
import { mapGetters, mapActions } from 'vuex'


export default {
    components: { ProductCard },
    computed: mapGetters(['filteredProducts'])
}

</script>