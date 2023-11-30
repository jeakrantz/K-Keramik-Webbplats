<template>
    <p @click="$router.push({ path: '/enskild-kategori/' + category.id })">
        {{ category.name }} <i class="fa-solid fa-arrow-right"></i>
    </p>
</template>

<script>
export default {
    props: {
        category: Object
    }
}
</script>

<style scoped>
p {
    cursor: pointer;
    margin-top: 1em;
}

p:hover {
    color: #EEF0EB;
}
</style>