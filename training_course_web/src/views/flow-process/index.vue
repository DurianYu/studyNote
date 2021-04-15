<template lang="html">
  <div class="page-flow-process">
    <header class="title font1">
      <b>业务流程</b>
      <!-- <mark>方新科技-产品经理</mark> -->
    </header>
    <section class="main">
      <Row class="main-box" type="flex" justify="center" align="middle">
        <Col :span="16"><img :src="img_src" alt=""/></Col>
        <Button class="btn-next-a" type="primary" size="large" @click="next">进入业务场景</Button>
      </Row>
    </section>
  </div>
</template>

<script>
import { Row, Col, Button } from 'view-design'
import { mapGetters } from 'vuex'
import sceneList from '@/views/scene-map/sceneList'

export default {
  components: {
    Row,
    Col,
    Button
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['currentCourse']),
    img_src() {
      return sceneList.find(v => v.id == this.currentCourse).flow_img
    }
  },
  methods: {
    next() {
      this.$router.push({ name: 'pre-job-training' })
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.page-flow-process {
  ::v-deep {
    .title {
      padding: 50px 0 0 12%;

      b {
      }
      mark {
        background: #eee;
        border-radius: 4px;
        padding: 10px;
        margin-left: 1rem;
      }
    }
    .main-box {
      flex-flow: column;
      padding: 2rem 0 8rem 0;
      position: relative;

      .ivu-col {
        text-align: center;
      }

      img {
        width: 65%;
      }

      .btn-next-custom {
        margin: 4rem 0 0 0;
      }
    }
  }
}
</style>
