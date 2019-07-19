<template lang="html">
  <div class="index h-100">
    <el-container class="h-100">
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <bottom-navbar />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  components: {
    bottomNavbar: () => import('@/components/bottom-navbar')
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.el-main, .el-footer {
  padding: 0;
}
</style>
