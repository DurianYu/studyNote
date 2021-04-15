<template>
  <div class="scene">
    <h2>场景地图</h2>
    <div class="scene-list">
      <Card v-for="(item, index) in sceneList" :key="index" :style="{ 'background-image': `url(${item.apply_img})` }">
        <p slot="title" class="scene-title">
          <code v-show="item.show" class="enter-title">{{ item.title }}</code>
          <code v-show="!item.show"></code>
          <span v-if="!isTeacher" :class="{ active: item.status === 1 }">{{ item.status === 0 ? '未开始' : item.status === 1 ? '进行中' : '已完成' }}</span>
        </p>
        <p class="scene-des" :class="{ 'flex-x-y-center': !item.show }" @mouseover="item.show = true" @mouseleave="item.show = false">
          <code v-show="!item.show" class="enter-title">{{ item.title }}</code>
          <span v-show="item.show">{{ item.des }}</span>
        </p>
        <Button class="btn-center" type="default" ghost @click="toDetail(item)">业务详情</Button>
      </Card>
    </div>
  </div>
</template>

<script>
import { Button, Card } from 'view-design'
import sceneList from './sceneList'
export default {
  components: {
    Button,
    Card
  },
  data() {
    return {
      sceneList: [],
      isTeacher: false // 是否是学生
    }
  },
  computed: {},
  mounted() {
    const flag = this.$route.name === 'scene-teacher'
    this.isTeacher = flag
    sessionStorage.setItem('isTeacher', flag)
    sessionStorage.setItem('pass_validate', this.$route.query.pass_validate)
  },
  created() {
    this.sceneList = sceneList.map(v => {
      return {
        ...v,
        show: false
      }
    })
  },
  methods: {
    toDetail(item) {
      const query = this.$route.query
      this.$router.push({ name: 'scene-introduction', params: { id: item.id }, query })
    }
  }
}
</script>

<style lang="scss" scoped>
.scene {
  h2 {
    font-size: 18px;
    margin-bottom: 2rem;
    padding-left: 50px;

    height: 100px;
    background: #f6f6f6;
    line-height: 100px;

    font-weight: bold;
    color: #37393b;
  }
  .ivu-card {
    width: 300px;
    background-repeat: no-repeat;
    background-size: auto;
    background-origin: border-box;
    background-position: center;
    box-shadow: 0px 16px 36px -10px rgba(71, 120, 255, 0.62);
    border-radius: 2px;
    margin: 0 1.8rem 2rem 0;
  }
  ::v-deep .ivu-card-head {
    border-bottom: none;
  }
  .enter-title {
    font-weight: 500;
    font-size: 18px;
    color: rgba(255, 255, 255, 1);
  }
  &-title {
    display: flex;
    justify-content: space-between;
    color: rgba(255, 255, 255, 1);
    span {
      font-size: 12px;
      background: rgba(85, 82, 108, 1);
      border-radius: 2px;
      padding: 0 0.5rem;
    }
    .active {
      background: rgba(0, 173, 16, 1);
    }
  }
  &-des {
    line-height: 25px;
    margin-bottom: 30px;
    color: white;
    font-size: 14px;
    height: 75px;
    overflow: auto;
  }
  &-list {
    display: flex;
    justify-content: left;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 3rem;
  }
}
</style>
