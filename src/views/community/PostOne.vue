<template>
  <div class="back">
    <div class="post-page">
      <div class="post-header">
        <h2 class="welcome-title">欢迎来到画心岛小组</h2>
        <p class="welcome-subtitle">驻足画心岛小组，让每一次交流都成为心灵的小确幸</p>
      </div>
  
      <div class="post-content">
        <div class="title-section">
          <div class="title-input">
            <!-- <p class="input-placeholder">请输入帖子标题</p> -->
            <input 
              v-model="title" 
              class="input-placeholder" 
              placeholder="请输入帖子标题"
              @keyup.enter="handleSearch"
            >
            <p class="char-counter">0/25</p>
          </div>
        </div>
  
        <div class="content-section">
          <div class="content-input">
            <div class="divider"></div>
            <!-- <p class="content-placeholder">点击输入正文</p> -->
            <textarea 
              v-model="content" 
              class="content-placeholder" 
              placeholder="点击输入正文"
              @keyup.enter="handleSearch"
            >
            </textarea>
          </div>
        </div>
  
        <div class="post-footer">
          <p class="word-count">字数:{{postcnt}}</p>
          <!-- <button class="preview-btn">预览</button> -->
          <!-- <button class="schedule-btn">定时发布</button> -->
          <button class="publish-btn" @click="handleSubmit">发布</button>
        </div>
      </div>
    </div>
    <div @click="handleCancel">x</div>
  </div>
  </template>
  
  <script>
  import {create_post} from '@/api/community.js'
  export default {
    name: "PostOneComponent",
    props: {},
    data(){
      return{
        title:"",
        content:"",
      }
    },
    computed:{
      postcnt(){
        return this.content.length
      }
    },
    methods:{
      handleCancel() {
        alert("close")
        this.$emit('cancel')
      },
      async handleSubmit(){
        const data={
          "title": this.title,
          "content": this.content,
          "first_photo_id":"xxxx",
          "photos_id": "xxxx"
        }
        const res = await create_post(data)
        alert(res["message"]) ;
        this.$emit('submit')
      }
    }
    
  };
  </script>
  
  <style scoped>
  .back{
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: row;
    padding:1vw 1vh;
  }
  .post-page {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background: white;
    display: flex;
    flex-direction: column;
    overflow-y: auto; /* 添加滚动条 */
  }
  
  .post-header {
    margin-bottom: 30px;
  }
  
  .welcome-title {
    font-family: 'PingFang SC';
    font-size: 1.5rem; /* 改用相对单位 */
    color: rgba(36,37,41,1);
    line-height: 26px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  .welcome-subtitle {
    font-family: 'PingFang SC';
    font-size: 18px;
    color: rgba(90,92,102,1);
    line-height: 22px;
    font-weight: 400;
  }
  
  .post-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    font-family: 'PingFang SC';
    background: 
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, #00B2FF 0%, #4D6EF2 50%, #BF9FFF 100%) border-box;
    border: 2px solid transparent;
    box-sizing: border-box;
    padding: 16px
  }
  
  .title-section {
    border: none;
    margin-bottom: 20px;
  }
  
  .title-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: none;
  }
  
  .input-placeholder {
    font-family: 'PingFang SC';
    font-size: 26px;
    color: #333;
    line-height: 40px;
    font-weight: 400;
    border: none;
  }
  
  .char-counter {
    font-family: 'PingFang SC';
    font-size: 14px;
    color: rgba(191,196,217,1);
    line-height: 14px;
    font-weight: 400;
  }
  
  .content-section {
    flex: 1;
  }
  
  .content-input {
    margin-top: -5px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .divider {
    width: 100%;
    height: 1px;
    background-color: rgba(232,235,242,1);
    margin-bottom: 15px;
  }
  
  .content-placeholder {
    font-family: 'PingFang SC';
    font-size: 17px;
    color: #333;
    line-height: 16px;
    font-weight: 400;
    border: none;
    height:100%;
  }
  
  .post-footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 8px 0;
    border-top: 1px solid rgba(232,235,242,1);
  }
  
  .word-count {
    font-family: 'PingFang SC';
    font-size: 12px;
    color: rgba(146,150,166,1);
    line-height: 12px;
    font-weight: 400;
    margin-right: auto;
  }
  
  .preview-btn,
  .schedule-btn,
  .publish-btn {
    height: 36px;
    padding: 0 15px;
    border-radius: 6px;
    font-family: 'PingFang SC';
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  } 
  
  .publish-btn {
    background: linear-gradient(148deg, rgba(35,76,255,1) 0.84%,rgba(0,194,255,1) 202.43%);
    color: white;
    border: none;
    margin-left: 15px;
    padding: 0 25px;
  }
  
  @media (max-width: 768px) {
    .post-page {
      padding: 15px;
    }
    
    .welcome-title {
      font-size: 22px;
    }
    
    .welcome-subtitle {
      font-size: 16px;
    }
    
    .input-placeholder {
      font-size: 22px;
    }
    
    .preview-btn,
    .schedule-btn,
    .publish-btn {
      height: 32px;
      font-size: 13px;
      padding: 0 12px;
    }
  }
  </style>