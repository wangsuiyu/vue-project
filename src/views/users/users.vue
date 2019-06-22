<template>
  <div class="users">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="keyword"
        class="input-with-select"
        style="width:300px;margin-right:15px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="userlist"
      highlight-current-row
      border
      style="width: 100%;margin-top:15px;margin-bottom:20px"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="用户名" width="120"></el-table-column>
      <el-table-column property="role_name" label="姓名" width="120"></el-table-column>
      <el-table-column property="mobile" label="号码" width="250"></el-table-column>
      <el-table-column property="email" label="邮箱" width="250"></el-table-column>
      <el-table-column label="状态" width="120">
        <template slot-scope="scope">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="info" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            type="primary"
            icon="el-icon-share"
            @click="handleShare(scope.$index, scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0"
    ></el-pagination>
  </div>
</template>

<script>
import { getuserdata } from "@/api/login";
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 5,
      total: "",
      keyword: "",
      value: "",
      userlist: []
    };
  },
  methods: {
    init() {
      getuserdata({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res);
          this.userlist = res.data.data.users
          this.total = res.data.data.total
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleShare(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  },
  mounted() {
      this.init()
  }
}
</script>
<style lang="less" scoped>
</style>
