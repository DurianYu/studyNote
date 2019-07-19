<template lang="html">
  <div class="">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="#" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <!-- <div :class="[{'is-opened': activeIndex}]">试试</div> -->
  </div>
</template>

<script>
export default {
  name: "Rheader",
  data() {
    return {
      visible: false,
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  options: {
    // 出现在实例的$options对象下的 options
    deep: true,
    handle(value = 666) {
      console.log(value);
    }
  }
};
</script>

<style lang="css" scoped>
.is-opened {
  background: #f06;
}
</style>
