<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside width="210px">
        <main-menu />
      </el-aside>
      <el-container>
        <el-header height="50px">
          <main-header />
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'
</script>

<style scoped lang="less">
.main {
  height: 100%;
  color: red;
}

.main-content {
  height: 100%;

  .el-aside {
    background-color: #001529;
  }

  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
