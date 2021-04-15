<template>
  <Modal :visible.sync="show" title="邮件" :width="1200" :footerHide="footerHide" :closable="true">
    <div class="email con-height">
      <div class="email-content">
        <div class="email-category">
          <div class="user">
            <img src="@/assets/images/head.png" alt="" />
            <dl>
              <dt>学生</dt>
              <dd>{{ userInfo.user.name }}</dd>
            </dl>
          </div>
          <p
            :class="{ active: category === 1 }"
            @click="
              category = 1
              showIndex = -1
            "
          >
            收件箱
          </p>
          <p
            :class="{ active: category === 2 }"
            @click="
              category = 2
              showIndex = -1
            "
          >
            发件箱
          </p>
        </div>
        <div class="email-list">
          <h2>{{ category === 1 ? '收件箱' : '发件箱' }}</h2>
          <ul>
            <li
              :class="{ active: index === showIndex }"
              v-for="(item, index) in datalist"
              :key="index"
              @click="
                showIndex = index
                viewEmail(item)
              "
            >
              <div class="info">
                <p>
                  {{ item.contentJson.sender }}
                  <span v-if="index === 0">新</span>
                </p>
                <i>{{ item.contentJson.date }}</i>
              </div>
              <dl>
                <dt>{{ item.contentJson.title }}</dt>
                <!-- <dt>{{item.title}}</dt> -->
                <dd>{{ item.contentJson.des }}</dd>
              </dl>
            </li>
          </ul>
        </div>
        <div class="email-body" v-if="showIndex >= 0 && datalist[showIndex]">
          <h1>{{ datalist[showIndex].contentJson.title }}</h1>
          <p class="info">
            来自： {{ datalist[showIndex].contentJson.sender }}
            <span>{{ datalist[showIndex].contentJson.date }}</span>
          </p>
          <article>
            <div v-html="datalist[showIndex].contentJson.article" class="email-body-con"></div>
            <br />
            <p>{{ datalist[showIndex].contentJson.sender }}</p>
            <p>{{ datalist[showIndex].contentJson.date }}</p>
          </article>
          <div class="action">
            <p>回复</p>
            <p>转发</p>
          </div>
        </div>
      </div>
    </div>
    <Modal :visible.sync="picVisible" :footerHide="true" :width="1000" :closable="true">
      <img :src="imgType" style="width: 100%" alt="" />
    </Modal>
  </Modal>
</template>

<script>
import Modal from './Modal'
import { Modal as IModal } from 'view-design'
import { actionCode, roleStatus } from '@/config/index'
import { mapGetters, mapState } from 'vuex'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    footerHide: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal
  },
  data() {
    return {
      category: 1, // 1-收件箱 2-发件箱
      showIndex: -1, // 当前显示的数据列表下标
      picVisible: false, // 查看图标的弹窗
      imgType: null // 发票
    }
  },
  computed: {
    ...mapGetters(['currentStatus', 'currentCourse']),
    ...mapState(['emailList', 'userInfo']),
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    },
    // 邮件列表
    datalist() {
      if (this.category === 2 || this.emailList.length === 0) return []
      return this.emailList.map(item => {
        return {
          ...item,
          contentJson: item.content ? JSON.parse(item.content) : {}
        }
      })
    }
  },
  mounted() {
    window.viewTicket = id => {
      this.picVisible = true
      if (id === 1) {
        this.imgType = require('@/assets/images/invoice/invoice2.png')
      } else {
        this.imgType = require('@/assets/images/invoice/invoice4.png')
      }
      // 判断当前没有查看错误才发送查看错票的请求
      if (this.currentStatus === roleStatus.invoice.buyer.s_buyer_has_wrong_ticket.status && id === 1) {
        this.$store.dispatch('changeStatus', { actionid: actionCode.invoice.buyer.a_buyer_check_wrong_ticket })
      }
    }

    window.goPage = routerName => {
      this.$router.push({ name: routerName })
      this.show = false
    }

    window.viewSummary = course => {
      const actions = new Map([
        [
          'invoice',
          {
            title: '区块链电子发票总结',
            content: `<p>(1)解决了信息孤岛问题。将发票流转信息上链， 解决了发票流转过程中的信息孤岛问题，实现了发票状态全流程可查可追溯；</p><br />
            <p>(2)解决了一票多报，虚抵虚报的问题。利用区块链技术，可以确保发票的唯一性和信息记录的不可篡改性；</p><br />
            <p>(3)帮助政府提升了监管力度。由于发票全流程的信息都在链上可帮助税局等监管方实现实时性更好的全流程监管。</p><br />`
          }
        ],
        [
          'lc',
          {
            title: '区块链信用证实训总结',
            content: `1)高效。业务参与方会根据每个环节的依赖关系，将原本的串形业务顺序变成效率更高的并行业务顺序。
(2)低成本。采用基于区块链所打造的区块链信用证系统，几乎可以省去所有的沟通成本，只需要支付物流费和必要的人工审核费即可，
(3)透明。在保证系统的高可用性和相对透明性的前提下，可以让各业务方毫无顾虑的参与进来， 无需担心自身隐私数据的安全性，也无需担心对方数据的真实性。`
          }
        ],
        ['pay', {}],
        ['insurance', {}],
        ['finance', {}]
      ])
      let action = actions.get(course)
      IModal.info({
        width: 616,
        title: action.title,
        content: action.content,
        onOk: () => {}
      })
    }
  },
  methods: {
    async viewEmail(email) {
      if (email.has_read) return
      const params = {
        uriCode: 'API009',
        bindVars: [
          {
            key: 'courseid',
            value: this.currentCourse
          },
          {
            key: 'msgid',
            value: email.id
          }
        ],
        status: true
      }
      await this.$fetch(params)
      this.$store.dispatch('getMsg')
    }
  }
}
</script>

<style lang="scss" scoped>
.email {
  background-size: 100% 100%;
  position: relative;
  &-content {
    background-color: #fff;
    height: calc(100% - 60px);
    display: flex;
  }
  &-category {
    width: 224px;
    height: 100%;
    background-color: #f5f6fa;
    p {
      height: 40px;
      padding: 0 20px;
      line-height: 40px;
      cursor: pointer;
      &.active {
        background: rgba(58, 135, 198, 0.21);
        color: #3a87c6;
      }
    }
  }
  &-list {
    width: 224px;
    height: 100%;
    background-color: #f5f6fa;
    padding: 15px 0;
    ul {
      height: 400px;
      overflow-y: auto;
    }
    li {
      cursor: pointer;
      margin-top: 20px;
      padding: 10px;
      &.active {
        background-color: rgba(58, 135, 198, 0.21);
      }
    }
    h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 48px;
      color: #000;
      padding: 0 10px;
    }
    .info {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        color: #000;
      }
      span {
        display: block;
        background: rgba(255, 101, 101, 1);
        width: 26px;
        height: 26px;
        color: #fff;
        border-radius: 50%;
        margin: 0 10px;
        text-align: center;
      }
      i {
        color: #3a87c6;
        font-size: 16px;
      }
    }
    dt {
      font-size: 18px;
      margin-bottom: 5px;
      color: #000;
    }
    dd {
      font-size: 15px;
      line-height: 20px;
    }
  }
  &-body {
    flex: 1;
    height: 100%;
    padding: 36px;
    &-con {
      height: calc(100vh - 500px);
      overflow-y: auto;
    }
    h1 {
      font-size: 24px;
      color: #262626;
      margin-bottom: 21px;
      font-weight: 500;
    }
    .info {
      display: flex;
      justify-content: space-between;
      color: #000;
      font-size: 18px;
      margin-bottom: 24px;
      span {
        color: #3a87c6;
        font-size: 16px;
        font-weight: 400;
      }
    }
    article {
      font-size: 18px;
      line-height: 30px;
    }
    .action {
      position: absolute;
      right: 36px;
      bottom: 36px;
      display: flex;
      justify-content: end;
      p {
        width: 90px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        border-radius: 2px;
        font-size: 18px;
        letter-spacing: 3px;
        margin-left: 25px;
        background-color: rgba(58, 135, 198, 1);
        cursor: pointer;
        &:last-child {
          background-color: rgba(58, 135, 198, 0.6);
        }
      }
    }
  }
  .user {
    height: 224px;
    background-color: #3a87c6;
    text-align: center;
    color: #fff;
    padding-top: 50px;
    margin-bottom: 20px;
    dl {
      color: #fff;
    }
    dt {
      margin-top: 10px;
    }
    img {
      width: 84px;
      height: 84px;
      margin: 0 auto;
      border-radius: 50%;
    }
  }
}
</style>
