<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center"> {{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
            <nuxt-link to="/register" v-if="isLogin">Need an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template
              v-for="(messages, field) in errors"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="user.username"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="email"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Login, Register} from '@/api/login'
// 仅在客户端加载 js-cookie 包
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  data() {
    return {
      user:{
        username: '',
        email: 'qaz123456@123456.com',
        password: 'qaz123456'
      },
      errors:{}
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === '/login'
    }
  },
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        // 提交表单请求登录
        const { data } = this.isLogin
          ? await Login({
              user: this.user
            })
          : await Register({
            user: this.user
          })

        // TODO: 保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为了防止刷新页面数据丢失，我们需要把数据持久化
        Cookie.set('user', data.user)

        // 跳转到首页
        this.$router.push('/')
      } catch (err) {
        this.errors = err.response.data.errors
      }
    }
  },
};
</script>

<style>
</style>