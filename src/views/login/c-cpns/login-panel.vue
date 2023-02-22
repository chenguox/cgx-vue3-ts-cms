<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>

    <!-- 中间的 tabs 切换 -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1. 账号登录的Pane -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <panel-account ref="accountRef" />
        </el-tab-pane>
        <!-- 2. 手机登录的Pane -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <panel-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { ref, watch } from 'vue'

import PanelAccount from './panel-account.vue'
import PanelPhone from './panel-phone.vue'

const isRemPwd = ref<boolean>(localCache.getItem('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  localCache.setItem('isRemPwd', newValue)
})

const activeName = ref('account')
const accountRef = ref<InstanceType<typeof PanelAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 8px;
    }
  }

  .controls {
    margin-top: 12px;

    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
