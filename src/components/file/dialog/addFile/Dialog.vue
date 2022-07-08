<template>
  <!-- 新建文件对话框 -->
  <el-dialog
      :title=titleName
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="350px"
      @close="handleDialogClose"
  >
    <div class="img-container">
      <el-image
          style="width: 180px"
          :src="getExtendImg()"
          fit="contain"></el-image>

    </div>
    <el-form
        class="add-file-form"
        :model="form"
        :rules="formRules"
        ref="addFileForm"
        label-width="100px"
        label-position="top"
    >
      <el-form-item prop="fileName">
      <el-input
          v-model="form.fileName"
          placeholder="请输入文件名称"
          autosize
          @keydown.enter.native.prevent
      ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClose">取 消</el-button>
      <el-button
          type="primary"
          :loading="sureBtnLoading"
          @click="handleDialogSure('addFileForm')"
      >确 定
      </el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {createOfficeFile} from '@/request/onlyoffice.js'
import { fileImgMap } from '@/libs/map.js'

export default {
  name: 'AddFileDialog',
  data() {
    return {
      visible: false, //  对话框是否可见
      form: {
        fileName: ''
      },
      formRules: {
        fileName: [
          {required: true, message: '请输入文件名称', trigger: 'change'}
        ]
      },
      sureBtnLoading: false,
    }
  },
  methods: {

    getExtendImg() {
      return fileImgMap.get(this.extendName)
    },

    /**
     * 新建文件对话框 | 对话框关闭的回调
     * @description 关闭对话框，重置表单
     */
    handleDialogClose() {
      this.$refs['addFileForm'].resetFields()
      this.visible = false
      this.callback('cancel')
    },
    /**
     * 新建文件对话框 | 确定按钮点击事件
     * @description 校验表单，校验通过后调用新建文件接口
     * @param {string} formName 表单ref值
     */
    handleDialogSure(formName) {
      this.sureBtnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createOfficeFile({
            extendName: this.extendName,
            filePath: this.filePath,
            fileName: this.form.fileName
          })
              .then((res) => {
                this.sureBtnLoading = false
                if (res.success && res.code === 0) {
                  this.$message.success('文件创建成功')
                  this.$refs[formName].resetFields()
                  this.visible = false
                  this.callback('confirm')
                } else {
                  this.$message.warning(res.message)
                }
              })
              .catch(() => {
                this.sureBtnLoading = false
              })
        } else {
          this.sureBtnLoading = false
          return false
        }
      })
    }
  },
}
</script>

<style lang="stylus" scoped>


>>> .addFolder-dialog {
  height: 340px;
}


.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
}

.add-file-form {
  width: 100%;
  padding: 0;

  .el-form-item {
    width: 100%;
  }
}


</style>
