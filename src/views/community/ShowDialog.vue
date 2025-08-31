<template>
  <div class="back">
    <!-- 主内容区：直接使用.page作为容器，删除多余嵌套 -->
    <div class="page">
      <!-- 1. 顶部俱乐部信息区（精简嵌套） -->
      <div class="club-header">
        <!-- 俱乐部图标 -->
        <div class="club-icon">
          <img :src="require('@/assets/work/work3.jpg')" class="work-jpg" alt="收藏" />
        </div>
        <!-- 俱乐部信息 -->
        <div class="club-info">
          <h2 class="club-name">沙盘创作俱乐部</h2>
          <div class="front-header">
            <p class="club-desc">改善你的心理世界，做一个快乐的岛民</p>
            <div class="club-meta">
            <button class="collect-btn">
              <img :src="require('@/assets/showdialog/favorite_after.png')" alt="收藏" />
              <span>收藏</span>
            </button>
            <span class="meta-text">创建于2025-8-30</span>
            <span class="meta-text">讨论: 88人</span>
          </div>
          </div>
        </div>
        <!-- 关闭按钮 -->
        <button class="close-btn" @click="handlecancel">
          <span class="line1"></span>
          <span class="line2"></span>
        </button>
      </div>

      <!-- 2. 俱乐部介绍与讨论区（精简嵌套） -->
      <div class="club-content">
        <!-- 俱乐部介绍文本 -->
        <p class="club-intro">
          你是否曾有过这样的时刻：脑子里藏着奇奇怪怪的念头，想把“云朵落在海底”“星星长在树上”的画面变出来，却不知从何下手？或是心里攒了细碎的情绪，说不出口，却想找个地方悄悄安放?
          现在，有一个地方能帮你实现 ——沙盘创作俱乐部，这里没有 “画得好不好”“做得对不对” 的评判，只有一捧细沙、各式小摆件，和一群愿意陪你 “造梦” 的同路人。<br><br>
          在这里，你可以把脑海里的故事铺进沙盘：用小石子堆成蜿蜒的山脉，用蓝色玻璃珠模拟粼粼的湖面，再摆上 tiny 的小人和小动物，让 “森林里的秘密聚会”“未来城市的模样”从想象落到现实。不必担心自己没有艺术基础，沙盘的魔力就在于：每一粒沙子的摆放，每一个摆件的选择，都是独属于你的表达 —— 你笔下没画完的场景，能在这里补全；你心里没说透的感受，沙子会替你 “说话”<br><br>
          我们会定期组织主题创作活动：有时是 “童年记忆里的老地方”，大家一起用沙盘还原外婆家的小院、小学门口的小卖部，在摆放中重温温暖；有时是 “未完成的梦想”，有人造了 “开在沙漠里的书店”，有人拼了 “带着画板去旅行的房车”，在分享中看见彼此眼里的光；也会有自由创作时间，你可以安安静静地和沙子相处，把一天的疲惫揉进沙堆，再捏出一个 “治愈小世界”。
        </p>

        <!-- 讨论区标题 -->
        <div class="discussion-title">
          <img :src="require('@/assets/showdialog/discas.png')" alt="讨论" />
          <h3>讨论</h3>
        </div>

        <!-- 讨论列表 -->
        <div class="discussion-list">
          <!-- 评论项：统一结构 -->
          <div class="comment-item" v-for="(comment, idx) in comments" :key="idx">
            <img :src="comment.avatar" :alt="comment.name" />
            <div class="comment-content">
              <p class="comment-meta">{{ comment.name }} {{ comment.time }} {{ comment.location }}</p>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. 评论输入区（精简嵌套） -->
      <!-- 输入区域 - 高度不超过总高20% -->
      <div class="input-area">
        <input 
        v-model="message" 
        class="input-field"
        :placeholder="showPlaceholder ? '发表你的看法' : ''"
        @focus="clearPlaceholder"
        @blur="restorePlaceholder"
        @keyup.enter="sendMessage" 
        />
        <button class="send-btn" @click="sendMessage">
        <img :src="require('@/assets/comment_icon.png')" class="send-icon" alt="发送">
        </button>
      </div>
    </div>

    <!-- 全局关闭按钮（保留） -->
    <!-- <div class="global-close" @click="handlecancel">x</div> -->
  </div>
</template>

<script>
export default {
  name: "ClubDetail",
  data() {
    // 评论数据抽离为data，减少模板冗余
    return {
      comments: [
        {
          avatar: require('@/assets/showdialog/user1.png'),
          name: "楚歌",
          time: "2025-08-27 07:43:18",
          location: "北京",
          content: "工作久了总觉得心里堵得慌，想找人说又怕矫情，看到‘情绪悄悄安放’这句真的戳中我了。不用说话，用沙子摆一摆就能释放压力，还能认识同频的人，首次参与的定制小摆件也很吸引我，打算报名试试，希望能找回点平静。"
        },
        {
          avatar: require('@/assets/showdialog/user2.png'),
          name: "快快",
          time: "2025-08-29 16:31:48",
          location: "广东",
          content: "太好了呜呜"
        },
        {
          avatar: require('@/assets/showdialog/user3.png'),
          name: "我超棒耶",
          time: "2025-08-29 12:51:02",
          location: "四川",
          content: "刚入社会有点迷茫，看到有人用沙盘做‘带着画板去旅行的房车’，瞬间被戳到！这大概就是我心里藏着的梦想吧，想去现场看看大家的创作，也希望能在俱乐部找到方向"
        }
      ]
    };
  },
  methods: {
    handlecancel() {
      this.$emit('cancel');
    }
  }
};
</script>

<style scoped>
/* 全局容器：简化flex布局 */
.back {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

/* 主页面容器：固定核心样式，移除冗余属性 */
.page {
  width: 100%;
  min-width: 470px;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: -8px 0 22px rgba(191, 196, 217, 0.2);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 1. 顶部俱乐部信息区 */
.club-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

/* 顶部字体 */
.front-header{
  display: flex;
  flex-direction: row;
  align-items:center;
  gap: 10px;
}

.club-icon {
  width: 67px;
  height: 67%;
  border-radius: 9px;
  background: #eee; /* 占位背景 */
}

.work-jpg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 9px;
}

.club-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.club-name {
  font-size: 25px;
  font-weight: 500;
  color: #242529;
  margin: 0;
}

.club-desc {
  font-size: 18px;
  color: #242529;
  margin: 0;
}

.club-meta {
  position: absolute;
  right: 4vw;
  display: flex;
  align-items: center;
  gap: 15px;
}

.collect-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: #000;
}

.collect-btn img {
  width: 16px;
  height: 15px;
}

.meta-text {
  font-size: 14px;
  color: #cecece;
}

/* 关闭按钮 */
.close-btn {
  margin-top: -70px;
  width: 16px;
  height: 16px;
  border: none;
  background: transparent;
  position: relative;
  cursor: pointer;
}

.close-btn .line1,
.close-btn .line2 {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background: #9296a6;
}

.close-btn .line1 {
  transform: translateY(-50%) rotate(-45deg);
}

.close-btn .line2 {
  transform: translateY(-50%) rotate(45deg);
}

/* 2. 俱乐部介绍与讨论区 */
.club-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.club-intro {
  font-size: 14px;
  color: #5a5c66;
  line-height: 1.6;
  margin: 0;
}

/* 讨论区标题 */
.discussion-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.discussion-title img {
  width: 20px;
  height: 20px;
}

.discussion-title h3 {
  font-size: 20px;
  font-weight: 500;
  color: #242529;
  margin: 0;
}

/* 讨论列表 */
.discussion-list {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

/* 评论项：统一样式 */
.comment-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.comment-item img {
  /* margin-right: -20; */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.comment-content {
  flex: 1;
}

.comment-meta {
  font-size: 14px;
  color: #cecece;
  margin: 0 0 5px 0;
}

.comment-text {
  font-size: 14px;
  color: #5a5c66;
  margin: 0;
  line-height: 1.25;
}

/* 输入区域 - 高度不超过总高20% */
.input-area {
  position: relative; /* 作为发送按钮的定位容器 */
  padding: 10px 20px;
  box-sizing: border-box;
  max-height: 20%; /* 核心限制：不超过总高度20% */
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
  
  /* 发送按钮 - 定位在输入框右下角 */
  .send-btn {
  position: absolute; /* 绝对定位 */
  right: 0px; /* 距离右侧边距 */
  bottom: 18px; /* 距离底部边距 */
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  }
  
  /* 发送图标（保持原有尺寸） */
  .send-icon {
  width: 50%;
  height: 50%;
  }

/* 全局关闭按钮 */
/* .global-close {
  font-size: 20px;
  color: #9296a6;
  cursor: pointer;
  padding: 5px;
} */

/* 响应式适配（补充） */
@media (max-width: 768px) {
  .club-header {
    flex-wrap: wrap;
  }

  .club-intro {
    text-align: justify;
  }

  .comment-item {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>