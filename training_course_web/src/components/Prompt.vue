<template>
  <div class="prompt">
    <img src="@/assets/images/success-toast.png" alt="" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    imgName: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: '成功'
    }
  }
}
</script>

<style lang="scss" scoped>
.prompt {
  width: 445px;
  height: 405px;
  // background: #f8f8f8;
  // position: absolute;
  // top: 40px;
  // left: 0;
  // bottom: 0;
  // right: 0;
  margin: 50px auto;
  font-size: 16px;
  text-align: center;
  overflow: hidden;
  img {
    height: 152px;
    display: block;
    margin: 90px auto 50px;
  }
}
</style>
