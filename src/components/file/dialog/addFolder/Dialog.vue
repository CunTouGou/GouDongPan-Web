<template>
  <!-- 新建文件夹对话框 -->
  <el-dialog
      title="新建文件夹"
      :visible.sync="visible"
      :close-on-click-modal="false"
      custom-class="addFolder-dialog"
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
        class="add-folder-form"
        :model="form"
        :rules="formRules"
        ref="addFolderForm"
    >
      <el-form-item prop="fileName">
        <el-input
            v-model="form.fileName"
            placeholder="请输入文件夹名称"
            @keydown.enter.native.prevent
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handleDialogClose">取 消</el-button>
      <el-button
          type="primary"
          :loading="sureBtnLoading"
          @click="handleDialogSure('addFolderForm')"
      >确 定
      </el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import {createFold} from '@/request/file.js'
import {fileImgMap} from '@/libs/map.js'

export default {
  name: 'AddFolderDialog',
  data() {
    const validateFileName = (rule, value, callback) => {
      const fileNameReg = new RegExp(`[\\\\/:*?"<>|]`)
      if (value && fileNameReg.test(value)) {
        callback(new Error(`文件夹名称不能包含下列任何字符：\\/:*?"<>|`))
      } else {
        callback()
      }
    }
    return {
      visible: false, //  对话框是否可见
      form: {
        fileName: ''
      },
      formRules: {
        fileName: [
          {required: true, message: '请输入文件夹名称', trigger: 'blur'},
          {validator: validateFileName, trigger: ['blur', 'change']}
        ]
      },
      sureBtnLoading: false
    }
  },
  watch: {

    /**
     * 监听对话框打开、关闭状态
     */
    visible(newValue) {
      if (newValue) {
        // 打开时绑定回车事件
        document.addEventListener('keyup', this.handleAddKeyupEnter)
      } else {
        // 关闭时移除回车事件
        document.removeEventListener('keyup', this.handleAddKeyupEnter)
      }
    }
  },
  methods: {

    getExtendImg() {
      return fileImgMap.get('dir')
    },

    /**
     * DOM 绑定回车事件
     * @description 回车触发新增文件夹事件
     * @param {event} event 事件
     */
    handleAddKeyupEnter(event) {
      if (event.key === 'Enter') {
        this.handleDialogSure('addFolderForm')
      }
    },
    /**
     * 取消按钮点击事件 & 对话框关闭的回调
     * @description 关闭对话框，重置表单
     */
    handleDialogClose() {
      this.$refs['addFolderForm'].resetFields()
      this.visible = false
      this.callback('cancel')
    },
    /**
     * 确定按钮点击事件
     * @description 校验表单，校验通过后调用新建文件夹接口
     * @param {string} formName 表单ref值
     */
    handleDialogSure(formName) {
      this.sureBtnLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createFold({
            fileName: this.form.fileName,
            filePath: this.filePath,
            isDir: 1
          })
              .then((res) => {
                this.sureBtnLoading = false
                if (res.success) {
                  this.$message.success('文件夹创建成功')
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

.add-folder-form {
  width: 100%;
  padding: 0;

  .el-form-item {
    width: 100%;
  }
}


</style>
