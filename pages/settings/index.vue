<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="handleClick">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="info.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="info.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="info.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="info.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr />
        <button class="btn btn-outline-danger" @click="logout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { getUser, updateUser} from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  middleware: 'authenticated',
  data() {
    return {
      info: {},
      password: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    async getData() {
      const { data } = await getUser()
      this.info = data.user
    },
    async handleClick() {
      let user = {}
      if(this.password.trim()) {
        user = {
          image: this.info.image,
          username: this.info.username,
          bio: this.info.bio,
          email: this.info.email,
          password: this.password
        }
      }else {
        user = {
          image: this.info.image,
          username: this.info.username,
          bio: this.info.bio,
          email: this.info.email
        }
      }
      const { data } = await updateUser({
        user
      })
      this.$router.push('/profile/' + data.user.username)
    },
    logout() {
      Cookie.remove('user')
      this.$store.commit('setUser', null)
      this.$router.replace('/')
    }
  },
}
</script>

<style>
</style>