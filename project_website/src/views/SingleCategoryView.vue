<template>
    <main>
        <h2>{{ categories.name }}</h2>

        <!-- Om ingen kategori finns visas texten -->
        <div v-if="no">
            <p>Kategorin finns inte</p>
        </div>

        <!-- Visar produkter kopplade till kategorin -->
        <div v-if="yes">
            <div class="flex-container-row flex-wrap">
                <Product v-for="name in products" :product="name" :key="name.id" />
            </div>
        </div>
        <!-- Knapp för att komma till add-product -->
        <div class="flex-container-column">
            <button @click="$router.push({ path: '/add-product' })" class="btn btn-primary">Lägg till ny produkt +</button>
        </div>
    </main>
</template>

<script>
import Product from "../components/Product.vue";

export default {
    data() {
        return {
            products: [],
            categories: [],
            token: localStorage.getItem('token'),
            yes: true,
            no: false
        }
    },
    components: {
        Product
    },
    methods: {
        async getProducts() {

            /* Hämtar produkter från det kategori-id som skickats i http-länken */
            let id = this.$route.params.id;

            const resp = await fetch("http://127.0.0.1:8000/api/getproducts/" + id, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            if (resp.status === 404) {
                this.no = true;
                this.yes = false;
            } else {
                const data = await resp.json();
                this.products = data;
            }

        },
        async getCategories() {

            /* Hämtar kategorin från det kategori-id som skickats i http-länken */
            let id = this.$route.params.id;

            const resp = await fetch("http://127.0.0.1:8000/api/categories/" + id, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();
            this.categories = data;

        }
    },
    mounted() {
        this.getProducts();
        this.getCategories();
    }
}
</script>

<style>
    .flex-container-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 2em auto;
    }
</style>