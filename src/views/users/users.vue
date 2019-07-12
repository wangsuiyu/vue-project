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
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button type="success" plain @click="adddialogFormVisible = true">添加用户</el-button>
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
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="update(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="info" icon="el-icon-edit" @click="handleEdit(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
            <el-button type="primary" icon="el-icon-share" @click="handleGrant(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="handleDelete(scope.row.id)"></el-button>
          </el-tooltip>
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

    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogFormVisible"
      @close="$refs.userForm.resetFields()"
    >
      <el-form :model="addForm" :label-width="'120px'" :rules="rules" ref="addForm">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户 -->
    <el-dialog title="添加用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editForm" :label-width="'120px'" :rules="rules" ref="editForm">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="grantdialogFormVisible">
      <el-form :model="grantForm" :label-width="'120px'" style="width:400px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="grantForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-select v-model="grantForm.rid" placeholder="请选择" @change="select">
            <el-option
              v-for="item in roleslist"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grant">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入获得所有用户数据api
import {
  getuserdata,
  adduser,
  edituser,
  deluser,
  updateuserstatus,
  grantrole
} from "@/api/users";
import { getroles } from "@/api/roles";
export default {
  data() {
    return {
      //分配角色
      roleslist: [],
      grantForm: {
        id: "",
        rid: "",
        username: ""
      },
      grantdialogFormVisible: false,
      //编辑用户
      editForm: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      },
      editdialogFormVisible: false,
      //添加用户
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      adddialogFormVisible: false,
      //表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      //分页
      query: "",
      pagenum: 1, //页码数
      pagesize: 1, //页码显示的条数
      total: "", //总页数
      keyword: "", //绑定搜索框的数据
      value: "", //绑定状态栏的数据
      userlist: [] //绑定用户数据
    };
  },
  methods: {
    //搜索功能
    search(){
      this.init()
    },
    //分配角色
    grant() {
      if (this.grantForm.rid) {
        grantrole(this.grantForm.id, this.grantForm.rid)
          .then(res => {
            console.log(res);
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
            this.grantdialogFormVisible = false
            this.init()
          })
          .catch(() => {
            this.$message({
              message: "服务器错误，请重试",
              type: "error"
            });
          });
      } else {
        this.$message({
          message: "请选择一个角色",
          type: "error"
        });
      }
    },
    select(rid) {
      this.grantForm.rid = rid;
    },
    //更改状态
    update(id, type) {
      updateuserstatus(id, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          this.$message({
            message: "服务器错误，请重试",
            type: "error"
          });
        });
    },
    //编辑用户
    edit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          edituser(this.editForm)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  message: res.data.meta.msg,
                  type: "success"
                });
                this.init();
                this.editdialogFormVisible = false;
              }
            })
            .catch(err => {
              this.$message({
                message: res.data.meta.msg,
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "服务器错误，请重试",
            type: "error"
          });
          return false;
        }
      });
    },
    //添加用户
    add() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          adduser(this.addForm)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: "success"
                });
                this.init();
                this.adddialogFormVisible = false;
              }
            })
            .catch(err => {
              this.$message({
                message: res.data.meta.msg,
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "服务器错误，请重试",
            type: "error"
          });
          return false;
        }
      });
    },
    //获取用户数据
    init() {
      getuserdata({
        query: this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      })
        .then(res => {
          console.log(res);
          this.userlist = res.data.data.users;
          this.total = res.data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击编辑触发
    handleEdit(row) {
      this.editdialogFormVisible = true;
      this.editForm.username = row.username;
      this.editForm.id = row.id;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
    },
    //点击分配触发
    handleGrant(row) {
      this.grantdialogFormVisible = true;
      this.grantForm.id = row.id;
      this.grantForm.username = row.username;
      this.grantForm.rid = row.rid;
    },
    //点击删除触发,删除用户
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deluser(id)
            .then(res => {
              if (res.data.meta.status === 200) {
                this.$message({
                  type: "success",
                  message: res.data.meta.msg
                });
                this.init();
              }
            })
            .catch(err => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //切换每页显示的条数触发
    handleSizeChange(val) {
      this.pagesize = val;
      this.init();
    },
    //切换页码数触发
    handleCurrentChange(val) {
      this.pagenum = val;
      this.init();
    }
  },
  mounted() {
    this.init();
    //获取角色列表
    getroles().then(res => {
      this.roleslist = res.data.data;
    });
  }
};
</script>
<style lang="less" scoped>
</style>
