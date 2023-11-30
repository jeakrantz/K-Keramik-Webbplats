<template>
    <header class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <h1 @click="$router.push({ path: '/' })" class="navbar-brand">KåKeramik</h1>
            <!-- Knapp för utfälld navigering vid mindre skärm -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <!-- Navigering -->
            <nav class="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/search"><i class="fa-solid fa-magnifying-glass"></i></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/produkter">Produkter</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/kategorier">Kategorier</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink class="nav-link" to="/add-product">Lägg till</RouterLink>
                    </li>
                    <Logout class="nav-item logout-btn btn btn-danger" />
                </ul>
            </nav>
        </div>
    </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import Logout from "../components/Logout.vue";


export default {
    name: "Header",
    components: {
        Logout
    },
    data() {
        return {
            token: localStorage.getItem('token')
        }
    }
}
</script>

<style>
.navbar {
    background-color: #EEF0EB;
    border-bottom: solid 2px #170D00;
    margin: 1em;
    justify-content: center;
    align-items: center;
}

.navbar-brand {
    color: #170D00;
    font-size: 1.7rem;
}

.navbar-brand:hover {
    cursor: pointer;
}

.nav-link {
    margin: auto 1em;
}

.nav {
    --bs-nav-link-color: #170D00;
    --bs-nav-link-disabled-color: #170D00;
    --bs-link-color: #170D00;
    --bs-link-color-rgb: 13, 110, 253;
    --bs-link-decoration: underline;
    --bs-link-hover-color: #170D00;
    --bs-link-hover-color-rgb: 10, 88, 202;
}

.logout-btn:hover,
.logout-btn a:hover {
    color: #EEF0EB;
}

.logout-btn {
    color: #EEF0EB;
    --bs-btn-padding-x: none;
    --bs-btn-padding-y: none;
    width: fit-content;
}

.logout-btn a {
    color: #EEF0EB;
}

.navbar-nav {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1em;
}

@media only screen and (min-width: 991px) {
    .navbar-collapse {
        flex-grow: 0;
    }
}
</style>