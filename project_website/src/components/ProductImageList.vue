<template>
    <h3>Nya produkter</h3>
    <hr>
    <div class="product-img-box-container">
        <!-- Återger de nyaste 5 produkterna -->
        <ProductImage  v-for="name in products.slice(0,5)" :product="name" :key="name.id" />
    </div>
</template>

<script>
import ProductImage from "./ProductImage.vue";

export default {
    data() {
        return {
            /* Standardvärden i formulär-fälten */
            token: localStorage.getItem('token'),
            products: [],
        }
    },
    components: {
        ProductImage
    },
    methods: {
        async getProducts() {

            const resp = await fetch("http://127.0.0.1:8000/api/products", {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            this.products = data;

            /* Kör funktionen på de lagrade produkterna */
            this.sortedItems;

        }
    },
    computed: {
        sortedItems() {
            let sorted = this.products;

            /* Sorterar om produkterna med först först. */
            return sorted.reverse();

        }
    },
        mounted() {
            this.getProducts();
        }
    }    
</script>

<style>
.product-img-box-container{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
}
</style>