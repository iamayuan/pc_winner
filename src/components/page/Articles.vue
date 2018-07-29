<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-tickets"></i> 文章管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="add">新增</el-button>
                <el-input v-model="select_pid" placeholder="项目id" class="handle-input mr10"></el-input>
                <el-input v-model="menuId" placeholder="菜单id" class="handle-input mr10"></el-input>
                <el-input v-model="unionId" placeholder="微信联合id" class="handle-input mr10"></el-input>
                <el-select v-model="homeDisplay" placeholder="是否首页显示">
                    <el-option label="不显示" value="0"></el-option>
                    <el-option label="显示" value="1"></el-option>
                </el-select>
                <el-select v-model="type" placeholder="请选择类型">
                    <el-option label="文章" value="1"></el-option>
                    <el-option label="画廊" value="2"></el-option>
                    <el-option label="简单内容" value="3"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>

                <el-table-column prop="tilte" label="标题" width="120">
                </el-table-column>
                <el-table-column prop="project_id" label="项目id">
                </el-table-column>
                <el-table-column prop="menu_id" label="菜单id">
                </el-table-column>
                <el-table-column prop="home_display" label="首页展示">
                </el-table-column>
                <el-table-column prop="type" label="类型">
                </el-table-column>
                <el-table-column prop="create_time" label="创建时间">
                </el-table-column>
                <el-table-column prop="update_time" label="更新时间">
                </el-table-column>
                <el-table-column prop="description" label="备注">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
                <el-form-item label="项目id" prop="projectId">
                    <el-input v-model="addForm.projectId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单id" prop="menuId">
                    <el-input v-model="addForm.menuId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="addForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容提要">
                    <el-input v-model="addForm.preContent" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="addForm.content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <input class="uploadimg" type="file" @change="uploadImage" ref="file">
                </el-form-item>
                <el-form-item label="缩略图">
                    <el-input v-model="addForm.photoThumbnail" auto-complete="off"></el-input>

                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="addForm.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="addForm.sequence" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="addForm.type" placeholder="请选择类型" style="width:100%">
                        <el-option label="文章" value="1"></el-option>
                        <el-option label="画廊" value="2"></el-option>
                        <el-option label="简介" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="首页显示" prop="homeDisplay">
                    <el-select v-model="addForm.homeDisplay" placeholder="请选择是否显示" style="width:100%">
                        <el-option label="不显示" value="0"></el-option>
                        <el-option label="显示" value="1"></el-option>
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
            <el-form ref="modForm" :model="modForm" label-width="85px" :rules="rules">
                <el-form-item label="文章id" prop="articleId">
                    <el-input v-model="modForm.articleId" auto-complete="off" disabled></el-input>
                </el-form-item>

                <el-form-item label="标题" prop="title">
                    <el-input v-model="modForm.title" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容提要">
                    <el-input v-model="modForm.preContent" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input v-model="modForm.content" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片地址">
                    <input class="uploadimg" type="file" @change="uploadImage" ref="file">
                </el-form-item>
                <el-form-item label="缩略图">
                    <el-input v-model="modForm.photoThumbnail" auto-complete="off"></el-input>

                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="modForm.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="modForm.sequence" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="首页显示" prop="homeDisplay">
                    <el-select v-model="modForm.homeDisplay" placeholder="请选择类型" style="width:100%">
                        <el-option label="不显示" value="0"></el-option>
                        <el-option label="显示" value="1"></el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modVisible = false">取 消</el-button>
                <el-button type="primary" @click="savemod">确 定</el-button>
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
import api from "@/apis";
import { baseImgPath } from "@/config/env";
import axios from "axios";
export default {
    name: "project",
    data() {
        return {
            tableData: [],
            select_pid: "",
            homeDisplay: "",
            menuId: "",
            type: "",
            unionId: "",
            addForm: {
                projectId: "",
                menuId: "",
                homeDisplay: "", //Integer	必填	是否首页显示 0 不显示 1 显示 默认0
                type: "", //	Integer	必填	类型 1 文章 2 画廊 3 简单内容（如简介）
                title: "", //String	必填	标题
                preContent: "", //String	可选	内容提要
                content: "", //String	可选	内容
                photo: "", //	String	可选	图片地址
                photoThumbnail: "", //	String	可选	展示图片缩略图（如首页）
                description: "", //String	可选	描述
                sequence: "", //
                image: ""
            },
            modForm: {
                articleId: "",
                homeDisplay: "", //Integer	必填	是否首页显示 0 不显示 1 显示 默认0
                title: "", //String	必填	标题
                preContent: "", //String	可选	内容提要
                content: "", //String	可选	内容
                photo: "", //	String	可选	图片地址
                photoThumbnail: "", //	String	可选	展示图片缩略图（如首页）
                description: "", //String	可选	描述
                sequence: "", //
                image: ""
            },
            id: "",
            addVisible: false,
            modVisible: false,
            delVisible: false,
            rules: {
                projectId: [
                    { required: true, message: "请输入项目id", trigger: "blur" }
                ],
                menuId: [
                    {
                        required: true,
                        message: "请输入所属菜单id",
                        trigger: "blur"
                    }
                ],
                homeDisplay: [
                    {
                        required: true,
                        message: "请输入首页显示",
                        trigger: "blur"
                    }
                ],
                type: [
                    { required: true, message: "请输入内容", trigger: "blur" }
                ],
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" }
                ]
            },
            rulesm: {
                homeDisplay: [
                    {
                        required: true,
                        message: "请输入首页显示",
                        trigger: "blur"
                    }
                ],
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" }
                ]
            },
            length: 0, //
            currentPage: 1, //当前页
            pagesize: 10 //每页显示的个数
        };
    },
    created() {
        //this.getData(this.currentPage, this.pagesize);
    },

    methods: {
        async getData(page, size) {
            const res = await api.getArticleList({
                projectId: this.select_pid,
                token: getStore("token"), //	String	必填	密钥
                pageNumber: page, //	Integer	可选	页码
                pageSize: size, //	Integer	可选	每页显示数量
                unionId: this.unionId, //	微信联合id
                menuId: this.menuId, //所属菜单id
                homeDisplay: this.homeDisplay, //	Integer	可选	是否首页显示 0 不显示 1 显示 默认0
                type: this.type //类型 1 文章 2 画廊 3 简单内容（如简介）
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.tableData = res.data.data.list;
                for (let i in this.tableData) {
                    if (this.tableData[i].type == 1) {
                        this.tableData[i].type = "文章";
                    }
                    if (this.tableData[i].type == 2) {
                        this.tableData[i].type = "画廊";
                    }
                    if (this.tableData[i].type == 3) {
                        this.tableData[i].type = "简单内容";
                    }
                    if (this.tableData[i].home_display == 0) {
                        this.tableData[i].home_display = "不显示";
                    }
                    if (this.tableData[i].home_display == 1) {
                        this.tableData[i].home_display = "显示";
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
        search() {
            this.getData(this.currentPage, this.pagesize);
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
            this.addForm.image = file;
        },
        uploadImagem(e) {
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
            this.modForm.image = file;
        },
        add() {
            this.addVisible = true;
        },
        mod() {
            this.modVisible = true;
        },
        async savemod() {
            let length = this.$refs.file.files.length;
            console.log(length);
            if (length == 0) {
                this.savemod1();
            } else {
                let param = new FormData();
                param.append("fileKey", this.modForm.image);
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
                        this.modForm.photo = baseImgPath + res.data.data;
                        this.$message({
                            type: "success",
                            message: "图片新增成功！"
                        });
                    })
                    .then(res => {
                        this.savemod1();
                    });
            }
        },
        async savemod1() {
            const res = await api.modArticle({
                token: getStore("token"), //	String	必选	密钥
                homeDisplay: this.modForm.homeDisplay, //Integer	必填	是否首页显示 0 不显示 1 显示 默认0
                articleId: this.modForm.articleId, //	Integer	必填	类型 1 文章 2 画廊 3 简单内容（如简介）
                title: this.modForm.title, //String	必填	标题
                preContent: this.modForm.preContent, //String	可选	内容提要
                content: this.modForm.content, //String	可选	内容
                photo: this.modForm.photo, //	String	可选	图片地址
                photoThumbnail: this.modForm.photoThumbnail, //	String	可选	展示图片缩略图（如首页）
                description: this.modForm.description, //String	可选	描述

                sequence:
                    this.modForm.sequence == "" ? "0" : this.modForm.sequence
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.modVisible = false;
                this.$message({
                    type: "success",
                    message: "文章编辑成功！"
                });
                this.getData(this.currentPage, this.pagesize);
            } else {
                this.$message({
                    type: "error",
                    message: res.data.msg
                });
            }
        },
        async saveAdd() {
            let length = this.$refs.file.files.length;
            console.log(length);
            if (length == 0) {
                this.saveAdd1();
            } else {
                let param = new FormData();
                param.append("fileKey", this.addForm.image);
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
                        this.addForm.photo = baseImgPath + res.data.data;
                        this.$message({
                            type: "success",
                            message: "图片新增成功！"
                        });
                    })
                    .then(res => {
                        this.saveAdd1();
                    });
            }
        },
        async saveAdd1() {
            const res = await api.addArticle({
                token: getStore("token"), //	String	必选	密钥
                projectId: this.addForm.projectId,
                menuId: this.addForm.menuId,
                homeDisplay: this.addForm.homeDisplay, //Integer	必填	是否首页显示 0 不显示 1 显示 默认0
                type: this.addForm.type, //	Integer	必填	类型 1 文章 2 画廊 3 简单内容（如简介）
                title: this.addForm.title, //String	必填	标题
                preContent: this.addForm.preContent, //String	可选	内容提要
                content: this.addForm.content, //String	可选	内容
                photo: this.addForm.photo, //	String	可选	图片地址
                photoThumbnail: this.addForm.photoThumbnail, //	String	可选	展示图片缩略图（如首页）
                description: this.addForm.description, //String	可选	描述
                sequence:
                    this.addForm.sequence == "" ? "0" : this.addForm.sequence
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.addVisible = false;
                this.$message({
                    type: "success",
                    message: "文章新增成功！"
                });
                this.getData(this.currentPage, this.pagesize);
            } else {
                this.$message({
                    type: "error",
                    message: res.data.msg
                });
            }
        },
        async delete(id) {
            const res = await api.delArticle({
                token: getStore("token"), //	String	必选	密钥
                projectId: "1",
                articleId: id
            });
            if (res.data.code == "0") {
                console.log(res.data);
                this.delVisible = false;
                this.$message({
                    type: "success",
                    message: "文章删除成功！"
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
            this.modVisible = true;
            this.modForm.articleId = row.id;
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
