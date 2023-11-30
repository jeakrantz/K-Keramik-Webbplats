<template>
    <h2>Lägg till dokument</h2>

    <!-- Formulär för att lägga till dokument -->
    <form @submit.prevent="addDocument()">
        <div class="form-group">
            <label for="name">Namn: </label>
            <input class="form-control" v-model="name" type="text" name="name" id="name"><br>
        </div>
        <div class="form-group">
            <label for="pdf_file">PDF: </label>
            <input class="form-control-file" @change="selectFile($event)" ref="pdf_file" type="file" name="pdf_file" id="pdf_file"><br>
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
            pdf_file: null,
            token: localStorage.getItem('token')
        }
    },
    emits: ["documentAdded"],
    methods: {
        selectFile(e) {
            /* Sätter filen som laddats upp i formuläret till pdf_file */
            this.pdf_file = e.target.files[0];
        },
        async addDocument() {

            let formData = new FormData();

            /* Lägger alla värden i formData som ska skickas i anropet */
            formData.append('name', this.name);
            formData.append('pdf_file', this.pdf_file);

            if (this.name.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/documents", {
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
                this.pdf_file = null;

                /* Emit som triggar funktionen för att ladda om dokumentlistan */
                this.$emit("documentAdded");
            }

        }
    }
}
</script>
