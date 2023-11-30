<template>
    <article>
        <p>
            <i class="fa-solid fa-file-pdf"></i> 
            {{ document.name }}
            <!-- Knapp för att ta bort enskilt dokument -->
            <button class="btn btn-danger" @click="$emit('deleteDocument')"><i class="fa-solid fa-trash"></i></button>
        </p> 
    </article>
</template>

<script>
export default {
    props: {
        document: Object
    }
}
</script>