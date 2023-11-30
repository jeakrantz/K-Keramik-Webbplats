<template>
    <main>
        <p class="center text-success">{{ message }}</p>
        <!-- Formulär för att lägga till produkt -->
        <AddProduct @productAdded="messageText()"/>
    </main>
</template>

<script>
import AddProduct from "../components/AddProduct.vue";

export default {
    data() {
        return {
            token: localStorage.getItem('token'),
            message: ""
        }
    },
    components: {
        AddProduct
    }, 
    methods: {
        messageText() {
                /* Text om produkten har lagst till */
                this.message = "Produkten är tillagd!"
        }
    }
}
</script>

<style>
    .center {
        text-align: center;
    }
</style>