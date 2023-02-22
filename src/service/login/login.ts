import type { IAccount } from '@/types/index'
import hyRequest from '..'

// 帐号密码登录
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 根据用户id获取用户信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

// 根据角色id获取权限信息
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
