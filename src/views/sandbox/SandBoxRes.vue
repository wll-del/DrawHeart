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
            <b>篝火</b>：象征对 “情感温暖” 的渴望（缓解加班的孤独与挫败感），也代表 “情绪释放” 的需求（借火焰宣泄压力），是在挫败中寻找慰藉的隐喻。<br>
<b>整理行李的人物</b>：反映内在试图梳理混乱思绪（如同反复修改方案的 “混乱感”），也隐含 “重新规划、寻求改变” 的潜意识动力 —— 即便当下受挫，仍想为自己寻找新的方向。<br>
<b>兔子</b>：代表内心温柔、敏感的部分，显示创作者在自我否定的同时，仍保留着对 “被理解、被善待” 的期待，是内在柔软性的体现。<br>
<b>树木</b>：象征生命力与成长潜能，说明创作者并未因挫败完全陷入绝望，内在仍有 “恢复、发展” 的动力（如同植物持续生长的本能）。<br>
<b>石头</b>：既具象化了 “压力”（领导的批评、工作的重负如同 “巨石” 压身），也暗含 “稳定感” 的需求 —— 在混乱的工作中，渴望抓住一些确定的东西。<br>
<b>交通锥</b>：像是一种 “心理警示” 或 “界限划定”：既对当前 “方案没抓住重点” 的困境保持警觉，也可能是潜意识里想为自己划定心理边界（试图在高压工作中保护自我，避免被压力完全吞噬）。<br>
          </p>
        </div>
        
        <!-- 核心问题提炼 -->
        <div class="analysis-section">
          <h3 class="section-title">核心问题提炼</h3>
          <p class="section-content">
            创作者处于 “工作压力巨大、自我价值感低落” 的状态，但沙盘并未呈现彻底的绝望，反而透出 “在挫败中寻求疗愈与重建” 的潜在动力：既有 “自我怀疑（觉得自己没用）” 的痛苦，也有 “渴望温暖支持、释放情绪” 的需求（篝火的意象）；既有 “被混乱工作裹挟” 的疲惫（反复改方案的混乱感），也有 “主动整理、尝试改变” 的内在动作（整理行李的人物）；<br>
简言之，沙盘呈现了 “挫败后的复杂心境”：压力与自我怀疑存在，但 “疗愈、整理自我、渴望成长与保护内心” 的潜在动力也在悄然运作。
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
    top: 50px;
    left: 0;
    width: 100%;
    height: 450px;
    padding: 39px 52px;
    border: 1px solid #fff;
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    background: linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,1) 16.54%);
    backdrop-filter: blur(50px);
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;
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