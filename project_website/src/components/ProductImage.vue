<template>
    <div @click="$router.push({ path: '/enskild-produkt/' + product.id })" class="product-img-box">
        <img :src="product.image" :alt="product.name">
        {{ product.name }}
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>

<style>
.product-img-box {
    flex-basis: 18%;
    cursor: pointer;

}

.product-img-box img:hover {
    flex-basis: 18%;
    cursor: pointer;
    border: #170D00 solid 2px;
}

.product-img-box img {
    width: 100%;
    height: 150px;
    min-width: 150px;
    overflow: hidden;
    object-fit: cover;
    border-radius: 15px;
    margin-bottom: 1em;
    border: #EEF0EB solid 2px;
}

@media only screen and (max-width: 800px) {
    .product-img-box {
        flex-basis: 30%;
        cursor: pointer;
        margin-top: 1em;
    }
}

@media only screen and (max-width: 600px) {
    .product-img-box {
        flex-basis: 45%;
        cursor: pointer;
        margin-top: 1em;
    }
}
</style>