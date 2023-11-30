<template>
    <h3>Lägg till kategori</h3>

    <!-- Formulär för att lägga till kategori -->
    <form @submit.prevent="addCategory()">
        <div class="form-group">
            <label for="name">Namn: </label>
            <input class="form-control" v-model="name" type="text" name="name" id="name"><br>
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
            token: localStorage.getItem('token')
        }
    },
    emits: ["categoryAdded"],
    methods: {
        async addCategory() {

            let formData = new FormData();

            /* Lägger alla värden i formData som ska skickas i anropet */
            formData.append('name', this.name);

            if (this.name.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/addcategory", {
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

                /* Emit som triggar funktionen för att ladda om kategorilistan */
                this.$emit("categoryAdded");
            }

        }
    }
}
</script>
