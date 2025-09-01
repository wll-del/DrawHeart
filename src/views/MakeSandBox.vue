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
              <!-- <div class="element-content">
                {{ element.name }}
              </div> -->
              <img :src=element.img alt="图片描述"  class="element-img"/>
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
            <img :src="require('@/assets/paint_icon.png')" class="elements-icon" alt="元素库图标">
            <span class="elements-title">元素库</span>
          </div>
          
          <div class="elements-grid">
            <div 
              v-for="(element, index) in element_type" 
              :key="'library-'+index"
              class="element-type-item"
              @click="selectType(index)"
            >
              {{ element.name }}
            </div>

          <!-- 元素库网格布局（核心内容区） -->
          <div class="elements-grid">
            <div 
              v-for="(element, index) in elements_content" 
              :key="'library-'+index"
              class="element-item"
              draggable="true"
              @dragstart="onDragStart($event, element)"
            >
              <img :src=element.img alt="图片描述"  class="element-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue'
import { nanoid } from 'nanoid'
// import SandBoxRes from './sandbox/SandBoxRes.vue'
import {save_work, analyse_sand} from "@/api/sandbox"
export default {
  name: 'SandboxApp',
  data(){
    return{
      element_type : [
        {name: '地形', type: 'rectangle', color: '#3eaf7c'},
        {name: '植物', type: 'rectangle', color: '#3eaf7c'},
        {name: '自然景观', type: 'rectangle', color: '#3eaf7c'},
        {name: '人物', type: 'rectangle', color: '#3eaf7c'},
        {name: '交通', type: 'rectangle', color: '#3eaf7c'},
        {name: '社会科学', type: 'rectangle', color: '#3eaf7c'},
        {name: '宗教', type: 'rectangle', color: '#3eaf7c'},
        {name: '动物', type: 'rectangle', color: '#3eaf7c'},
        {name: '建筑物', type: 'rectangle', color: '#3eaf7c'},
      ],
      elementLibrary : reactive([
        { type: 'rectangle', name: '矩形', width: 100, height: 60, color: '#3eaf7c' },
        { type: 'circle', name: '圆形', width: 80, height: 80, color: '#e96900' },
        { type: 'text', name: '文本', width: 120, height: 40, color: '#1890ff' },
        { type: 'image', name: '图片', width: 100, height: 100, color: '#722ed1' },
        { type: 'decision', name: '决策', width: 100, height: 60, color: '#fa541c' }
      ]),
      elements : reactive([]),
      selectedElement : "",
      history : reactive({
        past: [],
        future: [],
        current: []
      }),
      select_type: {},
      elements_content: [],
      type_path : {
        "地形": [
          require("@/assets/terrain/1.png"),
          require("@/assets/terrain/2.png"),
          require("@/assets/terrain/3.png"),
          require("@/assets/terrain/4.png"),
          require("@/assets/terrain/5.png"),
          require("@/assets/terrain/6.png")
        ],
        "植物": [
          require("@/assets/plant/1.png"),
          require("@/assets/plant/2.png"),
          require("@/assets/plant/3.png"),
          require("@/assets/plant/4.png"),
          require("@/assets/plant/5.png"),
          require("@/assets/plant/6.png"),
          require("@/assets/plant/7.png"),
          require("@/assets/plant/8.png"),
          require("@/assets/plant/9.png"),
          require("@/assets/plant/10.png")
        ],
        "自然景观": [
          require("@/assets/natural_landscape/1.png"),
          require("@/assets/natural_landscape/2.png"),
          require("@/assets/natural_landscape/3.png"),
          require("@/assets/natural_landscape/4.png"),
          require("@/assets/natural_landscape/5.png"),
          require("@/assets/natural_landscape/6.png"),
          require("@/assets/natural_landscape/7.png"),
          require("@/assets/natural_landscape/8.png"),
          require("@/assets/natural_landscape/9.png"),
          require("@/assets/natural_landscape/10.png"),
          require("@/assets/natural_landscape/11.png")
        ],
        "人物":[
          require("@/assets/people/1.png"),
          require("@/assets/people/2.png"),
          require("@/assets/people/3.png"),
          require("@/assets/people/4.png"),
          require("@/assets/people/5.png"),
          require("@/assets/people/6.png"),
          require("@/assets/people/7.png"),
          require("@/assets/people/8.png"),
          require("@/assets/people/9.png"),
          require("@/assets/people/10.png"),
          require("@/assets/people/11.png"),
          require("@/assets/people/12.png")
        ],
        "交通":[
          require("@/assets/transportation/1.png"),
          require("@/assets/transportation/2.png"),
          require("@/assets/transportation/3.png"),
          require("@/assets/transportation/4.png"),
          require("@/assets/transportation/5.png"),
          require("@/assets/transportation/6.png"),
          require("@/assets/transportation/7.png"),
          require("@/assets/transportation/8.png"),
          require("@/assets/transportation/9.png"),
          require("@/assets/transportation/10.png"),
          require("@/assets/transportation/11.png"),
          require("@/assets/transportation/12.png"),
          require("@/assets/transportation/13.png"),
          require("@/assets/transportation/14.png"),
          require("@/assets/transportation/15.png")
        ],
        "动物":[
          require("@/assets/animal/1.png"),
          require("@/assets/animal/2.png"),
          require("@/assets/animal/3.png"),
          require("@/assets/animal/4.png"),
          require("@/assets/animal/5.png"),
          require("@/assets/animal/6.png"),
          require("@/assets/animal/7.png")
        ],
        "建筑物":[
          require("@/assets/building/1.png"),
          require("@/assets/building/2.png"),
          require("@/assets/building/3.png"),
          require("@/assets/building/4.png"),
          require("@/assets/building/5.png"),
          require("@/assets/building/6.png"),
          require("@/assets/building/6.png"),
          require("@/assets/building/7.png"),
          require("@/assets/building/8.png"),
          require("@/assets/building/9.png"),
          require("@/assets/building/10.png")
        ]},
        wid:""
    }
  },
  mounted() {
    this.saveHistory()
  },
  methods: {
    selectType(index){
      this.select_type = this.element_type[index].name;
      const path_list = this.type_path[this.select_type]
      console.log(this.select_type)
      this.elements_content = []
      for(let i=0;i<path_list.length;i+=1)
      {
        console.log(path_list[i])
        this.elements_content.push(
          {"img" :path_list[i]}  
        )
      }
    },
    
    // 拖拽开始处理
    onDragStart(event, element) {
      event.dataTransfer.setData('elementType', element.img)
      event.dataTransfer.setData('offsetX', event.offsetX)
      event.dataTransfer.setData('offsetY', event.offsetY)
    },
    
    // 拖拽放置处理
    onDrop(event) {
      const img = event.dataTransfer.getData('elementType')
      const offsetX = parseInt(event.dataTransfer.getData('offsetX'))
      const offsetY = parseInt(event.dataTransfer.getData('offsetY'))
      
      // const libraryElement = this.elementLibrary.find(el => el.img === img)
      const libraryElement = img
      if (!libraryElement) return
      
      const rect = this.$refs.whiteboard.getBoundingClientRect()
      const x = event.clientX - rect.left - offsetX
      const y = event.clientY - rect.top - offsetY
      
      // 创建新元素
      const newElement = {
        // ...libraryElement,
        id: nanoid(),
        x,
        y,
        zIndex: this.elements.length + 1,
        "img":libraryElement
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
    async saveProject() {
      try {
        // 1. 生成并验证文件内容
        const xmlBlob = this.exportXML();
        if (!xmlBlob || xmlBlob.size === 0) {
          throw new Error('XML内容为空或无效');
        }

        // PNG生成是异步操作，需要await
        const pngBlob = await this.exportPNG(); 
        if (!pngBlob || pngBlob.size === 0) {
          throw new Error('PNG图片生成失败或为空');
        }

        // 2. 准备表单数据
        const formData = new FormData();
    
        // 添加带文件名的文件字段
        const timestamp = new Date().getTime();
        formData.append('xml_file', xmlBlob, `sandbox-${timestamp}.xml`);
        formData.append('png_file', pngBlob, `sandbox-${timestamp}.png`);
        formData.append('wid', 'new');
    
        // 3. 添加调试输出（开发环境）
        console.log('发送的FormData内容:');
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value instanceof Blob ? 
          `${value.type} (${value.size} bytes)` : value
          );
        }

        // 4. 发送请求并处理响应
        const res = await save_work(formData);
    
        // 5. 处理成功响应
        console.log('保存成功:', res.data);
        this.wid = res.data;
      } catch (error) {
        // 7. 错误处理
        console.error('保存项目失败:', error); 
      }
    },
    
    // 分析沙盘
    async analyzeSandbox() {
      console.log('沙盘分析')
  
      this.saveProject()
      const params = new URLSearchParams({
        wid: this.wid
      }).toString();
      const res = await analyse_sand(params);
      console.log(res)
    },
    
    // 导出XML
    exportXML() {
      // 将元素数据转换为XML格式
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
      xml += '<sandbox version="1.0">\n'
      
      this.elements.forEach(element => {
        xml += `  <element id="${element.id}" type="${element.type}">\n`
        xml += `    <name>${element.img}</name>\n`
        xml += `    <x>${element.x}</x>\n`
        xml += `    <y>${element.y}</y>\n`
        xml += `    <width>${element.width}</width>\n`
        xml += `    <height>${element.height}</height>\n`
        xml += `    <color>${element.color}</color>\n`
        xml += `  </element>\n`
      })
      
      xml += '</sandbox>'
      const xmlBlob = new Blob([xml], { type: 'application/xml' }); 
      return xmlBlob
    },
    
    // 导出PNG
    async exportPNG() {
        // 实际使用时需要先安装：npm install html-to-image
        const { toPng } = await import('html-to-image')
        
        const dataUrl = await toPng(this.$refs.whiteboard, {
         backgroundColor: '#ffffff',
         filter: node => !node.classList || !node.classList.contains('element-selection')
        })
        const response = await fetch(dataUrl);
        const imageBlob = await response.blob();
        return imageBlob
        
        // 下载图片
      //   const a = document.createElement('a')
      //   a.href = dataUrl
      //   a.download = `sandbox-${new Date().getTime()}.png`
      //   document.body.appendChild(a)
      //   a.click()
      //   document.body.removeChild(a)
      // } catch (error) {
      //   console.error('导出PNG失败:', error)
      //   alert('导出PNG时出错，请查看控制台获取详细信息')
      // }
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
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 20px;
}

/* 沙盘图标 - 模仿.lovi-icon */
.sandbox-icon {
  width: 18px;
  height: 18px;
  object-fit: cover;
  padding-top: 3px;
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

.elements-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap:1vw;
  height:100vh;
  overflow-y: auto; /* 元素过多时垂直滚动 */
}
.element-type-item{
  weight: 10vw;
  height: 2vh;
  border: gray;
}
.element-img {
  width: 100%;
  height:100%
}
/* 元素项 - 模仿.action-btn */
.element-item {
  weight: 15vw;
  height: 4vh;
  padding: 10px;
  border: none;
  border-radius: 8px;
  /* background: rgba(225, 238, 255, 1); 与.action-btn背景一致 */
  cursor: grab;
  transition: all 0.2s ease;
  box-sizing: border-box;
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
