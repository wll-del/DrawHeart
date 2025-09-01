<template>
  <div class="page">
    <div class="wrap">
    <!-- 主体内容区：聊天区 + 右侧信息区 -->
    <div class="main-container">
      <!-- 左侧聊天区域 -->
      <div class="chat-area">
      <!-- 图标 + 标题组合 -->
      <div class="chat-icon-title">
        <img :src="require('@/assets/chat.png')" class="lovi-icon" alt="Lovi图标">
        <span class="lovi-title">跟Lovi聊聊天</span>
      </div>
      <!-- 聊天记录 - 占据剩余高度 -->
      <div class="chat-container">
        <div 
        class="message-item" 
        v-for="(msg, index) in messages" 
        :key="index"
        :class="{ 'user': msg.isUser, 'lovi': !msg.isUser }"
        >
        <div class="avatar">
          <img 
          :src="msg.isUser ? require('@/assets/my_profile_sm.png') : require('@/assets/lovi_icon.png')" 
          alt="avatar"
          >
        </div>
        <div class="message-bubble">{{ msg.content }}</div>
        </div>
      </div>
      
      <!-- 快速回复 - 按钮最高40px -->
      <div class="quick-reply">
        <button class="quick-btn" @click="sendQuickMessage('你好')" :class="{ active: activeText === '你好' }">你好</button>
        <button class="quick-btn" @click="sendQuickMessage('我爱你')" :class="{ active: activeText === '我爱你' }">我爱你</button>
        <button class="quick-btn" @click="sendQuickMessage('你真可爱')" :class="{ active: activeText === '你真可爱可爱' }">你真可爱</button>
        <button class="quick-btn" @click="sendQuickMessage('今天开心吗？')" :class="{ active: activeText === '今天开心吗？' }">今天开心吗？</button>
      </div>
      
      <!-- 输入区域 - 高度不超过总高20% -->
      <div class="input-area">
        <textarea 
        v-model="message" 
        class="input-field"
        :placeholder="showPlaceholder ? '对Lovi说点什么...' : ''"
        @focus="clearPlaceholder"
        @blur="restorePlaceholder"
        @keyup.enter="sendMessage" 
        />
        <button class="send-btn" @click="sendMessage">
        <img :src="require('@/assets/send_chat_icon.png')" class="send-icon" alt="发送">
        </button>
      </div>
      </div>
    
      <!-- 右侧Lovi信息区域 -->
      <div class="lovi-info">
      <!-- 图标 + 标题组合 -->
      <div class="lovi-icon-title">
        <img :src="require('@/assets/my_lovi.png')" class="lovi-icon" alt="Lovi图标">
        <span class="lovi-title">我的Lovi</span>
      </div>
      
      <!-- 包含GIF和状态文本的容器 -->
      <div class="lovi-avatar-container">
        <!-- Lovi GIF图 -->
        <img :src="require('@/assets/lovi.gif')" class="lovi-avatar" alt="Lovi">
        
        <!-- 状态文本（对话框样式）
        <p class="lovi-status">新的一天，lovi心情不错～</p> -->
      </div>
      
      <!-- 功能按钮组 -->
      <div class="lovi-actions">
        <button class="action-btn" @click="handleFeed">投喂</button>
        <button class="action-btn" @click="handleGame">游戏</button>
        <button class="action-btn" @click="handleRest">休息</button>
        <button class="action-btn" @click="handlePet">抚摸</button>
      </div>
      </div>
    </div>
    </div>
  </div>
  </template>
  
  <script>
  import { chat } from '@/api/chat'
  export default {
  name: "PageLovi",
  
  data() {
    return {
    message: '',
    showPlaceholder: true,
    activeText: '',
    messages: [
      {
      content: '嗨，夏夏，晚上好～想和我聊聊天嘛',
      isUser: false,
      timestamp: new Date().toISOString()
      },
      // {
      // content: '',
      // isUser: false,
      // timestamp: new Date().toISOString()
      // }
    ]
    };
  },
  
  methods: {
    clearPlaceholder() {
    this.showPlaceholder = false;
    },
  
    restorePlaceholder() {
    if (!this.message) {
      this.showPlaceholder = true;
    }
    },
  
    async sendMessage() {
      console.log(this.message)
    const messageContent = this.message
    if (!messageContent.trim()) return;
  
    // 添加用户消息
    this.messages.push({
      content: messageContent,
      isUser: true,
      timestamp: new Date().toISOString()
    });
    this.messages.push({
      content: "回复中...",
      isUser: false,
      timestamp: new Date().toISOString()
    }); 
  
    try {
      const params = new URLSearchParams({
      chat_content: messageContent,
      chat_type: "text"
      }).toString();
  
      const response = await chat(params)
  
      if (response) {
      this.message = '';
      this.$nextTick(() => {
        this.showPlaceholder = true;
      });
      this.activeText = '';
      this.messages.pop()
      // 添加Lovi回复
      this.messages.push({
        content: response,
        isUser: false,
        timestamp: new Date().toISOString()
      });
      } else {
      // console.error('消息发送失败:', response.data.message);
      this.messages.push({
        content: '抱歉，消息发送失败，请重试',
        isUser: false,
        timestamp: new Date().toISOString()
      });
      }
    } catch (error) {
      console.error('发送消息出错:', error);
      this.messages.push({
      content: '网络异常，请检查网络后重试',
      isUser: false,
      timestamp: new Date().toISOString()
      });
    }
    },
  
    sendQuickMessage(text) {
    this.activeText = text;
    this.sendMessage(text);
    },
  
    getLoviResponse(userMessage) {
    const responses = {
      '你好': '你好呀！我是Lovi~',
      '我爱你': '我也爱你哦！',
      '你真可爱': '谢谢夸奖，你也很可爱呢！',
      '今天开心吗？': '和你聊天很开心！'
    };
    return responses[userMessage] || '我收到你的消息了，真高兴和你聊天！';
    },
  
    handleFeed() {
    console.log('投喂动作触发');
    },
    handleGame() {
    console.log('游戏动作触发');
    },
    handleRest() {
    console.log('休息动作触发');
    },
    handlePet() {
    console.log('抚摸动作触发');
    }
  },
  
  updated() {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  };
  </script>
  
  <style scoped>
  /* 基础布局 */
  .page {
  width: 95%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: transparent;
  }
  
  .wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.57) 0%,rgba(255, 255, 255,0.24) 100%);
  border: none;
  outline: none;
  }
  
  .main-container {
  display: flex;
  gap: 25px;
  height: calc(100% - 40px);
  }
  
  /* 左侧聊天区域 - 垂直布局 */
  .chat-area {
  flex: 7;
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  border-radius: 10px;
  background: rgba(255,255,255,0.64);
  overflow: hidden;
  gap: 1px;
  height: 100%; /* 父容器高度100% */
  }
  
  /* 聊天记录 - 占据剩余所有高度 */
  .chat-container {
  flex: 1; /* 关键：占据除了标题、快速回复、输入区外的所有高度 */
  padding: 10px;
  overflow-y: auto;
  box-sizing: border-box;
  }
  
  /* 快速回复 - 按钮最高40px */
  .quick-reply {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  flex-wrap: wrap;
  overflow-y: auto;
  box-sizing: border-box;
  }
  
  /* 输入区域 - 高度不超过总高20% */
  .input-area {
  position: relative; /* 作为发送按钮的定位容器 */
  padding: 10px 20px;
  box-sizing: border-box;
  max-height: 20%; /* 核心限制：不超过总高度20% */
  }
  
  /* 消息项样式（保持不变） */
  .message-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
  }
  
  .message-item.user {
  flex-direction: row-reverse;
  }
  
  .avatar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin: 0 10px;
  }
  
  .message-bubble {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  word-wrap: break-word;
  font-family: 'PingFang SC';
  font-size: 14px;
  }
  
  .message-item.user .message-bubble {
  background-color: #e1eeff;
  color: #333;
  border-bottom-right-radius: 5px;
  }
  
  .message-item.lovi .message-bubble {
  background-color: #f0f0f0;
  color: #333;
  border-bottom-left-radius: 5px;
  }
  
  /* 快速回复按钮 - 最高40px（保持原有样式） */
  .quick-btn {
  padding: 8px 16px;
  max-height: 40px; /* 核心限制：按钮最高40px */
  border: none;
  border-radius: 8px;
  background: rgba(225,238,255,1);
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  }
  
  .quick-btn.active {
  color: #1890ff;
  font-weight: bold;
  transform: scale(1.05);
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
   /* 确保文字从左上开始显示 */
  vertical-align: top; /* 垂直方向从顶部开始 */
  text-align: left; /* 水平方向从左侧开始（默认值，可省略） */
  }
  
  .input-field::placeholder {
  color: rgba(191,196,217,1);
  }
  
  /* 发送按钮 - 定位在输入框右下角 */
  .send-btn {
  position: absolute; /* 绝对定位 */
  right: 28px; /* 距离右侧边距 */
  bottom: 18px; /* 距离底部边距 */
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
  }
  
  /* 发送图标（保持原有尺寸） */
  .send-icon {
  width: 32px;
  height: 32px;
  }
  
  /* 右侧Lovi信息区域（保持不变） */
  .lovi-info {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255,255,255,0.64);
  border: 1px solid #fff;
  box-sizing: border-box;
  }
  
  .lovi-icon-title {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
  }
  
  .chat-icon-title {
  display: flex;
  align-items: start;
  gap: 4px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 20px;
  }
  
  .lovi-icon {
  width: 18px;
  height: 18px;
  object-fit: cover;
  }
  
  .lovi-title {
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 600;
  color: #333;
  }
  
  .lovi-avatar-container {
  position: relative;
  margin-bottom: 15px;
  }
  
  .lovi-avatar {
  margin-left: 40px;  
  width: 300px;
  height: 300px; 
  object-fit: contain;
  }
  
  .lovi-status {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  font-family: 'PingFang SC';
  font-size: 12px;
  background: linear-gradient(180deg, rgba(124,150,255,0.3) 0%,rgba(4,167,219,0.15) 100%);
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .lovi-status::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 15px;
  border-width: 5px 5px 0;
  border-style: solid;
  border-color: rgba(124,150,255,0.3) transparent transparent;
  }
  
  .lovi-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    width: 100%;
    /* max-width: 372px; */
  }
  
  .action-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: rgba(225,238,255,1);
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  }
  
  .action-btn:hover {
  background: rgba(200,225,255,1);
  transform: translateY(-2px);
  }
  
  .action-btn:active {
  background: rgba(180,215,255,1);
  transform: translateY(0);
  } 
  
  /* 响应式适配（保持不变） */
  @media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .lovi-info {
    flex: none;
    height: auto;
  }
  
  .lovi-avatar {
    width: 180px;
    height: 150px;
  }
  
  .message-bubble {
    max-width: 80%;
  }
  }
  </style>