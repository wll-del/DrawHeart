<template>
  <div class="page">
    <div class="wrap">
      <div class="container">
        <div class="content">
          <div class="main">
            <div></div>
            <div class="section1">
              <div class="subSection">
                <div class="block">
                  <p class="text">拖拽元素或者使用画笔在这里开始创作</p>
                </div>
              </div>
            </div>
            <div class="section2"></div>
          </div>
          <div class="main1">
            <div class="subSection2"><p class="text6">操作面板</p></div>
            <div class="section3">
              <div class="subSection1">
                <div class="block1"><p class="text1">上一步</p></div>
                <div class="block2"><p class="text2">下一步</p></div>
                <div class="block3"><p class="text3">删除元素</p></div>
                <div class="block4"><p class="text4">保存作品</p></div>
                <div class="block5"><p class="text5">分析沙盘</p></div>
              </div>
            </div>
          </div>
        </div>
        <div class="content1">
          <div class="main2">
            <div class="subSection3">
              <div class="tool-container">
                <img
                  :src="require('@/assets/Image5.png')"
                  class="image4"
                  alt="Image Asset 5"
                />
                <span class="text19">绘画工具</span>
              </div>
              <p class="text16">元素库</p>
              <div class="block6">
                <div class="subBlock">
                  <div class="div">
                    <div class="div1">
                      <div class="div2"></div>
                      <p class="text7">植物</p>
                    </div>
                    <div class="div3">
                      <div class="div4"><p class="text8">自然景物</p></div>
                    </div>
                    <div class="div5">
                      <div class="div6"><p class="text9">人物</p></div>
                    </div>
                    <div class="div7">
                      <div class="div8"><p class="text10">交通</p></div>
                    </div>
                    <div class="div9">
                      <div class="div10"><p class="text11">军事</p></div>
                    </div>
                  </div>
                </div>
                <div class="subBlock1">
                  <div class="div11">
                    <div class="div12">
                      <div class="div13"><p class="text12">社会科学</p></div>
                    </div>
                    <div class="div14">
                      <div class="div15"><p class="text13">宗教</p></div>
                    </div>
                    <div class="div16">
                      <div class="div17"><p class="text14">动物</p></div>
                    </div>
                    <div class="div18">
                      <div class="div19"><p class="text15">建筑物</p></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="block7">
                <div class="subBlock2">
                  <img
                    :src="require('@/assets/tree1.png')"
                    class="image"
                    alt="Image Asset 1"
                  /><img
                    :src="require('@/assets/tree1.png')"
                    class="image1"
                    alt="Image Asset 2"
                  /><img
                    :src="require('@/assets/tree1.png')"
                    class="image2"
                    alt="Image Asset 3"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container1">
        <div class="canvas-container">
          <img
            :src="require('@/assets/Image4.png')"
            class="image3"
            alt="Image Asset 4"
          />
          <span class="text18">创作画布</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MakeSandBox",

  props: {},
  setup() {
    return {};
  },
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
	border-radius: 8px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.main {
	width: 718px;
	height: 582px;
	position: relative;
}
.section1 {
	width: 718px;
	height: 582px;
	border-radius: 10px;
	border-color: rgba(255,255,255,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	background: rgba(255,255,255,0.64);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
	position: absolute;
	top: 0px;
	left: 0px;
}
.subSection {
	width: 686px;
	height: 22px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 16px;
}
.block {
	width: 686px;
	height: 22px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 16px;
}
.text {
	opacity: 0.38;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 500;
}
.section2 {
	width: 646px;
	box-sizing: border-box;
	min-height: 22px;
	position: absolute;
	top: 533px;
	left: 32px;
}
.main1 {
	width: 718px;
	height: 90px;
	border-radius: 10px;
	border-color: rgba(255,255,255,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	background: rgba(255,255,255,0.64);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 8px;
}
.section3 {
	width: 686px;
	height: 60px;
	margin-top: 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.subSection2 {
	width: 686px;
	height: 22px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 16px;
	margin: 0;
	padding: 0;
}
.text6 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 22px;
	font-weight: 500;
}
.subSection1 {
	width: 504px;
	height: 30px;
	margin-left: 1px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.block1 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid rgba(225,225,239,1);
	background: white;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
}
.block1:hover {
	background: #f5f5f5;
}
.block2 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid rgba(225,225,239,1);
	background: white;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
	margin-left: 16px;
}
.block2:hover {
	background: #f5f5f5;
}
.block3 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid rgba(225,225,239,1);
	background: white;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
	margin-left: 16px;
}
.block3:hover {
	background: #f5f5f5;
}
.block4 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid rgba(225,225,239,1);
	background: white;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
	margin-left: 16px;
}
.block4:hover {
	background: #f5f5f5;
}
.block5 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border: 1px solid rgba(225,225,239,1);
	background: white;
	box-sizing: border-box;
	padding: 0 16px;
	cursor: pointer;
	margin-left: 16px;
}
.block5:hover {
	background: #f5f5f5;
}
.text1, .text2, .text3, .text4, .text5 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(8,8,7,0.6);
	line-height: 30px;
	font-weight: 400;
	text-align: left;
	padding: 0;
	margin: 0;
}
.content1 {
	width: 453px;
	height: 785px;
	position: relative;
}
.main2 {
	position: absolute;
	top: 15px;
	left: 0px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 416px;
	height: 705px;
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
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}
.text16 {
	margin-top: 24px;
	margin-left: 24px;
	font-family: 'PingFang SC';
	font-size: 16px;
	white-space: nowrap;
	color: rgba(8,8,7,1);
	line-height: 16px;
	font-weight: 500;
}
.block6 {
	margin-top: 24px;
	margin-left: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 368px;
	height: 72px;
}
.subBlock {
	width: 368px;
	height: 30px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
}
.div {
	width: 368px;
	height: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.div1 {
	position: relative;
	width: 60px;
	height: 30px;
}
.div2 {
	width: 60px;
	opacity: 0.7;
	border-radius: 6px;
	border-color: rgba(64,108,240,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	min-height: 30px;
	position: absolute;
	top: 0px;
	left: 0px;
}
.text7 {
	position: absolute;
	top: 8px;
	left: 16px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: justify;
	color: rgba(64,108,240,1);
	line-height: 14px;
	font-weight: 500;
}
.div3 {
	margin-left: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 80px;
	height: 30px;
}
.div4 {
	width: 80px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
.text8 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div5 {
	margin-left: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 30px;
}
.div6 {
	width: 60px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text9 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div7 {
	margin-left: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 30px;
}
.div8 {
	width: 60px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text10 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div9 {
	margin-left: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 30px;
}
.div10 {
	width: 60px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text11 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.subBlock1 {
	width: 320px;
	height: 30px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 8px;
}
.div11 {
	width: 320px;
	height: 30px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.div12 {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 88px;
	height: 30px;
}
.div13 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text12 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div14 {
	margin-left: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 30px;
}
.div15 {
	width: 60px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
.text13 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div16 {
	margin-left: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 60px;
	height: 30px;
}
.div17 {
	width: 60px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 10px;
}
.text14 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.div18 {
	margin-left: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 88px;
	height: 30px;
}
.div19 {
	width: 88px;
	height: 30px;
	border-radius: 6px;
	border-color: rgba(225,225,239,1);
	border-style: solid;
	border-width: 1px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text15 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	text-align: center;
	color: rgba(8,8,7,0.6);
	line-height: 14px;
	font-weight: 400;
}
.block7 {
	width: 361px;
	height: 266px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 19px;
	margin-top: 39px;
	margin-left: 27px;
}
.subBlock2 {
	width: 361px;
	height: 266px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}
.image {
	width: 361px;
	height: 76px;
	box-sizing: border-box;
}
.image1 {
	width: 361px;
	height: 76px;
	box-sizing: border-box;
	margin-top: 19px;
}
.image2 {
	width: 361px;
	height: 76px;
	box-sizing: border-box;
	margin-top: 19px;
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
.text17 {
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: auto;
	height: auto;
	gap: 8px;
}
.content2 {
	width: auto;
	height: auto;
}
.image3 {
	width: 32px;
	height: 32px;
}
.text18 {
	margin-left: 0;
	font-size: 16px;
}
.tool-container, .canvas-container {
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 8px 0;
}
.image3, .image4 {
	width: 24px;
	height: 24px;
}
.text18, .text19 {
	font-family: 'PingFang SC';
	font-size: 16px;
	color: rgba(0,0,0,1);
	line-height: 1.5;
	font-weight: 500;
}
.text20 {
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
</style>
