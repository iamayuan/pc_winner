<template>
    <div class="userList">

        <!-- Form -->
        <el-button type="primary" icon="delete" class="handle-del mr10 mb10" @click="dialogFormVisible = true" v-if="isShow">新增用户</el-button>
        <el-button type="primary" icon="delete" class="handle-del mr10 mb10" @click="modFormVisible = true" mod>编辑用户</el-button>
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form :model="addForm" :rules="rules" ref="addForm">
                <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
                    <el-input v-model="addForm.userName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="addForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.bnankCardNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :label-width="formLabelWidth">
                    <el-input v-model="addForm.wechatNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="addForm.userType" placeholder="请选择类型" style="width:100%">
                        <el-option label="项目老板" value="1"></el-option>
                        <el-option label="项目管理员" value="2"></el-option>
                        <el-option label="企业客户" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="addForm.gender" placeholder="请选择性别" style="width:100%">
                        <el-option label="女" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="保密" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser('addForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="modFormVisible">
            <el-form :model="modForm" :rules="rulesm" ref="modForm">
                <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                    <el-input v-model="modForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="modForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="modForm.modress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="银行卡号" :label-width="formLabelWidth">
                    <el-input v-model="modForm.bnankCardNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth">
                    <el-input v-model="modForm.telephone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信号" :label-width="formLabelWidth">
                    <el-input v-model="modForm.wechatNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="modForm.userType" placeholder="请选择类型" style="width:100%">
                        <el-option label="项目老板" value="1"></el-option>
                        <el-option label="项目管理员" value="2"></el-option>
                        <el-option label="企业客户" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-select v-model="modForm.gender" placeholder="请选择性别" style="width:100%">
                        <el-option label="女" value="0"></el-option>
                        <el-option label="男" value="1"></el-option>
                        <el-option label="保密" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modUser('modForm')">确 定</el-button>
            </div>
        </el-dialog>
        <el-row :gutter="20">
            <el-col>
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/img.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div>姓名：{{userData.name}}</div>
                                    <div>性别：{{userData.gender}}</div>
                                    <div>地址：{{userData.address}}</div>
                                </div>
                            </div>
                        </el-card>

                    </el-col>
                </el-row>
            </el-col>

        </el-row>
    </div>
</template>

<script>
import { setStore, getStore } from "@/config/mUtils";
import api from "@/apis";
export default {
    data() {
        return {
            isShow:false,
            dialogFormVisible: false,
            modFormVisible:false,
            id:'',//用户id
            addForm: {
                userName: "",
                password: "",
                name: "",
                address: "",
                bnankCardNumber: "",
                telephone: "",
                wechatNumber: "",
                userType: "",
                gender: ""
            },
            modForm: {
                password: "",
                name: "",
                address: "",
                bnankCardNumber: "",
                telephone: "",
                wechatNumber: "",
                userType: "",
                gender: ""
            },
            rules: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            rulesm: {
                userName: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            },
            formLabelWidth: "120px",
            userData: {}
        };
    },
    created() {
        this.getData();
        if(getStore("isSystemAdmin")=='1'){
            this.isShow = true
        }else{
            this.isShow = false
        }
        

    },
    methods: {
        async addUser(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const res = await api.addUser({
                        token: getStore("token"), //String//	必填	密钥
                        userName: this.addForm.userName, //	String	必填	用户名
                        password: this.addForm.password, //	String	必填	密码
                        name: this.addForm.name, //	String	可选	姓名
                        address: this.addForm.address, //	String	可选	地址
                        bnankCardNumber: this.addForm.bnankCardNumber, //String	可选	银行卡号
                        telephone: this.addForm.telephone, //	String	可选	手机号
                        wechatNumber: this.addForm.wechatNumber, //	String	可选	微信号
                        userType: this.addForm.userType, //,	Integer	可选	类型 1 项目老板 2 项目管理员 3 企业客户 1-2允许登陆web管理后台，其他不允许
                        gender: this.addForm.gender //	Integer	可选	性别 0女 1男 2保密
                    });
                    console.log(res.data);
                    if (res.data.code == "0") {
                        console.log(res);
                        this.$message({
                            type: "success",
                            message: "新增用户成功！"
                        });
                        this.dialogFormVisible = false;
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请输入正确的用户名或者密码",
                        offset: 100
                    });
                    return false;
                }
            });
        },
        async modUser(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const res = await api.modUser({
                        id:this.id,
                        token: getStore("token"), //String//	必填	密钥
                        password: this.modForm.password, //	String	必填	密码
                        name: this.modForm.name, //	String	可选	姓名
                        address: this.modForm.address, //	String	可选	地址
                        bnankCardNumber: this.modForm.bnankCardNumber, //String	可选	银行卡号
                        telephone: this.modForm.telephone, //	String	可选	手机号
                        wechatNumber: this.modForm.wechatNumber, //	String	可选	微信号
                        userType: this.modForm.userType, //,	Integer	可选	类型 1 项目老板 2 项目管理员 3 企业客户 1-2允许登陆web管理后台，其他不允许
                        gender: this.modForm.gender //	Integer	可选	性别 0女 1男 2保密
                    });
                    if (res.data.code == "0") {
                        console.log(res);
                        this.$message({
                            type: "success",
                            message: "编辑用户成功！"
                        });
                        this.dialogFormVisible = false;
                    } else {
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请输入正确的用户名或者密码",
                        offset: 100
                    });
                    return false;
                }
            });
        },
        async getData() {
            const res = await api.getUser({
                token: getStore("token")
            });
            if (res.data.code == "0") {
                if (res.data.data.gender == "0") {
                    res.data.data.gender = "女";
                }
                if (res.data.data.gender == "1") {
                    res.data.data.gender = "男";
                }
                if (res.data.data.gender == "2") {
                    res.data.data.gender = "保密";
                }
                if (res.data.data.type == "1") {
                    res.data.data.type = "项目老板";
                }
                if (res.data.data.type == "2") {
                    res.data.data.type = "项目管理员";
                }
                if (res.data.data.type == "3") {
                    res.data.data.type = "企业客户";
                }
                this.userData = res.data.data;
                this.id=  res.data.data.id;
                this.modForm.name =  res.data.data.name;
                this.modForm.address = res.data.data.address ;
                this.modForm.bnankCardNumber = res.data.data.bank_card_number;
                this.modForm.telephone =res.data.data.phone ;
                this.modForm.wechatNumber = res.data.data.wechat_number;
                this.modForm.userType = res.data.data.type;
                this.modForm.gender = res.data.data.gender
            }else{
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
        }
    }
};
</script>
<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}
.mb10{
    margin-bottom: 10px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
</style>
