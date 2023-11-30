<template>
    <main>
        <h2>Alla produkter</h2>
        <hr>
        <!-- Knappar för att välja bildvy eller listvy -->
        <div class="flex-container-row">
            <button v-if="image_view" @click="listView()" class="btn btn-primary">List-vy</button>
            <button v-if="list_view" @click="imageView()" class="btn btn-primary">Bild-vy</button>
        </div>
        <div class="flex-container-row">
            <!-- Lista över kategorier -->
            <div class="category-container">
                <p>Se produkter i kategori:</p>
                <hr>
                <ProductCategoryButtons />
            </div>
            <!-- Alla produkter bildvy -->
            <div v-if="image_view" class="flex-container-row flex-wrap">
                <Product v-for="name in products" :product="name" :key="name.id" />
            </div>
            <!-- Alla produkter listvy -->
            <div v-if="list_view">
                <table class="table table-light">
                    <thead>
                        <tr>
                            <th scope="col">Namn</th>
                            <th scope="col">Pris</th>
                            <th scope="col">Lager</th>
                            <th scope="col">Ändra Lagerstatus</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <ProductList @stockChange="getProducts()" v-for="name in products" :product="name" :key="name.id" />
                </table>
            </div>
        </div>
        <!-- Knapp för att komma till add-product -->
        <div class="flex-container-column">
            <button @click="$router.push({ path: '/add-product' })" class="btn btn-primary">Lägg till ny produkt <i
                    class="fa-solid fa-plus"></i></button>
        </div>
    </main>
</template>

<script>
import Product from "../components/Product.vue";
import ProductList from "../components/ProductList.vue";
import ProductCategoryButtons from "../components/ProductCategoryButtons.vue";

export default {
    data() {
        return {
            products: [],
            token: localStorage.getItem('token'),
            image_view: true,
            list_view: false
        }
    },
    components: {
        Product,
        ProductCategoryButtons,
        ProductList
    },
    methods: {

        imageView() {
            if (this.image_view === false) {
                this.image_view = true;
                this.list_view = false;
            }
        },
        listView() {
            if (this.list_view === false) {
                this.list_view = true;
                this.image_view = false;
            }
        },
        async getProducts() {
            /* Hämtar alla produkter */
            const resp = await fetch("http://127.0.0.1:8000/api/products", {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            this.products = data;

        }
    },
    mounted() {
        this.getProducts();
    }
}
</script>

<style scoped>
.flex-container-row {
    align-items: flex-start;
    justify-content: center;
    gap: 3em;
    margin-bottom: 1em;
}

.flex-wrap {
    flex-wrap: wrap;
    max-width: 60%;
    gap: 1em;
}

.category-container {
    background-color: #BCCBEA;
    padding: 1em;
    border-radius: 15px;
}


.flex-container-row .product-img-box {
    flex-basis: 30%;
}


@media only screen and (max-width: 700px) {
    .flex-container-row {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1em;
    }

    .flex-container-row .product-img-box {
        flex-basis: 40%;
    }

    .flex-wrap {
        flex-direction: row;
        flex-wrap: wrap;
        max-width: 100%;
    }

    .category-container .flex-container-column {
        display: flex;
        flex-direction: row;
        margin: 0 auto;
        justify-content: space-between;
        align-items: center;
        gap: 1em;
    }

}
</style>