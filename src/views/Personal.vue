<template>
  <div class="personal-page">
    <!-- 顶部个人信息栏 -->
    <div class="profile-section">
      <div class="profile-header">
        <img 
          :src="require('@/assets/tree1.png')" 
          class="avatar" 
          alt="用户头像"
        />
        <div class="profile-info">
          <div class="profile-front">	
			<h3 class="username">渴望改变的小土豆</h3>
			<span class="detail-text">编辑资料> | 查看详情> </span>
          </div>
          <p class="signature">让每颗心灵都能被温柔托举</p>
          <div class="profile-footer">
            <div class="social-info">
              <span class="social-item">2粉丝</span>
              <span class="social-divider">｜</span>
              <span class="social-item">0关注</span>
              <span class="social-divider">｜</span>
              <span class="social-item">1作品</span>
            </div>
            <div class="profile-details">
              <div class="detail-item">
                <img 
                  :src="require('@/assets/tree1.png')" 
                  class="icon" 
                  alt="邮箱图标"
                />
                <span class="detail-text">guest@example.com</span>
              </div>
              <div class="detail-item">
                <img 
                  :src="require('@/assets/Image4.png')" 
                  class="icon" 
                  alt="日期图标"
                />
                <span class="detail-text">登岛日期: 2022-12-30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部我的沙盘区域 -->
    <div class="sandbox-section">
      <div class="sandbox-header">
        <h3 class="section-title">我的沙盘</h3>
        <div class="tab-buttons">
          <button 
            :class="['tab-button', { active: activeTab === 'works' }]" 
            @click="activeTab = 'works'"
          >
            我的作品
          </button>
          <button 
            :class="['tab-button', { active: activeTab === 'reports' }]" 
            @click="activeTab = 'reports'"
          >
            沙盘报告
          </button>
        </div>
      </div>

      <div class="sandbox-content">
        <div v-if="activeTab === 'works'" class="works-grid">
          <div class="work-item" v-for="work in works" :key="work.id" @click="viewWorkDetail(work)">
            <img :src="work.thumbnail" class="work-thumbnail" :alt="work.title" />
            <div class="work-info">
              <h4 class="work-title">{{ work.title }}</h4>
              <span class="work-date">{{ work.date }}</span>
            </div>
          </div>
        </div>
        <div v-if="activeTab === 'reports'" class="reports-list">
          <div class="report-item" v-for="report in reports" :key="report.id" @click="viewReportDetail(report)">
            <div class="report-header">
              <h4 class="report-title">{{ report.title }}</h4>
              <span class="report-date">{{ report.date }}</span>
            </div>
            <p class="report-content">{{ report.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalPage",
  data() {
    return {
      activeTab: 'works' // 默认激活"我的作品"选项卡
    };
  },
  methods: {
    fetchWorks() {
      // 模拟获取我的作品数据
      this.works = [
        { id: 1, title: '作品1', thumbnail: require('@/assets/b1.png'), date: '2023-01-15' },
        { id: 2, title: '作品2', thumbnail: require('@/assets/b2.png'), date: '2023-02-20' },
        { id: 3, title: '作品3', thumbnail: require('@/assets/Image10.png'), date: '2023-03-10' },
        { id: 4, title: '作品4', thumbnail: require('@/assets/Image11.png'), date: '2023-04-05' },
        { id: 5, title: '作品5', thumbnail: require('@/assets/Image14.png'), date: '2023-05-12' },
        { id: 6, title: '作品6', thumbnail: require('@/assets/Image15.png'), date: '2023-06-18' }
      ];
    },
    fetchReports() {
      // 模拟获取沙盘报告数据
      this.reports = [
        { id: 1, title: '沙盘分析报告1', date: '2023-01-10', content: '这是第一个沙盘的分析报告摘要...' },
        { id: 2, title: '沙盘分析报告2', date: '2023-02-15', content: '这是第二个沙盘的分析报告摘要...' },
        { id: 3, title: '沙盘分析报告3', date: '2023-03-22', content: '这是第三个沙盘的分析报告摘要...' }
      ];
    },
    viewReportDetail(report) {
      // 查看报告详情
      console.log('Viewing report:', report);
      // 这里可以添加打开报告详情的逻辑
    },
    viewWorkDetail(work) {
      // 查看作品详情
      console.log('Viewing work:', work);
      // 这里可以添加打开作品放大图的逻辑
      alert(`正在查看作品: ${work.title}`);
    }
  },
  created() {
    this.fetchWorks(); // 默认加载我的作品数据
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 'works') {
        this.fetchWorks();
      } else {
        this.fetchReports();
      }
    }
  }
};
</script>

<style scoped>
.personal-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.profile-section {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-header {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  position: relative;
}

.profile-actions {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #666;
}

.action-link {
  cursor: pointer;
}

.action-divider {
  color: #ccc;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.profile-info {
  flex: 1;
}

.username {
  margin: 0 0 6px 0;
  font-size: 18px;
  color: #333;
}

.signature {
  margin: 6px 0 6px 0;
  font-size: 13px;
  color: #666;
}

.profile-front {
  display: flex;
  justify-content: space-between;
  align-items: flex-end | flex-start;
  width: 100%;
  margin-top: 12px;
}

.profile-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin-top: 12px;
}

.social-info {
  display: flex;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.profile-details {
  display: flex;
  gap: 12px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  color: #999;
}

.icon {
  width: 16px;
  height: 16px;
}

.detail-text {
  font-size: 12px;
  color: #999;
}

.social-divider {
  color: #ccc;
}

.sandbox-section {
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
}

.sandbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  margin: 0;
  font-size: 16px;
  color: #333;
}

.tab-buttons {
  display: flex;
  gap: 0px;
}

.tab-button {
  padding: 4px 8px;
  border: none;
  border-radius: 2px;
  background: #f0f0f0;
  cursor: pointer;
  font-size: 13px;
  color: #666;
}

.tab-button.active {
  background: rgba(99, 203, 255, 0.168);
  color: rgba(0, 0, 0, 1);
}

.sandbox-content {
  flex: 1;
  border: 1px dashed #eee;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
  width: 100%;
}

.work-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.work-item:hover {
  transform: translateY(-5px);
}

.work-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.work-info {
  padding: 12px;
  background: white;
}

.work-title {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #333;
}

.work-date {
  font-size: 12px;
  color: #999;
}

.reports-list {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.report-item {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;
}

.report-item:hover {
  transform: translateY(-2px);
}

.report-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.report-title {
  margin: 0;
  font-size: 15px;
  color: #333;
}

.report-date {
  font-size: 13px;
  color: #999;
}

.report-content {
  margin: 0;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

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
	width: 1153px;
	height: 192.18px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
}
.section {
	width: 1153px;
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
	width: 1153px;
	height: 28px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.block {
	width: 74px;
	height: 24px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 24px;
}
.subBlock {
	width: 74px;
	height: 24px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 2px;
}
.text {
	font-family: 'PingFang SC';
	font-size: 16px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 24px;
	font-weight: 500;
}
.block1 {
	width: 140px;
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
	width: 136px;
	height: 24px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.div {
	width: 64px;
	height: 24px;
	overflow: hidden;
	border-radius: 4px;
	box-sizing: border-box;
	background: rgba(255,255,255,0.82);
	position: relative;
}
.text1 {
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
.div1 {
	position: absolute;
	top: 0px;
	left: 0.16px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 10.16px;
	height: 24px;
}
.div2 {
	width: 10.16px;
	border-radius: 4px;
	box-sizing: border-box;
	min-height: 24px;
}
.div3 {
	width: 72px;
	height: 24px;
	overflow: hidden;
	border-radius: 4px;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
}
.text2 {
	font-family: 'PingFang SC';
	font-size: 12px;
	white-space: nowrap;
	text-align: right;
	color: rgba(0,0,0,0.6);
	line-height: 12px;
	font-weight: 400;
}
.section1 {
	width: 1153px;
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
	width: 1153px;
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
	border-radius: 7.89px;
	box-sizing: border-box;
	min-height: 99px;
}
.subBlock3 {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	width: 126px;
	height: 37.70px;
}
.text3 {
	font-family: 'PingFang SC';
	font-size: 14px;
	white-space: nowrap;
	color: rgba(0,0,0,1);
	line-height: 16px;
	font-weight: 400;
}
.div4 {
	width: 119.35px;
	height: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 5.92px;
}
.text4 {
	opacity: 0.8;
	font-family: 'PingFang SC';
	font-size: 11.84px;
	white-space: nowrap;
	color: rgba(25,25,25,0.4);
	line-height: 15.78px;
	font-weight: 400;
}
.text4__seg0 {
	font-size: 11.84px;
}
.content1 {
	width: 1160px;
	height: 176px;
	border-radius: 15px;
	border-width: 1px;
	box-sizing: border-box;
	backdrop-filter: blur(4px);
	background: linear-gradient(107deg, rgba(255,255,255,0.5) 22.759999999999998%,rgba(255,255,255,0.4) 72.54%);
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 20px;
	padding-top: 20px;
	padding-right: 24px;
	padding-bottom: 24px;
	padding-left: 24px;
	position: absolute;
	top: 0px;
	left: 0px;
}
.main1 {
	width: 1136px;
	height: 124px;
	margin-top: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.section2 {
	width: 1112px;
	height: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 547px;
}
.subSection2 {
	width: 1112px;
	height: 16px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.block3 {
	width: 256px;
	height: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
}
.subBlock4 {
	width: 256px;
	box-sizing: border-box;
	min-height: 16px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 7px;
}
.block4 {
	width: 149.77px;
	height: 14px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 12px;
	margin-top: 1px;
}
.subBlock5 {
	width: 149.77px;
	height: 14px;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}
.div5 {
	width: 59.35px;
	height: 13px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 4px;
	margin-top: 0.50px;
}
.div6 {
	width: 59.35px;
	height: 13px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.text5 {
	font-family: 'PingFang SC';
	font-size: 13px;
	white-space: nowrap;
	color: rgba(38,6,4,0.4);
	line-height: 13px;
	font-weight: 400;
}
.image {
	width: 3.94px;
	height: 7.29px;
}
.div7 {
	width: 1px;
	box-sizing: border-box;
	background: rgba(160,149,154,1);
	min-height: 10px;
	margin-top: 2px;
	margin-left: 11.42px;
}
.div8 {
	width: 66px;
	height: 14px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	margin-left: 12px;
}
.div9 {
	width: 66px;
	height: 14px;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
}
.text6 {
	margin-top: 0.50px;
	font-family: 'PingFang SC';
	font-size: 13px;
	white-space: nowrap;
	color: rgba(38,6,4,0.4);
	line-height: 13px;
	font-weight: 400;
}
.image1 {
	width: 14px;
	height: 14px;
	overflow: hidden;
	box-sizing: border-box;
}
.section3 {
	width: 361px;
	height: 19px;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
	gap: 22px;
	margin-left: 775px;
}
.subSection3 {
	width: 336px;
	height: 19px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.block5 {
	width: 146px;
	height: 19px;
	opacity: 0.6;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 3px;
}
.subBlock6 {
	width: 146px;
	height: 19px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.image2 {
	width: 19px;
	height: 19px;
	overflow: hidden;
	box-sizing: border-box;
}
.text7 {
	font-family: 'PingFang SC';
	font-size: 13px;
	white-space: nowrap;
	color: rgba(38,6,4,0.4);
	line-height: 13px;
	font-weight: 400;
}
.block6 {
	width: 1px;
	background-color: rgb(194,186,194);
	min-height: 15px;
	margin-left: 22px;
}
.block7 {
	width: 146px;
	height: 19px;
	opacity: 0.6;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	gap: 3px;
	margin-left: 21px;
}
.subBlock7 {
	width: 146px;
	height: 19px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.image3 {
	width: 19px;
	height: 19px;
	overflow: hidden;
	box-sizing: border-box;
}
.text8 {
	font-family: 'PingFang SC';
	font-size: 13px;
	white-space: nowrap;
	color: rgba(38,6,4,0.4);
	line-height: 13px;
	font-weight: 400;
}
.text9 {
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
.content3 {
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
.text10 {
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
