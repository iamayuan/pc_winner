<template>
    <div class="login-wrap">
        <div class="ms-title">后台管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item label="是否为系统管理员" label-width="130px">
                    <el-switch v-model="ruleForm.isSystemAdmin" style="margin-left:130px"></el-switch>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>

import { setStore } from "@/config/mUtils";
import api from "@/apis";
export default {
    data: function() {
        return {
            ruleForm: {
                username: "jyly",
                password: "123456",
                isSystemAdmin: false
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        async submitForm(formName){
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    const res =  await api.login({
                        username: this.ruleForm.username,
                        password: this.ruleForm.password,
                        isSystemAdmin: this.ruleForm.isSystemAdmin
                    });
                    if (res.data.code == "0") {
                        this.logining = false;
                        this.$message({
                            type: "success",
                            message: "登录成功"
                        });

                        setStore('token',res.data.data.token);
                        setStore('projectId',res.data.data.projectList[0].id);
                        setStore('ms_username',this.ruleForm.username);
                        this.$router.push({ path: "/" }); //如果请求成功就让他3秒跳转路由

                    } else {

                        this.logining = false;
                        this.$message({
                            type: "error",
                            message: res.data.msg
                        });
                    }
 
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请输入正确的用户名密码",
                        offset: 100
                    });
                    return false;
                }
            });
        }
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 160px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
}
</style>