<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            prefix-icon="el-icon-user-solid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入账号" prefix-icon="el-icon-view"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" class="login-btn">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//引入登录api
import { userlogin } from "../api/users";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          //表单校验成功后，调用登录
          userlogin(this.loginForm)
            .then(res => {
              if (res.data.meta.status === 400) {
                this.$message({
                  message: res.data.meta.msg,
                  type: "error"
                })
              } else {
                this.$message({
                  message: "登录成功！bingo",
                  type: "success"
                })
                //获取服务器发送过来的token值，并存储到本地
                localStorage.setItem('itcast_pro_token',res.data.data.token)
                //登录成功进行路由跳转
                this.$router.push({ name: "Home" })
              }
            })
            .catch(err => {
              this.$message({
                message: "服务器错误，请重试",
                type: "error"
              })
            })
        } else {
          this.$message({
            message: "输入信息错误",
            type: "error"
          })
          return false
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>

