<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="add">新增</el-button>
                <el-input v-model="select_pid" placeholder="项目id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="title" label="标题" width="120">
                </el-table-column>
                <el-table-column prop="project_id" label="项目id">
                </el-table-column>
                <el-table-column prop="parent_id" label="父菜单id">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="url" label="图片地址">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                </el-table-column>
                <el-table-column prop="description" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="85px" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="url">
                    <input class="uploadimg" type="file" @change="uploadImage($event)" ref="file"   multiple accept="image/*" >
                </el-form-item>

                <el-form-item label="父菜单id" prop="parent_id">
                    <el-input v-model="addForm.parent_id"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="addForm.state" placeholder="状态" style="width:100%">
                        <el-option label="不显示" value="0"></el-option>
                        <el-option label="显示" value="1"></el-option>
                    </el-select>

                </el-form-item>

                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择" style="width:100%">
                        <el-option key="wedding" label="婚庆" value="1"></el-option>
                        <el-option key="template" label="服务业" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目备注" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd('addForm')">确 定</el-button>
            </span>

        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="ModVisible" width="30%">
            <el-form ref="ModForm" :model="ModForm" label-width="85px" :rules="rulesm">

                <el-form-item label="标题" prop="title">
                    <el-input v-model="ModForm.title"></el-input>
                </el-form-item>
                <el-form-item label="图片" prop="url">
                    <input class="uploadimgm" type="file" @change="uploadImagem($event)" ref="file" multiple accept="image/*">
                </el-form-item>

                <el-form-item label="父菜单id" prop="parent_id">
                    <el-input v-model="ModForm.parent_id"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="ModForm.state" placeholder="状态" style="width:100%">
                        <el-option label="不显示" value="0"></el-option>
                        <el-option label="显示" value="1"></el-option>
                    </el-select>

                </el-form-item>

                <el-form-item label="项目类型" prop="type">
                    <el-select v-model="ModForm.type" placeholder="请选择" style="width:100%">
                        <el-option key="wedding" label="婚庆" value="1"></el-option>
                        <el-option key="template" label="服务业" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目备注" prop="description">
                    <el-input v-model="ModForm.description"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ModVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMod('ModForm')">确 定</el-button>
            </span>

        </el-dialog>
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { setStore, getStore } from "@/config/mUtils";
import { baseImgPath } from "@/config/env";
import api from "@/apis";
import axios from "axios";
export default {
  name: "menu",
  data() {
    return {
      tableData: [],
      select_pid: "",
      addForm: {
        projectId: "",
        type: "",
        title: "",
        url: "",
        parent_id: "",
        description: "",
        project_id: "",
        state: "",
        url: "",
        sequence: "",
        user_id: "",
        image: "",
        jsonString: []
      },
      addVisible: false,
      ModForm: {
        projectId: "",
        type: "",
        title: "",
        url: "",
        parent_id: "",
        description: "",
        project_id: "",
        state: "",
        sequence: "",
        user_id: "",
        image: "",
        jsonString: []
      },
      ModVisible: false,
      delVisible: false,
      rules: {
        parent_id: [
          { required: true, message: "请输入父级id", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }]
      },
      rulesm: {
        parent_id: [
          { required: true, message: "请输入父级id", trigger: "blur" }
        ],
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        type: [{ required: true, message: "请输入类型", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData(getStore("projectId"));
  },

  methods: {
    async getData(projectId) {
      const res = await api.getMenuList({
        projectId: projectId
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.tableData = res.data.data;
        for (let i in this.tableData) {
          if (this.tableData[i].type == 1) {
            this.tableData[i].type = "婚庆";
          }
          if (this.tableData[i].type == 2) {
            this.tableData[i].type = "服务业";
          }
        }
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    search() {
      let projectId = this.select_pid;
      this.getData(projectId);
    },
    uploadImage(e) {
      let files = e.target.files;
      let formData = new FormData();
      formData.append("token", getStore("token"));
      for (let i = 0; i < files.length; i++) {
        formData.append("fileKey", files[i]);
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("https://wechat.nbjuxuan.com/wechat/base/uploads", formData)
        .then(res => {
          console.log(res);
          var imgData = res.data.data;
          for (var i = 0; i < imgData.length; i++) {
            this.addForm.url += baseImgPath + imgData[i] + ",";
          }
          this.addForm.url.slice(0, this.addForm.url.length - 1);
          this.$message({
            type: "success",
            message: "图片上传成功！"
          });
        });
    },
    uploadImagem(e) {
      let files = e.target.files;
      let formData = new FormData();
      formData.append("token", getStore("token"));
      for (let i = 0; i < files.length; i++) {
        formData.append("fileKey", files[i]);
      }
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("https://wechat.nbjuxuan.com/wechat/base/uploads", formData)
        .then(res => {
          console.log(res);
          var imgData = res.data.data;
          for (var i = 0; i < imgData.length; i++) {
            this.ModForm.url += baseImgPath + imgData[i] + ",";
          }
          this.ModForm.url.slice(0, this.ModForm.url.length - 1);
          this.$message({
            type: "success",
            message: "图片上传成功！"
          });
        });
    },
    add() {
      this.addVisible = true;
      if (this.$refs['addForm']!==undefined) {
          this.$refs['addForm'].resetFields();
      }
    },

    async saveAdd() {
      const res = await api.addMenuList({
        token: getStore("token"),
        projectId: getStore("projectId"),
        jsonString: JSON.stringify([
          {
            type: this.addForm.type,
            title: this.addForm.title,
            url: this.addForm.url,
            parent_id: this.addForm.parent_id,
            description: this.addForm.description,
            project_id: getStore("projectId"),
            state: this.addForm.state == "" ? "0" : this.addForm.state,
            photo: this.addForm.photo,
            sequence: this.addForm.sequence == "" ? "0" : this.addForm.sequence,
            user_id: this.addForm.user_id
          }
        ])
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.addVisible = false;
        this.$message({
          type: "success",
          message: "菜单新增成功！"
        });
        this.getData(this.addForm.project_id);
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    async saveMod() {
      const res = await api.modMenuList({
        token: getStore("token"),
        jsonString: JSON.stringify([
          {
            type: this.ModForm.type,
            title: this.ModForm.title,
            url: this.ModForm.url,
            parent_id: this.ModForm.parent_id,
            description: this.ModForm.description,
            project_id: getStore("projectId"),
            state: this.ModForm.state == "" ? "0" : this.ModForm.state,
            photo: this.ModForm.url,
            sequence: this.ModForm.sequence == "" ? "0" : this.ModForm.sequence,
            user_id: this.ModForm.user_id
          }
        ])
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.ModVisible = false;
        this.$message({
          type: "success",
          message: "菜单编辑成功！"
        });
        this.getData(this.ModForm.project_id);
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    async delete(id) {
      const res = await api.deleMenuList({
        token: getStore("token"),
        menuId: id
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.$message.success("删除成功");
        this.delVisible = false;
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    handleEdit(index, row) {
      this.ModVisible = true;
    }, //
    handleDelete(index, row) {
      this.delVisible = true;
      this.id = row.id;
    }, // 确定删除
    deleteRow() {
      let id = this.id;
      this.delete(id);
    }
  }
};
</script>

<style scoped>
.upimg {
  width: 50px;
}
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
