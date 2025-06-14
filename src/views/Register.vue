<template>
    <div id="login-panel">
        <div class="decoration1"></div>
        <div class="decoration2"></div>
        <div class="login-box">
            <div class="login-box-left">
                <img class="logo" src="@/assets/images/example-29.svg" />
            </div>
            <div class="login-box-right">
                <h3 class="LoginTitle">智慧医疗系统 注册</h3>
                <el-form :model="registerForm">
                    <el-form-item>
                    </el-form-item>
                    <el-form-item label="账号:">
                        <el-input prefix-icon="el-icon-user" type="text" v-model="registerForm.username"
                            placeholder="请输入账号">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" show-password
                            v-model="registerForm.password">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="身份:">
                        <el-checkbox-group v-model="registerForm.roles" @change="handleRoleChange">
                            <el-checkbox :value="'admin'">管理员</el-checkbox>
                            <el-checkbox :value="'doctor'">医生</el-checkbox>
                            <el-checkbox :value="'patient'">病患</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item>
                        <div class="LoginBtn">
                            <el-button class="btn1" type="primary" size="small" @click="register">注册</el-button>
                            <el-button class="btn2" size="small" @click="reset">重置</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-link type="primary" href="/#/login">已有账号,点击前往登录</el-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { doRegisterF } from "@/api/index"
import { ElMessage } from 'element-plus';  // 明确导入 ElMessage


const router = useRouter()


const registerForm = reactive({
    username: "",
    password: "",
    roles: ["admin"], // 默认选择管理员身份，使用数组
})

// 处理角色选择，实现单选功能
const handleRoleChange = (value) => {
    // 如果没有选择任何角色，则默认选择管理员
    if (value.length === 0) {
        registerForm.roles = ["admin"]
        return
    }

    // 如果选择了多个角色，只保留最后选择的那个
    if (value.length > 1) {
        registerForm.roles = [value[value.length - 1]]
    }
}

const reset = () => {
    registerForm.username = ""
    registerForm.password = ""
    registerForm.roles = ["admin"]
}

const register = () => {
    const rigisterUser = {
        username: registerForm.username,
        password: registerForm.password,
        role: registerForm.roles[0], // 只取第一个角色
    }
    doRegisterF(rigisterUser).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
            router.push("/login")
            ElMessage({
                message: res.data.msg,
                type: "success",
                duration: 1500,
            })
        } else {
            ElMessage({
                message: res.data.msg,
                type: "error",
                duration: 1500,
            })
        }
    })
}
</script>

<style scoped>
#login-panel {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.login-box {
    width: 800px;
    height: 500px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.12);
    position: relative;
    z-index: 1;
}

.login-box-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 70px 0;
}

.login-box-right {
    flex: 1;
    padding: 80px 56px;
    justify-content: center;
    display: flex;
    flex-direction: column;
}

.LoginTitle {
    margin-left: 32px;
    margin-bottom: 6px;
}

.el-input {
    width: 200px;
}

.btn1 {
    margin-right: 25px;
}

.logo {
    width: 380px;
    margin: 30px 4px 40px;
}

a {
    color: blueviolet;
}

.el-form-item {
    display: flex;
    align-items: center;
}

.yzm {
    margin: 4px 12px 0 0;
}

.yzminput {
    width: 165px;
}

.decoration1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 650px;
    height: 440px;
    z-index: 0;
    background-color: #a377f2;
    border-radius: 0 0 50% 0;
}

.decoration2 {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 420px;
    height: 420px;
    z-index: 0;
    background-color: #a377f2;
    border-radius: 0 50% 0 50%;
}

.el-link {
    margin-left: 27px;
}

.el-link--inner {
    font-size: 11px !important;
}

.LoginBtn {
    margin-left: 39px;
}
</style>
