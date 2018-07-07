<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
        <form @submit.prevent="addSmoothie">
            <div class="field title">
                <label for="title">Smoothie Name</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ingredient, index) in ingredients" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <input type="submit" class="btn pink" value="Add Smoothie">
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'addsmoothie',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null
        }
    },
    methods: {
        addSmoothie() {
            if (this.title) {
                const slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: slug
                }).then(() => {
                    this.$router.push({ name: 'home' })
                })
                
            } else {
                this.feedback = 'You must enter a smoothie title'
            }
        },
        addIngredient() {
            if (this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIngredient(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>

<style>
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.add-smoothie .field {
    margin: 20px auto;
    position: relative;
}
.add-smoothie .delete {
    position: absolute;
    right: 0px;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
