
<template>
    <main>
        <h2>Dokumentation</h2>
        <p>Här finns all dokumentation över hur funktionaliteten på sidan fungerar.</p>
        <!-- Lista med alla uppladdade dokument -->
        <Document v-if="see" v-for="document in documents" :document="document" :key="document.id" />
        <!-- Knapp radera dokument, syns endast om man hanterar dokument -->
        <ManageDocuments v-if="manage" @deleteDocument="deleteDocument(document.id)" v-for="document in documents"
            :document="document" :key="document.id" />

        <!-- Knappar för att hantera dokument -->
        <div class="flex-container-column">
            <button v-if="see" @click="manageDocu()" class="btn btn-primary"><i class="fa-solid fa-pen"></i> Hantera dokument</button>
            <button v-if="manage" @click="manageDocu()" class="btn btn-primary"><i class="fa-solid fa-xmark"></i> Sluta hantera</button>
        </div>

        <!-- Formulär för att lägga till dokument, syns endast om man hanterar dokument -->
        <AddDocument v-if="manage" @documentAdded="getDocuments()" />
    </main>
</template>

<script>
import Document from "../components/Document.vue";
import AddDocument from "../components/AddDocument.vue";
import ManageDocuments from "../components/ManageDocuments.vue";

export default {
    components: {
        Document,
        AddDocument,
        ManageDocuments
    },
    data() {
        return {
            documents: [],
            token: localStorage.getItem('token'),
            manage: false,
            see: true
        }
    },
    methods: {
        async getDocuments() {

            /* Hämtar alla dokument */
            const resp = await fetch("http://127.0.0.1:8000/api/documents", {
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Content-Type": "application/json"
                }
            });

            const data = await resp.json();

            this.documents = data;

        },
        async deleteDocument(id) {
            /* Tar bort dokument med specifikt id. */
            const resp = await fetch("http://127.0.0.1:8000/api/documents/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + this.token, 
                    "Content-Type": "application/json"
                }
            });
            const data = await resp.json();

            this.getDocuments();
        }, 
        manageDocu() {
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
        this.getDocuments();
    }

}
</script>

