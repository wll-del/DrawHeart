<template>
  <div class="page">
    <!-- 1.1 标题区域 -->
    <div class="header-section">
    <h1 class="main-title">交流连接新意</h1>
    <p class="sub-title">交流、创作、陪伴-你的专属数字世界</p>
    </div>
  
    <!-- 1.2 搜索区域 -->
    <div class="search-section">
    <div class="search-container">
      <input 
      v-model="searchText" 
      class="search-input" 
      placeholder="搜索小组或者帖子"
      @keyup.enter="handleSearch"
      >
      <button class="search-button" @click="handleSearch">
      <img src="@/assets/Image7.png" class="search-icon">
      <span>一键搜索</span>
      </button>
    </div>
    </div>
  
    <!-- 1.3 导航区域 -->
    <div class="nav-section">
    <div class="nav-left">
      <button 
      class="nav-button" 
      :class="{ active: activeNav === 'recommend' }"
      @click="changeNav('recommend')"
      >
      每日推荐
      </button>
      <button 
      class="nav-button" 
      :class="{ active: activeNav === 'myPosts' }"
      @click="changeNav('myPosts')"
      >
      我的帖子
      <span class="badge">{{ postCount }}</span>
      </button>
    </div>
    <div class="nav-right">
      <button 
      class="nav-button" 
      :class="{ active: activeAction === 'publish' }"
      @click="changeAction('publish')"
      >
      发布
      </button>
      <button 
      class="nav-button" 
      :class="{ active: activeAction === 'collect' }"
      @click="changeAction('collect')"
      >
      收藏
      </button>
    </div>
    </div>
  
    <!-- 1.4 内容展示区域 -->
    <div class="content-section">
    <div class="post-grid">
      <div 
      v-for="(post, index) in posts" 
      :key="index" 
      class="post-card"
      >
      <img :src="post.image" class="post-image" alt="帖子图片">
      <div class="discussion-count">{{ post.discussionCount }}人正在讨论...</div>
      <div class="post-title">{{ post.title }}</div>
      </div>
    </div>
    </div>
  
    <!-- 1.5 发帖按钮 -->
    <button class="post-button" @click="navigateToPost">
    <span>+</span>
    </button>
    <!-- 发帖弹窗 -->
    <div v-if="showPostDialog" class="post-dialog-overlay" @click.self="closePostDialog">
    <div class="post-dialog">
      <!-- 使用router-view来显示/postone路由的内容 -->
      <router-view v-if="$route.path === '/postone'"></router-view>
      <button class="close-button" @click="closePostDialog">×</button>
    </div>
    </div>
  </div>
  </template>
  
  <script>
  export default {
  name: "CommunityPage",
  data() {
    return {
    showPostDialog: false,
    searchText: '',
    activeNav: 'recommend',
    activeAction: 'publish',
    postCount: 5,
    posts: [
      {
      image: require('@/assets/Image7.png'),
      discussionCount: 20,
      title: '沙盘俱乐部｜改变你...'
      },
      {
      image: require('@/assets/Image7.png'),
      discussionCount: 15,
      title: '心理疗愈室｜放松...'
      },
      {
      image: require('@/assets/Image7.png'),
      discussionCount: 8,
      title: '创作分享会｜最新...'
      }
    ]
    }
  },
  methods: {
    handleSearch() {
    // 调用搜索接口
    // this.$api.searchPosts(this.searchText).then(response => {
    //   this.posts = response.data
    // })
    },
    changeNav(type) {
    this.activeNav = type
    this.fetchPosts()
    },
    changeAction(type) {
    this.activeAction = type
    this.fetchPosts()
    },
    fetchPosts() {
    // 根据当前选择的导航和操作获取帖子
    // let apiMethod = ''
    // if (this.activeNav === 'recommend') {
    //   apiMethod = this.activeAction === 'publish' 
    //   ? 'getRecommendedPosts' 
    //   : 'getRecommendedCollections'
    // } else {
    //   apiMethod = this.activeAction === 'publish' 
    //   ? 'getMyPosts' 
    //   : 'getMyCollections'
    // }
    // console.log("apiMethod:",apiMethod);
    // this.$api[apiMethod]().then(response => {
    //   this.posts = response.data
    // })
    },
    navigateToPost() {
    // 跳转到发帖页面
    this.showPostDialog = true
    this.$router.push('/postone')
    },
    closePostDialog() {
    // 1. 关闭弹窗
    this.showPostDialog = false
    // 2. 返回上一页
    this.$router.go(-1)
    }
  },
  watch: {
    // 监听路由变化，当路由是/postone时显示弹窗
    '$route'(to) {
    if (to.path === '/postone') {
      this.showPostDialog = true
    } else {
      this.showPostDialog = false
    }
    }
  },
  mounted() {
    // 初始化获取帖子数据
    this.fetchPosts()
    // 获取我的帖子数量
    // this.$api.getMyPostCount().then(response => {
    // this.postCount = response.data.count
    // })
  }
  }
  </script>
  
  <style scoped>
  .page {
  width: 90%;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  /* background-color: transparent; */
  }
  
  /* 1.1 标题区域 */
  .header-section {
  text-align: center;
  margin-bottom: 20px;
  }
  
  .main-title {
  font-size: 30px;
  color: #333;
  margin-bottom: 10px;
  }
  
  .sub-title {
  font-size: 16px;
  color: #666;
  }
  
  /* 1.2 搜索区域 */
  .search-section {
  margin-bottom: 30px;
  }
  
  .search-container {
  max-width: 700px;
  min-height: 110px;
  margin: 0 auto;
  border: 1px solid #ddd;
  border-radius: 12px 12px 12px 12px;
  background-color: white;
  display: flex;
  align-items: center;
  }
  
  .search-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
  }
  
  .search-button {
  padding: 12px 16px;
  background-color: #63cbff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: self-end;
  }
  
  .search-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  }
  
  /* 1.3 导航区域 */
  .nav-section {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  }
  
  .nav-left, .nav-right {
  display: flex;
  gap: 2px;
  }
  
  .nav-button {
  padding: 8px 16px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  font-size: 16px;
  color: #666;
  }
  
  .nav-button.active {
  color: #333;
  font-weight: 500;
  }
  
  .nav-button.active::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #63cbff;
  }
  
  .badge {
  position: absolute;
  top: 5px;
  right: 5px;
  /* background-color: #ff4d4f; */
  color: gray;
  /* border-radius: 50%; */
  width: 12px;
  height: 12px;
  font-size: 10px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  }
  
  /* 1.4 内容展示区域 */
  .content-section {
  margin-bottom: 50px;
  }
  
  .post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  }
  
  .post-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .post-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  }
  
  .discussion-count {
  position: relative;
  bottom: 20px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 11px;
  }
  
  .post-title {
  padding: 8px;
  font-size: 14px;
  color: #333;
  }
  
  /* 1.5 发帖按钮 */
  .post-button {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #63cbff;
  color: white;
  border: none;
  font-size: 30px;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  }
  
  .post-button:hover {
  background-color: #4db8e8;
  }
  
  /* 弹窗样式 */
  .post-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end; /* 靠右对齐 */
  align-items: flex-start;
  z-index: 1000;
  }
  
  .post-dialog {
  width: 70%; /* 宽度为原页面的70% */
  max-width: 900px; /* 最大宽度限制 */
  height: 100vh;
  background-color: white;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  }
  
  .close-button {
  position: absolute; /* 相对于弹窗定位 */
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 1001;
  }
  
  .close-button:hover {
  background: rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
  .post-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .post-image {
    height: 120px;
  }
  
  .main-title {
    font-size: 24px;
  }
  
  .sub-title {
    font-size: 14px;
  }
  
  .post-dialog {
    width: 90%; /* 移动端调整为90%宽度 */
  }
  }
  </style>
  