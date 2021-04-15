<template>
  <div class="pre-job-training">
    <div class="info">
      <h2 class="font1">岗前培训</h2>

      <ul>
        <li>
          <div class="content-box">
            <div class="box">
              <img :src="cur_role_info.avatar" alt="" />
              <p>
                <span class="font2-b white">岗位名称：</span>
                <span class="font3 white">{{ cur_role_info.roleName }}</span>
              </p>
              <p>
                <span class="font2-b white">岗位描述：</span>
                <span class="font3 white">{{ cur_role_info.des }}</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <Button type="primary" size="large" class="btn-center btn-next-f" @click="onDuty">上 岗</Button>
  </div>
</template>

<script>
import { Button } from 'view-design'
import { mapGetters } from 'vuex'
import SceneList from './sceneList'
export default {
  components: {
    Button
  },
  computed: {
    ...mapGetters(['role_list', 'currentRole', 'currentCourse', 'cur_role_info']),
    currentRole_() {
      const filterObj = this.role_list.find(item => item.roleid === this.currentRole)
      return filterObj || {}
    }
  },
  created() {
    this.$store.dispatch('getUserInfo')
  },
  methods: {
    onDuty() {
      const currentTraining = SceneList.find(item => item.id === this.currentCourse)
      this.$router.push({ name: currentTraining.entryLinkName })
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-job-training {
  h2 {
    // font-size: 20px;
  }
  .white {
    color: #fff;
  }
  .info {
    width: 76%;
    margin: 50px auto;
    font-size: 16px;

    ul {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin: 0 0 8rem 0;
      li {
        width: 299px;
        position: relative;
        min-height: 416px;
        border: 1px solid #eee;
        margin: 4rem 0 0 0rem;
        border-radius: 6px;
        box-shadow: 5px 10px 30px 0px rgba(41, 26, 204, 0.12);

        .bottom-box {
          position: relative;
          height: calc(100% - 339px);
        }
        .content-box {
          padding: 3rem 3rem 1rem 3rem;
          height: 100%;
          border-radius: 6px;
          background: linear-gradient(225deg, #78a9fd 0%, #015fff 100%);
        }

        .box {
          // padding: 4rem 0 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          color: #fff;
        }
        img {
          // width: 84px;
          // height: 64px;
          border-radius: 50%;
          object-fit: cover;
        }
        p {
          flex: 1;
          width: 100%;
          text-align: left;
          color: #fff;
          padding: 1rem 0 0 0;
        }
        .task {
          position: relative;
          font-size: 12px;
          background: rgba(0, 173, 16, 1);
          border-radius: 2px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding: 0.25rem;
        }
        .top-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .status-box {
          .status {
            border: dashed 1px #fff;
            padding: 0.25rem 1rem;
            color: #fff;
          }
        }
      }
    }
  }
  .btn-center {
    margin-top: 100px;
  }
}
</style>
