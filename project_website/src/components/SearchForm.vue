<template>
    <!-- Formulär för att söka efter produkt -->
    <form @submit.prevent="searchProduct()">
        <div class="input-group mb-3">
            <input class="form-control" name="search" id="search" v-model="search" type="text"
                placeholder="Sök efter produkt">
            <input class="btn btn-primary" type="submit" value="Sök">
        </div>
    </form>
    <div>
        <h3>Resultat</h3>

        <!-- Om inga produkter returneras -->
        <div v-if="no">
            <p>Inga produkter hittade</p>
        </div>

        <!-- Lista med returnerade produkter -->
        <div v-if="yes" class="flex-container-row flex-wrap">
            <Product v-for="name in products" :product="name" :key="name.id" />
        </div>
    </div>
</template>

<script>
import Product from "./Product.vue";

export default {
    data() {
        return {
            /* Standardvärden i formulär-fälten */
            search: "",
            token: localStorage.getItem('token'),
            products: [],
            no: false,
            yes: false
        }
    },
    components: {
        Product
    },
    methods: {
        async searchProduct() {

            search = this.search;

            /* Kontrollerar att ett sökord skickats */
            if (this.search.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/products/search/name/" + search, {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        "Accept": "application/json",
                    }
                });
                const data = await resp.json();

                if (data.length <= 0) {
                    /* Om inga produkter returnerats visas texten */
                    this.no = true;
                    this.yes = false;
                } else {
                    /* Om produkter returneras visas produktlistan */
                    this.no = false;
                    this.yes = true;
                    this.products = data;

                }

                /* Nollställer sökformuläret */
                this.search = "";

            }

        }
    }
}    
</script>

<style scoped>
.input-group {
    height: fit-content;
}

form input[type="submit"] {
    margin-top: 0;
    border: solid 2px #DA935E;
}

</style>