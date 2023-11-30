<template>
    <main>
        <div class="product-container">
            <!-- Produktbilden -->
            <div class="product-container-box">
                <img :src="product.image" :alt="product.name">
            </div>
            <!-- Produktinformaton, ej description -->
            <div class="product-container-box">
                <div>
                    <p>{{ categoryName() }}</p>
                    <h2>{{ product.name }}</h2>
                    <p>{{ product.price }}:-</p>
                </div>
                <div class="flex-container-row">
                    <div>
                        <p>Lagerstatus:</p>
                        <!-- Knappar för att ändra lagerstatus -->
                        <div class="stock-manage-container">
                            <!-- Minska lagerstatus -->
                            <button class="btn btn-primary dec-btn" @click="stockDec()"><i
                                    class="fa-solid fa-minus"></i></button>
                            <p class="stock-num">{{ product.stock }}</p>
                            <!-- Öka lagerstatus -->
                            <button class="btn btn-primary inc-btn"
                                @click="stockInc()"><i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                    <!-- Knapp för att se visa/dölja ändrings-formuläret och radera-knapp -->
                    <button v-if="see" @click="manageProd()" class="btn btn-primary"><i class="fa-solid fa-pen"></i> Hantera
                        produkt </button>
                    <button v-if="manage" @click="manageProd()" class="btn btn-primary"><i class="fa-solid fa-xmark"></i>
                        Sluta hantera </button>
                </div>
            </div>
        </div>
        <!-- Produktbeskrivning -->
        <div class="product-description-container">
            <p>Beskrivning</p>
            <hr>
            <p>{{ product.description }}</p>
        </div>


        <div v-if="manage">
            <!-- Knapp för att ta bort produkt -->
            <div class="flex-container-column">
                <button class="btn btn-danger" @click="deleteProduct(product.id)"><i class="fa-solid fa-trash"></i> Radera
                    produkt</button>
            </div>
            <!-- Formulär för att ändra produktinformation -->
            <form @submit.prevent="editProduct()">
                <div class="form-group">
                    <label for="name">Namn: </label>
                    <input class="form-control" v-model="name" type="text" name="name" id="name"><br>
                </div>
                <div class="form-group">
                    <label for="price">Pris: </label>
                    <input class="form-control" v-model="price" type="number" name="price" id="price"><br>
                </div>
                <div class="form-group">
                    <label for="stock">Lagerstatus: </label>
                    <input class="form-control" v-model="stock" type="number" name="stock" id="stock"><br>
                </div>
                <div class="form-group">

                </div>
                <div class="form-group">
                    <label for="image">Bild: </label>
                    <input class="form-control-file" @change="selectImage($event)" ref="image" type="file" name="image"
                        id="image" accept="image/*"><br>
                </div>
                <div class="form-group">
                    <label for="description">Beskrivning: </label>
                    <input class="form-control" v-model="description" type="text" name="description" id="description"><br>
                </div>
                <div class="form-group">
                    <label for="categoryId">Kategori: </label>
                    <select class="form-control" v-model="categoryId" type="select" name="categoryId" id="categoryId"><br>
                        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
                    </select>
                </div>
                <input class="btn btn-primary" type="submit" value="Ändra">
            </form>
        </div>

    </main>
</template>

<script>
import { getTransitionRawChildren } from "vue";
import ManageProduct from "../components/ManageProduct.vue";

export default {
    components: {
        ManageProduct
    },
    data() {
        return {
            product: [],
            categories: [],
            manage: false,
            see: true,
            name: "",
            price: 0,
            stock: 0,
            image: null,
            description: "",
            categoryId: null,
            token: localStorage.getItem('token')
        }
    },
    methods: {
        stockInc() {
            /* Hämtar värdena för produkten samt ökar värdet på stock. */
            this.product.stock++;
            this.name = this.product.name;
            this.price = this.product.price;
            this.stock = this.product.stock;
            this.description = this.product.description;
            this.categoryId = this.product.category_id;

            /* Kör funktionen för att ändra produkten */
            this.editProduct();


        },
        stockDec() {
            /* Hämtar värdena för produkten samt minskar värdet på stock. */
            this.product.stock--;
            this.name = this.product.name;
            this.price = this.product.price;
            this.stock = this.product.stock;
            this.description = this.product.description;
            this.categoryId = this.product.category_id;
            
            /* Kör funktionen för att ändra produkten */
            this.editProduct();


        },
        categoryName() {

            /* Hämtar rätt kategori-namn utifrån det id som är satt för category_id */
            let id = this.product.category_id;
            let category = this.categories;

            for (let i = 0; i < category.length; i++) {
                if (category[i].id === id) {
                    return category[i].name;
                }
            }

        },
        selectImage(e) {
            /* Sätter filen som laddats upp i formuläret till image */
            this.image = e.target.files[0];

        },
        async editProduct() {
            let productId = this.product.id;

            let formData = new FormData();

            /* Lägger alla värden i formData som ska skickas i anropet */
            formData.append('name', this.name);
            formData.append('price', this.price);
            formData.append('stock', this.stock);
            formData.append('description', this.description);
            formData.append('category_id', this.categoryId);
            if (this.image != null) {
                formData.append('image', this.image);
            }

            if (this.name.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/editproduct/" + productId, {
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + this.token,
                        "Accept": "application/json",
                    },
                    body: formData
                });
                const data = await resp.json();

                /* Nollställer värdena */
                this.name = "";
                this.price = 0;
                this.stock = 0;
                this.image = null;
                this.description = "";

                this.getProduct();

            }

        },
        async getProduct() {
            /* Hämtar rätt produkt baserat på det ID som skickats i http-länken */
            let id = this.$route.params.id;

            const resp = await fetch("http://127.0.0.1:8000/api/products/" + id, {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            /* Lagrar värdena */
            this.product = data;

        },
        async deleteProduct(id) {
            /* Tar bort produkt från api med specifikt id */
            const resp = await fetch("http://127.0.0.1:8000/api/products/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });
            const data = await resp.json();

            /* Uppdaterar listan efter att produkt har raderats */
            this.getProduct();
        },
        manageProd() {
            if (this.manage === false) {
                /* Sätter rätt värde i fomruläret */
                this.manage = true;
                this.see = false;
                this.name = this.product.name;
                this.price = this.product.price;
                this.stock = this.product.stock;
                this.description = this.product.description;
                this.categoryId = this.product.category_id;
                console.log(this.product.category_id);
            } else {
                this.manage = false;
                this.see = true;
            }
        },
        async getCategories() {
            /* Hämtar kategorier */
            const resp = await fetch("http://127.0.0.1:8000/api/categories", {
                headers: {
                    "Authorization": "Bearer 3|3tt1AiPlooInVZPeiMde6xGdPEOSLjtGNFs6OKt94131bf96", // Måste göras dynamisk
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            /* Lagrar värdena */
            this.categories = data;

        }
    },
    mounted() {
        this.getCategories();
        this.getProduct();
    }
}
</script>

<style>
.stock-manage-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}

.dec-btn {
    border-radius: 15px 0 0 15px;
}

.inc-btn {
    border-radius: 0 15px 15px 0;
}

.stock-num {
    padding: .32em .7em;
    margin: 0;
    border: 1px solid #DA935E;
}

.product-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.product-container-box {
    flex-basis: 45%;
    min-height: 300px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
}

.product-container-box h2 {
    text-align: left;
}

.product-container-box img {
    width: 100%;
    height: auto;
    max-height: 400px;
    overflow: hidden;
    object-fit: cover;
    object-position: center;
}

.product-description-container {
    background-color: #E7DCC8;
    padding: 1em 2em;
    border-radius: 15px;
    margin: 1em auto;
}

.product-description-container  p {
    margin: 0;
}

.flex-container-row {
    display: flex;
    flex-direction: row;
    gap: 3em;
    align-items: flex-end;
    justify-content: center;
}

@media only screen and (max-width: 500px) {
    .product-container-box .flex-container-row{
        flex-direction: column;
        align-items: center;
    }
}

@media only screen and (max-width: 800px) {
    .product-container {
        flex-direction: column;
    }



}
</style>