<template>
    <div class="flex-container-column flex-wrap">
        <Category v-for="category in categories" :category="category" :key="category.id" />
    </div>
</template>

<script>
import Category from "./Category.vue";

export default {
    data() {
        return {
            categories: [],
            token: localStorage.getItem('token')
        }
    },
    components: {
        Category
    },
    methods: {
        async getCategories() {

            /* Hämtar alla kategorier */
            const resp = await fetch("http://127.0.0.1:8000/api/categories", {
                headers: {
                    "Authorization": "Bearer " + this.token, 
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

<style scoped>
.flex-container-column {
    display: flex;
    flex-direction: column;
    width: fit-content;
}

.flex-wrap{
    flex-wrap: nowrap;
}
</style>