<template>
    <div class="back">
      <!-- 背景视频 -->
      <!-- 导航栏 -->
      <div v-if="!isLogin">
          <video autoplay muted class="background-video" v-if="isstart">
            <source :src="nobackgroundVideo" type="video/webm">
          </video>
          <img src="@/assets/huaxindao_font_w.png">
          <UserContoller
            v-if="!isstart"
            @login="handlelogin"
          />
          <div @click="user_login" class="login"  v-if="isstart"></div>
      </div>
      <div v-else>
        <!-- 顶栏 -->
        <div class="top">
            <video autoplay loop muted class="background-video">
              <source :src="backgroundVideo" type="video/webm">
            </video>
          <div class="title"> <img src="@/assets/huaxindao_font_black.png" class="huaxin_img" > </div>
          <div class="user-controls">
            <div v-if="isLogin" class="userpoint" @click="showPointsDialog">
              <img src="@/assets/vip_icon.png" class="icon" alt="积分图标">
              <span>积分</span>
            </div>
            <div v-if="isLogin" class="userphoto" @click="handleimage">
              <img src="@/assets/my_profile_sm.png" class="icon" alt="头像图标">
         
            </div>
          </div>
        </div>
  
        <div class="buttom">
          <!-- 侧边栏 -->
          <div class="navbar">
            <!-- 沙盘 - 搭配"沙盘"主题图标 -->
            <router-link to="/sandbox" class="navbar-item" active-class="navbar-item--active">
              <img src="@/assets/sanbox_icon.png" class="icon" alt="头像图标">
              <span class="navbar-text">沙盘作画</span>
            </router-link>
  
  <!-- lovi - 搭配"机器人/聊天"主题图标 -->
  <router-link to="/lovi" class="navbar-item" active-class="navbar-item--active">
    <img src="@/assets/heart_chat_icon.png" class="icon" alt="头像图标">
    <span class="navbar-text">心灵对话</span>
  </router-link>
  
  <!-- 社区 - 搭配"社区/用户"主题图标 -->
  <router-link to="/community" class="navbar-item" active-class="navbar-item--active">
    <img src="@/assets/communi_icon.png" class="icon" alt="头像图标">
    <span class="navbar-text">交流社区</span>
  </router-link>
  
  <!-- 个人中心 - 搭配"个人/用户"主题图标 -->
  <router-link to="/personal" class="navbar-item" active-class="navbar-item--active">
    <img src="@/assets/folder_icon.png" class="icon" alt="头像图标">
    <span class="navbar-text">我的作品</span>
  </router-link>
          </div>
        
          <!-- 内容，会根据路由动态加载 -->
          <div class="content">
            <!-- 页面内容 -->
            <router-view></router-view>
          </div>
        </div>
  
        <!-- VIP图像弹窗 -->
        <div v-if="showDialog" class="vip-dialog-overlay" @click.self="closeDialog">
          <div class="vip-dialog-container">
            <div class="vip-image-wrapper">
              <img src="@/assets/vip.png" class="vip-image">
              <button class="vip-close-button" @click="closeDialog">×</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import UserContoller from './UserContoller.vue';

  export default {
    components:{
      UserContoller
    },
    data() {
      return {
        isLogin: true, // 默认未登录状态
        showDialog: false,  //会员弹窗
        nobackgroundVideo: require('@/assets/no-login-back.webm'), // 默认加载未登录状态的视频
        backgroundVideo: require('@/assets/login-back.webm') ,
        isstart:true
      }
    },

  watch: {
  },



    async mounted() {
      // 初始化检查登录状态
      this.checkLoginStatus();
      window.addEventListener('beforeunload', this.handleLogoutOnClose);
    },
    beforeUnmount() {
      window.removeEventListener('beforeunload', this.handleLogoutOnClose);
    },
    methods: {
      handleimage(){
        this.$router.push('/personal')
      },
      handlelogin(){
        console.log("login msg")
        this.isLogin = true;
        this.$router.push('/lovi')
      },
      async checkLoginStatus() {
        // 实际项目中这里应该调用API检查登录状态
        // const isLoggedIn = await this.$api.checkAuth();
        // this.isLogin = isLoggedIn;
        
        // 模拟登录状态
        // this.isLogin = false // 初始设置为未登录
      },
      showPointsDialog() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = false;
      },
      handleLogoutOnClose() {
        // 关闭页面时的处理
      },
      user_login(){
        this.isstart=false;
      }
    }
  }
  </script>
  
  <style scoped>
  .login{
    position: relative;
    top:25vw;
    left:35vw;
    width: 20vw;
    height: 10vh;
  }
  .back {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    position: relative;
    background-color: transparent;
  }
  
  .background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1; /* 确保视频在内容下方 */
  }
  
  .top {
    display: flex;
    flex-direction: row; /*  水平排列 */
    height: 5vh;    /*高度为视口的5% */
    width: 100vw;  
    border: none;
    align-items: center;  /*子元素在交叉轴（垂直方向）上居中对齐*/
    justify-content: space-between; /*子元素在主轴（水平方向）上两端对齐 */
    padding: 0 5% 0 5px;  /* 0（上下无内边距）5px（左右各5像素内边距）*/
    box-sizing: border-box;
    position: relative; /* 确保在视频上方 */
    flex-shrink: 0;  /* 添加弹性收缩 */
    gap: 20px; /* 添加元素间距 */
  }
  
  /* 画心岛字体样式 */
  .huaxin_img {
    width: 5vw;
    height: 5vh;
    align-items: start;
  }
  
  .user-controls {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .userpoint, .userphoto {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }
  
  .userpoint:hover, .userphoto:hover {
    opacity: 0.8;
  }
  
  .icon {
    width: 20px;
    height: 20px;
  }
  
  .buttom {
    height: calc(100vh - 5vh);
    width: 100vw;
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
  }
  
  .navbar {
    height: 100%;
    width: 10vw;
    display: flex;
    flex-direction: column; /* 垂直排列菜单 */
    gap: 8px;
    padding: 16px;
    /* border: 1px solid #000; */
  }

/* 单个菜单项样式 */
.navbar-item {
  display: flex;
  align-items: center; /* 图标与文字垂直居中 */
  gap: 10px; /* 图标与文字间距 */
  padding: 12px 16px;
  border-radius: 6px;
  color: #333; /* 默认文字颜色 */
  text-decoration: none; /* 去除路由默认下划线 */
  transition: background-color 0.2s ease; /* 底色变化过渡动画 */
}

/* 文字样式 */
.navbar-text {
  font-size: 14px;
  font-family: 'PingFang SC', sans-serif;
}

/* 选中状态样式（浅白色底色） */
.navbar-item--active {
  background-color: #ffffff; /* 浅白色选中底色 */
  color: #1890ff; /* 选中时文字颜色（可选，增强辨识度） */
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); /* 选中时轻微阴影，增强层次感 */
}

/* 鼠标悬浮效果（可选，优化交互体验） */
.navbar-item:hover:not(.navbar-item--active) {
  background-color: #f0f2f5;
}
  
  /* 动态路由加载页*/
  .content {
    height: 100%;
    width: 100%;
    /* background-color: #f0f0f0; */
    /* margin-left: 0.5vw; */
    /* border: 1px solid #000; */
    /* overflow: auto; */
    /* padding: 10px; */
    box-sizing: border-box;
    position: relative;
    gap: 20px;
    /* min-width: 1241px; */
  }
  
  .modify {
    top: 45vh;
  }
  
  .slim {
    top: 45vh;
  }
  
  .compilation {
    top: 45vh;
  }
  

  /* VIP弹窗样式 */
  .vip-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .vip-dialog-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1001;
  }
  
  .vip-image-wrapper {
    width: 50vw;
    height: 60vh;
    position: relative;
    display: inline-block;
  }
  
  .vip-image {
    width: 100%;
    height: 100%;
    display: block;
  }
  
  .vip-close-button {
    position: absolute;
    top: 10vh;
    right: 1vw;
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translate(50%, -50%);
  }
  
  .vip-close-button:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  @media (max-width: 768px) {
    .user-controls {
      gap: 10px;
    }
    
    .icon {
      width: 16px;
      height: 16px;
    }
  }
  </style>