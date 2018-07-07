<template>
  <div class="home container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteSmoothie(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title }}</h2>
        <ul class="ingredients">
          <li class="chip" v-for="(ingredient, index) in smoothie.ingredients" :key="index">{{ ingredient }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {
      smoothies: [
        { title: 'Ninja Brew', slug: 'ninja-brew', ingredients: ['bananas', 'coffee', 'milk'], id: 1 },
        { title: 'Morning Mood', slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice'], id: 2 }
      ]
    }
  },
  methods: {
    deleteSmoothie(id) {
      this.smoothies = this.smoothies.filter(smoothie => {
        return smoothie.id !== id
      })
    }
  }
}
</script>

<style>
  .home {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap:30px;
    margin-top: 60px;
  }
  .home h2 {
    font-size: 1.8em;
    text-align: center;
    margin-top: 0px;
  }
  .home .ingredients {
    margin: 30px auto;
  }
  .home .ingredients li {
    display: inline-block;
  }
  .home .delete {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
    color: #aaa;
    font-size: 1.8em;
  }
</style>