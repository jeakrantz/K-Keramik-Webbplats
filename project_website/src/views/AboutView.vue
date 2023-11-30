<template>
    <main>
        <h2>Om webbplatsen</h2>
        <AboutWebpage />
        <div class="img-container">
            <img src="../assets/image/keramik2.webp" alt="Skål drejas.">
        </div>
        <CompanyDescription />
    </main>
</template>

<script>
import AboutWebpage from '../components/AboutWebpage.vue';
import CompanyDescription from '../components/CompanyDescription.vue';

export default {
    components: {
        AboutWebpage,
        CompanyDescription
    }
}
</script>