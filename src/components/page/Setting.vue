<template>
  <div class="login-wrap">
    <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="login-container">
      <h3 class="title">修改密码</h3>
      <el-form-item prop="password">
        <el-input type="password" v-model="ruleForm.password" auto-complete="off" placeholder="原密码"></el-input>
      </el-form-item>
      <el-form-item prop="assword">
        <el-input type="text" v-model="ruleForm.newpassword" auto-complete="off" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')" :loading="logining">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script type="text/ecmascript-6">
import { updatePassword } from "@/api/getData";
import { setStore, getStore } from "@/config/mUtils";
export default {
    data() {
        return {
            logining: false, //定义loading默认为false
            ruleForm: {
                newpassword: "",
                password: ""
            },
            rules: {
                //rules前端验证
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                newpassword: [
                    { required: true, message: "请再次输入密码", trigger: "blur" }
                ]
                
            }
        };
    },
    methods: {
        async submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    this.logining = true;
                    const res = await updatePassword({
                        password: this.ruleForm.newpassword,
                        token:  getStore('token'),
                        oldPassword: this.ruleForm.password,
                        
                    });
                    if (res.code == "0") {
                        this.logining = false;
                        this.$message({
                            type: "success",
                            message: "修改成功"
                        });

                        this.$router.push({ path: "/login" }); //如果请求成功就让他3秒跳转路由

                    } else {
                        this.logining = false;
                        this.$message({
                            type: "error",
                            message: res.msg
                        });
                    }
                }

            });
        }
    }
};
</script>

<style  scoped>
.login-container {
    box-shadow: 0 0px 5px 0 rgba(0, 0, 0, 0.06);
    border-radius: 5px;
    margin: 180px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.remember {
    margin: 0px 0px 35px 0px;
}
</style>