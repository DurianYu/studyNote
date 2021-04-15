<template>
  <div class="introduction">
    <div class="main-box flex-x-center h-100">
      <div class="img-box" :style="imgBoxStyle">
        <!-- <div class="title">
        {{ this.cur_obj.title }}
      </div> -->
      </div>
      <div class="right-box relative">
        <p v-html="intrContent"></p>
        <Button type="primary" size="large" class="btn-center btn-next-a" v-if="isTeacher" :to="{ name: 'training-detail' }">完成情况</Button>
        <Button type="primary" size="large" class="btn-center btn-next-a" :loading="loading" v-else @click="enterTraining">进入实训</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'view-design'
import sceneList from './sceneList'
import { domainURI } from '@/utils/index'

export default {
  components: {
    Button
  },
  data() {
    return {
      loading: false,
      cur_obj: {}
    }
  },
  computed: {
    imgBoxStyle() {
      return {
        'background-image': `url(${this.cur_obj.intr_img})`
      }
    },
    isTeacher() {
      return sessionStorage.getItem('isTeacher') === 'true'
    },
    intrContent() {
      const sceneObj = sceneList.find(item => item.id == this.$route.params.id)
      return sceneObj.intr.replace(/\n/g, '<br>')
    }
  },
  mounted() {
    const { p_classid, p_teamid, p_studentid, redirect_host } = this.$route.query
    const platformUserInfo = {
      p_classid: +p_classid,
      p_teamid: +p_teamid,
      p_studentid: +p_studentid,
      redirect_host,
      training_courseid: this.$route.params.id
    }
    // 将平台用户信息存储在本地
    sessionStorage.setItem('platformUserInfo', JSON.stringify(platformUserInfo))
    this.$store.commit('SET_PLATFORMUSERINFO', platformUserInfo)
  },
  methods: {
    // 登录
    async enterTraining() {
      const { p_classid, p_teamid, p_studentid, redirect_host } = this.$route.query
      const params = {
        uriCode: 'API004',
        training_courseid: this.$route.params.id,
        p_classid: +p_classid,
        p_teamid: +p_teamid,
        p_studentid: +p_studentid,
        redirect_host: domainURI(redirect_host)
      }
      this.loading = true
      try {
        await this.$fetch(params)
        this.$router.push({ name: 'scene-role' })
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.cur_obj = sceneList.find(v => v.id == this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
.introduction {
  height: 100%;
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
    color: #333;
  }
  p {
    line-height: 26px;
    margin: 0 auto;
    width: 80%;
    margin-top: 6rem;
  }
  .btn-center {
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: 2rem;
  }

  .img-box {
    width: 50%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-origin: border-box;
    background-position: center;

    .title {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 42px;
      font-weight: 500;
      color: #fff;
    }
  }

  .right-box {
    width: 50%;
  }
}
</style>
