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
                <el-input v-model="select_pid" placeholder="项目id" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="name" label="反馈人名字" width="120">
                </el-table-column>
                <el-table-column prop="phone" label="用户电话">
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
            projectId:'',
            addVisible: false,
            delVisible: false,
            length: 0, //
            currentPage: 1, //当前页
            pagesize: 10, //每页显示的个数
            id: ""

        };
    },
    created() {
        this.getData(this.currentPage, this.pagesize);
    },

    methods: {
        async getData(page, size) {
            const res = await api.getFeedbackList({
                projectId: this.select_pid||getStore("projectId"),
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
                if(res.data.msg=='登录失败！'){
                    this.$message({
                        type: "error",
                        message: res.data.msg
                    });
                    setTimeout(function () {
						this.$router.push({ path: "/login" });
					}, 2000);
                }else{
                    this.$message({
                        type: "error",
                        message: res.data.msg
                    });
                }
                
            }
        },
        search(){
            this.getData(this.currentPage, this.pagesize);
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
