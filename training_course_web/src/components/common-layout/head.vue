<template lang="html">
  <div class="common-head font1">
    <slot></slot>
  </div>
</template>

<script>
export default {
  // props: {
  //   bg: {
  //     required: true,
  //     type: String
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.common-head {
  height: 80px;
  background: #f6f6f6;
  color: #37393b;
  display: flex;
  align-items: center;
  padding: 0 0 0 20px;
  font-weight: bold;
}
</style>
