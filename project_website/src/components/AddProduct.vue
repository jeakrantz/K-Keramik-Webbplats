<template>
    <h2>Lägg till produkt</h2>
    
    
    <!-- Formulär för att lägga till produkt -->
    <form @submit.prevent="addProduct()">
        <div class="form-group">
            <label for="name">Namn: </label>
            <input class="form-control" v-model="name" type="text" name="name" id="name" placeholder="Produktens namn"><br>
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
            <label for="image">Bild: </label>
            <input class="form-control-file" @change="selectImage($event)" ref="image" type="file" name="image" id="image"
                accept="image/*"><br>
        </div>
        <div class="form-group">
            <label for="description">Beskrivning: </label>
            <input class="form-control" v-model="description" type="text" name="description" id="description" placeholder="Beskrivning av produkten"><br>
        </div>
        <div class="form-group">
            <label for="categoryId">Kategori: </label>
            <select class="form-control" v-model="categoryId" type="select" name="categoryId" id="categoryId"><br>
                <option v-for="category in categories"  :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <input class="btn btn-primary" type="submit" value="Lägg till +">
    </form>
    
</template>

<script>
import { resolveTransitionHooks } from 'vue';

export default {
    data() {
        return {
            /* Standardvärden i formulär-fälten */
            name: "",
            price: 0,
            stock: 0,
            image: null,
            description: "",
            categories: [],
            message: "",
            token: localStorage.getItem('token')
        }
    },
    emits: ["productAdded"],
    methods: {
        selectImage(e) {
            /* Sätter filen som laddats upp i formuläret till image */
            this.image = e.target.files[0];
        },
        async addProduct() {

            let categoryId = this.categoryId;

            let formData = new FormData();

            /* Lägger alla värden i formData som ska skickas i anropet */
            formData.append('name', this.name);
            formData.append('price', this.price);
            formData.append('stock', this.stock);
            formData.append('image', this.image);
            formData.append('description', this.description);

            if (this.name.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/addproduct/" + categoryId, {
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

                /* Om respons är OK körs emit */
                if(resp.status === 404) {
                    return false;
                } else {
                    this.$emit("productAdded");
                }
            }

        },
        async getCategories() {
            const resp = await fetch("http://127.0.0.1:8000/api/categories", {
                headers: {
                    "Authorization": "Bearer 3|3tt1AiPlooInVZPeiMde6xGdPEOSLjtGNFs6OKt94131bf96", // Måste göras dynamisk
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            this.categories = data;

        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style>
    form{
        max-width: 500px;
        margin: 0 auto;
    }

    .form-control, .form-control-file {
        border: 2px #BCCBEA solid;
        border-radius: 15px;
    }

    .form-control-file::file-selector-button {
        background-color: #BCCBEA;
        border: 2px #BCCBEA solid;
        border-radius: 10px;
    }

    form input[type="number"]{
        max-width: 4em;
    }

    label {
        margin-right: 1em;
    }

    form input[type="submit"]{
        margin-top: 2em;
    }

</style>