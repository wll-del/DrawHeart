<template>
    <div class="back">
      <!-- 导航栏 -->
      <div v-if="!isLogin">
        <div>1</div>
      </div>
      <div v-else>
        <!-- 顶栏 -->
        <div class="top">
          <div class="title">画心岛</div>
          <div class="user-controls">
            <div v-if="isLogin" class="userpoint" @click="showPointsDialog">
              <img src="@/assets/Image7.png" class="icon" alt="积分图标">
              <span>积分</span>
            </div>
            <div v-if="isLogin" class="userphoto">
              <img src="@/assets/Image8.png" class="icon" alt="头像图标">
              <span>头像</span>
            </div>
          </div>
        </div>
  
        <div class="buttom">
          <!-- 侧边栏 -->
          <div class="navbar">
            <router-link to="/sandbox" class="modify">沙盘</router-link>
            <router-link to="/lovi" class="compilation">lovi</router-link> 
            <router-link to="/community" class="compilation">社区</router-link>
            <router-link to="/personal" class="compilation">个人中心</router-link>
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
  export default {
    data() {
      return {
        isLogin: true,
        showDialog: false
      }
    },
    async mounted() {
      window.addEventListener('beforeunload', this.handleLogoutOnClose);
    },
    beforeUnmount() {
      window.removeEventListener('beforeunload', this.handleLogoutOnClose);
    },
    methods: {
      showPointsDialog() {
        this.showDialog = true;
      },
      closeDialog() {
        this.showDialog = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .back {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
  
  .top {
    display: flex;
    flex-direction: row;
    height: 5vh;
    width: 100vw;
    border: 1px solid #000;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
  }
  
  .title {
    font-size: 18px;
    font-weight: bold;
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
    flex-direction: column;
    gap: 1%;
    border: 1px solid #000;
  }
  
  .content {
    height: 100%;
    width: calc(90vw - 1vw);
    background-color: #f0f0f0;
    margin-left: 1vw;
    border: 1px solid #000;
    overflow: auto;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    min-width: 1241px;
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
  }
  
  .vip-image-wrapper {
    position: relative;
    display: inline-block;
  }
  
  .vip-image {
    width: 80%;
    height: auto;
    max-width: 100%;
    max-height: 90vh;
    display: block;
  }
  
  .vip-close-button {
    position: absolute;
    top: 10px;
    right: 10px;
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