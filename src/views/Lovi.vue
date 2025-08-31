<template>
  <div class="page">
    <div class="wrap">
      <div class="container">
        <div class="content">
        <!-- 1. 聊天记录区域（新增）：渲染 messages 数组中的对话 -->
        <div class="chat-container">
          <div 
            class="message-item" 
            v-for="(msg, index) in messages" 
            :key="index"
            :class="{ 'user': msg.isUser, 'lovi': !msg.isUser }"
          >
            <div class="avatar">
              <img 
                :src="msg.isUser ? require('@/assets/Image7.png') : require('@/assets/tree1.png')" 
                alt="avatar"
              >
            </div>
            <div class="message-bubble">{{ msg.content }}</div>
          </div>
        </div>
	
        <!-- 2. 输入区域（保留原有结构，优化样式关联） -->
        <div class="main">
          <div class="section">
            <div class="subSection">
              <div class="block1"><div class="div5"></div></div>
              <div class="block">
                <div class="subBlock">
                  <div class="input-container">
                    <input 
                      v-model="message" 
                      class="input-field"
                      :placeholder="showPlaceholder ? '对Lovi说点什么...' : ''"
                      @focus="clearPlaceholder"
                      @blur="restorePlaceholder"
                      @keyup.enter="sendMessage" 
                    />
                    <button class="send-button" @click="sendMessage">
                      <img
                        :src="require('@/assets/tree1.png')"
                        class="send-icon"
                        alt="发送"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
	
          <!-- 3. 快速回复区域（保留原有结构） -->
          <div class="section1">
            <div class="subSection1">
              <div class="block2" @click="sendQuickMessage('你好')">
                <p class="text1" :class="{ 'active-text': activeText === '你好' }">你好</p>
              </div>
              <div class="block3" @click="sendQuickMessage('我爱你')">
                <p class="text2" :class="{ 'active-text': activeText === '我爱你' }">我爱你</p>
              </div>
              <div class="block4" @click="sendQuickMessage('你真可爱')">
                <p class="text3" :class="{ 'active-text': activeText === '你真可爱' }">你真可爱</p>
              </div>
              <div class="block5" @click="sendQuickMessage('今天开心吗？')">
                <p class="text4" :class="{ 'active-text': activeText === '今天开心吗？' }">今天开心吗？</p>
              </div>
            </div>
          </div>
        </div>
      </div>
	
        <!-- 右侧 Lovi 信息区域（保留原有结构） -->
        <div class="content1">
          <div class="main2">
            <div class="section4">
              <div class="subSection3">
                <div class="block8">
                  <div class="subBlock4">
                    <div class="div6">
                      <div class="div7">
                        <button class="div8" @click="handleFeed"><p class="text7">投喂</p></button>
                        <button class="div9" @click="handleGame"><p class="text8">游戏</p></button>
                      </div>
                    </div>
                    <div class="div10">
                      <div class="div11">
                        <button class="div12" @click="handleRest"><p class="text9">休息</p></button>
                        <button class="div13" @click="handlePet"><p class="text10">抚摸</p></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="subSection4">
                <p class="text14">我的Lovi</p>
                <img
                  :src="require('@/assets/lovi.gif')"
                  class="image3"
                  alt="Image Asset 4"
                />
                <div class="block9"></div>
                <div class="block10">
                  <p class="text11">新的一天，lovi心情不错～</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
	
      <!-- 底部导航区域（保留原有结构） -->
      <div class="container1">
        <p class="text13">跟Lovi聊聊天</p>
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
      // 初始消息加入 messages 数组（替换原模板静态文本）
      messages: [
        {
          content: '嗨！我是你的专属lovi，很高兴认识你',
          isUser: false,
          timestamp: new Date().toISOString()
        },
        {
          content: '今天开心吗',
          isUser: false,
          timestamp: new Date().toISOString()
        }
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

    async sendMessage(text = null) {
      // 先将内容转为字符串，再处理
      const messageContent = (text || this.message) + ''; // 转为字符串
      if (!messageContent.trim()) return;

      // 1. 添加用户消息到聊天记录
      this.messages.push({
        content: messageContent,
        isUser: true,
        timestamp: new Date().toISOString()
      });

      try {
        // 2. 发送消息到后端
		const params = new URLSearchParams({
            chat_content: messageContent,
            chat_type: "text"
        }).toString();

		const response =await chat(params)

        if (response.code) {
          console.log('消息发送成功');
          // 清空输入框
          this.message = '';
          this.$nextTick(() => {
            this.showPlaceholder = true;
          });
          // 重置快速回复激活状态
          this.activeText = '';

          this.messages.push({
            content: response.data,
            isUser: false,
            timestamp: new Date().toISOString()
        });
          // 3. 模拟后端返回Lovi回复（实际项目中应使用response.data中的回复）
        //   setTimeout(() => {
        //     this.messages.push({
        //       content: this.getLoviResponse(messageContent),
        //       isUser: false,
        //       timestamp: new Date().toISOString()
        //     });
        //   }, 1000);
        } else {
          console.error('消息发送失败:', response.data.message);
          // 发送失败时提示用户
          this.messages.push({
            content: '抱歉，消息发送失败，请重试',
            isUser: false,
            timestamp: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('发送消息出错:', error);
        // 网络错误提示
        this.messages.push({
          content: '网络异常，请检查网络后重试',
          isUser: false,
          timestamp: new Date().toISOString()
        });
      }
    },

    // 快速回复逻辑（优化激活状态）
    sendQuickMessage(text) {
      this.activeText = text; // 激活当前快速回复样式
      this.sendMessage(text); // 调用发送方法
    },

    // Lovi回复逻辑（保持不变，可扩展）
    getLoviResponse(userMessage) {
      const responses = {
        '你好': '你好呀！我是Lovi~',
        '我爱你': '我也爱你哦！',
        '你真可爱': '谢谢夸奖，你也很可爱呢！',
        '今天开心吗？': '和你聊天很开心！'
      };
      return responses[userMessage] || '我收到你的消息了，真高兴和你聊天！';
    },

    // 以下方法保持不变
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
  
    // 页面加载完成后滚动到最新消息
    updated() {
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  };
  </script>
  
  <style scoped>
  .page {
	width: 100%;
	height: 100%;
	overflow: auto;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
  }
  .wrap {
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg, rgba(255,255,255,0.53) 0%,rgba(255,255,255,0) 89.72%);
	border-radius: 35px;
	border-width: 2px;
	box-sizing: border-box;
	backdrop-filter: blur(200px);
	padding: 20px;
  }
  .container {
	width: 100%;
	height: calc(100% - 40px);
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 20px;
  }
  .content {
	width: 60%;
	height: 100%;
	overflow: auto;
	border-radius: 10px;
	border: 1px solid rgba(255,255,255,1);
	box-sizing: border-box;
	background: rgba(255,255,255,0.64);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
  }
  .main1 {
	width: 642px;
	height: 301px;
	box-sizing: border-box;
	margin-top: 51px;
	margin-left: 47px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
  }
  .section2 {
	width: 311px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
  }
  .subSection2 {
	width: 311px;
	height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  .block6 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 35px;
	height: 35px;
  }
  .image1 {
	width: 35px;
	height: 35px;
  }
  .block7 {
	width: 264px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
  }
  .text5 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .section3 {
	width: 102px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-top: 78px;
	margin-left: 540px;
  }
  .text6 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .main {
	width: 686px;
	height: 186px;
	margin-top: 140px;
	margin-left: 21px;
	position: relative;
  }
  .section {
	position: absolute;
	top: 22px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 686px;
	height: 164px;
  }
  .subSection {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 686px;
	height: 164px;
  }
  .block1 {
	margin-left: 228px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 16px;
	height: 16px;
  }
  .div5 {
	width: 16px;
	box-sizing: border-box;
	min-height: 16px;
  }
  .block {
	width: 686px;
	height: 128px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
  }
  .subBlock {
	width: 686px;
	height: 128px;
	background-color: rgba(255,255,255,1);
	border-radius: 13px;
	border-width: 1.50px;
	box-sizing: border-box;
	background: rgba(255,255,255,1);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
  }
  .input-container {
	display: flex;
	width: 100%;
	padding: 12px;
  }
  
  .input-field {
	flex: 1;
	padding: 8px;
	border: 1px solid rgba(191,196,217,1);
	border-radius: 8px;
	font-family: 'PingFang SC';
	font-size: 14px;
	color: rgba(0,0,0,1);
  }
  
  .input-field::placeholder {
	color: rgba(191,196,217,1);
  }
  
  .send-button {
	margin-left: 8px;
	padding: 8px;
	background: rgba(225,238,255,1);
	border: none;
	border-radius: 8px;
	cursor: pointer;
  }
  
  .send-icon {
	width: 16px;
	height: 16px;
  }
  
  .active-text {
	color: #1890ff;
	font-weight: bold;
	transform: scale(1.05);
	transition: all 0.2s ease;
  }
  
  .message-container {
	width: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	gap: 8px;
  }
  
  .message-bubble {
	max-width: 70%;
	padding: 10px 15px;
	border-radius: 18px;
	margin: 5px 0;
	word-wrap: break-word;
  }
  
  .user-message {
	align-self: flex-end;
	background-color: #1890ff;
	color: white;
  }
  
  .lovi-message {
	align-self: flex-start;
	background-color: #f0f0f0;
	color: #333;
  }
  .div {
	margin-top: 13.14px;
	margin-left: 641px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 73.86px;
  }
  .div1 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 32px;
	height: 73.86px;
  }
  .div2 {
	width: 25.71px;
	box-sizing: border-box;
	min-height: 25.71px;
	margin-left: 0.57px;
  }
  .image {
	width: 32px;
	height: 32px;
  }
  .section1 {
	width: 365px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 9px;
	position: absolute;
	top: 0px;
	left: 0px;
  }
  .subSection1 {
	width: 365px;
	height: 36px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
  }
  .block2 {
	width: 60px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
  }
  .text1 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 14px;
	font-weight: 400;
  }
  .block3 {
	width: 74px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-left: 9px;
  }
  .text2 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 14px;
	font-weight: 400;
  }
  .block4 {
	width: 88px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-left: 9px;
  }
  .text3 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 14px;
	font-weight: 400;
  }
  .block5 {
	width: 116px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin-left: 9px;
  }
  .text4 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 14px;
	font-weight: 400;
  }
  .content1 {
	width: 453px;
	height: 785px;
	position: relative;
  }
  .main2 {
	position: absolute;
	top: 9.19px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 416px;
	height: 710.81px;
  }
  .section4 {
	position: relative;
	width: 416px;
	height: 710.81px;
  }
  .subSection3 {
	width: 416px;
	height: 705px;
	background-color: rgba(255,255,255,0.64);
	border-radius: 10px;
	border-color: rgba(255,255,255,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	background: rgba(255,255,255,0.64);
	position: absolute;
	top: 5.81px;
	left: 0px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
  }
  .block8 {
	width: 372px;
	height: 84px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
	margin-top: 286px;
  }
  .subBlock4 {
	width: 372px;
	height: 84px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
  }
  .div6 {
	width: 372px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
  }
  .div7 {
	width: 372px;
	height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  .div8 {
	width: 180px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;
  }
  
  .div8:hover {
	background: rgba(200,225,255,1);
	transform: translateY(-2px);
  }
  
  .div8:active {
	background: rgba(180,215,255,1);
	transform: translateY(0);
  }
  .text7 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .div9 {
	width: 180px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;
  }
  
  .div9:hover {
	background: rgba(200,225,255,1);
	transform: translateY(-2px);
  }
  
  .div9:active {
	background: rgba(180,215,255,1);
	transform: translateY(0);
  }
  .text8 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .div10 {
	width: 372px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
  }
  .div11 {
	width: 372px;
	height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: center;
  }
  .div12 {
	width: 180px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;
  }
  
  .div12:hover {
	background: rgba(200,225,255,1);
	transform: translateY(-2px);
  }
  
  .div12:active {
	background: rgba(180,215,255,1);
	transform: translateY(0);
  }
  .text9 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .div13 {
	width: 180px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(225,238,255,1);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease;
  }
  
  .div13:hover {
	background: rgba(200,225,255,1);
	transform: translateY(-2px);
  }
  
  .div13:active {
	background: rgba(180,215,255,1);
	transform: translateY(0);
  }
  .text10 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .subSection4 {
	position: absolute;
	top: 0px;
	left: 41.51px;
	width: 353.49px;
	height: 316.20px;
  }
  .image2 {
	width: 240.60px;
	height: 48.60px;
	position: absolute;
	top: 223.01px;
	left: 98.69px;
  }
  .image3 {
	width: 253px;
	height: 220px;
	position: absolute;
	top: 40.81px;
	left: 54.49px;
  }
  .image4 {
	width: 229.76px;
	height: 316.20px;
	position: absolute;
	top: 0px;
	left: 0px;
  }
  .block9 {
	width: 305px;
	box-sizing: border-box;
	min-height: 228px;
	position: absolute;
	top: 37.81px;
	left: 17.49px;
  }
  .block10 {
	width: 142px;
	height: 32px;
	border-radius: NaNpx;
	border-color: rgba(255,255,255,0.15);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	backdrop-filter: blur(44.5px);
	background: linear-gradient(180deg, rgba(124,150,255,0.3) 0%,rgba(4,167,219,0.15) 100%);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: absolute;
	top: 53.81px;
	left: 211.49px;
  }
  .text11 {
	font-family: 'PingFang SC';
	font-size: 10px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 400;
  }
  .section6 {
	margin-top: 806px;
	margin-left: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 388px;
	height: 46px;
  }
  .subSection5 {
	width: 388px;
	height: 46px;
	background-color: rgba(255,255,255,1);
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(255,255,255,1);
	display: flex;
	justify-content: flex-start;
	align-items: center;
  }
  .text12 {
	margin-left: 16px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(255,255,255,1);
	line-height: 14px;
	font-weight: 400;
  }
  .container1 {
	position: absolute;
	top: 36px;
	left: 39px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	width: 817px;
	height: 22px;
  }
  .content2 {
	width: 16px;
	height: 16px;
	border-radius: 4px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
  }
  .image5 {
	width: 16px;
	height: 16px;
	overflow: hidden;
	box-sizing: border-box;
  }
  .text13 {
	margin-left: 4px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 500;
  }
  .image6 {
	width: 15px;
	height: 15px;
	overflow: hidden;
	box-sizing: border-box;
  }
  .text14 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 500;
  }
  .container2 {
	position: relative;
	top: 867px;
	left: 920px;
	width: 377px;
	height: 56px;
  }
  .content4 {
	width: 377px;
	opacity: 0.12;
	background-color: rgba(214,216,221,1);
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(214,216,221,1);
	min-height: 56px;
	position: absolute;
	top: 0px;
	left: 0px;
  }
  .text15 {
	position: absolute;
	top: 21px;
	left: 16px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(51,51,51,1);
	line-height: 14px;
	font-weight: 400;
  }
  
  .chat-container {
	width: 100%;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
	box-sizing: border-box;
  }
  
  .message-item {
	display: flex;
	margin-bottom: 15px;
	align-items: flex-start;
  }
  
  /* 用户消息靠右 */
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
  
  /* 用户消息样式 */
  .message-item.user .message-bubble {
	background-color: #1890ff;
	color: white;
	border-bottom-right-radius: 5px;
  }
  
  /* Lovi消息样式 */
  .message-item.lovi .message-bubble {
	background-color: #f0f0f0;
	color: #333;
	border-bottom-left-radius: 5px;
  }
  
  /* 优化输入区域布局，使其固定在底部 */
  .content {
	display: flex;
	flex-direction: column;
	height: 100%;
  }
  
  .main {
	margin-top: auto;
	margin-bottom: 20px;
	width: 100%;
	position: relative;
  }
  
  </style>
  