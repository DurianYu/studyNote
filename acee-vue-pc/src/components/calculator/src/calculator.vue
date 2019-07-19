/**
 * [最简实例]
  <yc-calculator />
 */
<template lang="html">
  <div class="calculator-box" :style="style">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" :align="'middle'">
          <el-col :span="3">
            <el-dropdown @command="handleCommand" trigger="click">
              <el-button type="info" plain size="mini">
                记录<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="v,i of user_exp" :key="i">{{ v }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span='16'>
            <div class="expression">
              <input type="text" name="" :value="typing_ary.join('')" ref="exp-input" @keydown.prevent.stop="">
            </div>
            <div class="cur-typing">
              <span v-show="num_ary.length">{{ num_ary.join('') }}</span>
              <span v-show="!num_ary.length">0</span>
            </div>
          </el-col>
          <el-col :span='5'>
            <el-row>
              <el-col :span="24">
                <el-button @click="saveExp()" :loading="waiting" type="success" plain size="medium" :style="s_btn">使用</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="move('left')" size="mini" :style="s_btn">左移</el-button>
              </el-col>
              <el-col :span="12">
                <el-button @click="move('right')" size="mini" :style="s_btn">右移</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="8">
        <el-col :span="6">
          <yc-number @typingNum="typingNum" />
        </el-col>
        <el-col :span="8">
          <yc-operate @typingOperate="typingOperate" />
        </el-col>
        <el-col :span="10">
          <yc-rule :rule_data="rule_data" @typingNum="typingNum" />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'YcCalculator',
  props: {
    width: {
      type: String
    },
    // 平均分、录取分等规则按钮
    rule_data: {
      default: () => {
        return [
          '平均分',
          '录取分'
        ];
      },
      required: true,
      type: Array
    },
    // 用户保存的表达式
    user_exp: {
      default: () => {
        return []
      },
      type: Array
    }
  },
  components: {
    YcNumber: () =>
      import('./_number'),
    YcOperate: () =>
      import('./_operate'),
    YcRule: () =>
      import('./_rule')
  },
  data() {
    return {
      num_ary: [], // 记录点击数字键盘的按钮值
      operate_ary: [], // 记录点击功能操作的按钮值
      typing_ary: [], // 展示已经键入的内容
      result: '', // 后台计算后的结果
      waiting: false, // 等待计算结果过度动画
      deleted: false, // 是否使用过 删除按钮
      s_btn: {
        width: '-webkit-fill-available',
        padding: '10px 6px'
      }
    };
  },
  computed: {
    style() {
      let style = {};
      if (this.width) {
        style.width = this.width;
      }
      return style;
    },
  },
  methods: {
    // 检测表达式里 包含必选参数不
    testNeedful(exp) {
      let result = false;
      for (let v of this.rule_data) {
        if (exp.search(v) !== -1) {
          result = true;
          break;
        }
      }
      return result;
    },
    // 键入数字的处理
    typingNum(str) {
      if (this.typing_ary.length && this.last_str() === ')') return;
      if (str === '.') {
        if (!this.num_ary.length) return ['0', '.'].forEach(v => this.num_ary.push(v));
        if (this.num_ary.join('').indexOf('.') > -1) return;
      }
      this.num_ary.push(str);
      if (this.num_ary.length === 2 && this.num_ary[0] === '0') {
        if (this.num_ary[1] === '0') return this.num_ary.pop();
        if (this.num_ary[1] !== '0' && this.num_ary[1] !== '.') return this.num_ary.shift();
      }
      return this.num_ary.join('');
    },
    // 键入运算符号的处理
    typingOperate(str) {

      if (str === 'c') {
        this.emptyAry();
        this.expFocus();
        this.deleted = false;
        return;
      }

      if (str === '←') {
        if (this.num_ary.length) return this.num_ary.pop();
        if (this.typing_ary.length) {
          let pos = this.getPosition();
          if (pos === 0) return this.setPosition(0);
          console.log(pos);
          console.log(this.typing_ary);
          let temp_ary = [...this.typing_ary.join('')];
          temp_ary.splice(pos - 1, 1);
          this.typing_ary = temp_ary;
          this.$nextTick(function() {
            this.setPosition(pos - 1);
          });
          this.deleted = true;
        }
        return;
      }

      // 正常处理
      if (this.num_ary.length) {
        console.log(1);
        console.log(this.getPosition());
        console.log([...this.typing_ary.join('')].length);
        // 光标不在最后的位置的情况
        if (this.getPosition() !== [...this.typing_ary.join('')].length || this.deleted) {
          let pos = this.getPosition();
          let temp_ary = [...this.typing_ary.join('')];
          temp_ary.splice(pos, 0, this.num_ary.join('') + str);
          this.typing_ary = temp_ary;
          // 上面重新赋值导致光标移到末端, 此处进行重新设置
          let temp_len = this.num_ary.join('').length;
          this.$nextTick(function() {
            this.setPosition(pos + temp_len + [...str].length);
          });
          this.num_ary = [];
          return;
        }
        // 键入数字后 接 ) 的处理
        let {
          left_cnt,
          right_cnt
        } = this.countBracket();
        if (str === ')' && this.typing_ary.length === 0 && left_cnt === 0) return;
        if (str === ')' && this.typing_ary.length !== 0 && left_cnt === 0) return;
        if (str === ')' && this.typing_ary.length !== 0 && left_cnt !== 0 && left_cnt === right_cnt) return;
        // 数字后面不能 接 的操作符
        if (this.regTest(/[(]/, str)) return;
        this.addOperate(str);
      } else {
        console.log(2);
        console.log(this.getPosition());
        console.log([...this.typing_ary.join('')].length);

        // 光标不在最后的位置的情况
        if (this.getPosition() !== [...this.typing_ary.join('')].length || this.deleted) {
          let pos = this.getPosition();
          let temp_ary = [...this.typing_ary.join('')];
          temp_ary.splice(pos, 0, str);
          this.typing_ary = temp_ary;
          // 上面重新赋值导致光标移到末端, 此处进行重新设置
          this.$nextTick(function() {
            this.setPosition(pos + [...str].length);
          });
          return;
        }
        this.expFocus();

        // operate之后继续operate
        // 破例的操作符情况下
        if (this.regTest(/[(]/, str)) {
          // ) 括号后面不能紧跟 (
          if (this.typing_ary.length && this.last_str() === ')') return;
          this.addOperate(str);
          return;
        }
        // ) 之后接其它操作符
        if (this.typing_ary.length && this.last_str() === ')') {
          // 限制 ） 的个数，防止傻瓜式操作
          let {
            left_cnt,
            right_cnt
          } = this.countBracket();
          if (str === ')' && left_cnt === right_cnt) return;
          // ) 括号后面不能紧跟 (
          if (str === '(') return;
          // 键入 ) 后的其它操作符可以进行
          this.addOperate(str);
          return;
        }
      }
      this.expFocus();
      this.num_ary = [];
    },
    addOperate(str) {
      this.typing_ary.push(this.num_ary.join(''));
      this.typing_ary.push(str);
    },
    emptyAry() {
      this.num_ary = [];
      this.typing_ary = [];
    },
    countBracket(_exp) {
      let bracket = {
        left_cnt: 0,
        right_cnt: 0
      }
      let exp = _exp || this.typing_ary;
      for (let v of exp.join('')) {
        if (v === '(') bracket.left_cnt += 1;
        if (v === ')') bracket.right_cnt += 1;
      }
      return bracket;
    },
    last_str() {
      console.log(this.typing_ary);
      return this.typing_ary.slice(-1)[0];
    },
    saveExp() {
      console.log(this.num_ary);
      console.log(this.typing_ary);
      // 先验证
      if (this.typing_ary.length === 0) return;
      let exp = JSON.parse(JSON.stringify(this.typing_ary));
      if (this.num_ary.length) exp.push(this.num_ary.join(''));
      // 需要拿到完全的表达式 才能进行验证
      let {
        left_cnt,
        right_cnt
      } = this.countBracket(exp);
      if (left_cnt !== right_cnt) {
        this.cue('起始括号或结束括号缺少');
        return;
      }
      // 表达式必须有 必选参数
      if (!this.testNeedful(exp.join(''))) {
        console.log('this.typing_ary', this.typing_ary);
        this.cue('至少包含一个必选参数');
        return;
      }
      // <,>,<=,>= 与 或 非 等 左或右必须有值
      let side_val = true;
      ['<', '>', '≥', '≤', '与', '或', '非', '等于'].forEach((v) => {
        if (exp.join('').split(v).slice(-1)[0] === ' ') side_val = false;
      });
      // 与 或 非 左和右必须有 必选参数
      let side_val_2 = true;
      ['与', '或', '非'].forEach((v) => {
        for (v of exp.join('').split(v)) {
          if (!this.testNeedful(v)) {
            side_val_2 = false;
          }
        }
      });
      if (!side_val || !side_val_2) {
        this.cue('与 或 非 左和右必须有 必选参数');
        return;
      }

      // 显示 最终表达式
      if (this.num_ary.length) this.typing_ary.push(this.num_ary.join(''));
      this.num_ary = [];
      this.$confirm(`确定保存并使用: ${this.typing_ary.join('')}`, '提示', {
        center: true,
        modal: false,
      }).then(() => {
        this.$emit('saveExp', this.typing_ary.join(''));
        this.waiting = true;
        setTimeout(() => {
          this.waiting = false;
        }, 1000);
        // 存储输入记录
        if (this.user_exp.length > 20) this.user_exp.shift();
        this.user_exp.push(this.typing_ary.join(''));
        console.log('this.user_exp', this.user_exp);
      }).catch(res => {});
    },
    regTest(reg, str) {
      return reg.test(str);
    },
    cue(msg) {
      this.$alert(msg, '提示', {
        center: true,
        modal: false,
      });
    },
    move(direction) {
      let trgt_el = this.$refs['exp-input'];
      let cur_pos = this.getPosition();
      if (direction === 'left') this.setPosition(cur_pos - 1);
      if (direction === 'right') this.setPosition(cur_pos + 1);
    },
    expFocus() {
      this.$refs['exp-input'].focus();
    },
    getPosition() {
      let trgt_el = this.$refs['exp-input'];
      let pos = 0;
      if (document.selection) { //IE
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -trgt_el.value.length);
        pos = selectRange.text.length;
      } else if (trgt_el.selectionStart || trgt_el.selectionStart == '0') {
        pos = trgt_el.selectionStart;
      }
      return pos;
    },
    setPosition(pos) {
      let trgt_el = this.$refs['exp-input'];
      trgt_el.focus();
      if (trgt_el.setSelectionRange) {
        // IE Support
        trgt_el.focus();
        trgt_el.setSelectionRange(pos, pos);
      } else if (trgt_el.createTextRange) {
        // Firefox support
        var range = trgt_el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    },
    handleCommand(command, e) {
      this.emptyAry();
      this.deleted = true;
      this.typing_ary[0] = e.$el.innerText;
    }
  },
  created() {
    /* ********** 初始化 *********** */
  }
};
</script>

<style lang="scss" scoped>
$danger: #f56c6c;
$primary: #409eff;
$often-gray: #909399;

@mixin exp-show($v, $c) {
    line-height: $v;
    font-size: $v;
    color: $c;
}

.calculator-box {
    max-width: 672.5px;
    .expression {
        input {
            @include exp-show(17px, $primary);
            height: 17px;
            border: none;
            outline: none;
            text-align: center;
            width: -webkit-fill-available;
        }
    }

    .cur-typing {
        @include exp-show(15px, $often-gray);
        padding-top: 12px;
    }
}
</style>
