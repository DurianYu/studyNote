<template>
<div class="hello">

  </el-select>
  <h1>{{ msg }}</h1>
  <h2>Essential Links</h2>
  <ul>
    <li>
      <router-link :to="{ name: 'play', params: {} }"> Let's Go</router-link>
    </li>
    <li>
      <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

      <el-dialog ref="chatDialog" v-on:open="openEvent($event)" title="阿萨德" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <!-- <div slot="title">警告</div> -->
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </li>
    <li>
      <el-button type="warning" @click="testStore()" icon="el-icon-star-off" circle></el-button>
    </li>
    <li>
      <el-button type="text" @click="open2">点击打开 Message Box</el-button>
    </li>
  </ul>


</div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your World!",
      dialogVisible: false,
      wait_obj: {},

    };
  },
  computed: {
    orgin_name() {
      return 1 + 2 + 3;
    },
    // 用于少敲 this.$store.state
    ...mapState("sayHello", {
      _msg: "msg"
    }),
    ...mapState({
      cus_name: state => state.name,
      _cus_name: "name",
      triditon_name(state) {
        return [...state.name, ...this.msg].join("-");
      }
    }),
    ...mapGetters(["r_name", "r_name_length"])
    // mapState([
    //   'name'
    // ]),
  },
  methods: {
    ...mapActions(["dispatchName", "nameToAry"]),
    ...mapMutations(["changeName"]),
    testStore() {
      console.log("this", this);
      console.log("this.mapState", this.mapState);
      console.log("this.$store", this.$store);
      console.log("cus_name", this.cus_name);
      console.log("_cus_name", this._cus_name);
      console.log("triditon_name", this.triditon_name);
      console.log("name", this.name);
      console.log("orgin_name", this.orgin_name);
      console.log("this.$store.gettes", this.$store.getters);
      console.log("r_name", this.r_name);
      console.log("r_name_length", this.r_name_length);
      this.$store.commit("changeName", {
        first_name: "最美"
      });
      this.$set(this.wait_obj, "sex", {
        name: 1,
        age: 2
      });
      this.wait_obj = {
        ...this.wait_obj,
        sex2: "man"
      };
      // this.$set(this.$store.state, 'age', '18'); // 拒绝非mutation去改变store
      this.changeName({
        first_name: "极致美"
      });
      this.$store.dispatch("dispatchName", "---disatch").then(async res => {
        console.log(res);
        let two_res = await this.dispatchName("方法触发");
        console.log("two_res", two_res);
        this.nameToAry();
      });
      /* **************** store modules ************** */
      console.log("this.$store.state.sayHello", this.$store.state.sayHello);
      // this.$store.commit('chgMsg', '模块内部都是注册在全局');
      this.$store.commit("sayHello/chgMsg", "namespaced之后要带上模块名");
      console.log("this._msg", this._msg);
    },
    openEvent(dd) {
      console.log("this", this);
      console.log("dd", dd);
      console.log("this.$alert", this.$alert);
    },
    handleClose(done) {
      console.log("this.$refs", this.$refs);
      console.log("this.$refs.chatDialog.$el", this.$refs.chatDialog.$el);

      console.log("done", done);
      // done === this.hiade | done() === this.hede() , 关闭dialog
      // element-ui 自己注册的全局属性: Vue.prototype.$confirm = MessageBox.confirm;
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    open2() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  },
  destroyed() {
    console.log("摧毁了 移除dom了");
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
