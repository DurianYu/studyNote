<template lang="html">
  <div class="jg-create" style="height: -webkit-fill-available;">
    <el-card style="height: -webkit-fill-available">
      <el-row type="flex" justify="start" align="" style="height: -webkit-fill-available;">
        <el-col :span="14">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="机构的名称.."></el-input>
            </el-form-item>
            <el-form-item label="介绍" prop="introduce">
              <el-input type="textarea" v-model="form.introduce" placeholder="机构的介绍.."></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover_img">
              <el-upload
                class="avatar-uploader"
                action="/"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="imgChanged"
                >
                <img v-if="this.form.cover_img" :src="this.form.cover_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过1000kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
              <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>



  </div>
</template>

<script>
import store from '@/store/index.js';
import {
  OverTime,
  readImgSrc
} from '@/utils/util.js';
export default {
  name: 'jg-create',
  data() {
    return {
      // 表单数据
      form: {
        name: '', // 机构名字
        introduce: '', // 介绍
        cover_img: '' // 封面地址
      },
      cover_file: '', // 封面文件
      rules: {
        name: [{
          required: true,
          message: '请输入机构名称',
          trigger: 'blur'
        }],
        introduce: [{
          required: true,
          message: '请输入机构的介绍',
          trigger: 'blur'
        }],
        cover_img: [{
          required: false
        }]
      },
    }
  },
  computed: {
    jg_info: () => store.state.jg_info,
  },
  methods: {
    // 用户选中图片的处理
    imgChanged(file) {
      readImgSrc.call(this, file.raw).then(res => {
        this.form.cover_img = res;
        this.cover_file = file.raw;
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) return this.$alert('请完整填写或按红字进行更改', '');
        // 存储
        let form_data = new FormData();
        form_data.append('name', this.form.name);
        form_data.append('introduce', this.form.introduce);
        form_data.append('type', 'record');
        if (this.form.cover_img) form_data.append('cover_img', this.cover_file);
        if (this.jg_info) form_data.append('edit', 1);
        axios.defaults.withCredentials = true;
        axios({
          url: `/jg`,
          method: 'POST',
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // },
          // async: false,
          data: form_data
        }).then(res => {
          res = res.data;
          if (res.status === 1) {
            if (this.jg_info) {
              this.$emit('eiit-success', {
                id: res.id,
                name: this.form.name,
                introduce: this.form.introduce,
                type: 'record',
                cover_img: this.form.cover_img
              });
            } else {
              this.$router.push({
                name: 'mgrJg'
              });
            }
          }
          if (res.status === -1) {
            app.dialog.alert(`${res.msg}`, '');
          }
          if (res.status === -2) {
            OverTime(this, res.msg);
          }
        }).catch(error => console.error(error));
      });
    }
  },
  created() {
    console.log(this.jg_info);
    /* ********* 初始化默认设置 ********* */
    // 若是点击修改进来，则填充表单数据
    if (this.jg_info) {
      this.form = this.jg_info;
    }
  }
}
</script>

<style lang="scss">
.jg-create {
    .avatar-uploader {
        .el-upload {
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409EFF;
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }
        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }
    }
}
</style>
