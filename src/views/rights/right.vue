<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table ref="singleTable" :data="rightData" style="width: 100%">
      <el-table-column type="index" width="150px"></el-table-column>
      <el-table-column property="authName" label="权限列表" width="300px"></el-table-column>
      <el-table-column property="path" label="路径" width="300px"></el-table-column>
      <el-table-column property="level" label="层级">
        <template slot-scope="scope">
            {{scope.row.level | fillevel}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getlimit } from "@/api/roles";
export default {
  data() {
    return {
      rightData: []
    };
  },
  filters: {
    fillevel: level => {
      if (level === "0") {
        return (level = "一级");
      } else if (level === "1") {
        return (level = "二级");
      } else if (level === "2") {
        return (level = "三级");
      } else {
        return (level = "");
      }
    }
  },
  mounted() {
    getlimit("list").then(res => {
      console.log(res);
      this.rightData = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
</style>

