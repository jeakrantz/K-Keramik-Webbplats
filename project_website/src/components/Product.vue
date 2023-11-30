<template>
    <div @click="$router.push({ path: '/enskild-produkt/' + product.id })" class="product-img-box">
        <img :src="product.image" :alt="product.name">
        <h3>{{ product.name }}</h3>
        <p>Se mer <i class="fa-solid fa-arrow-right"></i></p>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>

<style scoped>
    .product-img-box img{
        max-height: 200px;
    }

    h3 {
        text-align: left;
        font-size: 1.2rem;
    }
    p{
        text-align: left;
        font-size: .9rem;
        cursor: pointer;
    }
    p:hover{
        color: #DA935E;
    }
</style>