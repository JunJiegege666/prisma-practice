<script setup>

</script>

<template>
<div>
        <h1>Welcome to Layout</h1>
        <nav>
        <router-link to="/">首页</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
      </nav>
        <router-view></router-view>
    </div>
</template>

<style scoped>

</style>
