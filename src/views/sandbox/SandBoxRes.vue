<template>
    <div class="page">
      <!-- 背景层 -->
      <div class="background">
        <img src="@/assets/sandbox_res_back.png" class="back">
        <!-- 关闭按钮 -->
        <button class="close-btn" @click="handlecancel">
          <span class="line1"></span>
          <span class="line2"></span>
        </button>
      </div>
      <!-- 信息卡片（核心内容区） -->
      <div class="info-card">
        <!-- 沙盘作品呈现 -->
        <div class="analysis-section">
          <h3 class="section-title">沙盘作品呈现</h3>
          <p class="section-content">
            沙盘整体布局：对称、平衡、空旷，整体风格冷清<br>
            沙的状态：干沙，沙子的造型洞穴，是明显的边界划分
          </p>
        </div>
        
        <!-- 核心问题提炼 -->
        <div class="analysis-section">
          <h3 class="section-title">核心问题提炼</h3>
          <p class="section-content">
            总结沙盘作品呈现的核心主题（如“安全感缺失”“人际关系冲突”“自我探索与成长”“创伤修复”“未来期望”等），说明主题提炼的依据（如沙具选择、场景布局、来访者言语与情绪等）。
          </p>
        </div>
        
        <!-- 保存按钮 -->
        <button class="save-btn" @click="handlecancel">去找lovi聊聊天～
            <!-- <img src="@/assets/save_to_work.png" class="save-icon"> -->
        </button>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SandboxAnalysis",
    props: {
      data: {
      type: String,
      required: true,
      default: '默认标题'
    },
    }, 
    methods: {
        handlecancel() {
        this.$emit('cancel');
        }
    }
  };
  </script>
  
  <style scoped>
  /* 基础样式提取 */
  * {
    box-sizing: border-box;
  }
  
  .page {
    width: 840px;
    height: 567px;
    overflow: hidden;
    position: relative;
    border-radius: 12px;
    background: #fff;
  }
  
  /* 背景层 */
  .background-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 527px;
    background: linear-gradient(180deg, #4899ff 0%, rgba(255,255,255,0) 100%);
    border-radius: 12px;
  }   
  
  /* 信息卡片：半透明区域 */
  .info-card {
    position: absolute;
    top: 174px;
    left: 0;
    width: 100%;
    height: 393px;
    padding: 39px 52px;
    border: 1px solid #fff;
    border-radius: 12px;
    background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 16.54%);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  /* 分析内容区块 */
  .analysis-section {
    color: #3e597e;
    font-family: 'PingFang SC';
  }
  
  .section-title {
    margin: 0 0 6px 0;
    font-size: 18px;
    font-weight: 600;
  }
  
  .section-content {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
    white-space: pre-line;
    line-height: 1.6;
  }
  
  /* 保存按钮 */
  .save-btn {
    align-self: center;
    margin-top: 50px;
    width: 200px;
    height: 40px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(130deg, #234cff 13.24%, #00c2ff 145.37%);
    color: #fff;
    font-family: 'PingFang SC';
    font-size: 14px;
    cursor: pointer;
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

  </style>