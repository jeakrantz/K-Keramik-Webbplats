<template>
    <main>
        <h2>Sök efter produkt</h2>
        <SearchForm/>
    </main>
</template>

<script>
    import SearchForm from "../components/SearchForm.vue"
    
    export default {
        components: {
            SearchForm
        }
    }
</script>