<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link 
              class="nav-link" 
              :to="{
                name: 'home',
                query: {
                  tab: 'your_feed'
                }
              }" 
              exact 
              :class="{active: tab === 'your_feed'}"
              >Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link" 
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }" 
              exact 
              :class="{active: tab === 'global_feed'}"
              >Global Feed</nuxt-link>
            </li>
            <li class="nav-item" v-if="tag">
              <nuxt-link 
              class="nav-link" 
              :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag
                }
              }" 
              exact 
              :class="{active: tab === 'tag'}"
              >#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview" v-for="(item, index) in articles" :key="index">
          <div class="article-meta">
            <nuxt-link 
              :to="'/profile/' + item.author.username"
            ><img :src="item.author.image" /></nuxt-link>
            <div class="info">
              <nuxt-link 
                class="author"
                :to="'/profile/' + item.author.username"
              >{{item.author.username}}</nuxt-link>
              <span class="date">{{item.createdAt | date('MMM DD, YYYY')}}</span>
            </div>
            <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{
                  active: item.favorited
                }"
                @click="onFavorite(item)"
                :disabled="item.favoriteDisabled"
              >
              <i class="ion-heart"></i> {{item.favoritesCount}}
            </button>
          </div>
          <nuxt-link :to="'/article/' + item.slug" class="preview-link">
            <h1>{{item.title}}</h1>
            <p>{{item.body}}</p>
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <nav>
          <ul class="pagination">
            <li
              class="page-item"
              :class="{
                active: item === page
              }"
              v-for="item in articlesCount"
              :key="item"
            >
              <nuxt-link
                class="page-link"
                :to="{
                  name: 'home',
                  query: {
                    page: item,
                    tag: $route.query.tag,
                    tab: tab
                  }
                }"
              >{{ item }}</nuxt-link>
            </li>
          </ul>
        </nav>


      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link 
            v-for="(item, index) in tagList" :key="index"
            :to="{
              name: 'home',
              query: {
                tab: 'tag',
                tag: item
              }
            }" 
            class="tag-pill tag-default"
            >{{item}}</nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
import { getArticles, getTags, getArticlesFeed, addFavorite, unFavorite } from '@/api/home'
export default {
  async asyncData({route, store, params, query}) {
    const page = Number.parseInt(query.page|| 1)
    const limit = 20
    const tab = query.tab || 'global_feed'
    const tag = query.tag
    console.log(query)

    const loadArticles = tab === 'global_feed'
      ? getArticles
      : getArticlesFeed

    const [articlesData, tags] = await Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag
      }),
      getTags()
    ])
    const { articles, articlesCount } = articlesData.data
    articles.forEach(article => article.favoriteDisabled = false)
    return {
      articles,
      articlesCount: Math.ceil(articlesCount / limit),
      tagList: tags.data.tags,
      page,
      tag,
      tab
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  computed:{
    ...mapState(['user'])
  },
  methods: {
    async onFavorite (article) {
      article.favoriteDisabled = true
      if (article.favorited) {
        // 取消点赞
        await unFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  },
}
</script>

<style>

</style>