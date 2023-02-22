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

// 1. 定义account数据
const account = reactive<IAccount>({
  name: 'coderwhy',
  password: '123456'
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
function loginAction() {
  formRef.value?.validate((valid) => {
    if (valid) {
      const name = account.name
      const password = account.password

      loginStore.loginAccountAction({ name, password })
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
