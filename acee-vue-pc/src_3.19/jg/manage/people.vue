<template lang="html">
  <div>
    <cc></cc>
  </div>
</template>

<script>
  export default {
    components: {
      cc: () =>
      import('@/components/chart-compete'),
    },

  }
</script>

<style lang="css" scoped>
</style>
