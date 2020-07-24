<template>
    <Layout>
        <div v-if="$page.product">
            {{ $page.product.data.title }}
        </div>
    </Layout>
</template>

<script>
export default {
    name: 'ProductInfo'
}
</script>

<page-query>
query Product($id: ID!) {
    product: prismicProduct(id: $id) {
        data {
            title,
            weight,
            price
        }
    }
}
</page-query>