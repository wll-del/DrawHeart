<template>
  <div id="app">
     <!-- 背景图：全屏覆盖 -->
     <img :src="require('@/assets/login_back.jpg')" class="back-jpg" > 
     <!-- 核心容器：居中显示 -->
     <div class="container"> 
       <div class="auth-tabs">
         <div class="tab" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">登录</div>
         <div class="tab" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">注册</div>
       </div>
 
       <div v-if="activeTab === 'register'">
         <div class="form-container">
           <div class="input-group">
             <label>用户名</label>
             <div class="input-field">
               <input type="text" v-model="username"  placeholder="请输入用户名"/>
             </div>
           </div>
             
           <div class="input-group">
             <label>邮箱</label>
             <div class="input-field">
               <input v-model="email" type="email" placeholder="请输入邮箱">
             </div>
           </div>
         
           <div class="input-group">
             <label>密码</label>
             <div class="input-field">
               <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码">
               <button class="password-toggle" @click="showPassword = !showPassword">
                 <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
               </button>
             </div>
           </div>
         
           <div class="input-group">
             <label>确认密码</label>
             <div class="input-field">
               <input v-model="coassword" :type="showConfirmPassword ? 'text' : 'password'" placeholder="请再次输入密码">
               <button class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                 <i :class="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
               </button>
             </div>
           </div>
         
           <div class="input-group">
             <label>MBTI</label>
             <div class="input-field">
               <input v-model="mbti" type="text" placeholder="请输入mbti">
             </div>
           </div>
 
           <div class="input-group">
             <label>星座</label>
             <div class="input-field">
               <input v-model="constellation" type="text" placeholder="请输入星座">
             </div>
           </div>
 
           <div class="input-group">
             <label>生日</label>
             <div class="input-field">
               <input v-model="Birthday" type="date" placeholder="请输入生日">
             </div>
           </div>
 
           <button class="register-btn" @click="user_register">注册</button>
         
             <p class="terms">注册即表示您同意我们的<a href="#">服务条款</a>和<a href="#">隐私政策</a></p>
           </div>
       </div>
       <div v-else>
             <div class="form-container">
                 <div class="input-group">
                 <label>用户名</label>
                 <div class="input-field">
                     <input v-model="username" type="text" placeholder="请输入用户名">
                 </div>
                 </div>
     
                 <div class="input-group">
                 <label>密码</label>
                 <div class="input-field">
                     <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码">
                     <button class="password-toggle" @click="showPassword = !showPassword">
                         <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                     </button>
                 </div>
                 </div>
                 <button class="register-btn" @click="user_login">登陆</button>
         
                 <p class="terms"><a href="#">忘记密码</a></p>
             </div>
       </div>
     </div>
   </div>
 </template>
 
 <script>
 import { login } from "@/api/user"
 import { register  } from "@/api/user";
 export default{
   data(){
     return{
       username: '',
       email: '',
       password: '',
       coassword: '',
       showPassword: false,
       showConfirmPassword: false,
       mbti: '',
       constellation: '',
       Birthday: '',
       activeTab: 'login'
     }
   },
   methods: {
     async user_register(){
       if(this.password !== this.coassword){
         alert('两次输入的密码不一致');
         return;
       } 
       const data = {
         "username": this.username,
         "email": this.email,
         "password": this.password,
         "mbti": this.mbti,
         "constellation": this.constellation,
         "Birthday": this.Birthday
       }
       const res = await register(data)
       console.log(res.message)
       //alert('注册成功');
       this.$router.push('/login')
     },
     async user_login(){
       const form = new FormData();
       form.append("username", this.username);
       form.append("password", this.password);
       const res = await login(form)
       console.log(res.access_token)
       //alert('登陆成功');
       this.$emit('login');
     }
   }
 }
 </script>
 
 <style scoped>
     * {
       margin: 0;
       padding: 0;
       box-sizing: border-box;
       font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
     }
 
     /* 关键1：让 #app 占满全屏，并启用 flex 布局支撑居中 */
     #app {
       width: 100vw; /* 占满屏幕宽度 */
       height: 100vh; /* 占满屏幕高度 */
       display: flex; /* 启用 flex 布局 */
       justify-content: center; /* 水平居中 */
       align-items: center; /* 垂直居中 */
       position: relative; /* 让背景图和容器有定位基准 */
       padding: 0px; /* 避免容器贴边 */
       margin: 0;
       padding: 0;
     }
 
     /* 背景图：全屏覆盖，层级在最底层 */
     .back-jpg {
       width: 100vw;
       height: 100vh;
       object-fit: cover; /* 保持比例覆盖全屏 */
       position: absolute;
       top: 0;
       left: 0;
       z-index: -1; /* 置于容器下方 */
     }
 
     /* 关键2：清除原有的偏移，确保容器居中 */
     .container {
       width: 100%;
       max-width: 400px; /* 固定最大宽度，避免拉伸 */
       /* 移除 margin-left: 10vw; 避免偏移 */
     }
     
     .auth-tabs {
       display: flex;
       background: rgba(20, 25, 35, 0.8);
       border-top-left-radius: 12px;
       border-top-right-radius: 12px;
       overflow: hidden;
     }
     
     .tab {
       flex: 1;
       padding: 16px;
       text-align: center;
       color: rgba(255, 255, 255, 0.6);
       cursor: pointer;
       transition: all 0.3s;
     }
     
     .tab.active {
       color: #fff;
       background: rgba(40, 50, 70, 0.6);
       font-weight: bold;
     }
     
     .form-container {
       background: rgba(30, 35, 45, 0.8);
       backdrop-filter: blur(10px);
       border-bottom-left-radius: 12px;
       border-bottom-right-radius: 12px;
       box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
       padding: 30px;
       margin-top: -1px; /* 与标签栏无缝衔接 */
     }
     
     .input-group {
       margin-bottom: 20px;
     }
     
     label {
       display: block;
       color: rgba(255, 255, 255, 0.8);
       margin-bottom: 8px;
       font-size: 0.9rem;
     }
     
     .input-field {
       position: relative;
     }
     
     input {
       width: 100%;
       padding: 12px 15px;
       background: rgba(255, 255, 255, 0.07);
       border: 1px solid rgba(255, 255, 255, 0.1);
       border-radius: 6px;
       color: #fff;
       font-size: 1rem;
       transition: all 0.3s;
     }
     
     /* 修复生日输入框类型错误（原绑定变量，改为date类型） */
     input[type="date"] {
       appearance: none;
       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.5)' viewBox='0 0 16 16'%3E%3Cpath d='M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z'/%3E%3Cpath d='M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z'/%3E%3C/svg%3E");
       background-repeat: no-repeat;
       background-position: right 12px center;
       background-size: 16px;
     }
     
     input:focus {
       outline: none;
       border-color: rgba(74, 144, 226, 0.6);
       background: rgba(255, 255, 255, 0.1);
     }
     
     input::placeholder {
       color: rgba(255, 255, 255, 0.3);
     }
     
     .password-toggle {
       position: absolute;
       right: 12px;
       top: 50%;
       transform: translateY(-50%);
       color: rgba(255, 255, 255, 0.5);
       cursor: pointer;
       background: none;
       border: none;
       font-size: 1rem;
     }
     
     .register-btn {
       width: 100%;
       padding: 14px;
       background: linear-gradient(90deg, #3498db, #2ecc71);
       border: none;
       border-radius: 6px;
       color: white;
       font-size: 1rem;
       font-weight: bold;
       cursor: pointer;
       transition: all 0.3s;
       margin-top: 10px;
       display: flex;
       justify-content: center;
       align-items: center;
     }
     
     .register-btn:hover {
       transform: translateY(-2px);
       box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
     }
     
     .register-btn:active {
       transform: translateY(0);
     }
     
     .terms {
       text-align: center;
       color: rgba(255, 255, 255, 0.4);
       font-size: 0.7rem;
       margin-top: 20px;
       line-height: 1.4;
     }
     
     .terms a {
       color: rgba(255, 255, 255, 0.5);
       text-decoration: none;
     }
     
     .terms a:hover {
       text-decoration: underline;
     }
 </style>