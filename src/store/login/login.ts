import type { IAccount } from '@/types/index'
import { accountLoginRequest } from '@/service/login/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: () => ({
    id: '',
    token: localCache.getItem(LOGIN_TOKEN) || '',
    name: ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 帐号登录，获取token等信息
      const res = await accountLoginRequest(account)
      this.id = res.data.id
      this.name = res.data.name
      this.token = res.data.token

      // 2. 进行本地缓存
      localCache.setItem(LOGIN_TOKEN, this.token)

      console.log(router)
      // 3. 页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
