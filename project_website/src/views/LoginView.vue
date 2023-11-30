<template>
    <main>
        <!-- Formulär för att logga in -->
        <Login v-if="login" />
        <div class="flex-container-column">
            <!-- Visar länk beroende på om man ska logga in eller registera användare -->
            <a class="text-info" v-if="login" @click="showRegister()">Registera ny användare <i
                    class="fa-solid fa-arrow-right"></i></a>
            <a class="text-info" v-if="register" @click="showRegister()"><i class="fa-solid fa-arrow-left"></i> Till Logga
                in</a>
        </div>
        <!-- Formulär för att registrera ny användare -->
        <RegisterUser v-if="register" />
    </main>
</template>

<script>
import Login from "../components/Login.vue";
import RegisterUser from "../components/RegisterUser.vue";

export default {
    components: {
        Login,
        RegisterUser
    },
    data() {
        return {
            login: true,
            register: false
        }
    },
    methods: {
        showRegister() {

            if (this.register === false) {
                this.register = true;
                this.login = false;
            } else {
                this.register = false;
                this.login = true;
            }
        }
    }
}
</script>
