<template>
    <h2>Registrera ny användare</h2>

    <!-- Formulär för att resitrera ny användare -->
    <form @submit.prevent="registerUser()">
        <div class="form-group">
            <label for="name">Namn: </label>
            <input class="form-control" v-model="name" type="name" name="name" id="name"><br>
        </div>
        <div class="form-group">
            <label for="email">Epost: </label>
            <input class="form-control" v-model="email" type="email" name="email" id="email"><br>
        </div>
        <div class="form-group">
            <label for="password">Lösenord: </label>
            <input class="form-control" v-model="password" type="password" name="password" id="password"><br>
        </div>
        <div class="flex-container-column">
            <input class="btn btn-primary" type="submit" value="Registrera användare">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            /* Standardvärden i formulär-fälten */
            namn: "",
            email: "",
            password: ""
        }
    },
    methods: {
        async registerUser() {


            let formData = new FormData();

            /* Lagrar formulärvärdena till fromData */

            formData.append('name', this.name);
            formData.append('email', this.email);
            formData.append('password', this.password);


            if (this.email.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/register", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: formData
                });
                const data = await resp.json();

                /* Sparar returnerad token i LocalStorage */
                localStorage.setItem('token', data.token)

                /* Nollställer värdet i formuläret */
                this.name = "";
                this.email = "";
                this.password = "";

            }

        }
    }
}    
</script>