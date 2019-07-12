<template>
  <div class="role">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="adddialogFormVisible=true">创建角色</el-button>
    <!-- 表格 -->
    <el-table :data="roleData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-row v-for="first in props.row.children" :key="first.id">
              <el-col :span="4">
                <el-tag
                  closable
                  type="success"
                  @close="delrolegrant(props.row,first.id)"
                >{{first.authName}}</el-tag>
              </el-col>
              <el-col :span="20">
                <el-row v-for="second in first.children" :key="second.id">
                  <el-col :span="5" v-if="second.children.length!==0">
                    <el-tag
                      closable
                      type="info"
                      @close="delrolegrant(props.row,second.id)"
                    >{{second.authName}}</el-tag>
                  </el-col>
                  <el-col :span="19">
                    <el-tag
                      closable
                      type="warning"
                      v-for="third in second.children"
                      :key="third.id"
                      style="margin:0 5px 5px 0"
                      @close="delrolegrant(props.row,third.id)"
                    >{{third.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" v-if="props.row.children.length===0">已经没有任何权限了，请授权</el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="info" icon="el-icon-edit" @click="editplay(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="授权" placement="top">
            <el-button type="primary" icon="el-icon-share" @click="showgrant(scope.row)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="adddialogFormVisible"
      @close="$refs.addRole.resetFields()"
    >
      <el-form :model="addRole" :label-width="'100px'" :rules="rules" ref="addRole">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addRole.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editRole" :label-width="'100px'" :rules="rules" ref="userForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editRole.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editRole.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 授权 -->
    <el-dialog title="角色授权" :visible.sync="grantdialogFormVisible">
      <div class="box">
        <el-tree
          :data="grantlist"
          show-checkbox
          node-key="id"
          ref="tree"
          :default-expand-all="true"
          :default-checked-keys="checkedAll"
          :props="defaultProps"
        ></el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="update">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getroles,
  addrole,
  delrole,
  editrole,
  delgrant,
  getlimit,
  updaterolegrant
} from "@/api/roles";
export default {
  data() {
    return {
      roleId:'',
      rids:'',
      grantlist: [],
      checkedAll: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      grantdialogFormVisible: false,
      editRole: {
        roleName: "",
        roleDesc: "",
        id: ""
      },
      editdialogFormVisible: false,
      id: "",
      addRole: {
        roleName: "",
        roleDesc: ""
      },
      adddialogFormVisible: false,
      roleData: [],
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    update(){
       var arr = [...this.$refs.tree.getCheckedKeys(),...this.$refs.tree.getHalfCheckedKeys()]
       var str = arr.join()
       updaterolegrant(this.roleId,str)
       .then(res=>{
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
          this.grantdialogFormVisible = false
          this.init()
        }
       })
    },
    showgrant(row) {
      this.grantdialogFormVisible = true;
      this.roleId = row.id
      getlimit("tree").then(res => {
        this.grantlist = res.data.data;
      });
      this.checkedAll.length = 0
      if (row.children.length !== 0) {
        row.children.forEach(first => {
           if(first.children.length !== 0){
              first.children.forEach(second=>{
                if(second.children.length!==0){
                   second.children.forEach(third=>{
                       this.checkedAll.push(third.id)
                   })
                }
              })
           }
        });
      }
    },
    delrolegrant(row, rightId) {
      delgrant(row.id, rightId).then(res => {
        if (res.data.meta.status === 200) {
          this.$message({
            message: res.data.meta.msg,
            type: "success"
          });
        }
        row.children = res.data.data;
      });
    },
    delgrantrole(row, rightId) {
      delgrant(row.id, rightId).then(res => {
        this.$message({
          message: res.data.meta.msg,
          type: "success"
        });
        row.children = res.data.data;
      });
    },
    edit() {
      editrole(this.editRole)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              message: res.data.meta.msg,
              type: "success"
            });
            this.editdialogFormVisible = false;
            this.init();
          } else {
            this.$message({
              message: res.data.meta.msg,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editplay(row) {
      this.editdialogFormVisible = true;
      this.editRole.roleName = row.roleName;
      this.editRole.roleDesc = row.roleDesc;
      this.editRole.id = row.id;
    },
    del(id) {
      this.id = id;
      this.$confirm(`此操作将永久删除id为${id}的数据, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delrole(id)
            .then(res => {
              if (res.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.init();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "服务器异常，请重试!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    add() {
      this.$refs.addRole.validate(valid => {
        if (valid) {
          addrole(this.addRole)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.$message({
                  message: res.data.meta.msg,
                  type: "success"
                });
                this.adddialogFormVisible = false;
                this.init();
                this.$refs.addRole.resetFields();
              } else {
                this.$message({
                  message: res.data.meta.msg,
                  type: "error"
                });
              }
            })
            .catch(err => {
              this.$message({
                message: "服务器异常，请重新输入",
                type: "error"
              });
            });
        } else {
          this.$message({
            message: "输入信息错误",
            type: "error"
          });
          return false;
        }
      });
    },
    init() {
      getroles()
        .then(res => {
          console.log(res);
          this.roleData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 500px;
  height: 300px;
  overflow: scroll;
}
</style>


