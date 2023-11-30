<template>
    <li>
        <!-- Länk för att logga ut -->
        <a class="nav-link" @click="logoutUser">Logga ut</a>
    </li>
</template>

<script>
export default {
    data() {
        return {
            token: localStorage.getItem('token')
        }
    },
    methods: {
        async logoutUser() {

            const resp = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token,
                    "Accept": "application/json",
                }
            });
            const data = await resp.json();

            /* Tar bort lagrad token från LocalStorage */
            localStorage.removeItem('token');

            /* Skickar besökare till /logga in */
            this.$router.push('/logga-in');


        }
    }
}
</script>