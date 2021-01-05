<template>
  <div>
    <nuxt-link 
      :to="'/profile/' + article.author.username"
    ><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link 
        class="author"
        :to="'/profile/' + article.author.username"
      >{{article.author.username}}</nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <template v-if="article.author.username != user.username">
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow Eric Simons <span class="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button class="btn btn-sm btn-outline-primary">
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">(29)</span>
      </button>
    </template>

    <template v-else>
      <nuxt-link 
        class="btn btn-outline-secondary btn-sm"
        :to="'/editor/' + article.slug"
      >
      <i class="ion-edit"></i>
        &nbsp;Edit Article
      </nuxt-link>
      <button class="btn btn-outline-danger btn-sm">
        <i class="ion-trash-a"></i>
        &nbsp;Delete Article
      </button>
    </template>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  props: ['article'],
  computed:{
    ...mapState(['user'])
  },
  methods: {
    
  },
}
</script>

<style>

</style>