<!--
/**
 * [使用说明: 确保使用该组件之前添加了element-ui插件的组件:
   ElButton ElScrollbar ElRow ElCol ElDialog ElInput
   ElPopover ElTabs ElTabPane ElCascader ElMessageBox(写入原型相关)
   ElMessage(写入原型相关) ElLoading(写入原型相关) ElNotification(写入原型相关)
]
 * [最简用例]
  <el-button type="text" @click="prfsModal = true">点击打开 专业查找</el-button> // 可替换为任意元素
   <prfs-search
    :prfsModal.sync="prfsModal"
    :major.sync="major"
    @getSelected="showSelected"
    />
  * [参数说明]
  * @type  {[Boolean]} prfsModal 必须参数 [控制弹出框的关闭, .sync(必须): true:打开，false:关闭，默认值: false]
  * @type  {[Boolean]} major 必须参数 [当首次显示弹出框时打开本科还是专科, .sync(必须): true:本科，false:专科，默认值: 无]
  * @type  {[String]} width 可选参数 [弹出框的宽度, 默认值: 80%]
  * @type  {[Boolean]} selectedClose 可选参数 [选中专业时是否关闭弹出框, true:关闭，false:不关闭，默认值: true]
  * @type  {[String]} customClass 可选参数 [自定义弹出框类名, 默认值: 无]
  * @type  {[Boolean]} closeOnClickModal 可选参数 [是否可以通过点击 modal 关闭弹出框, true:可以，false:禁止，默认值: false]
  * [事件说明]
  * @type  {[Function]} getSelected 可选事件 [选中专业时触发, 回调参数(Value: Object): 专业name和code]
*/ 
-->
<template lang="html">

<div class="prfs-box">
    <el-dialog
    :visible="prfsModal"
    @update:visible="closePrfsModal"
    @open="openPrfsList"
    :width="width"
    :modal="false"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    >
    <div slot="title">
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-input class="seaarch_subj_input" v-model="input_search_subj_name" placeholder="请输入专业名" :clearable="true"></el-input>
        </el-col>
        <el-col :span="2">
          <el-popover
          placement="bottom-end"
          width="323"
          trigger="focus"
          v-model="showSearchPop"
          >
            <el-button
            type="primary"
            class="search_subj_btn"
            @click="searchPrfs"
            slot="reference"
            icon="el-icon-search"
            >
            搜索
            </el-button>
            <div >
              <el-row type="flex" justify="center" :class="{ 'prfs-hide': !showLoading}">
                <el-col style="width: max-content;">
                  <el-button circle :loading="true"></el-button>
                </el-col>
              </el-row>
              <ul :class="{ 'prfs-hide': showLoading }" class="el-select-dropdown__list">
                <li
                  v-for="v of searchResultData"
                  class="el-select-dropdown__item"
                  :key="v.code"
                  @click="selectedResult({ code: v.code, name: v.name})"
                  >
                  {{ v.name }}
                </li>
              </ul>
            </div>
          </el-popover>
        </el-col>
      </el-row>
    </div>
      <el-tabs :value="cur_tab" @tab-click="clkTab"  type="border-card" :tab-position="'top'">
          <el-tab-pane label="本科" name="major">
            <el-scrollbar style="height: 100%;">
              <div class="slide-subj-btn-box">
                <div
                v-for="(v, i) of option"
                :key="v.value"
                @click="clkLvlOne(v[0].value, i)"
                style="width: max-content;"
                >
                <el-cascader
                :data-index="i"
                :options="v"
                :show-all-levels="false"
                :popper-class="'prfs-pop-position'"
                :placeholder="''"
                :view-update="view_update"
                @change="clkLvlThree"
                @focus="getThreeSelected"
                @active-item-change="clkLvlTwo"
                />
                </div>
              </div>
            </el-scrollbar>
          </el-tab-pane>
        <el-tab-pane label="专科" name="junior">
          <el-scrollbar style="height: 100%;">
            <div class="slide-subj-btn-box">
              <div
              v-for="(v, i) of option"
              :key="v.value"
              @click="clkLvlOne(v[0].value, i)"
              style="width: max-content;"
              >
              <el-cascader
              :data-index="i"
              :options="v"
              :show-all-levels="false"
              :popper-class="'prfs-pop-position'"
              :placeholder="''"
              :view-update="view_update"
              @change="clkLvlThree"
              @focus="getThreeSelected"
              @active-item-change="clkLvlTwo"
              />
              </div>
            </div>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="不限" name="unlimited"></el-tab-pane>
      </el-tabs>
    </el-dialog>
</div>
</template>

<script>
export default {
  props: {
    major: {
      type: Boolean // 首次打开显示本科还是专科
    },
    prfsModal: {
      type: Boolean,
      default: false // 显示或关闭modal
    },
    selectedClose: {
      type: Boolean,
      default: true // 选中后是否关闭
    },
    customClass: {
      type: String // Dialog 的自定义类名
    },
    'closeOnClickModal': {
      type: Boolean,
      default: false // 是否可以通过点击 modal 关闭 Dialog
    },
    width: {
      type: String,
      default: '80%' // dialog 的宽度
    }
  },
  data() {
    return {
      name: 'prfs-search',
      local: {
        major_list: '', // 本科专业
        junior_list: '', // 专科专业
        dom_major: '', // 再次初始化时的专业dom模板
        dom_junior: '' // 再次初始化时的专业dom模板
      },
      option: '', // 当前所有大类渲染用的数据
      view_update: [], // 触发视图更新用
      showSearchPop: false, // 是否显示搜索结果的popover
      showLoading: true, // 显示加载动画
      searchResultData: '', // 搜索专业结果的数据
      threeSelectedLabel: '', // 第三列选中的专业的名字
      input_search_subj_name: '' // 输入时：搜索专业的名字
    };
  },
  watch: {
    cur_tab: {
      handler: function () {
        this.view_update = ['update5'];
      },
      deep: true
    }
  },
  computed: {
    // 当前选项卡
    cur_tab: function() {
      switch (this.major) {
        case true:
          return 'major';
        case false:
          return 'junior';
        default:
          return 'major'
      }
    }
  },

  methods: {
    // 关闭loading动画和搜索结果的popover
    closeLoadPop() {
      this.showLoading = false;
      this.showSearchPop = false;
    },
    // 选中搜索出来的结果
    selectedResult(subjInfo) {
      this.emitSubjInfo(subjInfo);
      this.showSearchPop = false;
    },
    // 搜索专业
    searchPrfs() {
      let reg = /^[\u4E00-\u9FA5]{2,}$/;
      if (!reg.test(this.input_search_subj_name)) {
        this.$alert('请输入至少两个纯汉字', '提示', {
          center: true,
          modal: false,
          showClose: false
        }).then(() => {
          this.showSearchPop = false;
        });
        return;
      }
      this.showSearchPop = true;
      this.showLoading = true;
      axios.post('/asypc/sc/search/subject', {
          subject_name: this.input_search_subj_name
        })
        .then(res => {
          if (res.data.status === -1) {
            this.$alert(res.data.msg, '提示', {
              center: true,
              modal: false,
              showClose: false
            }).then(() => {
              this.closeLoadPop();
            });
            return;
          }
          if (res.data.status === -2) {
            this.$confirm(res.data.msg, '提示', {
              center: true,
              modal: false,
              showClose: false,
              confirmButtonText: '前往',
              type: 'warning',
            }).then(() => {
              this.closeLoadPop();
              this.$router.push({path: '/'});
            }).catch(() => {
              this.closeLoadPop();
            });
            return;
          }
          if (res.data.status === 1) {
            let col_names = res.data.col_names;
            let rows = res.data.data;
            let po_subject_name = col_names.indexOf("subject_name");
            let po_subject_code = col_names.indexOf("subject_code");
            let temp_result = [];
            for (let v of rows) {
              temp_result.push({
                name: v[po_subject_name],
                code: v[po_subject_code]
              });
            }
            this.searchResultData = temp_result;
            this.showLoading = false;
          }
        })
        .catch(error => console.log('error', error))
    },
    // 点击选项卡
    clkTab(tab) {
      let tab_pane_name = tab.name;
      if (tab_pane_name !== this.cur_tab) {
        if (tab_pane_name === 'major') {
          this.$emit('update:major', true);
        } else if (tab_pane_name === 'junior') {
          this.$emit('update:major', false);
        } else {
          this.closePrfsModal();
          this.$emit('update:major', this.major ? false : true);
          this.$emit('getSelected', {
            code: '0',
            name: '不限'
          });
        }
        this.openPrfsList();
      }
    },
    openPrfsList() {
      this.$nextTick(function() {
        if (this.major) {
          if (!this.local.major_list) {
            this.firstInitPrfsList();
          } else {
            this.initPrfsList();
          }
        } else {
          if (!this.local.junior_list) {
            this.firstInitPrfsList();
          } else {
            this.initPrfsList();
          }
        }
        let view_height = document.body.clientHeight;
        // 设置左侧专业列表大类的高度
        document.querySelectorAll('.prfs-box .slide-subj-btn-box').forEach(v => {
          if (v.style.height === `${view_height - 78 - 30 - 17 - 23 - 5}px`) {
            return;
          }
          v.style.height = `${view_height - 78 - 30 - 17 - 23 - 5}px`;
        })
      });
    },
    closePrfsModal() {
      this.$emit('update:prfsModal', false);
    },
    // 用本地数据初始化专业列表
    initPrfsList() {
      // 用原来的dom模板渲染dom后, 再更新成最新的数据
      let temp_dom_data = this.local[`${this.major ? 'dom_major' : 'dom_junior'}`];
      let real_data = this.local[`${this.major ? 'major_list' : 'junior_list'}`];
      // 选项卡里面的内容是独立的， 不能共用，再次赋值为了正确渲染出大类的个数
      this.option = temp_dom_data;
      this.setNameCode(temp_dom_data);
      // 更新option为最新的数据
      this.option = real_data;
    },
    // 初始化专业列表当第一次打开相应专业的时候
    firstInitPrfsList() {
      axios.get(`${store.state.PUBLIC_CDN_DOMAIN}/json/zk-${this.major ? 'major' : 'junior'}.json`)
        .then(res => {
          this.local[`${this.major ? 'dom_major' : 'dom_junior'}`] = this.formatData(res.data);
          this.option = this.formatData(res.data);
          this.setNameCode(this.option);
          // 存储为本地专业数据
          this.local[`${this.major ? 'major_list' : 'junior_list'}`] = this.option;
        })
        .catch(error => console.log('error', error));
    },
    // 返回选中专业的code和name给父级
    emitSubjInfo(subjInfo) {
      this.$emit('getSelected', subjInfo);
      if (this.selectedClose) {
        this.closePrfsModal();
      }
    },
    // 点击第三级的选项
    clkLvlThree(val) {
      this.$nextTick(function() {
        this.emitSubjInfo({
          code: val[1],
          name: this.threeSelectedLabel
        });
      });
    },
    // 第三列选中的时候获取专业的名字
    getThreeSelected(e) {
      if (e.relatedTarget) {
        this.threeSelectedLabel = e.relatedTarget.textContent;
      }
    },
    formatData(data) {
      data = JSON.stringify(data);
      return JSON.parse(data.replace(/name/g, "label").replace(/code/g, "value"));
    },
    // 将第一列 大类 的名字和code设置一遍
    setNameCode(data) {
      this.$nextTick(function() {
        let targetId = this.major ? '#pane-major' : '#pane-junior';
        let init_level1_text = document.querySelectorAll(`${targetId} .el-cascader__label`);
        for (let i = 0, len = data.length; i < len; i++) {
          init_level1_text[i].textContent = data[i][0].label;
          init_level1_text[i].dataset.code = data[i][0].value;
        }
      });
    },
    clkLvlOne(code, index) {
      this.setPrfsHeight();
      if (this.option[index][0].children) {
        return;
      }
      axios.get(`${store.state.PUBLIC_CDN_DOMAIN}/json/zk-${code}.json`)
        .then(res => {
          this.option[index] = this.formatData(res.data.children);
          this.local[`${this.major ? 'major_list' : 'junior_list'}`][index] = this.option[index];
          this.view_update = ['update'];
        })
        .catch(error => console.log('error', error));

    },
    clkLvlTwo() {
      this.setPrfsHeight();
    },
    setPrfsHeight() {
      this.$nextTick(function() {
        let view_height = document.body.clientHeight;
        document.querySelectorAll('.prfs-pop-position  ul').forEach(v => {
          if (v.style.height === `${view_height - 78 - 30 - 17 - 23 - 5}px`) {
            return;
          }
          v.style.height = `${view_height - 78 - 30 - 17 - 23 - 5}px`;
        })
      });
    }
  },
  created() {

  },
  mounted() {
  }
}
</script>

<style lang="scss">
.prfs-box {
    width: auto;
    height: 100%;
    .el-dialog {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
        float: right;
        .el-dialog__body {
            padding: 5px 20px 5px 16px;
            .el-tabs__content {
                // overflow: auto;
                width: max-content;
            }
        }
    }

    .slide-subj-btn-box {
        text-align: left;
        padding-right: 12px;
    }

    .seaarch_subj_input > input {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .search_subj_btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-left: none;
    }
}

.prfs-pop-position {
    margin-left: 232px !important;
    top: 170px !important;
    margin-top: -40px !important;
    .el-cascader-menu {
        width: 217px;
    }

    .el-cascader-menu__item {
        padding: 8px 40px 8px 20px;
        white-space: pre-wrap;
        height: auto;
    }

    .popper__arrow {
        display: none !important;
    }
}

.prfs-hide {
    display: none !important;
}
</style>
