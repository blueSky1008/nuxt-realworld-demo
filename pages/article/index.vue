<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{article.title}}</h1>

      <div class="article-meta">
        <articleMeta :article="article" />
      </div>

    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body"></div>
    </div>

    <hr />

    <div class="article-actions">
      <div class="article-meta">
        <articleMeta :article="article" />
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">
        <articleComment />
      </div>

    </div>

  </div>

</div>
</template>

<script>
import {getArticle} from '@/api/article'
import MarkdownIt from 'markdown-it'
import articleMeta from './article-meta.vue'
import articleComment from './article-comment.vue'
export default {
  async asyncData({params}) {
    const { data } = await getArticle(params.slug)
    const { article } = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    
    return {
      article
    }
  },
  components: {
    articleMeta,
    articleComment
  },
  methods: {
    
  },
}
</script>

<style>
</style>