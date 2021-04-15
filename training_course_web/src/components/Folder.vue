<template lang="html">
  <div class="folder all-height">
    <Modal :value.sync="show" class-name="modal-folder" :mask-closable="false" :footer-hide="true" @on-cancel="onCancel" width="auto">
      <section slot="header">
        <Row type="flex" justify="center" align="middle">
          <Col span="12">文件夹系统</Col>
          <Col span="12"><a href="#">下载本实训所有文件</a></Col>
        </Row>
      </section>
      <section class="main">
        <Row type="flex" justify="center" align="top">
          <Col span="7">
            <Menu active-name="1" @on-select="onSelcet">
              <MenuGroup title="文件列表">
                <MenuItem :name="v.path" v-for="(v, i) of list" :key="i">
                  <!-- <Icon type="ios-folder-outline" /> -->
                  <Icon type="ios-document-outline" />
                  {{ v.title }}
                </MenuItem>
              </MenuGroup>
            </Menu>
          </Col>
          <Col span="17">
            <PdfView :path="pdf_path" v-if="pdf_path" />
          </Col>
        </Row>
      </section>
    </Modal>
  </div>
</template>

<script>
import { Menu, MenuGroup, MenuItem, Modal, Row, Col, Icon } from 'view-design'
import { mapGetters } from 'vuex'
import PdfView from '@/components/PdfView'
import { folder_list } from '@/config/folder'

export default {
  name: 'folder',
  props: {
    show: {
      tyle: Boolean,
      required: true,
      default: false
    }
  },
  components: {
    PdfView,
    Menu,
    MenuGroup,
    MenuItem,
    Modal,
    Row,
    Col,
    Icon
  },
  data() {
    return {
      pdf_path: ''
    }
  },
  computed: {
    ...mapGetters(['currentCourse']),
    list() {
      return folder_list[`${this.currentCourse}`]
    }
  },
  methods: {
    onSelcet(name) {
      this.pdf_path = name
    },
    onCancel() {
      this.$emit('update:show', false)
    }
  },
  created() {}
}
</script>

<style lang="scss" scoped>
::v-deep .modal-folder {
  width: 55%;
  @media all and (max-width: 1620px) {
    width: 95%;
  }

  .ivu-modal {
    top: 0;
    height: 100%;
    padding: 40px 0 20px 200px;
    .ivu-modal-content {
      height: 100%;

      .ivu-modal-body {
        height: calc(100% - 43px);
      }

      .main,
      .ivu-row-flex,
      .ivu-col,
      .ivu-menu-item-group,
      ul {
        height: 100%;
      }
      .ivu-menu {
        height: 100%;
        overflow: hidden;
      }
      ul {
        overflow-x: hidden;
        overflow-y: auto;
      }
    }
  }
}
</style>
