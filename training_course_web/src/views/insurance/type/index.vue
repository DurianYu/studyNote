<template>
  <div class="home">
    <ul>
      <li v-for="(item, index) in appList" :key="index" @click="enterApp(item)" :class="{ disabled: !item.linkName }">
        <!-- {{ item.name }} -->
        <img :src="item.img" alt="" />
        <Button class="translate-x-center" style="bottom: 6rem" type="default" ghost>查看详情</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Button } from 'view-design'
export default {
  components: {
    Button
  },
  computed: {
    ...mapGetters(['isChain']),
    appList() {
      const list = [
        {
          name: '互联网飞机延误险',
          id: 1,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-6.png'),
          role: [],
          status: true,
          linkName: this.isChain === 'chain' ? '' : 'insurance-menu',
          contraryAppId: 2 // 当票链平台存在的时候，这里的链接要为空
        },
        {
          name: '区块链飞机延误险',
          id: 2,
          icon: 'home-icon1.png',
          img: require('@/assets/images/insurance/home-app-7.png'),
          role: [],
          status: true,
          linkName: this.isChain === 'chain' ? 'insurance-menu' : '',
          contraryAppId: 2 // 当票链平台存在的时候，这里的链接要为空
        }
      ]
      return list
    }
  },
  methods: {
    enterApp(item) {
      if (!item.linkName) return
      this.$router.push({ name: item.linkName })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: center;
  &-back {
    margin-bottom: 20px;
  }
  ul {
    margin-top: 6rem;
    display: flex;
    justify-content: left;
  }
  li {
    position: relative;
    width: 360px;
    height: 449px;
    overflow: hidden;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &:nth-of-type(1) {
      margin-right: 60px;
    }
    &.disabled {
      // background-color: #eee;
    }
    img {
      width: 100%;
      display: block;
      // margin: 48px auto 33px;
    }
    .detail {
    }
  }
}
</style>
