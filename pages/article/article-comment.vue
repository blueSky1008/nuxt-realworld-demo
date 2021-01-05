<template>
  <div>
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>

    <div class="card" v-for="item in comments" :key="item.id">
      <div class="card-block">
        <p class="card-text">
          {{item.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link 
           class="comment-author"
          :to="'/profile/' + item.author.username"
        ><img class="comment-author-img" :src="item.author.image" /></nuxt-link>
        &nbsp;
        <nuxt-link 
          class="comment-author"
          :to="'/profile/' + item.author.username"
        >{{item.author.username}}</nuxt-link>
        <span class="date-posted">{{item.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>

    
  </div>
</template>

<script>
import {getComments} from '@/api/article'
export default {
  data() {
    return {
      comments: []
    };
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getComments(this.$route.params.slug)
      const { comments } = data
      this.comments = comments
    }
  },
};
</script>

<style>
</style>