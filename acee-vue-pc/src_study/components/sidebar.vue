<template lang="html">
    <div style="color: skyblue;height: 400px;">
    侧边栏

    <el-scrollbar style="height: 100%;">
      <div style="height: 450px;width: 100px;">
        element
        <el-button type="text" @click="schCmpModal = true">点击打开 sch-conpare</el-button>
          <sch-cmp
          :schCmpModal.sync="schCmpModal"
          :schInfo="schInfo"
          />
      </div>
    </el-scrollbar>
    </div>
</template>

<script>
export default {
  name: 'sidebar',
  components: {
    SchCmp: () => import('@/components/sch-compare')
  },
  data() {
    return {
      schCmpModal: false,
      major: false,
      schInfo: {
        plan_id: [1,2]
      }
    }
  }
}
</script>

<style lang="css">

</style>
