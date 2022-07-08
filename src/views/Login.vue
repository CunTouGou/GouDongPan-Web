<template>
  <div class="container" ref="container">
    <div class="forms-container">
      <div class="signin-signup">
        <!-- 登录表单 -->
        <el-form
            class="form-info sign-in-form"
            ref="loginForm"
            :model="loginForm"
            :rules="loginFormRules">
          <h2 class="title">登 录</h2>

          <el-form-item prop="telephone">
            <el-input
                class="login-register-input"
                prefix-icon="fas fa-phone-alt"
                v-model="loginForm.telephone"
                placeholder="Telephone"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                class="login-register-input"
                prefix-icon="fas fa-lock"
                v-model="loginForm.password"
                show-password
                placeholder="Password"
            ></el-input>
          </el-form-item>

          <button class="btn solid"
                  @click.prevent="loginSubmitForm('loginForm')">登 录
          </button>

        </el-form>

        <!--注册表单-->
        <el-form
            class="form-info sign-up-form"
            ref="registerForm"
            :rules="registerFormRules"
            :model="registerForm">
          <h2 class="title">注 册</h2>

          <el-form-item prop="username">
            <el-input
                class="login-register-input"
                prefix-icon="fas fa-user"
                v-model="registerForm.username"
                placeholder="Username"
            ></el-input>
          </el-form-item>

          <el-form-item prop="telephone">
            <el-input
                class="login-register-input"
                prefix-icon="fas fa-phone-alt"
                v-model="registerForm.telephone"
                placeholder="Telephone"
            ></el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
                class="login-register-input"
                prefix-icon="fas fa-lock"
                v-model="registerForm.password"
                show-password
                placeholder="Password"
            ></el-input>
          </el-form-item>

          <button class="btn solid"
                  @click.prevent="registerSubmitForm('registerForm')">注 册
          </button>

        </el-form>

      </div>
    </div>

    <!--页面修饰-->
    <div class="panels-container">
      <div class="panel left-panel">

        <button class="btn transparent toHome" @click="toHome">
          &#60; 前往首页
        </button>

        <div class="content">
          <h3>没有账号 ?</h3>
          <p>
            点击前往注册新账号
          </p>
          <button class="btn transparent" @click="signUpBtn">
            注册
          </button>
        </div>
        <img src="../assets/images/home/log.svg" class="image" alt=""/>
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>已有账号 ?</h3>
          <p>
            点击前往使用账号登录
          </p>
          <button class="btn transparent" @click="signInBtn">
            登录
          </button>
        </div>
        <img src="../assets/images/home/register.svg" class="image" alt=""/>
      </div>
    </div>
  </div>
</template>

<script>
import {login, register} from '@/request/user.js'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',

  data() {
    return {
      // 登录表单数据
      loginForm: {
        telephone: '',
        password: ''
      },
      // 注册表单数据
      registerForm: {
        username: '',
        telephone: '',
        password: ''
      },
      // 登录表单验证规则
      loginFormRules: {
        telephone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      // 注册表单校验规则
      registerFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '长度在 5 到 20 个字符',
            trigger: 'blur'
          }
        ],
        telephone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' }
        ]
      },
    }
  },
  computed: {
    url() {
      let _url = this.$route.query.Rurl //  获取路由前置守卫中 next 函数的参数，即登录后要去的页面
      return _url
          ? {path: _url}
          : {name: 'File', query: {fileType: 0, filePath: '/'}} //  若登录之前有页面，则登录后仍然进入该页面
    },
    // 屏幕宽度
    screenWidth() {
      return this.$store.state.common.screenWidth
    }
  },
  created() {
    // 用户若已登录，自动跳转到网盘页面
    if (this.$store.getters.isLogin) {
      let username = this.$store.getters.username
      this.$message({
        message: `${username} 您已登录！已跳转到网盘`,
        center: true,
        type: 'success'
      })
      this.$router.replace({name: 'File'})
    }
  },
  mounted() {
    if (this.screenWidth <= 768) {
      this.loginBtnDisabled = false
    }
  },
  methods: {
    signUpBtn() {
      this.$refs.container.classList.add("sign-up-mode")
    },
    signInBtn() {
      this.$refs.container.classList.remove("sign-up-mode")
    },
    toHome(){
      this.$router.replace({name: 'Home'})
    },
    // 登录按钮-点击事件
    loginSubmitForm(formName) {
      console.log(this.loginForm.telephone)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单各项校验通过
          this.handleUserLogin(formName)
        } else {
          this.$message.error('请完善信息！')
          return false
        }
      })
    },

    // 用户登录
    handleUserLogin(formName) {
      login(this.loginForm, true)
          .then((res) => {
            if (res.success) {
              this.$common.setCookies(this.$config.tokenKeyName, res.data.token) //  存储登录状态
              this.$message.success('登录成功！')
              this.$router.replace(this.url) //  跳转到前一个页面或者网盘主页
              this.$refs[formName].resetFields() //  清空表单
            } else {
              this.$message.error('手机号或密码错误！')
            }
          })
    },

    // 注册按钮-点击事件
    registerSubmitForm(formName) {

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 表单各项校验通过
          this.handleUserRegister(formName)
        } else {
          this.$message.error('请完善信息！')
          return false
        }
      })
    },

    // 用户注册
    handleUserRegister(formName){
      register(this.registerForm)
      .then((res) => {
        if (res.success){
          this.$notify({
            title: '成功',
            message: '注册成功！正在跳转到登录页面',
            type: 'success'
          })
          this.$refs[formName].resetFields()
          this.$refs.container.classList.remove("sign-up-mode")
        }else {
          this.$message.error(res.message) // 显示接口返回的错误信
        }
      })
    }
  }
}
</script>
<style lang="css" scoped>
@import "../assets/styles/font-awesome.css";
@import "../assets/styles/login.css";
</style>
