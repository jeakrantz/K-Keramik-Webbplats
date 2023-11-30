<template>
    <tbody>
        <!-- Tabell som visar alla produkter -->
        <tr class="table-light">
            <td class="table-light" scope="row">{{ product.name }}</td>
            <td class="table-light">{{ product.price }}:-</td>
            <td class="table-light">{{ product.stock }} st</td>
            <td class="table-light">
                <!-- Knappar för att ändra värde på stock -->
                <div class="stock-manage-container">
                    <!-- Knapp för att minska värdet -->
                    <button class="btn btn-primary dec-btn" @click="stockDec()"><i class="fa-solid fa-minus"></i></button>
                    <p class="stock-num">{{ product.stock }}</p>
                    <!-- Knapp för att öka värdet -->
                    <button class="btn btn-primary inc-btn" @click="stockInc()"><i class="fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td class="table-light produkt-link" @click="$router.push({ path: '/enskild-produkt/' + product.id })">Se mer <i
                    class="fa-solid fa-arrow-right"></i></td>
        </tr>
    </tbody>
</template>

<script>
export default {
    props: {
        product: Object
    },
    data() {
        return {
            token: localStorage.getItem('token'),
            name: "",
            price: 0,
            stock: 0,
            description: "",
            categoryId: ""
        }
    },
    emits: [
        "stockChange"
    ],
    methods: {
        stockInc() {
            /* Ökar värdet på stock och kör edit-funktionen */
            this.product.stock++;
            this.name = this.product.name;
            this.price = this.product.price;
            this.stock = this.product.stock;
            this.description = this.product.description;
            this.categoryId = this.product.category_id;

            this.editProduct();


        },
        stockDec() {
            /* Minskar värdet på stock och kör edit-funktionen */
            this.product.stock--;
            this.name = this.product.name;
            this.price = this.product.price;
            this.stock = this.product.stock;
            this.description = this.product.description;
            this.categoryId = this.product.category_id;

            this.editProduct();


        },
        async editProduct() {
            /* Ändrar produkt med specifikt id */
            let productId = this.product.id;

            let formData = new FormData();

            /* Lagrar värden i formData */
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

                /* Nollställer värden */
                this.name = "";
                this.price = 0;
                this.stock = 0;
                this.image = null;
                this.description = "";

                /* Emit som triggar funktionen för att ladda om produktlistan */
                this.$emit("stockChange");

            }
        }
    }
}
</script>

<style scoped>
.product-img-box img {
    max-height: 200px;
}

h3 {
    text-align: left;
    font-size: 1.2rem;
}

.produkt-link {
    text-align: left;
    font-size: .9rem;
    cursor: pointer;
}

.produkt-link:hover {
    color: #DA935E;
}
</style>