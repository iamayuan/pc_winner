<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 反馈管理</el-breadcrumb-item>
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

                <el-table-column prop="name" label="反馈人名字" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="用户电话">
                </el-table-column>
                <el-table-column prop="project_id" label="项目id">
                </el-table-column>
                <el-table-column prop="photo" label="图片">
                </el-table-column>
                <el-table-column prop="content" label="反馈内容">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
            <el-form ref="addForm" :model="addForm" label-width="85px" :rules="rules">
                <el-form-item label="微信联合id">
                    <el-input v-model="addForm.unionId"></el-input>
                </el-form-item>
                <el-form-item label="项目id" prop="project_id">
                    <el-input v-model="addForm.project_id"></el-input>
                </el-form-item>
                <el-form-item label="反馈;名字" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="内容" prop="content">
                    <el-input v-model="addForm.content"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <input class="uploadimg" type="file" @change="uploadImage" ref="file">
                </el-form-item>
                <el-form-item label="用户id">
                    <el-input v-model="addForm.user_id"></el-input>
                </el-form-item>

                
                

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd('addForm')">确 定</el-button>
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
    name: "feedback",
    data() {
        return {
            tableData: [],
            select_pid:'',
            addForm: {
                unionId: "",
                projectId: "",
                project_id: "",
                name: "",
                phone: "",
                content: "",
                photo: "",
                user_id: "",
                jsonString: []
            },
            projectId:'',
            addVisible: false,
            delVisible: false,
            length: 0, //
            currentPage: 1, //当前页
            pagesize: 10, //每页显示的个数
            id: "",
            rules: {
                name: [
                    { required: true, message: "请输入名字", trigger: "blur" }
                ],
                phone: [
                    { required: true, message: "请输入手机号", trigger: "blur" }
                ],
                content: [
                    { required: true, message: "请输入内容", trigger: "blur" }
                ],
                project_id: [
                    { required: true, message: "请输入项目id", trigger: "blur" }
                ]
            }
        };
    },
    created() {
        //this.getData(this.currentPage, this.pagesize);
    },

    methods: {
        async getData(page, size, projectId) {
            const res = await api.getFeedbackList({
                projectId: this.select_pid||projectId,
                token: getStore("token"), //	String	必填	密钥
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
        search(){
            this.getData(this.currentPage, this.pagesize,this.select_pid);
        },
        uploadImage(e) {
            let file = e.target.files[0];
            let type = file.type;
            let name = file.name;
            if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(name)) {
                Toast({
                    message: "上传图片格式错误",
                    position: "middle",
                    duration: 5000
                });
                return false;
            }
            this.addForm.photo = file;
        },
        add() {
            this.addVisible = true;
        },
        async saveAdd(formName) {
            let length = this.$refs.file.files.length;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    if (length == 0) {
                        this.saveAdd1();
                    } else {
                        let param = new FormData();
                        param.append("fileKey", this.addForm.photo);
                        param.append("token", getStore("token"));

                        let config = {
                            headers: {
                                "Content-Type": "multipart/form-data"
                            }
                        };
                        axios
                            .post("/api/wechat/base/upload", param, config)
                            .then(res => {
                                console.log(res);
                                this.addForm.photo =
                                    baseImgPath + res.data.data;
                                this.$message({
                                    type: "success",
                                    message: "图片新增成功！"
                                });
                            })
                            .then(res => {
                                this.saveAdd1();
                            });
                    }
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请输入必选项",
                        offset: 100
                    });
                    return false;
                }
            });
        },
        async saveAdd1() {
            const res = await api.addFeedbackList({
                unionId: this.addForm.unionId,
                projectId: this.addForm.project_id,
                jsonString: JSON.stringify([
                    {
                        phone: this.addForm.phone,
                        content: this.addForm.content,
                        project_id: this.addForm.project_id,
                        name: this.addForm.name,
                        photo: this.addForm.photo,
                        user_id: this.addForm.user_id
                    }
                ])
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.addVisible = false;
                this.$message.success("新增成功");
                this.getData(this.currentPage, this.pagesize,this.addForm.project_id);
            } else {
                this.$message({
                    type: "error",
                    message: res.data.msg
                });
            }
        },
        async delete(id) {
            const res = await api.deleteFeedback({
                token: getStore("token"),
                id: id
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.$message.success("删除成功");
                this.delVisible = false;
                this.getData(this.currentPage, this.pagesize,this.addForm.project_id);
            } else {
                this.$message({
                    type: "error",
                    message: res.data.msg
                });
            }
        },
        handleSizeChange: function(size) {
            this.pagesize = size;
            this.getData(this.currentPage, this.pagesize,this.addForm.project_id);
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.getData(this.currentPage, this.pagesize,this.addForm.project_id);
        },
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
