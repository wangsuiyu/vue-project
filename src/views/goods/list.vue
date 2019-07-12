<template>
  <div class="list">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="products.keyword"
        class="input-with-select"
        style="width:300px;margin-right:15px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="$router.push({name:'Add'})">添加商品</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      ref="singleTable"
      :data="productlist"
      highlight-current-row
      border
      style="width: 100%;margin-top:15px;margin-bottom:20px"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="goods_name" label="商品名称" width="600"></el-table-column>
      <el-table-column property="goods_price" label="商品价格" width="120"></el-table-column>
      <el-table-column property="goods_weight" label="商品重量" width="150"></el-table-column>
      <el-table-column property="add_time" label="创建时间" width="150"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button size="mini" icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="products.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="products.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total-0"
    ></el-pagination>
  </div>
</template>

<script>
import { getproduct } from "@/api/goods.js";
export default {
  data() {
    return {
      total:'',
      productlist: [],
      products: {
        keyword: "",
        pagenum: 1,
        pagesize: 10
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      this.products.pagesize = val;
      this.init();
    },
    handleCurrentChange(val) {
      this.products.pagenum = val;
      this.init();
    },
    init() {
      getproduct(this.products).then(res => {
       this.productlist = res.data.data.goods
       this.total = res.data.data.total
      });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
</style>

