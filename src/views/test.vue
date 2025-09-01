<template>
  <div class="sandbox-app">
    <div class="wrap">
      <div class="main-container">
        <!-- 左侧沙盘区域 -->
        <div class="sandbox-area">
          <div class="sandbox-icon-title">
            <img :src="require('@/assets/sanbox_icon.png')" class="sandbox-icon" alt="沙盘图标">
            <span class="sandbox-title">创作沙盘</span>
          </div>
          
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
              :style="elementStyle(element)"
              @mousedown="handleElementMouseDown($event, element)"
            >
              <img :src="element.img" alt="图片描述" class="element-img"/>
              <div 
                v-if="element === selectedElement"
                class="resize-handle"
                @mousedown.stop="startResize($event, element)"
              ></div>
              <div v-if="element === selectedElement" class="element-selection"></div>
            </div>
          </div>
          
          <div class="control-panel">
            <button @click="undo">上一步</button>
            <button @click="redo">下一步</button>
            <button @click="deleteSelected">删除元素</button>
            <button @click="saveProject">保存作品</button>
            <button @click="analyzeSandbox">分析沙盘</button>
            <button @click="exportPNG">导出PNG</button>
          </div>
        </div>
      
        <!-- 右侧元素库区域 -->
        <div class="elements-info">
          <div class="elements-icon-title">
            <img :src="require('@/assets/paint_icon.png')" class="elements-icon" alt="元素库图标">
            <span class="elements-title">元素库</span>
          </div>
          
          <div class="elements-type-panel">
            <div 
              v-for="(element, index) in element_type" 
              :key="'type-'+index"
              class="element-type-item"
              :class="{ 'active': select_type === element.name }"
              @click="selectType(index)"
            >
              {{ element.name }}
            </div>
          </div>

          <div class="elements-grid">
            <div 
              v-for="(element, index) in elements_content" 
              :key="'library-'+index"
              class="element-item"
              draggable="true"
              @dragstart="onDragStart($event, element)"
            >
              <img :src="element.img" alt="图片描述" class="element-img"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="pop" v-if="isload">
    <SandBoxRes
      v-if="isres"
      @cancel="handleCancel"
      :data="resdata"
    />
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue'
import { nanoid } from 'nanoid'
import { save_work, analyse_sand } from "@/api/sandbox"
import SandBoxRes from './sandbox/SandBoxRes.vue'

export default {
  name: 'SandboxApp',
  components: {
    SandBoxRes
  },
  data() {
    return {
      element_type: [
        {name: '地形', type: 'rectangle', color: '#3eaf7c'},
        {name: '植物', type: 'rectangle', color: '#3eaf7c'},
        {name: '自然景观', type: 'rectangle', color: '#3eaf7c'},
        {name: '人物', type: 'rectangle', color: '#3eaf7c'},
        {name: '交通', type: 'rectangle', color: '#3eaf7c'},
        {name: '动物', type: 'rectangle', color: '#3eaf7c'},
        {name: '建筑物', type: 'rectangle', color: '#3eaf7c'},
      ],
      elementLibrary: reactive([
        { type: 'rectangle', name: '矩形', width: 100, height: 60, color: '#3eaf7c' },
        { type: 'circle', name: '圆形', width: 80, height: 80, color: '#e96900' },
        { type: 'text', name: '文本', width: 120, height: 40, color: '#1890ff' },
        { type: 'image', name: '图片', width: 100, height: 100, color: '#722ed1' },
        { type: 'decision', name: '决策', width: 100, height: 60, color: '#fa541c' }
      ]),
      elements: reactive([]),
      selectedElement: null,
      history: reactive({
        past: [],
        future: [],
        current: []
      }),
      select_type: {},
      elements_content: [],
      type_path: {
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
          require("@/assets/building/7.png"),
          require("@/assets/building/8.png"),
          require("@/assets/building/9.png"),
          require("@/assets/building/10.png")]
      },
      wid: "",
      isres: false,
      resdata: "",
      isload: false,
      // 新增缩放相关状态
      isResizing: false,
      startSize: { width: 0, height: 0 },
      startPosition: { x: 0, y: 0 },
      currentElement: null
    }
  },
  mounted() {
    this.saveHistory()
  },
  methods: {
    // 新增：元素样式计算
    elementStyle(element) {
      return {
        left: element.x + 'px',
        top: element.y + 'px',
        width: (element.width || 100) + 'px',
        height: (element.height || 100) + 'px',
        zIndex: element.zIndex
      }
    },

    // 新增：统一处理鼠标按下事件
    handleElementMouseDown(event, element) {
      if (event.target.classList.contains('resize-handle')) {
        return;
      }
      this.selectElement(element);
      this.startDrag(element, event);
    },

    // 新增：开始缩放
    startResize(event, element) {
      this.isResizing = true;
      this.currentElement = element;
      this.startSize = {
        width: element.width || 100,
        height: element.height || 100
      };
      this.startPosition = { x: event.clientX, y: event.clientY };

      const onMouseMove = (e) => {
        if (!this.isResizing) return;
        
        const dx = e.clientX - this.startPosition.x;
        const dy = e.clientY - this.startPosition.y;
        
        // 等比缩放
        const scale = 1 + (dx + dy) / 100;
        element.width = Math.max(30, this.startSize.width * scale);
        element.height = Math.max(30, this.startSize.height * scale);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        this.isResizing = false;
        this.saveHistory();
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      event.preventDefault();
    },

    // 保留原有所有方法不变
    selectType(index) {
      this.select_type = this.element_type[index].name;
      const path_list = this.type_path[this.select_type]
      this.elements_content = []
      for(let i=0;i<path_list.length;i+=1) {
        this.elements_content.push({"img": path_list[i]})
      }
    },
    
    onDragStart(event, element) {
      event.dataTransfer.setData('elementType', element.img)
      event.dataTransfer.setData('offsetX', event.offsetX)
      event.dataTransfer.setData('offsetY', event.offsetY)
    },
    
    onDrop(event) {
      const img = event.dataTransfer.getData('elementType')
      const offsetX = parseInt(event.dataTransfer.getData('offsetX'))
      const offsetY = parseInt(event.dataTransfer.getData('offsetY'))
      
      const rect = this.$refs.whiteboard.getBoundingClientRect()
      const x = event.clientX - rect.left - offsetX
      const y = event.clientY - rect.top - offsetY
      
      const newElement = {
        id: nanoid(),
        x,
        y,
        zIndex: this.elements.length + 1,
        img: img,
        width: 100,  // 新增默认宽度
        height: 100  // 新增默认高度
      }
      
      this.elements.push(newElement)
      this.saveHistory()
      this.selectElement(newElement)
    },
    
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
    
    selectElement(element) {
      this.selectedElement = element
    },
    
    deselectAll() {
      this.selectedElement = null
    },
    
    deleteSelected() {
      if (!this.selectedElement) return
      
      const index = this.elements.indexOf(this.selectedElement)
      if (index !== -1) {
        this.elements.splice(index, 1)
        this.selectedElement = null
        this.saveHistory()
      }
    },
    
    saveHistory() {
      this.history.past.push(JSON.parse(JSON.stringify(toRaw(this.elements))))
      this.history.future = []
    },
    
    undo() {
      if (this.history.past.length <= 1) return
      
      this.history.future.push(this.history.past.pop())
      this.elements.splice(0, this.elements.length, ...this.history.past[this.history.past.length - 1])
    },
    
    redo() {
      if (this.history.future.length === 0) return
      
      const nextState = this.history.future.pop()
      this.history.past.push(JSON.parse(JSON.stringify(nextState)))
      this.elements.splice(0, this.elements.length, ...nextState)
    },
    
    async saveProject() {
      try {
        const xmlBlob = this.exportXML();
        const pngBlob = await this.exportPNG(); 
        
        const formData = new FormData();
        const timestamp = new Date().getTime();
        formData.append('xml_file', xmlBlob, `sandbox-${timestamp}.xml`);
        formData.append('png_file', pngBlob, `sandbox-${timestamp}.png`);
        formData.append('wid', 'new');
    
        const res = await save_work(formData);
        this.wid = res.data;
      } catch (error) {
        console.error('保存项目失败:', error); 
      }
    },
    
    async analyzeSandbox() {
      this.isload=true;
      if(this.wid == "") await this.saveProject()
      const formData = new FormData();
      formData.append('wid', this.wid);
      const res = await analyse_sand(formData);
      this.isres=true;
      this.resdata=res.data;
    },
    
    handleCancel(){
      this.isres=false;
      this.isload=false;
    },
    
    exportXML() {
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
      xml += '<sandbox version="1.0">\n'
      
      this.elements.forEach(element => {
        xml += `  <element id="${element.id}">\n`
        xml += `    <img>${element.img}</img>\n`
        xml += `    <x>${element.x}</x>\n`
        xml += `    <y>${element.y}</y>\n`
        xml += `    <width>${element.width || 100}</width>\n`
        xml += `    <height>${element.height || 100}</height>\n`
        xml += `    <zIndex>${element.zIndex}</zIndex>\n`
        xml += `  </element>\n`
      })
      
      xml += '</sandbox>'
      return new Blob([xml], { type: 'application/xml' });
    },
    
    async exportPNG() {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(this.$refs.whiteboard, {
        backgroundColor: '#ffffff',
        filter: node => !node.classList || !node.classList.contains('element-selection')
      })
      const response = await fetch(dataUrl);
      return await response.blob();
    }
  }
}
</script>

<style scoped>
/* 新增缩放相关样式 */
.element {
  position: absolute;
  cursor: move;
  user-select: none;
  transform-origin: center center;
  transition: transform 0.1s ease;
}

.element-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
}

.resize-handle {
  position: absolute;
  right: -8px;
  bottom: -8px;
  width: 16px;
  height: 16px;
  background: #1890ff;
  border-radius: 50%;
  cursor: nwse-resize;
  z-index: 10;
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

/* 分类选择面板 */
.elements-type-panel {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  padding: 10px;
  background: rgba(255,255,255,0.8);
  border-radius: 8px;
}

/* 分类按钮样式 */
.element-type-item {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  background: rgba(225, 238, 255, 1);
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 选中状态 */
.element-type-item.active {
  background: #3eaf7c;
  color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

/* 图片元素网格 */
.elements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 10px;
  overflow-y: auto;
  max-height: 60vh;
  padding: 10px;
  background: rgba(255,255,255,0.6);
  border-radius: 8px;
}

.element-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  cursor: grab;
  transition: transform 0.2s;
  aspect-ratio: 1/1;
}

.element-item:hover {
  transform: scale(1.05);
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

/* 原有其他样式保持不变 */
.sandbox-app {
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
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.57) 0%, rgba(255, 255, 255, 0.24) 100%);
  border: none;
  outline: none;
}

.main-container {
  display: flex;
  gap: 25px;
  height: calc(100% - 40px);
}

.sandbox-area {
  flex: 7;
  display: flex;
  flex-direction: column;
  border: 1px solid #fff;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.64);
  overflow: hidden;
  gap: 1px;
  height: 100%;
}

.whiteboard-container {
  flex: 1;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  cursor: default;
}

.control-panel {
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  flex-wrap: wrap;
  overflow-x: auto;
  box-sizing: border-box;
}

.control-panel button {
  padding: 8px 16px;
  max-height: 40px;
  border: none;
  border-radius: 8px;
  background: rgba(225, 238, 255, 1);
  font-family: 'PingFang SC';
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  white-space: nowrap;
}

.elements-info {
  flex: 3;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.64);
  border: 1px solid #fff;
  box-sizing: border-box;
}

.pop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .main-container {
    flex-direction: column;
  }
  
  .sandbox-area, .elements-info {
    flex: none;
    height: auto;
  }
}
</style>