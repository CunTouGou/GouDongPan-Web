<template>
  <!-- 分享对话框 -->
  <el-dialog
      title="分享文件"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="440px"
      custom-class="share-file-dialog"
      @close="handleDialogCancel"
  >
    <div class="img-container">
      <el-image
          style="width: 180px"
          :src="getFileImg()"
          fit="contain"></el-image>
    </div>

    <el-form
        hide-required-asterisk
        v-show="!shareIsSuccess"
        class="share-file-form"
        :model="form"
        ref="shareFileForm"
        :label-position="screenWidth <= 520 ? 'top' : 'left'"
        :rules="rules"
    >
      <el-form-item label="链接有效期至" prop="endTime" class="share-endTime-item">
        <el-select v-model="form.endTime" placeholder="请选择" class="share-endTime">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="shareType">
        <div class="share-type-label">分享形式</div>
        <el-dropdown
            placement="bottom"
            @command="getShareType"
            v-model="form.shareType"
            class="share-type-dropdown"
            trigger="click">
          <div class="share-type-wrapper">
            <div class="share-name">{{ shareName }}</div>
            <div class="share-doc">{{ shareDoc }}</div>
          </div>
          <el-dropdown-menu
              class="share-type-menu"
              slot="dropdown"
              style="min-width: 400px; left: 473px; top: 536px;">
            <el-dropdown-item command="0">
              <div>公开链接</div>
              <div>创建公开链接，不需要密码即可访问分享内容</div>
            </el-dropdown-item>
            <el-dropdown-item command="1">
              <div>私密链接</div>
              <div>创建链接和提取码，需要提取码才可访问分享内容</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <el-form
        v-if="shareIsSuccess"
        class="share-success-form"
        :model="shareData"
        ref="shareSuccessForm"
        label-suffix="："
        label-width="90px"
        :label-position="screenWidth <= 520 ? 'top' : 'top'"
    >
      <div class="success-tip">
        <i class="el-icon-success"></i>
        <span class="text">成功创建分享链接</span>
      </div>

      <div class="share-batch-label">
        分享链接
      </div>
      <div class="share-batch-wrapper">
        <div class="share-batch-url">
          {{ $file.getShareLink(shareData.shareBatchNum) }}
        </div>
      </div>
      <div class="share-code-wrapper" v-show="isShowCodeWrapper">
        <span>提取码</span>
        <span class="share-code-text" ref="shareCode" @click="$file.copyShareCode(shareData.extractionCode)">
          {{ shareData.extractionCode }}
        </span>
      </div>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
          v-if="shareIsSuccess"
          type="primary"
          @click="
					$file.copyShareLink(shareData.shareBatchNum, shareData.extractionCode)
				"
      >复制链接及提取码
      </el-button
      >
      <template v-else>
        <el-button @click="handleDialogCancel">取 消</el-button>
        <el-button
            type="primary"
            :loading="sureBtnLoading"
            @click="handleDialogSure('shareFileForm')"
        >确 定
        </el-button
        >
      </template>
    </div>
  </el-dialog>
</template>

<script>
import store from '@/store/index.js'
import {shareFile} from '@/request/file.js'
// import {fileImgMap} from "@/libs/map";
import dayjs from "dayjs";
import $file from "@/libs/globalFunction/file";

export default {
  name: 'ShareFileDialog',
  data() {
    return {
      shareName: '公开链接',
      shareDoc: '创建公开链接，不需要密码即可访问分享内容',

      visible: false, //  对话框是否可见
      // 分享文件对话框数据
      options: [{
        value: getEndTime(1),
        label: '1天内有效'
      }, {
        value: getEndTime(7),
        label: '7天内有效'
      }, {
        value: getEndTime(30),
        label: '30天内有效'
      }],
      form: {
        endTime: getEndTime(7),
        shareType: 0
      },
      rules: {
        endTime: [
          {required: true, message: '请选择链接有效期', trigger: 'blur'}
        ]
      },
      sureBtnLoading: false,

      isShowCodeWrapper: false,

      shareIsSuccess: false, //  分享是否成功
      // 分享成功的数据
      shareData: {
        shareBatchNum: '',
        extractionCode: ''
      },
    }

    // 获取过期时间
    function getEndTime(time) {
      let date = new Date();
      date = date.getTime() + 3600 * 1000 * 24 * time;
      return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  computed: {
    // 屏幕宽度
    screenWidth() {
      return store.state.common.screenWidth
    }
  },
  methods: {

    getShareType(command) {
      if (command === "0") {
        this.shareName = '公开链接';
        this.shareDoc = '创建公开链接，不需要密码即可访问分享内容';
        this.form.shareType = command
      } else {
        this.shareName = '私密链接';
        this.shareDoc = '创建链接和提取码，需要提取码才可访问分享内容';
        this.form.shareType = command
      }
    },

    /**
     * 获取文件图片
     * @returns {*}
     */
    getFileImg() {
      return $file.setFileImg(this.fileInfo[0].fileDate)
    },

    /**
     * 分享文件对话框 | 取消按钮点击事件
     * @description 关闭对话框，重置表单
     */
    handleDialogCancel() {
      this.$refs['shareFileForm'].resetFields()
      this.visible = false
      this.callback('cancel')
    },
    /**
     * 分享文件对话框 | 确定按钮点击事件
     * @description 校验表单，校验通过后调用分享文件接口
     * @param {string} formName 表单ref值
     */
    handleDialogSure(formName) {
      this.sureBtnLoading = true
      this.isShowCodeWrapper = this.form.shareType === "1"
      this.$refs[formName].validate((valid) => {
        if (valid) {
          shareFile({
            ...this.form,
            remarks: '',
            files: JSON.stringify(this.fileInfo)
          })
              .then((res) => {
                this.sureBtnLoading = false
                if (res.success) {
                  this.shareData = res.data
                  this.shareIsSuccess = true
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
@import '~_a/styles/varibles.styl';

.share-file-dialog {
  padding: 24px;
  word-break: break-word;
}

* {
  font-family: inherit;
  vertical-align: baseline;
}

.share-endTime{
  >>> .el-input{
    width: 60%;
  }

  >>> .el-input__inner{
    border-radius: 5px;
    height: 25px;
  }
}

.share-type-wrapper {
  color: rgba(37, 38, 43, 0.36);

  .share-name {
    font-size: 14px;
    color: rgb(37, 38, 43);
    margin-bottom: 2px;
  }

  .share-doc {
    color-scheme: light;
  }
}


.share-file-form {
  font-size: 14px;
  width: 100%;

  .share-endTime-item{
    display: flex;
    align-items: center;
    width: 100% !important;
  }

  >>> .share-type-label {
    font-weight: 500;
    height: 36px;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
  }
}

.share-type-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  height: 66px;
  background-color: rgba(132, 133, 141, 0.08);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  line-height: 1.5715;
}

.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
}

.success-tip {
  margin-bottom: 16px;
  text-align: center;
  color: $Success;

  .el-icon-success {
    margin-right: 8px;
    height: 20px;
    line-height: 20px;
  }
}

  .share-batch-label{
    font-size: 14px;
    line-height: 1.5;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(37,38,43);
    margin-top: 40px;
    margin-bottom: 8px;
    width: 100%;
    font-weight: 500;
  }
    .share-batch-wrapper{
      width: 100%;
      height: 44px;
      color: rgba(37,38,43,0.36);
      background-color: rgba(132,133,141,0.08);
      border-radius: 10px;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .share-batch-url{
        max-width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

      .share-code-wrapper{
        margin-top: 12px;
        background: rgba(132,133,141,0.08);
        padding: 12px;
        border-radius: 10px;
        color: rgba(37,38,43,0.36);
        width: 112px;

        .share-code-text{
          color: rgba(37,38,43,0.72);
          margin-left: 8px;
          cursor: pointer;
        }
      }
</style>
