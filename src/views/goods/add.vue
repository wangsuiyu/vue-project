<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品添加</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card class="box-card">
      <el-steps :active="activeName-1" finish-status="success">
        <el-step title="基本参数"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品描述"></el-step>
        <el-step title="商品参数"></el-step>
      </el-steps>
    </el-card>

    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="left">
    <el-tab-pane label="基本参数" name="1">
      
    </el-tab-pane>
    <el-tab-pane label="商品图片" name="2">商品图片</el-tab-pane>
    <el-tab-pane label="商品描述" name="3">商品描述</el-tab-pane>
    <el-tab-pane label="商品参数" name="4">商品参数</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
    data () {
        return {
            activeName:1
        }
    }
};
</script>

<style lang="less" scoped>
</style>

