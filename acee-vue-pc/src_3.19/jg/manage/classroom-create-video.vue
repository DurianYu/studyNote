<template lang="html">
  <div class="classroom-create-video" style="height: -webkit-fill-available;">
    <el-card style="height: -webkit-fill-available">
      <el-row type="flex" justify="start" align="" style="height: -webkit-fill-available;">
        <el-col :span="14">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="名称" prop="name">
              <el-input v-model="form.name" placeholder="课堂的名称.."></el-input>
            </el-form-item>
            <el-form-item label="视频" prop="video">
              <el-input v-model="form.video" placeholder="课堂视频的地址.."></el-input>
            </el-form-item>
            <el-form-item label="栏目" prop="category">
              <el-select v-model="form.category" placeholder="请选择堂的栏目.." style="width: 100%">
                <el-option
                v-for="item in category_data"
                :key="item.value"
                :label="item.name"
                :value="item.val"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="介绍" prop="introduce">
              <el-input type="textarea" v-model="form.introduce" placeholder="课堂的介绍.."></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover_img">
              <el-upload
                class="avatar-uploader"
                action="/"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="imgChanged"
                >
                <img v-if="form.cover_img" :src="form.cover_img" class="avatar">
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
  name: 'classroom-create-video',
  data() {
    return {
      // 表单数据
      form: {
        name: '', // 课堂名字
        video: '', // 视频地址
        category: '', // 栏目
        introduce: '', // 介绍
        cover_img: '' // 封面地址
      },
      cover_file: '', // 封面文件
      rules: {
        name: [{
          required: true,
          message: '请输入课堂名称',
          trigger: 'blur'
        }],
        video: [{
          required: true,
          message: '请输入课堂的视频地址',
          trigger: 'blur'
        }, {
          type: 'url',
          message: '请填写正确的视频地址, 例如：http://www.xxx.com/xx.mp4',
          trigger: ['blur', 'change']
        }],
        category: [{
          required: true,
          message: '请选择栏目',
          trigger: 'blur'
        }],
        introduce: [{
          required: true,
          message: '请输入课堂的介绍',
          trigger: 'blur'
        }],
        cover_img: [{
          required: false
        }]
      },
      category_data: [{
        name: '阿萨德',
        val: 'asd'
      }, {
        name: '自行车',
        val: 'zxc'
      }], // 渲染用的栏目数据
    }
  },
  computed: {
    classroom_info: () => store.state.classroom_info,
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
        form_data.append('video', this.form.video);
        form_data.append('category', this.form.category);
        form_data.append('introduce', this.form.introduce);
        form_data.append('type', 'video');
        if (this.form.cover_img) form_data.append('cover_img', this.cover_file);
        if (this.classroom_info) form_data.append('edit', 1);
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
            if (this.classroom_info) {
              this.$emit('eiit-success', {
                classroom_id: res.id,
                name: this.form.name,
                video: this.form.video,
                category: this.form.category,
                introduce: this.form.introduce,
                type: 'video',
                cover_img: this.form.cover_img
              });
            } else {
              this.$router.push({
                name: 'mgrClassroom'
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
    console.log(this.classroom_info);
    /* ********* 初始化默认设置 ********* */
    // 若是点击修改进来，则填充表单数据
    if (this.classroom_info) {
      this.form = this.classroom_info;
    }
  }
}
</script>

<style lang="scss">
.classroom-create-video {
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
