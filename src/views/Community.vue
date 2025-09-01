<template>
  <div class="page">
    <!-- 1.1 标题区域 -->
    <div class="header-section">
      <h2 class="main-title">交流连接心意</h2>
      <p class="sub-title">交流、创作、陪伴-你的专属数字世界</p>
    </div>
  
    <!-- 1.2 搜索区域 -->
    <div class="input-area">
        <textarea 
          v-model="searchText" 
          class="input-field" 
          placeholder="搜索帖子"
          @keyup.enter="handleSearch"
        />
        <div class="search_bottom">
          <div class="search_recommend">
            今日推荐帖子：
            <span>沙盘俱乐部 |  心理疗愈室</span>
          </div>
          <button class="search-button" @click="handleSearch">
            <img src="@/assets/search_icon.png" class="search-icon">
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
          @click="select_post"
        >
          <img :src="post.image" class="post-image" alt="帖子图片">
          <div class="discussion-count">{{ post.discussionCount }}人正在讨论...</div>
          <div class="post-title">{{ post.title }}</div>
        </div>
      </div>
    </div>
    
    <div class="pop" v-if="isaddpost | issearchpost | isshowdetail">
      <PostOne
        class="create_post"
        v-if="isaddpost"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
      <ShowPost
        class="searchpost"
        v-if="issearchpost"
        @cancel="handleCancel"/>
      <ShowDialog
        class="showpost"
        v-if="isshowdetail"
		@cancel="handleCancel"/>
	/>
    </div>

    <button v-if="!isDialogVisible" class="fixed-button" @click="addpost">
		<img :src="require('@/assets/add_icon.png')" class="fixed-icon" alt="发送">
	</button>
  </div>
</template>
  
  <script>
import PostOne from './community/PostOne.vue'
import ShowDialog from './community/ShowDialog.vue';
import ShowPost from './community/ShowPost.vue';

  export default {
  name: "CommunityPage",
  components:{
    PostOne,
    ShowPost,
    ShowDialog
  },
  data() {
    return {
    showPostDialog: false,
    searchText: '',
    activeNav: 'recommend',
    activeAction: 'publish',
    postCount: 5,
    posts: [
      {
      image: require('@/assets/img4.png'),
      discussionCount: 20,
      title: '职场有你｜拆解...'
      },
      {
      image: require('@/assets/work/work2.jpg'),
      discussionCount: 15,
      title: '心理疗愈室｜放松...'
      },
      {
      image: require('@/assets/work/work4.jpg'),
      discussionCount: 8,
      title: '创作分享会｜最新...'
      }
    ],
    isaddpost: false,
    isDialogVisible:false,
    issearchpost:false,
    isshowdetail:false,
    }
  },
  methods: {
    select_post(){
      this.isshowdetail=true;
    },
    handleCancel(){
      this.isaddpost=false;
      this.issearchpost=false;
      this.isshowdetail=false;
    },
    handleSubmit(){
      this.isaddpost=false; 
    },
    addpost(){
      this.isaddpost=true;
    },
    handleSearch() {
      this.issearchpost=true;
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
  /*弹窗 */ 
  .create_post{
    width: 80%;
    height: 100%;
    margin-left: 20vw; 
  }
  .searchpost{
    width: 80%;
    height: 100%;
    margin-left: 20vw; 
  }
  .showpost{
    width: 80%;
    height: 100%;
    margin-left: 20vw; 
  }
  .fixed-button {
    position: absolute; /* 绝对定位 */
  right: 0px; /* 距离右侧边距 */
  bottom: 10vh; /* 距离底部边距 */
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  }

  /* 发送图标（保持原有尺寸） */
  .fixed-icon {
  width: 40%;
  height: 40%;
  }

  .pop{
  position: fixed; /* 改为 fixed 定位 */
  top: 0;
  left: 0;
  z-index: 9999; /* 设置足够高的层级 */
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

  /* 1.0 页面整体布局 */
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

/* 输入区域 - 高度不超过总高20% */
.input-area {
  align-items: center;
  justify-content: center;
  position: relative; /* 作为发送按钮的定位容器 */
  padding: 10px 20px;
  box-sizing: border-box;
  max-height: 15%; /* 核心限制：不超过总高度20% */
}

/* 输入框（保持原有样式） */
.input-field {
  width: 100%;
  height: 15vh;
  padding: 11px 40px 11px 11px; /* 右侧留出发送按钮空间 */
  border-radius: 8px;
  font-family: 'PingFang SC';
  font-size: 14px;
  background: 
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00B2FF 0%, #4D6EF2 50%, #BF9FFF 100%) border-box;
  border: 2px solid transparent;
  box-sizing: border-box;
}

.input-field::placeholder {
  color: rgba(191,196,217,1);
}
   
  .search_bottom{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search_recommend{
	position: absolute; /* 绝对定位 */
    left: 32px; /* 距离右侧边距 */
    bottom: 25px; /* 距离底部边距 */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
	font-family: 'PingFang SC';
    font-size: 14px;
	color: #333;
  } 

  /* 查找按钮 */
  .search-button {
    position: absolute; /* 绝对定位 */
    right: -20px; /* 距离右侧边距 */
    bottom: 20px; /* 距离底部边距 */
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 4px;
  }
  
  /* 查找icon */
  .search-icon {
  width: 50%;
  height: 50%;
  }
  
  /* 1.3 导航区域 */
  .nav-section {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    gap: 2px;
  }
  
  .nav-left, .nav-right {

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
  