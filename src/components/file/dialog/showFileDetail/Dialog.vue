<template>
  <!-- 查看文件详情对话框 -->
  <el-dialog
      class="file-info-dialog"
      custom-class="file-info-container"
      title="文件详情"
      :visible.sync="visible"
      :close-on-click-modal="false"
      width="340px"
  >

    <div class="img-container">
      <el-image
          style="width: 180px"
          :src="$file.setFileImg(fileInfo)"
          fit="contain"></el-image>
    </div>

    <div class="file-info-wrapper">
      <div class="group-wrapper">
        <div class="file-detail-title">
          详情信息
        </div>
        <div>
          <div class="detail-group">
            <div>
              <div class="group-name">
                {{ $file.getFileNameComplete(this.fileInfo) }}
              </div>
              <div class="group-doc">
                {{
                  this.fileInfo.isDir === 0
                      ? $file.calculateFileSize(this.fileInfo.fileSize)
                      : ''
                }}
              </div>
            </div>
          </div>
          <div class="detail-group">
            <div>
              <div class="group-name">
                文件位置
              </div>
              <div class="group-doc">
                {{ filePathFormat(this.fileInfo.filePath) }}
                <!--{{ this.fileInfo.filePath }}-->
              </div>
            </div>
          </div>
          <div class="detail-group">
            <div>
              <div class="group-name">
                创建时间
              </div>
              <div class="group-doc">
                {{ this.fileInfo.createTime }}
              </div>
            </div>
          </div>
          <div class="detail-group">
            <div>
              <div class="group-name">
                修改时间
              </div>
              <div class="group-doc">
                {{ this.fileInfo.uploadTime }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--<div slot="footer" class="dialog-footer">-->
    <!--	<el-button @click="handleDialogClose">关 闭</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
import router from '@/router/router.js'

export default {
  name: 'FileDetailInfoDialog',
  data() {
    return {
      visible: false //  对话框是否可见
    }
  },
  computed: {
    // 左侧菜单选中的文件类型
    fileType() {
      return router.currentRoute.query.fileType
          ? Number(router.currentRoute.query.fileType)
          : 0
    },
    // 路由名称
    routeName() {
      return router.currentRoute.name
    }
  },
  methods: {

    filePathFormat(path){
      return path === '/' ? '全部文件' : '全部文件' + path.replace('/','>')
    }

    /**
     * 路径点击事件
     * @param {object} fileInfo 文件信息
     */
    // handleClickFilePath(fileInfo) {
    // 	router.push({
    // 		query: { filePath: fileInfo.filePath, fileType: 0 }
    // 	})
    // 	this.handleDialogClose()
    // }
  }
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';

.img-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
}

.file-info-wrapper {

  .group-wrapper:last-child {
    margin-bottom: 0;
  }

  .group-wrapper {
    padding: 0;
    font-size: 14px;
    line-height: 1.5;
    color: rgb(37, 38, 43);
  }

  .file-detail-title {
    font-size: 14px;
    line-height: 1.5;
    font-weight: 500;
    margin-bottom: 8px;
  }

  .detail-group {
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;

    .group-name {
      word-break: break-word;
      font-size: 12px;
      line-height: 1.6;
      color: rgba(37, 38, 43, 0.36);
      margin-bottom: 2px;
    }

    .group-doc {
      font-size: 12px;
      line-height: 1.6;
      color: rgb(37, 38, 43);
      word-break: break-all
    }
  }
}
</style>
