<template>
 <div id="app">
    <div class="container">
      <div class="header">
        <div class="logo">画心岛</div>
        <a href="#" class="mobile-download">下载移动版</a>
      </div>
      
      <div class="auth-tabs">
        <div class="tab" :class="{ active: activeTab === 'login' }" @click="activeTab = 'login'">登录</div>
        <div class="tab" :class="{ active: activeTab === 'register' }" @click="activeTab = 'register'">注册</div>
      </div>

      <div v-if="activeTab === 'register'">
        <div class="form-container">
          <div class="input-group">
            <label>用户名</label>
            <div class="input-field">
              <input type="text" v-model="username"  placeholder="请输入用户名">
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
              <input v-model="coassword" :type="showConfirmPassword ? 'text' : 'password'" value="••••••">
              <button class="password-toggle" @click="showConfirmPassword = !showConfirmPassword">
                <i :class="showConfirmPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
              </button>
            </div>
          </div>
        
          <div class="input-group">
            <label>MBTI</label>
            <div class="input-field">
              <input v-model="mbti" :type="mbit" placeholder="请输入mbti">
            </div>
          </div>

          <div class="input-group">
            <label>星座</label>
            <div class="input-field">
              <input v-model="constellation" :type="constellation" placeholder="请输入星座">
            </div>
          </div>

          <div class="input-group">
            <label>生日</label>
            <div class="input-field">
              <input v-model="Birthday" :type="Birthday" placeholder="请输入生日">
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
      console.log(this.username)
      const data = {
        "username": this.username,
        "email": this.email,
        "password": this.password,
        "mbti": this.mbti,
        "constellation": this.constellation,
        "Birthday": this.Birthday
      }
      console.log(data)
      this.$router.push('/login')
      const res = await register(data)
      console.log(res.message)
      alert('注册成功');
      this.$router.push('/login')
    },
    async user_login(){
      const form = new FormData();
      form.append("username", this.username);
      form.append("password", this.password);
      const res = await login(form)
      console.log(res.access_token)
      alert('登陆成功');
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
    #app{
      background-image: url("@/assets/b1.png");
    }
    body {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #0f3b4a 0%, #1c2837 100%);
      padding: 20px;
    }
    
    .container {
      width: 100%;
      max-width: 400px;
      margin-left: 10vw;
    }
    
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .logo {
      color: #fff;
      font-size: 2.5rem;
      font-weight: bold;
      letter-spacing: 2px;
      margin-bottom: 15px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
    
    .mobile-download {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
      text-decoration: none;
      transition: color 0.3s;
    }
    
    .mobile-download:hover {
      color: #4cd964;
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
      border-radius: 12px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      padding: 30px;
      margin-top: -1px;
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
    
    .arrow {
      margin-left: 5px;
      font-size: 0.9rem;
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