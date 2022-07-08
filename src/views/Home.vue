<template xmlns:h1="http://www.w3.org/1999/html">
  <div class="home">
    <div class="home-hero">
      <figure>
        <img class="home-imgLogo" :src="imgSrc" alt="">
      </figure>
      <h1 class="home-title">
        基于SpringBoot框架开发的分布式文件共享系统的设计与实现
      </h1>
      <el-button @click.prevent="toLogin" type="primary">开 始</el-button>
    </div>
    <div class="home-features">
      <div class="home-wrapper">
        <div class="home-container">
          <div class="features">
            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">🗂️ ️文件分类查看</h2>
                </div>
                <div class="text item details">
                  图片、视频、音乐、文档、其他，分类查看更便捷
                </div>
              </el-card>
            </section>

            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">🗑️ ️回收站</h2>
                </div>
                <div class="text item details">
                  文件删除自动存入回收站，支持在回收站中彻底删除、还原
                </div>
              </el-card>
            </section>

            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">📊️ 存储容量显示</h2>
                </div>
                <div class="text item details">
                  实时显示文件存储占用情况及总存储容量
                </div>
              </el-card>
            </section>

            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">✂️ 分片上传</h2>
                </div>
                <div class="text item details">
                  集成了vue-simiple-uplader，实现文件分片上传、提高上传速度
                </div>
              </el-card>
            </section>

            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">✈️ 文件分享</h2>
                </div>
                <div class="text item details">
                  支持文件分享，可设置分享文件的过期时间，自动生成提取码
                </div>
              </el-card>
            </section>

            <section class="feature">
              <el-card class="box-card" shadow="hover">
                <div class="clearfix">
                  <h2 class="feature-title">📄 文档预览</h2>
                </div>
                <div class="text item details">
                  集成了OnlyOffice，实现了Word、Excel、PPT的预览
                </div>
              </el-card>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      imgSrc: require('_a/images/common/GZ-logo-2.0.png')
    }
  },
  methods: {
    toLogin(){
      this.$router.replace({name: 'Login'})
    },
  }
}
</script>

<style lang="stylus" scoped>
.home-hero{
  text-align: center;
  padding: 0 1.5rem;
  margin: 4rem 0 4.25rem;

  .home-imgLogo{
    display: block;
    margin: 0 auto;
    width: auto;
    max-width: 100%;
    max-height: 280px;
  }

  .home-title{
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }

  .el-button{
    margin-top: 2rem;
    height:55px;
    display: inline-block;
    font-size: 1.2rem;
  }
}

.home-features{
  max-width: 980px;
  margin: 0 auto;

  .home-wrapper{
    border-top: 1px solid rgba(60,60,67,0.12);


    .home-container{
      margin: 0 auto;

      .features{
        display: flex;
        flex-wrap: wrap;
        //margin: -20px -24px;

        .feature{
          width: calc(100% / 3);
          flex-shrink: 0;
          padding: 20px 10px;

          .feature-title{
            margin: 0;
            border-bottom: 0;
            line-height: 1.4;
            padding-bottom: .3rem;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
