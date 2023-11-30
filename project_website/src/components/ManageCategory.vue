<template>
        <p>
            {{ category.name }} 
            <!-- Knapp för att ta bort enskild kategori -->
            <button class="btn btn-danger" @click="$emit('deleteCategory')"> <i class="fa-solid fa-trash"></i></button>
        </p>
</template>

<script>
export default {
    props: {
        category: Object
    }
}
</script>