<template>
    <main>
        <h2>Kategorier</h2>
        <hr>
        <!-- Lista över alla kategorier -->
        <div class="flex-container-row">
            <Category v-if="see" v-for="category in categories" :category="category" :key="category.id" />
            <!-- Knapp radera kategori, syns endast om man hanterar kategorier -->
            <ManageCategory v-if="manage" @deleteCategory="deleteCategory(category.id)" v-for="category in categories" :category="category" :key="category.id" />
        </div>

        <div class="flex-container-column">
            <!-- Knappar för att hantera kategorier -->
            <button v-if="see" @click="manageCate()" class="btn btn-primary"><i class="fa-solid fa-pen"></i> Hantera kategorier</button>
            <button v-if="manage" @click="manageCate()" class="btn btn-primary"><i class="fa-solid fa-xmark"></i> Sluta hantera</button>
            <!-- Formulär för att lägga till kategori, syns endast om man hanterar kategorier -->
            <div>
                <AddCategory v-if="manage" @categoryAdded="getCategories()"/>
            </div>
        </div>
    </main>
</template>

<script>
import Category from "../components/Category.vue";
import AddCategory from "../components/AddCategory.vue";
import ManageCategory from "../components/ManageCategory.vue";

export default {
    data() {
        return {
            categories: [],
            token: localStorage.getItem('token'),
            manage: false,
            see: true
        }
    },
    components: {
        Category,
        AddCategory,
        ManageCategory
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

        }, 
        async deleteCategory(id) {
            /* Tar bort kategori med specifikt id. */
            const resp = await fetch("http://127.0.0.1:8000/api/categories/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.token, 
                    "Content-Type": "application/json"
                }
            });
            const data = await resp.json();

            /* Uppdaterar listan efter att kategori har raderats */
            this.getCategories();
        }, 
        manageCate() {
            if (this.manage === false){
                this.manage = true;
                this.see = false;
            } else {
                this.manage = false;
                this.see = true;
            }
        }
    },
    mounted() {
        this.getCategories();
    }
}
</script>

<style scoped>
.flex-container-row{
    width: fit-content;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 auto;
}

.flex-container-row p {
    background-color: #BCCBEA;
    padding: 1em;
    border-radius: 15px;
}

.flex-container-column {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    margin-top: 2em;
    gap: 1em;
}
</style>