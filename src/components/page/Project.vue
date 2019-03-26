<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="add">新增</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="项目名称" width="120">
                </el-table-column>
                <el-table-column prop="type" label="项目类型">
                </el-table-column>
                <el-table-column prop="image" label="项目图片">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="length">
                </el-pagination>
            </div>
        </div>
        <!-- 新增弹出框 -->
        <el-dialog title="新增" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="85px">
                <el-form-item label="项目名称">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="项目管理id">
                    <el-input v-model="addForm.user"></el-input>
                </el-form-item>
                <el-form-item label="项目图片">
                    <input class="uploadimg" type="file" @change="uploadImage($event)" ref="file" multiple accept="image/*">
                </el-form-item>
                <el-form-item label="项目类型">
                    <el-select v-model="addForm.type" placeholder="请选择">
                        <el-option key="wedding" label="婚庆" value="1"></el-option>
                        <el-option key="template" label="服务业" value="2"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="modVisible" width="30%">
            <el-form ref="modForm" :model="modForm" label-width="85px">
                <el-form-item label="项目名称">
                    <el-input v-model="modForm.name"></el-input>
                </el-form-item>
                <el-form-item label="项目图片">
                    <input class="uploadimg" type="file" @change="uploadImage1($event)" ref="file" multiple accept="image/*" >
                </el-form-item>
                <el-form-item label="项目类型">
                    <el-select v-model="modForm.type" placeholder="请选择">
                        <el-option key="wedding" label="婚庆" value="1"></el-option>
                        <el-option key="template" label="服务业" value="2"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveMod">确 定</el-button>
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
  name: "project",
  data() {
    return {
      tableData: [],
      addForm: {
        name: "",
        user: "",
        image:"",
        type: ""
      },
      modForm: {
        name: "",
        type: "",
        image:"",
      },
      id: "", //项目ID
      Userid: "", //管理用户id
      addVisible: false,
      modVisible: false,
      length: 0, //
      currentPage: 1, //当前页
      pagesize: 10 //每页显示的个数
    };
  },
  created() {
    this.getData(this.currentPage, this.pagesize);
  },
  methods: {
    async getData(page, size) {
      const res = await api.getProjectList({
        token: getStore("token"),
        pageNumber: page, //	Integer	可选	页码
        pageSize: size //	Integer	可选	每页显示数量
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.tableData = res.data.data.list;
        for (let i in this.tableData) {
          if (this.tableData[i].type == 1) {
            this.tableData[i].type = "婚庆";
          }
          if (this.tableData[i].type == 2) {
            this.tableData[i].type = "服务业";
          }
        }
        this.length = res.data.data.totalRow;
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    async getDetail(id) {
      const res = await api.getProjectList({
        token: getStore("token"),
        id:id
      });
      if (res.data.code == "0") {
        this.Userid = res.data.data.list[0].id;
        this.modForm.name=res.data.data.list[0].name,
        this.modForm.type=res.data.data.list[0].type,
        this.modForm.image=res.data.data.list[0].image
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
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
            this.addForm.image += baseImgPath + imgData[i] + ",";
          }
          this.addForm.image.slice(0, this.addForm.image.length - 1);
          this.$message({
            type: "success",
            message: "图片上传成功！"
          });
        });
    },
    uploadImage1(e) {
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
            this.modForm.image += baseImgPath + imgData[i] + ",";
          }
          this.modForm.image.slice(0, this.modForm.image.length - 1);
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
      if (getStore("isSystemAdmin") == 1) {
        const res = await api.addProject({
          token: getStore("token"),
          name: this.addForm.name, //	String	必填	项目名称
          projectUserId: this.addForm.user, //	Integer	必填	绑定的项目管理用户
          image: this.addForm.image, //	String	可选	图片地址
          type: this.addForm.type //	Integer	可选	类型 1 婚庆 2 服务业 默认1
        });
        if (res.data.code == "0") {
          console.log(res.data);
          this.addVisible = false;
          this.$message({
            type: "success",
            message: "项目新增成功！"
          });
          this.getData(this.currentPage, this.pagesize);
        } else {
          this.$message({
            type: "error",
            message: res.data.msg
          });
        }
      } else {
        this.$message({
          type: "error",
          message: "您无权限添加新项目！"
        });
      }
    },
    async saveMod() {
      const res = await api.modProject({
        token: getStore("token"),
        name: this.modForm.name, //	String	必填	项目名称
        projectUserId: this.Userid, //	Integer	必填	绑定的项目管理用户
        image: this.modForm.image, //	String	可选	图片地址
        type: this.modForm.type, //	Integer	可选	类型 1 婚庆 2 服务业 默认1
        projectId: getStore("projectId")
      });
      if (res.data.code == "0") {
        console.log(res.data);
        this.modVisible = false;
        this.$message({
          type: "success",
          message: "项目修改成功！"
        });
        this.getData(this.currentPage, this.pagesize);
      } else {
        this.$message({
          type: "error",
          message: res.data.msg
        });
      }
    },
    handleSizeChange: function(size) {
      this.pagesize = size;
      this.getData(this.currentPage, this.pagesize);
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getData(this.currentPage, this.pagesize);
    },
    handleEdit(index, row) {
      console.log(index, row);
      
      this.modVisible = true;
      this.id = row.id;
      this.getDetail(row.id);
     
    }
  }
};
</script>

<style scoped>
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
