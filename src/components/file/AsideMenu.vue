<template>
  <div class="side-menu-wrapper">
    <!-- 768px 下，以抽屉形式展示 -->
    <el-drawer
        :visible.sync="isDrawer"
        :with-header="false"
        size="50%"
        direction="ltr"
        v-if="screenWidth <= 768"
    >
      <!-- collapse 属性：控制菜单收缩展开 -->
      <el-menu
          class="side-menu"
          :default-active="activeIndex"
          :router="true"
          :collapse="isCollapse"
      >

        <div class="side-menu-top">
          <el-card shadow="never" :body-style="{
          padding: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center'}">
            <img class="logo" :src="logoUrl"/>
          </el-card>
        </div>

        <el-menu-item
            index="0"
            :route="{ name: 'File', query: { fileType: 0, filePath: '/' } }"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item
            index="1"
            :route="{ name: 'File', query: { fileType: 1 } }"
        >
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图片</span>
        </el-menu-item>
        <el-menu-item
            index="2"
            :route="{ name: 'File', query: { fileType: 2 } }"
        >
          <i class="el-icon-document"></i>
          <span slot="title">文档</span>
        </el-menu-item>
        <el-menu-item
            index="3"
            :route="{ name: 'File', query: { fileType: 3 } }"
        >
          <i class="el-icon-video-camera"></i>
          <span slot="title">视频</span>
        </el-menu-item>
        <el-menu-item
            index="4"
            :route="{ name: 'File', query: { fileType: 4 } }"
        >
          <i class="el-icon-headset"></i>
          <span slot="title">音乐</span>
        </el-menu-item>
        <el-menu-item
            index="5"
            :route="{ name: 'File', query: { fileType: 5 } }"
        >
          <i class="el-icon-takeaway-box"></i>
          <span slot="title">其他</span>
        </el-menu-item>
        <el-menu-item
            index="6"
            :route="{ name: 'File', query: { fileType: 6 } }"
            class="recovery"
        >
          <i class="el-icon-delete"></i>
          <span slot="title">回收站</span>
        </el-menu-item>
        <el-menu-item
            index="8"
            :route="{ name: 'File', query: { fileType: 8, filePath: '/' } }"
            class="my-share"
        >
          <i class="el-icon-share"></i>
          <span slot="title">我的分享</span>
        </el-menu-item>

        <!-- 存储信息显示 -->
        <div class="storage-wrapper">
          <el-progress
              :percentage="storagePercentage"
              :color="storageColor"
              :show-text="false"
              :width="32"
              stroke-linecap="square"
          ></el-progress>
          <div class="text">
            <span class="label">存储</span>
            <span
            >{{ $file.calculateFileSize(storageValue) }} /
						{{ $file.calculateFileSize(totalStorageValue) }}</span
            >
          </div>
        </div>

        <el-card
            :body-style="{ padding: '20px 20px', display: 'flex', 'align-items': 'center', 'justify-content': 'center'}"
            style="cursor:pointer"
            class="user-card"
            shadow="never">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <span class="username">{{ getUserInfo.username }}</span>

          <el-dropdown :hide-on-click="false" trigger="click" placement="top-start" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item divided command="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-card>

      </el-menu>
    </el-drawer>

    <!-- 768px 以上，平铺展示 -->
    <template v-else>
      <!-- collapse 属性：控制菜单收缩展开 -->
      <el-menu
          class="side-menu"
          :default-active="activeIndex"
          :router="true"
          :collapse="isCollapse"
      >
        <div class="side-menu-top">
          <el-card shadow="never" :body-style="{
          padding: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          'align-items': 'center',
          'justify-content': 'center'}">
            <img class="logo" :src="logoUrl"/>
          </el-card>
        </div>

        <el-menu-item
            index="0"
            :route="{ name: 'File', query: { fileType: 0, filePath: '/' } }"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-menu-item
            index="1"
            :route="{ name: 'File', query: { fileType: 1 } }"
        >
          <i class="el-icon-picture-outline"></i>
          <span slot="title">图片</span>
        </el-menu-item>
        <el-menu-item
            index="2"
            :route="{ name: 'File', query: { fileType: 2 } }"
        >
          <i class="el-icon-document"></i>
          <span slot="title">文档</span>
        </el-menu-item>
        <el-menu-item
            index="3"
            :route="{ name: 'File', query: { fileType: 3 } }"
        >
          <i class="el-icon-video-camera"></i>
          <span slot="title">视频</span>
        </el-menu-item>
        <el-menu-item
            index="4"
            :route="{ name: 'File', query: { fileType: 4 } }"
        >
          <i class="el-icon-headset"></i>
          <span slot="title">音乐</span>
        </el-menu-item>
        <el-menu-item
            index="5"
            :route="{ name: 'File', query: { fileType: 5 } }"
        >
          <i class="el-icon-takeaway-box"></i>
          <span slot="title">其他</span>
        </el-menu-item>
        <el-menu-item
            index="6"
            :route="{ name: 'File', query: { fileType: 6 } }"
            class="recovery"
        >
          <i class="el-icon-delete"></i>
          <span slot="title">回收站</span>
        </el-menu-item>
        <el-menu-item
            index="8"
            :route="{ name: 'File', query: { fileType: 8, filePath: '/' } }"
            class="my-share"
        >
          <i class="el-icon-share"></i>
          <span slot="title">我的分享</span>
        </el-menu-item>

        <!-- 存储信息显示 -->
        <div class="storage-wrapper">
          <el-progress
              :percentage="storagePercentage"
              :color="storageColor"
              :show-text="false"
              :width="32"
              stroke-linecap="square"
          ></el-progress>
          <div class="text">
            <span class="label">存储</span>
            <span
            >{{ $file.calculateFileSize(storageValue) }} /
						{{ $file.calculateFileSize(totalStorageValue) }}</span
            >
          </div>
        </div>

        <!-- 个人信息展示 -->
        <el-card
            :body-style="{ padding: '20px 20px', display: 'flex', 'align-items': 'center', 'justify-content': 'center'}"
            class="user-card"
            shadow="never">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span class="username">{{ getUserInfo().username }}</span>

          <el-dropdown :hide-on-click="false" trigger="click" placement="top-start" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="exitLogin">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </el-card>

      </el-menu>
    </template>

    <!-- 展开 & 收缩分类栏 -->
    <el-tooltip
        effect="dark"
        :content="isCollapse ? '展开' : '收起'"
        placement="right"
    >
      <div
          class="aside-title"
          @click="isCollapse ? (isCollapse = false) : (isCollapse = true)"
      >
        <i
            class="icon"
            :class="isCollapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left'"
            :title="isCollapse ? '展开' : '收起'"
        ></i>
      </div>
    </el-tooltip>
  </div>
</template>

<script>

export default {
  name: 'SideMenu',
  data() {
    return {
      logoUrl: require('_a/images/common/GZ-logo.png'),
      isDrawer: false, //  控制移动端菜单抽屉是否显示
      isCollapse: false, //  控制菜单收缩展开
      // 菜单 index 和名称 Map
      myFileMenuMap: {
        0: '全部',
        1: '图片',
        2: '文档',
        3: '视频',
        4: '音乐',
        5: '其他',
        6: '回收站',
        8: '我的分享'
      },
      //  自定义进度条颜色，不同占比，进度条颜色不同
      storageColor: [
        {color: '#67C23A', percentage: 50},
        {color: '#E6A23C', percentage: 80},
        {color: '#F56C6C', percentage: 100}
      ]
    }
  },
  computed: {

    // 当前激活菜单的 index
    activeIndex() {
      return String(this.$route.query.fileType) //  获取当前路由参数中包含的文件类型
    },
    // 存储容量
    storageValue() {
      return this.$store.state.sideMenu.storageValue
    },
    totalStorageValue() {
      return this.$store.state.sideMenu.totalStorageValue
    },
    // 存储百分比
    storagePercentage() {
      return this.totalStorageValue
          ? (this.storageValue / this.totalStorageValue) * 100
          : 0
    },
    // 屏幕宽度
    screenWidth() {
      return this.$store.state.common.screenWidth
    }
  },
  methods: {

    getUserInfo() {
      console.log(this.$store.getters.userInfo.username)
      return this.$store.getters.userInfo
    },

    handleUserInfoBtnClick() {
      console.log("test")
    },

    handleCommand(command) {
      if (command === 'exitLogin') {
        this.$message.success('退出登录成功！')
        this.$common.removeCookies(this.$config.tokenKeyName)
        this.$store.dispatch('getUserInfo').then(() => {
          this.$router.push({name: 'Home'})
        })
      }
      if (command === 'handleUserInfo') {
        this.$openDialog.showUserInfo()
      }
    }
  },
  watch: {
    isCollapse(newValue) {
      localStorage.setItem('aside_is_collapse', newValue)
      if (this.screenWidth <= 768 && newValue) {
        this.isDrawer = true
        this.isCollapse = false
      }
    }
  },
  created() {
    this.isCollapse = localStorage.getItem('aside_is_collapse') === 'true' //  读取保存的状态
  },
}
</script>

<style lang="stylus" scoped>
@import '~_a/styles/varibles.styl';
@import '~_a/styles/mixins.styl';

.el-drawer__body {
  .side-menu {
    width: 100% !important;
  }
}

.side-menu-wrapper {
  position: relative;
  height: 100vh;
  padding-right: 11px;

  // logo

  .side-menu-top {
    height: 96px;

    .el-card {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f5f5f6;
    }
  }

  .el-menu--collapse {
    width: 0;
  }


  .side-menu {
    // 高度设置为屏幕高度减去顶部导航栏的高度
    height: 100vh;
    overflow: auto;
    background: #f5f5f6 !important;
    // 调整滚动条样式
    setScrollbar(6px, transparent, #C0C4CC);

    display: flex;
    flex-direction: column;
    //justify-content: center;
    align-items: center;

    .el-menu-item{
      width: 90%
      border-radius: 10px;

      &:hover {
        opacity: 0.7;
        background: #e3e3e5;
        color: #25262b;
        border-radius: 10px;
        width: 90%
      }

      &.is-active {
        background: #e3e3e5;
        color: #25262b;
        border-radius: 10px;
        width: 90%
      }
    }

    .my-file, .recovery {
      box-shadow: 0 4px 12px 0 $BorderExtralight;
    }
  }

  >>> .el-menu {
    background: transparent;
  }

  // 对展开状态下的菜单设置宽度

  .side-menu:not(.el-menu--collapse) {
    width: 240px;
  }

  // 存储空间展示区

  .storage-wrapper {
    position: absolute;
    bottom: 85px;
    left: 0;
    box-shadow: 0 -2px 12px 0 $BorderExtralight;
    //border-right: solid 1px #e6e6e6;
    box-sizing: border-box;
    width: 100%
    height: 66px;
    padding: 16px;
    z-index: 2;
    color: $PrimaryText;

    .text {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      flex-wrap: wrap;
    }
  }


  // 用户信息展示区

  .user-card {
    background: #f5f5f6;
    border-top: 1px solid #EBEEF5 !important;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%
    height: auto;
    z-index: 2;
    color: $PrimaryText;

    .text {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      flex-wrap: wrap;
    }

    .username {
      flex-grow: 1;
      text-align: left;
      padding-left: 10%;
    }

    .el-dropdown{
      display: flex;
      border-radius: 5px;
      cursor:pointer;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      width:28px;
      height:28px;
    }

    .el-dropdown:hover{
      background-color:rgba(132, 133, 141,0.08);
    }
  }

  .el-card {
    border: none;
  }

  // 折叠图标调整样式
  .aside-title {
    position: absolute;
    top: calc(50% - 50px);
    right: 0;
    z-index: 2;
    background: $BorderBase;
    color: #fff;
    width: 12px;
    height: 100px;
    line-height: 100px;
    cursor: pointer;
    border-radius: 0 16px 16px 0;

    &:hover {
      opacity: 0.7;
    }

    .icon {
      font-size: 12px;
    }
  }
}
</style>
