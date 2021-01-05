<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="tag" @keyup.enter="handleTags">
                <div class="tag-list" v-show="tagList.length > 0">
                  <span class="tag-default tag-pill" v-for="(item, index) in tagList" :key="index">
                    <i class="ion-close-round" @click="deleteTag(index)"></i>
                    {{item}}
                  </span>
                </div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="handleClick">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>

</template>

<script>
import {createArticles, getArticles, updateArticles} from '@/api/editor'
export default {
  middleware: 'authenticated',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
      },
      slug: '',
      tag: '',
      tagList: []
    }
  },
  mounted() {
    if(this.$route.params.slug) {
      this.slug = this.$route.params.slug
      this.getData()
    }
  },
  methods: {
    async getData() {
      const { data } = await getArticles(this.slug)
      this.article = {
        title: data.article.title,
        description: data.article.description,
        body: data.article.body
      }
      this.tagList = data.article.tagList
    },
    handleTags() {
      this.tagList.push(this.tag)
      this.tag = ''
    },
    deleteTag(index) {
      this.tagList.splice(index, 1)
    },
    async handleClick() {
      if(this.slug) {
        const { data } = await updateArticles({
          article: {
            ...this.article,
            tagList: this.tagList
          }
        }, this.slug)
        this.$router.push('/article/' + data.article.slug)
      }else {
        const { data } = await createArticles({
          article: {
            ...this.article,
            tagList: this.tagList
          }
        })
        this.$router.push('/article/' + data.article.slug)
      }
      
      
      
    }
  },
}
</script>

<style>
</style>