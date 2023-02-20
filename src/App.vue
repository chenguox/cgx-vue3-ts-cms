<template>
  <div>App</div>
  <router-link to="/main">主要</router-link>
  <router-link to="/login">登录</router-link>
  <router-view></router-view>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
</template>

<script setup lang="ts"></script>

<style scoped></style>
