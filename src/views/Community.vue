<template>
  <div class="page">
    <div class="wrap">
      <div class="container">
        <div class="content">
          <div class="main">
            <div class="section">
              <div class="subSection">
                <div class="block">
                  <div class="subBlock">
                    <p class="text">每日推荐</p>
                    <div class="div">
                      <div class="div1">
                        <div class="div2">
                          <p class="text1">我的帖子</p>
                          <div class="div3"><p class="text2">1</p></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="block1">
                  <div class="subBlock1">
                    <div class="div4">
                      <p class="text3">发布</p>
                      <div class="div5"><div class="div6"></div></div>
                    </div>
                    <div class="div7"><p class="text4">收藏</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="section1">
              <div class="subSection1">
                <div class="block2">
                  <div class="subBlock2"><p class="text5">88人正在讨论</p></div>
                  <div class="subBlock3">
                    <p class="text6">沙盘创作俱乐部｜改善你...</p>
                    <div class="div8"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content1">
          <div></div>
          <div class="main2">
            <div class="section2">
              <p class="text7">俄在印度银行数十亿卢比无法使用</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container1">
        <div class="content2"></div>
        <p class="text8">中国向俄、法赠送月球样品</p>
      </div>
    </div>
    <div class="wrap1">
      <div class="image">
        <div class="image1">
          <div class="main3">
            <p class="text9">交流连接心意</p>
            <p class="text10">交流、创作、陪伴-你的专属数字世界</p>
          </div>
        </div>
        <div class="content3">
          <div class="main4">
            <div class="section3">
              <div class="subSection2">
                <div class="block3"></div>
                <p class="text11">搜索小组或者帖子</p>
              </div>
              <div class="subSection3">
                <div class="block4">
                  <div class="subBlock4">
                    <div class="div9">
                      <p class="text12">
                        今日推荐帖子：沙盘创作俱乐部｜心理疗愈室
                      </p>
                    </div>
                  </div>
                  <div class="subBlock5">
                    <div class="div10">
                      <div class="div13">
                        <img
                          :src="require('@/assets/tree1.png')"
                          class="image2"
                          alt="Image Asset 3"
                        />
                      </div>
                    </div>
                    <p class="text13">一键搜索</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommunityPage",

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
	position: relative;
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
	position: relative;
	display: flex;
	flex-direction: column;
	gap: 20px;
}
.content {
	width: 100%;
	height: auto;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	gap: 16px;
	margin-top: 20px;
}
.main {
	width: 1160px;
	height: 192.18px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.section {
	width: 1160px;
	height: 28px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 16px;
}
.subSection {
	width: 1160px;
	height: 28px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.block {
	width: 584px;
	height: 24px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 20px;
}
.subBlock {
	width: 163px;
	height: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.text {
	font-family: 'PingFang SC';
	font-size: 16px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 24px;
	font-weight: 400;
}
.div {
	width: 79px;
	height: 24px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 24px;
}
.div1 {
	width: 79px;
	height: 24px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 2px;
}
.div2 {
	width: 79px;
	height: 24px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.text1 {
	font-family: 'PingFang SC';
	font-size: 16px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 24px;
	font-weight: 500;
}
.div3 {
	width: 13px;
	height: 18px;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.text2 {
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	color: rgba(25,25,25,0.4);
	line-height: 18px;
	font-weight: 500;
}
.block1 {
	width: 92px;
	height: 28px;
	border-radius: 6px;
	box-sizing: border-box;
	background: rgba(99,203,255,0.24);
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	padding-right: 2px;
	padding-left: 2px;
}
.subBlock1 {
	width: 88px;
	height: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.div4 {
	width: 40px;
	height: 24px;
	overflow: hidden;
	border-radius: 4px;
	box-sizing: border-box;
	background: rgba(255,255,255,0.82);
	position: relative;
}
.text3 {
	position: absolute;
	top: 6px;
	left: 8px;
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	text-align: right;
	color: rgba(0,0,0,1);
	line-height: 12px;
	font-weight: 500;
}
.div5 {
	position: absolute;
	top: 0px;
	left: 0.16px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10.16px;
	height: 24px;
}
.div6 {
	width: 10.16px;
	border-radius: 4px;
	box-sizing: border-box;
	min-height: 24px;
}
.div7 {
	width: 48px;
	height: 24px;
	overflow: hidden;
	border-radius: 4px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text4 {
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	text-align: right;
	color: rgba(0,0,0,0.6);
	line-height: 12px;
	font-weight: 400;
}
.section1 {
	width: 1160px;
	height: 148.18px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 23.67px;
}
.subSection1 {
	width: 1160px;
	height: 148.18px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 15.78px;
}
.block2 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 174px;
	height: 148.18px;
}
.subBlock2 {
	width: 174px;
	height: 99px;
	border-radius: 7.89px;
	box-sizing: border-box;
	display: flex;
	justify-content: flex-end;
	align-items: flex-end;
}
.text5 {
	margin-bottom: 6px;
	margin-right: 7px;
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	color: rgba(255,255,255,1);
	line-height: 11.84px;
	font-weight: 500;
	text-shadow: 0px 0px 2.959183692932129px rgba(0,0,0,0.25);
}
.subBlock3 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 166px;
	height: 37.70px;
}
.text6 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 16px;
	font-weight: 400;
}
.div8 {
	width: 119.35px;
	box-sizing: border-box;
	min-height: 16px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 5.92px;
}
.content1 {
	position: absolute;
	top: 0px;
	left: 832px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 353px;
	height: 785px;
}
.main2 {
	margin-top: 806px;
	margin-left: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 388px;
	height: 46px;
}
.section2 {
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
.text7 {
	margin-left: 16px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(255,255,255,1);
	line-height: 14px;
	font-weight: 400;
}
.container1 {
	margin-top: 25px;
	margin-left: 920px;
	position: relative;
	width: 377px;
	height: 56px;
}
.content2 {
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
.text8 {
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
.wrap1 {
	position: absolute;
	top: 0px;
	left: 98px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 1036px;
	height: 450px;
}
.image {
	position: relative;
	width: 1036px;
	height: 450px;
	background-image: url('@/assets/tree1.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.image1 {
	position: absolute;
	top: 0px;
	left: 251.38px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	width: 400.88px;
	height: 365.99px;
	box-sizing: border-box;
	background-image: url('@/assets/tree1.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
.main3 {
	width: 233px;
	height: 68px;
	box-sizing: border-box;
	margin-top: 83px;
	margin-right: 17.76px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.text9 {
	font-family: 'PingFang SC';
	font-size: 30px;
	white-space: nowrap;
	text-align: right;
	color: rgba(0,0,0,1);
	line-height: 42px;
	letter-spacing: 0.04em;
	font-weight: 500;
}
.text10 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(50,50,50,1);
	line-height: 19.60px;
	font-weight: 400;
}
.content3 {
	width: 636px;
	height: 124px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 24px;
	position: absolute;
	top: 173px;
	left: 200px;
}
.main4 {
	width: 636px;
	height: 124px;
	border-radius: 8px;
	border-width: 1.50px;
	box-sizing: border-box;
	box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.25);
	background: rgba(255,255,255,1);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: flex-start;
	gap: 8px;
	padding-top: 16px;
	padding-right: 16px;
	padding-bottom: 16px;
	padding-left: 16px;
}
.section3 {
	width: 604px;
	height: 93px;
	margin-top: 15px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.subSection2 {
	width: 604px;
	height: 49px;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.block3 {
	width: 2px;
	border-radius: 13px;
	box-sizing: border-box;
	background: rgba(64,123,245,1);
	min-height: 18px;
}
.text11 {
	margin-top: 1px;
	width: 602px;
	height: 48px;
	font-family: 'PingFang SC';
	font-size: 16px;
	white-space: nowrap;
	color: rgba(191,196,217,1);
	line-height: 14px;
	font-weight: 400;
}
.subSection3 {
	width: 604px;
	height: 36px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
}
.block4 {
	width: 604px;
	height: 36px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.subBlock4 {
	width: 496px;
	height: 26px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 8px;
	margin-top: 10px;
}
.div9 {
	width: 248px;
	height: 26px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 4px;
	padding-right: 4px;
	padding-left: 4px;
}
.text12 {
	opacity: 0.8;
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	color: rgba(25,25,25,1);
	line-height: 18px;
	font-weight: 400;
}
.subBlock5 {
	width: 108px;
	height: 36px;
	border-radius: 8px;
	box-sizing: border-box;
	background: rgba(0,0,0,0.04);
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.div10 {
	width: 16px;
	height: 16px;
	border-radius: 5px;
	box-sizing: border-box;
	margin-left: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.div13 {
	width: 16px;
	height: 16px;
	overflow: hidden;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.image2 {
	width: 15.75px;
	height: 15.75px;
}
.text13 {
	margin-left: 4px;
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(255,255,255,1);
	line-height: 22px;
	font-weight: 500;
}
</style>
