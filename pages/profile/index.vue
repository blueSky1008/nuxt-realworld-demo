<template>
  <div class="profile-page">

  <div class="user-info">
    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <img :src="profile.image" class="user-img" />
          <h4>{{profile.username}}</h4>
          <p>{{profile.bio}}</p>
          <nuxt-link 
            class="btn btn-sm btn-outline-secondary action-btn"
            to="/settings"
          >
          <i class="ion-gear-a"></i>
            &nbsp;Edit Profile Settings
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>

  <div class="container">
    <div class="row">

      <div class="col-xs-12 col-md-10 offset-md-1">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" >My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" >Favorited Articles</a>
            </li>
          </ul>
        </div>

        <div class="article-preview">
          <div class="article-meta">
            <a ><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
            <div class="info">
              <a  class="author">Eric Simons</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 29
            </button>
          </div>
          <a  class="preview-link">
            <h1>How to build webapps that scale</h1>
            <p>This is the description for the post.</p>
            <span>Read more...</span>
          </a>
        </div>



      </div>

    </div>
  </div>

</div>
</template>

<script>
import {getProfile} from '@/api/profile'
export default {
  data() {
    return {
      profile: {}
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getProfile(this.$route.params.username)
      this.profile = data.profile
    }
  },
}
</script>

<style>
</style>