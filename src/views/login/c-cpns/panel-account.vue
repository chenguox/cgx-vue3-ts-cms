<template>
  <div class="panel-account">
    <el-form ref="formRef" label-width="60px" :model="account" :rules="accountRules" status-icon>
      <el-form-item label="帐号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import type { ElForm, FormRules } from 'element-plus'
import type { IAccount } from '@/types/index'
import { reactive, ref } from 'vue'
import useLoginStore from '@/store/login/login'
import { ElMessage } from 'element-plus'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1. 定义account数据
const account = reactive<IAccount>({
  name: localCache.getItem(CACHE_NAME) ?? '',
  password: localCache.getItem(CACHE_PASSWORD) ?? ''
})

// 2. 定义校验规则
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{6,20}/,
      message: '必须是6~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3. 执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: Boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 获取用户数字如的帐号和密码
      const name = account.name
      const password = account.password

      // 2. 想服务器发送网络请求（携带帐号和密码）
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3. 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setItem(CACHE_NAME, name)
          localCache.setItem(CACHE_PASSWORD, password)
        } else {
          localCache.removeItem(CACHE_NAME)
          localCache.removeItem(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请您输入正确的格式后再操作~~.')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped lang="less">
.panel-account {
  color: red;
}
</style>
