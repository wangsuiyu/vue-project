<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <el-menu
          :unique-opened="true"
          :router="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <img src="../assets/logo.png" alt class="logo">
          <el-submenu :index="item.id+''" v-for="item in menuslist" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index='"/home/"+children.path' v-for="children in item.children" :key="children.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{children.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <h3 class="system-title">电商后台管理系统</h3>
          <div class="welcome">
            <span>你好：admin</span> &nbsp;&nbsp;
            <a href="javascript:;" @click="loginout">退出</a>
          </div>
        </el-header>
        <el-main><router-view></router-view></el-main>
      </el-container>
    </el-container>
    <el-button @click="chuanzhi">传值</el-button>
    <child ref="childRef" @ccccc="aa"></child>
  </div>
</template>

<script>
import {getmenus} from '@/api/users.js'
import child from "./child";
import eventBus from "../assets/js/eventBus";
export default {
  components: {child},
  data () {
    return {
       menuslist:[],
    }
  },
  methods: {
    loginout(){
      localStorage.removeItem('itcast_pro_token')
      this.$router.push({name: 'Login'})
    },
    aa(val) {
      console.log('这是从子组件传过来的:'+ val)
    },
    chuanzhi() {
      // this.$refs.childRef.dd({"dd": 1111});
      eventBus.$emit("name", '这是从首页传过去的')
    }
  },
  mounted () {
    getmenus()
    .then(res=>{
      console.log(res);
      this.menuslist = res.data.data
    })
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>

