<template lang="html">
  <div class="page-lc-map">
    <!-- <header>
      <img class="logo" :src="require('@/assets/images/company-yutong.png')" alt="" />
    </header> -->

    <section class="main">
      <div class="logo">
        <img @click="next('role_weizhen')" :src="require('@/assets/images/lc/location.png')" alt="" />
        <img @click="next('role_weizhen')" :src="require('@/assets/images/lc/map_role_weizhen.png')" alt="" />
      </div>
      <div class="logo">
        <img @click="next('role_bakelai_bank')" :src="require('@/assets/images/lc/location.png')" alt="" />
        <img @click="next('role_bakelai_bank')" :src="require('@/assets/images/lc/map_role_bakelai_bank.png')" alt="" />
      </div>
      <div class="logo">
        <img @click="next('role_jianshe_bank')" :src="require('@/assets/images/lc/location.png')" alt="" />
        <img @click="next('role_jianshe_bank')" :src="require('@/assets/images/lc/map_role_jianshe_bank.png')" alt="" />
      </div>
      <div class="logo">
        <img @click="next('role_tongyu')" :src="require('@/assets/images/lc/location.png')" alt="" />
        <img @click="next('role_tongyu')" :src="require('@/assets/images/lc/map_role_tongyu.png')" alt="" />
      </div>

      <div class="node">
        <img src="@/assets/images/lc/node.png" alt="" />
      </div>
    </section>

    <Modal title="题目" :visible="modal.question" :footerHide="true">
      <h3 class="title">接下来你将对谁的信用证申请进行审核？</h3>
      <br />
      <RadioGroup v-model="answer">
        <Radio label="A"> A. 通宇集团</Radio>
        <br />
        <br />
        <Radio label="B"> B. 维珍集团</Radio>
        <br />
        <br />
        <Radio label="C"> C. 建设银行</Radio>
      </RadioGroup>
      <Button style="margin-top: 2rem" type="primary" @click="submitAanwer" class="btn-center">确 定</Button>
    </Modal>
  </div>
</template>

<script>
import { Message, RadioGroup, Radio, Button } from 'view-design'
import Modal from '@/components/Modal'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    Modal,
    RadioGroup,
    Radio,
    Button
  },
  data() {
    return {
      answer: '',
      modal: {
        question: false
      }
    }
  },
  computed: {
    ...mapState(['smsList']),
    ...mapGetters(['smsUnReadNumber', 'currentRole'])
  },
  methods: {
    ...mapMutations(['SETCOMPANY']),
    next(role) {
      if (this.currentRole === role) {
        this.$router.push({ name: 'lc-overview' })
      }
    },
    submitAanwer() {
      if (this.answer && this.answer === 'B') {
        Message.success('回答正确')
      } else {
        Message.error('回答错误')
      }
      this.modal.question = false
    },
    onShow() {
      this.setRead()
    },
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        status: true
      })
        .then(() => {
          this.$store.dispatch('getUserInfo')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
.page-lc-map {
  height: 100%;
  width: 100%;
  ::v-deep {
    .logo {
      max-width: 124px;
      object-fit: contain;
    }
    .map {
      width: 100%;
      object-fit: cover;
    }
    .main {
      height: 100%;
      width: 100%;
      background-image: url('../../assets/images/addr-map.png');
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
      background-origin: border-box;
      position: relative;

      .node {
        position: absolute;
        right: 12px;
        bottom: 0;
        width: 340px;
        img {
          width: 100%;
        }
      }

      .logo {
        position: absolute;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-around;

        img:nth-of-type(2) {
          padding-left: 0.5rem;
        }
      }
      .logo:nth-of-type(1) {
        top: 40%;
        left: 51%;
      }
      .logo:nth-of-type(2) {
        top: 34%;
        left: 51%;
      }
      .logo:nth-of-type(3) {
        top: 50%;
        left: 82%;
      }
      .logo:nth-of-type(4) {
        top: 56%;
        left: 80%;
      }
    }
  }
}
</style>
