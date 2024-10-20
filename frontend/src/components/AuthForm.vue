<script setup>
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  isLogin: {
    type: Boolean,
    default: true,
  },
});

const linkPath = computed(() => (isLogin.value ? "/register" : "/login"));

const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  captcha: "",
  inviteCode: "",
})

const rules = reactive({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
  ],
    password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
  confirmPassword:[
  { required: true, message: "请确认密码", trigger: "blur" },
 {
  validator:(rule, value, callback)=>{
        if(value!== form.password){
          callback(()=>{
            console.log("aaa")
          })
        }else{
          callback(()=>{
            console.log("aaa")
          })
        }
  },
  trigger: "blur"
 }
  ],
  captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" },
  ],
  inviteCode: [
    { required: true, message: "请输入邀请码", trigger: "blur" },
  ],
})

// 表单实例引用
const formRef = ref(null);

const submitForm = () => {
  if (!props.isLogin && form.password !== form.confirmPassword) {
    alert("两次输入的密码不一致");
    return;
  }

  // 处理登录或注册逻辑
  if (props.isLogin) {
    console.log("登录信息:", form);
    // 提交登录请求
  } else {
    console.log("注册信息:", form);
    // 提交注册请求
  }

  // 登录或注册成功后，跳转到其他页面
  // router.push('/');
};
const router = useRouter();

const handelLink = (isLogin) => {
  isLogin ? router.push("/register") : router.push("/login");
};


const goHome = () => {
  router.push("/");
};
</script>

<template>
  
  <div class="auth-form-container">
    <div class="auth-form">
      <h2>{{ isLogin ? "登录" : "注册" }}</h2>
          <!-- 使用 Element Plus 的表单 -->
          <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
            
            <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>

         <!-- 注册时才显示确认密码 -->
         <el-form-item v-if="!isLogin" label="确认密码" prop="confirmPassword">
          <el-input v-model="form.confirmPassword" type="password" placeholder="请确认密码" />
        </el-form-item>

        <el-form-item label="验证码" prop="captcha">
          <el-input v-model="form.captcha" placeholder="请输入验证码" />
        </el-form-item>

        <!-- 注册时才显示邀请码 -->
        <el-form-item v-if="!isLogin" label="邀请码" prop="inviteCode">
          <el-input v-model="form.inviteCode" placeholder="请输入邀请码" />
        </el-form-item>

         <!-- 提交按钮 -->
         <el-form-item>
          <el-button type="primary" @click="submitForm">{{ isLogin ? "登录" : "注册" }}</el-button>
        </el-form-item>
          </el-form>
    
      <div class="form-navigation">
        <!-- 左边的动态跳转 -->
        <div class="form-link" @click="handelLink(isLogin)">
          {{ isLogin ? "跳转注册" : "跳转登录" }}
        </div>
        <!-- 右边的跳转到首页 -->
        <div class="form-link" @click="goHome">首页</div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.auth-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .auth-form {
    width: 100%;
    max-width: 500px;
    /* 表单最大宽度 */
    min-width: 300px;
    /* 表单最小宽度 */
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .form-group {
      margin-bottom: 16px;

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
      }

      input {
        width: 100%;
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
    }

    button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    .form-navigation {
      display: flex;
      justify-content: space-between;
      /* 两边对齐 */
      padding: 10px;

      .form-link {
        cursor: pointer;
        color: #0056b3;
      }
    }
  }
}
</style>
