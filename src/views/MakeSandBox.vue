<template>
  <div class="sandbox-app">
    <div class="wrap">
      <!-- 主体内容区：左侧沙盘区 + 右侧元素库 -->
      <div class="main-container">
        <!-- 左侧沙盘主区域（对应.page的.chat-area） -->
        <div class="sandbox-area">
          <!-- 图标 + 标题组合（对应.chat-icon-title） -->
          <div class="sandbox-icon-title">
            <img :src="require('@/assets/sanbox_icon.png')" class="sandbox-icon" alt="沙盘图标">
            <span class="sandbox-title">创作沙盘</span>
          </div>
          
          <!-- 中央白板区域（核心编辑区，对应.chat-container） -->
          <div 
            class="whiteboard-container"
            @dragover.prevent
            @drop="onDrop"
            @click="deselectAll"
            ref="whiteboard"
          >
            <div 
              v-for="element in elements" 
              :key="element.id"
              class="element"
              :style="{
                left: element.x + 'px',
                top: element.y + 'px',
                zIndex: element.zIndex
              }"
              @click.stop="selectElement(element)"
              @mousedown="startDrag(element, $event)"
            >
              <div class="element-content">
                {{ element.name }}
              </div>
              <div v-if="element === selectedElement" class="element-selection"></div>
            </div>
          </div>
          
          <!-- 操作面板（对应.quick-reply，原control-bar） -->
          <div class="control-panel">
            <button @click="saveProject">保存作品</button>
            <button @click="analyzeSandbox">分析沙盘</button>
            <button @click="undo">上一步</button>
            <button @click="redo">下一步</button>
            <button @click="deleteSelected">删除元素</button>
            <button @click="exportXML">导出XML</button>
            <button @click="exportPNG">导出PNG</button>
          </div>
        </div>
      
        <!-- 右侧元素库区域（对应.page的.lovi-info） -->
        <div class="elements-info">
          <!-- 图标 + 标题组合（对应.lovi-icon-title） -->
          <div class="elements-icon-title">
            <img :src="require('@/assets/publish_icon.png')" class="elements-icon" alt="元素库图标">
            <span class="elements-title">元素库</span>
          </div>
          
          <!-- 元素库网格布局（核心内容区） -->
          <div class="elements-grid">
            <div 
              v-for="(element, index) in elementLibrary" 
              :key="'library-'+index"
              class="element-item"
              draggable="true"
              @dragstart="onDragStart($event, element)"
            >
              {{ element.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRaw } from 'vue'
import { nanoid } from 'nanoid'

export default {
  name: 'SandboxApp',
  setup() {
    // 元素库 - 预定义的可用元素
    const elementLibrary = reactive([
      { type: 'rectangle', name: '矩形', width: 100, height: 60, color: '#3eaf7c' },
      { type: 'circle', name: '圆形', width: 80, height: 80, color: '#e96900' },
      { type: 'text', name: '文本', width: 120, height: 40, color: '#1890ff' },
      { type: 'image', name: '图片', width: 100, height: 100, color: '#722ed1' },
      { type: 'decision', name: '决策', width: 100, height: 60, color: '#fa541c' }
    ])
    
    // 白板上的元素
    const elements = reactive([])
    
    // 选中元素
    const selectedElement = ref(null)
    
    // 操作历史
    const history = reactive({
      past: [],
      future: [],
      current: []
    })
    
    return {
      elementLibrary,
      elements,
      selectedElement,
      history
    }
  },
  mounted() {
    this.saveHistory()
  },
  methods: {
    // 拖拽开始处理
    onDragStart(event, element) {
      event.dataTransfer.setData('elementType', element.type)
      event.dataTransfer.setData('offsetX', event.offsetX)
      event.dataTransfer.setData('offsetY', event.offsetY)
    },
    
    // 拖拽放置处理
    onDrop(event) {
      const type = event.dataTransfer.getData('elementType')
      const offsetX = parseInt(event.dataTransfer.getData('offsetX'))
      const offsetY = parseInt(event.dataTransfer.getData('offsetY'))
      
      const libraryElement = this.elementLibrary.find(el => el.type === type)
      if (!libraryElement) return
      
      const rect = this.$refs.whiteboard.getBoundingClientRect()
      const x = event.clientX - rect.left - offsetX
      const y = event.clientY - rect.top - offsetY
      
      // 创建新元素
      const newElement = {
        ...libraryElement,
        id: nanoid(),
        x,
        y,
        zIndex: this.elements.length + 1
      }
      
      this.elements.push(newElement)
      this.saveHistory()
      this.selectElement(newElement)
    },
    
    // 开始拖拽移动
    startDrag(element, event) {
      this.selectElement(element)
      
      const startX = element.x
      const startY = element.y
      const mouseStartX = event.clientX
      const mouseStartY = event.clientY
      
      const onMouseMove = (e) => {
        const dx = e.clientX - mouseStartX
        const dy = e.clientY - mouseStartY
        element.x = startX + dx
        element.y = startY + dy
      }
      
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
        this.saveHistory()
      }
      
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    },
    
    // 选中元素
    selectElement(element) {
      this.selectedElement = element
    },
    
    // 取消选中
    deselectAll() {
      this.selectedElement = null
    },
    
    // 删除选中元素
    deleteSelected() {
      if (!this.selectedElement) return
      
      const index = this.elements.indexOf(this.selectedElement)
      if (index !== -1) {
        this.elements.splice(index, 1)
        this.selectedElement = null
        this.saveHistory()
      }
    },
    
    // 保存操作历史
    saveHistory() {
      this.history.past.push(JSON.parse(JSON.stringify(toRaw(this.elements))))
      this.history.future = []
    },
    
    // 撤销操作
    undo() {
      if (this.history.past.length <= 1) return
      
      this.history.future.push(this.history.past.pop())
      this.elements.splice(0, this.elements.length, ...this.history.past[this.history.past.length - 1])
    },
    
    // 重做操作
    redo() {
      if (this.history.future.length === 0) return
      
      const nextState = this.history.future.pop()
      this.history.past.push(JSON.parse(JSON.stringify(nextState)))
      this.elements.splice(0, this.elements.length, ...nextState)
    },
    
    // 保存项目
    saveProject() {
      const projectData = JSON.stringify({
        elements: toRaw(this.elements),
        savedAt: new Date().toISOString()
      })
      
      // 创建Blob对象并下载
      const blob = new Blob([projectData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sandbox-project-${new Date().getTime()}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    // 分析沙盘
    analyzeSandbox() {
      // 这里可以实现沙盘分析逻辑
      console.log('沙盘分析:', this.elements)
      alert(`沙盘当前有 ${this.elements.length} 个元素`)
    },
    
    // 导出XML
    exportXML() {
      // 将元素数据转换为XML格式
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
      xml += '<sandbox version="1.0">\n'
      
      this.elements.forEach(element => {
        xml += `  <element id="${element.id}" type="${element.type}">\n`
        xml += `    <name>${element.name}</name>\n`
        xml += `    <x>${element.x}</x>\n`
        xml += `    <y>${element.y}</y>\n`
        xml += `    <width>${element.width}</width>\n`
        xml += `    <height>${element.height}</height>\n`
        xml += `    <color>${element.color}</color>\n`
        xml += `  </element>\n`
      })
      
      xml += '</sandbox>'
      
      // 创建Blob对象并下载
      const blob = new Blob([xml], { type: 'application/xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sandbox-${new Date().getTime()}.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    // 导出PNG
    async exportPNG() {
      // 使用html-to-image库或类似方法将白板转换为图片
      try {
        // 这里假设使用html-to-image库
        // 实际使用时需要先安装：npm install html-to-image
        // const { toPng } = await import('html-to-image')
        
        // const dataUrl = await toPng(this.$refs.whiteboard, {
        //  backgroundColor: '#ffffff',
        //  filter: node => !node.classList || !node.classList.contains('element-selection')
        // })
        
        // 下载图片
        // const a = document.createElement('a')
        // a.href = dataUrl
        // a.download = `sandbox-${new Date().getTime()}.png`
        // document.body.appendChild(a)
        // a.click()
        // document.body.removeChild(a)
      } catch (error) {
        console.error('导出PNG失败:', error)
        alert('导出PNG时出错，请查看控制台获取详细信息')
      }
    }
  }
}
</script>

<style scoped>
/* 基础布局 - 完全模仿.page */
.sandbox-app {
  width: 95%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: transparent;
}

/* 包裹层 - 完全模仿.wrap */
.wrap {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 40px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.57) 0%, rgba(255, 255, 255, 0.24) 100%);
  border: none;
  outline: none;
}

/* 主体容器 - 完全模仿.main-container */
.main-container {
  display: flex;
  gap: 25px;
  height: calc(100% - 40px);
}

/* 左侧沙盘主区域 - 模仿.chat-area */
.sandbox-area {
  flex: 7; /* 70%宽度，与.chat-area一致 */
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.64); /* 与.chat-area背景透明度一致 */
  overflow: hidden;
  gap: 1px;
  height: 100%;
}

/* 图标+标题组合 - 模仿.chat-icon-title */
.sandbox-icon-title {
  display: flex;
  align-items: start;
  gap: 4px;
  margin-top: 15px;
  margin-bottom: 10px;
  margin-left: 20px;
}

/* 沙盘图标 - 模仿.lovi-icon */
.sandbox-icon {
  width: 18px;
  height: 18px;
  object-fit: cover;
}

/* 沙盘标题 - 模仿.lovi-title */
.sandbox-title {
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 白板容器 - 模仿.chat-container */
.whiteboard-container {
  flex: 1; /* 占据剩余高度，与.chat-container一致 */
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  cursor: default;
}

/* 操作面板 - 模仿.quick-reply */
.control-panel {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  flex-wrap: wrap;
  overflow-x: auto; /* 按钮过多时横向滚动 */
  box-sizing: border-box;
}

/* 操作面板按钮 - 模仿.quick-btn */
.control-panel button {
  padding: 8px 16px;
  max-height: 40px; /* 与.quick-btn高度限制一致 */
  border: none;
  border-radius: 8px;
  background: rgba(225, 238, 255, 1); /* 与.quick-btn背景一致 */
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  white-space: nowrap;
}

.control-panel button:hover {
  background: rgba(200, 225, 255, 1);
  transform: scale(1.05); /* 模仿.active状态的缩放效果 */
}

/* 右侧元素库区域 - 模仿.lovi-info */
.elements-info {
  flex: 3; /* 30%宽度，与.lovi-info一致 */
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.64); /* 与.lovi-info背景一致 */
  border: 1px solid #fff;
  box-sizing: border-box;
}

/* 元素库图标+标题 - 模仿.lovi-icon-title */
.elements-icon-title {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 10px;
}

/* 元素库图标 - 模仿.lovi-icon */
.elements-icon {
  width: 18px;
  height: 18px;
  object-fit: cover;
}

/* 元素库标题 - 模仿.lovi-title */
.elements-title {
  font-family: 'PingFang SC';
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

/* 元素库网格 - 模仿.lovi-actions的网格布局 */
.elements-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr; /* 2列网格，与.lovi-actions一致 */
  gap: 12px; /* 间距与.lovi-actions一致 */
  overflow-y: auto; /* 元素过多时垂直滚动 */
}

/* 元素项 - 模仿.action-btn */
.element-item {
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: rgba(225, 238, 255, 1); /* 与.action-btn背景一致 */
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: grab;
  transition: all 0.2s ease;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.element-item:hover {
  background: rgba(200, 225, 255, 1);
  transform: translateY(-2px); /* 模仿.action-btn的hover效果 */
}

.element-item:active {
  cursor: grabbing;
  background: rgba(180, 215, 255, 1);
  transform: translateY(0); /* 模仿.action-btn的active效果 */
}

/* 白板元素样式（保留原逻辑，仅适配新布局） */
.element {
  position: absolute;
  cursor: move;
  user-select: none;
}

.element-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid currentColor;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.element-selection {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border: 2px dashed #1890ff;
  pointer-events: none;
}

/* 响应式适配 - 完全模仿.page的响应式逻辑 */
@media (max-width: 768px) {
  .main-container {
    flex-direction: column; /* 小屏幕下改为垂直布局 */
  }
  
  .sandbox-area, .elements-info {
    flex: none;
    height: auto; /* 高度自适应 */
  }
  
  .elements-grid {
    grid-template-columns: repeat(3, 1fr); /* 小屏幕3列网格，提升利用率 */
  }
}
</style>
