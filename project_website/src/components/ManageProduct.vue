<template>
    <article>
        {{ product.name }}
        <!-- Knapp för att ta bort enskild produkt -->
        <button class="btn btn-danger" @click="$emit('deleteProduct')">Radera <i class="fa-solid fa-trash"></i></button>
    </article>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>