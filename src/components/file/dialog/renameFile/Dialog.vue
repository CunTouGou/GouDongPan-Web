<template>
  <!-- 重命名文件对话框 -->
  <el-dialog
      title="重命名文件"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="350px"
      @open="handleDialogOpen"
      @close="handleDialogClose"
  >
    <div class="img-container">
      <el-image
          style="width: 180px"
          :src="getFileImg()"
          fit="contain"></el-image>
    </div>

    <el-form
        class="rename-file-form"
        :model="form"
        :rules="formRules"
        ref="renameFileForm"
    >
      <el-form-item prop="fileName">
        <el-input
            ref="inputName"
            @focus="onInputFocus"
            v-model="form.fileName"
            placeholder="请输入文件名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClose">取 消</el-button>
      <el-button
          type="primary"
          :loading="sureBtnLoading"
          @click="handleDialogSure('renameFileForm')"
      >确 定
      </el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {renameFile} from '@/request/file.js'
import $file from "@/libs/globalFunction/file";

export default {
  name: 'RenameFileDialog',
  data() {
    return {
      visible: false, //  对话框是否可见
      form: {
        fileName: ''
      },
      formRules: {
        fileName: [
          {required: true, message: '请输入文件名称', trigger: 'blur'}
        ]
      },
      sureBtnLoading: false
    }
  },
  methods: {

    /**
     * 获取文件图片
     * @returns {*}
     */
    getFileImg() {
      return $file.setFileImg(this.fileInfo[0].fileDate)
    },

    onInputFocus(){
      this.$refs['inputName'].select();
    },
    /**
     * 重命名文件对话框 | 对话框打开的回调
     * @description 表单项回显原本的文件名
     */
    handleDialogOpen() {
      this.form.fileName = this.oldFileName
    },
    /**
     * 重命名文件对话框 | 对话框关闭的回调
     * @description 关闭对话框，重置表单
     */
    handleDialogClose() {
      this.$refs['renameFileForm'].resetFields()
      this.visible = false
      this.callback('cancel')
    },
    /**
     * 重命名文件对话框 | 确定按钮点击事件
     * @description 校验表单，校验通过后调用重命名文件接口
     * @param {string} formName 表单ref值
     */
    handleDialogSure(formName) {
      this.sureBtnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          renameFile({
            userFileId: this.userFileId,
            fileName: this.form.fileName
          })
              .then((res) => {
                this.sureBtnLoading = false
                if (res.success) {
                  this.$message.success('重命名成功')
                  this.$refs[formName].resetFields()
                  this.visible = false
                  this.callback('confirm')
                } else {
                  this.$message.error(res.message)
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
  }
}
</script>

<style lang="stylus" scoped>
.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
}

  .rename-file-form{
    height: 15px;
  }
</style>
