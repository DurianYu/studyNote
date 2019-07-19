<template>
  <div class="qr-code">
    <el-upload
      class="qr-code-upload"
      action=""
      :on-change="qrCodeReq"
      :auto-upload="false"
      list-type="picture-card"
      multiple>
      <div slot="trigger" class="qr-code__tip">
        <i class="el-icon-plus"></i>
        <span>请上传二维码图片</span>
      </div>
    </el-upload>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'qrCode',

  data() {
    return {
      fileList: []
    }
  },

  methods: {
    qrCodeReq(file, flielist) {
      if (file.status !== 'ready') {
        return;
      }

      let type = file.raw.type;
      if (type.indexOf('image/') < 0) {
        this.$confirm('请上传图片', '提示')
        flielist.pop();
      }

      for (let i = 0, len = flielist.length - 1; i < len; i++) {
        let name = flielist[i].name;
        let size = flielist[i].size;

        if (name == file.name && size == file.size) {
          this.$confirm('文件已上传', '提示')
          flielist.pop();
        }
      }
      this.fileList = flielist;
      // this.fileList.unshift({name: 'food.jpg', url: ''})
      // 文件上传
    }
  }
}
</script>

<style lang="scss">
  .qr-code {
    height: fill-available;
    padding-top: 20px;

    .qr-code-upload {
      position: relative;
      height: fill-available;
      background-color: #fff;
      padding: 20px;

      .el-upload-list--picture-card {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        flex-wrap: wrap-reverse;

        .el-upload-list__item:last-child {
          margin-left: 157px;
        }
      }

      .el-upload--picture-card {
        position: absolute;
        top: 20px;
        left: 20px;

        .qr-code__tip {
          height: 100%;
          font-size: 0.8rem;
          display: flex;
          line-height: 1.5rem;
          flex-direction: column;
          justify-content: center;
        }
      }      
    }
  }

  .middle-center {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
</style>