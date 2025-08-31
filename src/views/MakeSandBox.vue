<template>
 <div class="sandbox-app">
   <!-- 顶部操作栏 -->
   <div class="control-bar">
  <button @click="saveProject">保存作品</button>
  <button @click="analyzeSandbox">分析沙盘</button>
  <button @click="undo">上一步</button>
  <button @click="redo">下一步</button>
  <button @click="deleteSelected">删除元素</button>
  <button @click="exportXML">导出XML</button>
  <button @click="exportPNG">导出PNG</button>
   </div>
   
   <div class="main-content">
  <!-- 左侧元素面板 -->
  <div class="elements-panel">
    <h3>元素库</h3>
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
  
  <!-- 中央白板区域 -->
  <div 
    class="whiteboard"
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
  
  // 创建Blob对象并下载[9](@ref)
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
  
  // 创建Blob对象并下载[9](@ref)
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
  //   const { toPng } = await import('html-to-image')
    
  //   const dataUrl = await toPng(this.$refs.whiteboard, {
  //  backgroundColor: '#ffffff',
  //  filter: node => !node.classList || !node.classList.contains('element-selection')
  //   })
    
    // 下载图片[9](@ref)
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
  .sandbox-app {
 height: 90vh;
 display: flex;
 flex-direction: column;
 font-family: Arial, sans-serif;
  }
  
  .control-bar {
 padding: 10px;
 background-color: #f5f5f5;
 border-bottom: 1px solid #ddd;
 display: flex;
 gap: 10px;
  }
  
  .control-bar button {
 padding: 8px 12px;
 background-color: #fff;
 border: 1px solid #ddd;
 border-radius: 4px;
 cursor: pointer;
  }
  
  .control-bar button:hover {
 background-color: #f0f0f0;
  }
  
  .main-content {
 display: flex;
 flex: 1;
 overflow: hidden;
  }
  
  .elements-panel {
 width: 200px;
 padding: 15px;
 background-color: #f9f9f9;
 border-right: 1px solid #ddd;
 overflow-y: auto;
  }
  
  .elements-panel h3 {
 margin-top: 0;
  }
  
  .element-item {
 padding: 10px;
 margin-bottom: 8px;
 background-color: #fff;
 border: 1px solid #ddd;
 border-radius: 4px;
 cursor: grab;
 user-select: none;
  }
  
  .element-item:hover {
 background-color: #f0f0f0;
  }
  
  .element-item:active {
 cursor: grabbing;
  }
  
  .whiteboard {
 flex: 1;
 background-color: #fff;
 position: relative;
 overflow: hidden;
 cursor: default;
  }
  
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
  </style>