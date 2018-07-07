<template>
    <div v-if="smoothie" class="edit-smoothie container">
        <h2>Edit {{ smoothie.title }}</h2>
        <form @submit.prevent="editSmoothie">
            <div class="field title">
                <label for="title">Smoothie Name</label>
                <input type="text" name="title" v-model="smoothie.title">
            </div>
            <div class="field" v-for="(ingredient, index) in smoothie.ingredients" :key="index">
                <label for="ingredient">Ingredient:</label>
                <input type="text" name="ingredient" v-model="smoothie.ingredients[index]">
                <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add an Ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngredient" v-model="another">
            </div>
            <div class="field center-align">
                <p class="red-text" v-if="feedback">{{ feedback }}</p>
                <input type="submit" class="btn pink" value="Update Smoothie">
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'editsmoothie',
    data() {
        return {
            smoothie: null,
            another: null,
            feedback: null
        }
    },
    methods: {
        editSmoothie() {
            if (this.smoothie.title) {
                const slug = slugify(this.smoothie.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').doc(this.smoothie.id).update({
                    title: this.smoothie.title,
                    ingredients: this.smoothie.ingredients,
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
                this.smoothie.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'You must enter a value to add an ingredient'
            }
        },
        deleteIngredient(ing) {
            this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    },
    created() {
        db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
        .get().then(snapshot => {
            snapshot.forEach(doc => {
                this.smoothie = doc.data()
                this.smoothie.id = doc.id
            })
        })
    }
}
</script>

<style>
.edit-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 500px;
}
.edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
}
.edit-smoothie .field {
    margin: 20px auto;
    position: relative;
}
.edit-smoothie .delete {
    position: absolute;
    right: 0px;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
}
</style>
