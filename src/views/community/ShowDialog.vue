<template>
  <div class="back">
    <!-- 主内容区：直接使用.page作为容器，删除多余嵌套 -->
    <div class="page">
      <!-- 1. 顶部俱乐部信息区（精简嵌套） -->
      <div class="club-header">
        <!-- 俱乐部图标 -->
        <div class="club-icon">
          <img :src="require('@/assets/img4.png')" class="work-jpg" alt="收藏" />
        </div>
        <!-- 俱乐部信息 -->
        <div class="club-info">
          <h2 class="club-name">职场有你</h2>
          <div class="front-header">
            <p class="club-desc">拆解半程职场困惑，把弯路走成经验路</p>
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
          <span>  今天整理电脑文件夹，突然发现入职满半年的纪念 —— 和刚入职时相比，我不再怕 “问同事打印机怎么用”，却开始为 “怎么把小事做进核心流程” 失眠：</span>
          上个月第一次独立对接跨部门项目，以为按要求收集完数据就够了，结果漏了和运营部同步进度，导致活动物料晚了 2 天；还有次帮老同事整理报告，花 3 小时把表格做得超精致，却被提醒 “重点是数据背后的用户反馈，不是格式”；最纠结的是上周，领导问 “你接下来想往哪个方向深耕”，我盯着屏幕半天说不出话 —— 这半年总在 “帮别人搭把手”，好像还没摸到自己的核心价值……
后来对着沙盘发呆时，我摆了 “带箭头的路线图”（想理清方向），旁边放了 “搭着桥梁的小摆件”（对应跨部门协作），最后在路线图分叉口摆了个 “举着问号的小人”（就是纠结的自己）。Lovi 说我 “在‘执行’里攒够了经验，该试着往‘思考’走了”，突然想和大家聊聊：你们入职半年时，是不是也有 “怕做不好协作”“找不到核心方向” 的时刻？
也想分享两个帮我跳出困境的小经验：一是做 “协作清单”，每次对接任务先写清 “需要哪些部门配合、关键时间节点、对方的核心需求”，上次用这个清单和运营部对接，居然提前 1 天完成了；二是每周五花 20 分钟写 “成长笔记”，记下来 “这周做了什么、哪步可以优化、下次想尝试什么”，慢慢就摸清了自己更擅长 “数据分析”，而不是 “纯执行整理”。
如果你们也有半年期的职场小烦恼，或者有 “找核心方向”“搞跨部门协作” 的技巧，都来聊聊吧～职场不是短跑，半程的困惑，其实都是下次进步的信号呀～        
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
        <textarea 
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
          time: "2025-08-30 07:43:18",
          location: "北京",
          content: "刚工作总觉得很迷茫，想找人求助又怕麻烦别人，在这个社区里用组件摆一摆就能释放压力，还能认识同频的人，希望能找回点平静。"
        },
        {
          avatar: require('@/assets/showdialog/user2.png'),
          name: "快快",
          time: "2025-08-31 16:31:48",
          location: "广东",
          content: "太好了呜呜"
        },
        {
          avatar: require('@/assets/showdialog/user3.png'),
          name: "我超棒耶",
          time: "2025-09-01 00:51:02",
          location: "四川",
          content: "协作清单超实用！成长笔记马住了！"
        }
      ]
    };
  },
  methods: {
    handlecancel() {
      this.$emit('cancel');
    },
    sendMessage() {
      if (this.message) {
        console.log("Sending message:", this.message);
        const newmsg=[{
          avatar: require('@/assets/my_profile_sm.png'),
          name: "夏夏",
          time: "2025-09-01 01:40:18",
          location: "北京",
          content: this.message
        }]
        for(let i=0;i<this.comments.length;i+=1)
        {
          newmsg.push(this.comments[i])
        }
        this.comments=newmsg
        this.message = ""; // 清空输入框
      }
    },
    clearPlaceholder() {
      this.showPlaceholder = false;
    },
    restorePlaceholder() {
      this.showPlaceholder = true;
    }
  }
};
</script>

<style scoped>
/* 全局容器：简化flex布局 */
.back {
  display: flex;
  align-items: flex-start;
  /* gap: 10px; */
}

/* 主页面容器：固定核心样式，移除冗余属性 */
.page {
  width: 100%;
  height:100%;
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
  height:60%;
  overflow: auto;
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