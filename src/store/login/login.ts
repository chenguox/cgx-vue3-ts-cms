import type { IAccount } from '@/types/index'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { defineStore } from 'pinia'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getItem(LOGIN_TOKEN) || '',
    userInfo: {},
    userMenus: {}
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1. 帐号登录，获取token等信息
      const res = await accountLoginRequest(account)
      const id = res.data.id
      const name = res.data.name
      this.token = res.data.token
      localCache.setItem(LOGIN_TOKEN, this.token) // 进行本地缓存

      // 2. 请求用户的信息
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3. 根据角色请求用户的权限（菜单menus）
      const roleId = this.userInfo.role.id
      const userMenusResult = await getUserMenusByRoleId(roleId)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4. 进行本地缓存
      localCache.setItem('userInfo', userInfo)
      localCache.setItem('userMenus', userMenus)

      // 5. 页面跳转（main页面）
      router.push('/main')
    }
  }
})

export default useLoginStore
