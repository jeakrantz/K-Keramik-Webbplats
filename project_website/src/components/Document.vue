<template>
    <article>
        <a target="_blank" :href="document.pdf_file"><i class="fa-solid fa-file-pdf"></i> {{ document.name }} <i
                class="fa-solid fa-up-right-from-square"></i></a>
    </article>
</template>

<script>
export default {
    props: {
        document: Object
    }
}
</script>

<style>
article {
    max-width: 30em;
    margin: 2em auto;
    padding-left: 5em;
}

article a {
    color: #170D00;
    text-decoration: none;
}
</style>