<template>
    <h2>Logga in</h2>

    <!-- Formulär för att logga in -->
    <form @submit.prevent="loginUser()">
        <div class="form-group">
            <label for="email">Epost: </label>
            <input class="form-control" v-model="email" type="email" name="email" id="email"><br>
        </div>
        <div class="form-group">
            <label for="password">Lösenord: </label>
            <input class="form-control" v-model="password" type="password" name="password" id="password"><br>
        </div>
        <p class="text-danger center">{{ message }}</p>
        <div class="flex-container-column">
            <input class="btn btn-primary" type="submit" value="Logga in">
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            /* Standardvärden i formulär-fälten */
            email: "",
            password: "",
            message: ""
        }
    },
    methods: {
        async loginUser() {


            let formData = new FormData();

            /* Lagrar värde från formuläret i formData */
            formData.append('email', this.email);
            formData.append('password', this.password);


            if (this.email.length >= 2) {

                const resp = await fetch("http://127.0.0.1:8000/api/login", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: formData
                });
                const data = await resp.json();

                if (resp.status === 401) {
                    /* Om användaren inte finns lagrad i databasen */
                    this.message = "Användaren finns inte.";
                } else {
                    /* Om användare finns i databasen lagras token i LocalStorage */
                    localStorage.setItem('token', data.token)

                    this.email = "";
                    this.password = "";
                    
                    /* Skickar besökaren till startsidan */
                    this.$router.push('/');
                    
                }
            }

        }

    }
}
    
</script>