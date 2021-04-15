<template lang="html">
  <div class="short-msg">
    <Modal v-model="visible" class-name="modal-short-msg" :footer-hide="true" :closable="false" @on-visible-change="onChange">
      <div class="phone-bg">
        <div class="msg-box">
          <div class="msg" v-for="(v, i) of smsList" :key="i">
            {{ v.content }}
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { Modal } from 'view-design'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ShortMsg',
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Modal
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(['smsList']),
    ...mapGetters(['smsUnReadNumber', 'currentCourse']),
    visible: {
      get() {
        return this.show
      },
      set(val) {
        this.$emit('update:show', val)
      }
    }
  },
  methods: {
    onChange(val) {
      val && this.setRead()
    },
    setRead() {
      this.$fetch({
        uriCode: 'API1002',
        msg_type: 'sms',
        bindVars: [
          {
            key: 'courseid',
            value: this.currentCourse
          }
        ],
        status: true
      })
        .then(() => {
          this.$store.dispatch('getTeamStatus')
          this.$store.dispatch('getMsg')
        })
        .catch(() => {})
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
::v-deep .modal-short-msg {
  .msg {
    background: #eee;
    border-radius: 8px;
    padding: 0.25rem;
    width: fit-content;
    margin-right: 0.5rem;
    word-break: break-all;
    padding: 0 0.8rem 0 0.5rem;
  }

  .msg:not(:last-child) {
    margin-bottom: 1rem;
  }

  .phone-bg {
  }

  .ivu-modal {
    width: 270px !important;
    height: 520px !important;
    padding: 0;
    left: 143px !important;
    background-image: url('../assets/images/phone.png');
    background-repeat: no-repeat;
    background-position: top;
    background-origin: border-box;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 80px 0 0 130px;
  }

  .ivu-modal-content {
    box-shadow: none;
    width: 72%;
    height: 82%;
    margin-left: 3%;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .ivu-poptip-inner,
  .ivu-poptip-body,
  .ivu-poptip-body-content-word-wrap {
    height: 100%;
  }

  .msg-box {
    border-radius: 24px;
  }
}
</style>
