<template>
    <footer>
        <h1><i class="fa-regular fa-copyright"></i> KåKeramik</h1>
        <nav>
            <hr>
            <!-- Navigering -->
            <ul class="nav">
                <li class="nav-item">
                    <RouterLink  class="nav-link" to="/om-webbplatsen">Om webbplatsen</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink  class="nav-link" to="/dokument">Dokumentation</RouterLink>
                </li>
                <Logout class="nav-item" />
            </ul>
        </nav>
    </footer>
</template>

<script>
import { RouterLink } from 'vue-router'
import Logout from "../components/Logout.vue";

export default {
    name: "Footer",
    components: {
        Logout
    }
}
</script>

<style>
    footer{
        background-color: #BECFBC;
        width: 100%;
        padding: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 2em;
    }

    hr {
        background-color: #170D00;
        border: #170D00 solid 1px;
        width: 100%;
    }

</style>