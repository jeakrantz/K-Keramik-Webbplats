<template>
  <main>

    <h2>Vad vill du göra?</h2>
    <hr>
    <!-- Snabblänkar -->
    <div class="nav-box-container">
      <RouterLink to="/produkter" class="nav-box one">
        <i class="fa-solid fa-shop"></i>
        <p>Alla produkter</p>
      </RouterLink>
      <RouterLink to="/kategorier" class="nav-box two">
        <i class="fa-solid fa-layer-group"></i>
        <p>Kategorier</p>
      </RouterLink>
      <RouterLink to="/add-product" class="nav-box three">
        <i class="fa-solid fa-circle-plus"></i>
        <p>Lägg till produkt</p>
      </RouterLink>
      <RouterLink to="/search" class="nav-box four">
        <i class="fa-solid fa-magnifying-glass"></i>
        <p>Sök efter produkt</p>
      </RouterLink>
    </div>
    
    <div class="img-container">
      <img src="../assets/image/keramik1.webp" alt="Skål drejas.">
    </div>

    <!-- Bildflöde över nya produkter -->
    <ProductImageList />
  </main>
</template>

<script>
import { RouterLink } from 'vue-router'
import ProductImageList from '../components/ProductImageList.vue';

export default {
  components: {
    ProductImageList
  }
}
</script>

<style>
.nav-box-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;
}

.nav-box {
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: .7em;
  border-radius: 15px;
  border: #EEF0EB solid 2px;
}

.nav-box:hover {
  border: #170D00 solid 2px;
}

.nav-box-container a {
  color: #170D00;
  text-decoration: none;
}

.nav-box svg {
  font-size: 5em;
  margin: .2em;
}

.one {
  background-color: #BCCBEA;
}

.two,
.three {
  background-color: #E7DCC8;
}

.four {
  background-color: #BECFBC;
}

@media only screen and (min-width: 991px) {
  .three {
    background-color: #BECFBC;
  }

  .four {
    background-color: #E7DCC8;
  }
}

@media only screen and (max-width: 991px) {
  .nav-box-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
  }

  .nav-box {
    flex-basis: 45%;
    width: 100%;
    margin-top: 2em;
  }

}
</style>