<template>
  <div class="page">
    <div class="wrap">
      <!-- 顶部俱乐部信息区 -->
      <div class="container">
        <div class="content">
          <!-- 主内容区：删除多层section/subSection嵌套 -->
          <div class="club-header">
            <!-- 俱乐部图标 -->
            <div class="club-icon block"></div>
            <!-- 俱乐部信息：合并subBlock/div嵌套 -->
            <div class="club-info">
              <p class="text">沙盘创作俱乐部</p>
              <div class="club-meta">
                <p class="text1">改善你的心理世界，做一个快乐的岛民</p>
                <div class="club-actions">
                  <!-- 收藏按钮：删除多层div嵌套 -->
                  <div class="collect-btn">
                    <img
                      :src="require('@/assets/showdialog/favorite_after.png')"
                      class="image"
                      alt="收藏"
                    />
                    <p class="text2">收藏</p>
                  </div>
                  <p class="text3">创建于2025-8-30</p>
                  <p class="text4">讨论: 88人</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 关闭按钮：保留原功能 -->
          <div class="close-btn main1">
            <div class="section1"></div>
            <div class="section2"></div>
          </div>
        </div>
      </div>

      <!-- 俱乐部介绍与讨论区 -->
      <div class="container1">
        <div class="content1">
          <!-- 介绍文本：删除main2嵌套 -->
          <p class="text5">
            <span class="text5__linebreak">
              你是否曾有过这样的时刻：脑子里藏着奇奇怪怪的念头，想把“云朵落在海底”“星星长在树上”的画面变出来，却不知从何下手？或是心里攒了细碎的情绪，说不出口，却想找个地方悄悄安放?
            </span>
            <span class="text5__linebreak"
              >现在，有一个地方能帮你实现&nbsp;——沙盘创作俱乐部，这里没有&nbsp;“画得好不好”“做得对不对”&nbsp;的评判，只有一捧细沙、各式小摆件，和一群愿意陪你&nbsp;“造梦”&nbsp;的同路人。</span
            ><span class="text5__linebreak"
              >在这里，你可以把脑海里的故事铺进沙盘：用小石子堆成蜿蜒的山脉，用蓝色玻璃珠模拟粼粼的湖面，再摆上&nbsp;tiny&nbsp;的小人和小动物，让&nbsp;“森林里的秘密聚会”“未来城市的模样”从想象落到现实。不必担心自己没有艺术基础，沙盘的魔力就在于：每一粒沙子的摆放，每一个摆件的选择，都是独属于你的表达&nbsp;——&nbsp;你笔下没画完的场景，能在这里补全；你心里没说透的感受，沙子会替你&nbsp;“说话”</span
            ><span
              >我们会定期组织主题创作活动：有时是&nbsp;“童年记忆里的老地方”，大家一起用沙盘还原外婆家的小院、小学门口的小卖部，在摆放中重温温暖；有时是&nbsp;“未完成的梦想”，有人造了&nbsp;“开在沙漠里的书店”，有人拼了&nbsp;“带着画板去旅行的房车”，在分享中看见彼此眼里的光；也会有自由创作时间，你可以安安静静地和沙子相处，把一天的疲惫揉进沙堆，再捏出一个&nbsp;“治愈小世界”。</span
            >
          </p>

          <!-- 讨论区标题：删除main3/section4/subSection1嵌套 -->
          <div class="discussion-title">
            <img
              :src="require('@/assets/showdialog/discas.png')"
              class="image1"
              alt="讨论"
            />
            <p class="text6">讨论</p>
          </div>

          <!-- 讨论列表：删除section5/subSection嵌套，合并消息容器 -->
          <div class="discussion-list">
            <!-- 评论1 -->
            <div class="comment-item">
              <img
                :src="require('@/assets/showdialog/user1.png')"
                class="image2"
                alt="楚歌"
              />
              <div class="comment-content">
                <p class="text7">楚歌 2025-08-27&nbsp;07:43:18&nbsp;北京</p>
                <p class="text8">
                  工作久了总觉得心里堵得慌，想找人说又怕矫情，看到‘情绪悄悄安放’这句真的戳中我了。不用说话，用沙子摆一摆就能释放压力，还能认识同频的人，首次参与的定制小摆件也很吸引我，打算报名试试，希望能找回点平静。”
                </p>
              </div>
            </div>

            <!-- 评论2 -->
            <div class="comment-item">
              <img
                :src="require('@/assets/showdialog/user2.png')"
                class="image3"
                alt="快快"
              />
              <div class="comment-content">
                <p class="text9">快快 2025-08-29&nbsp;16:31:48&nbsp;广东</p>
                <p class="text10">太好了呜呜</p>
              </div>
            </div>

            <!-- 评论3 -->
            <div class="comment-item">
              <img
                :src="require('@/assets/showdialog/user3.png')"
                class="image4"
                alt="我超棒耶"
              />
              <div class="comment-content">
                <p class="text11">我超棒耶&nbsp; 2025-08-29&nbsp;12:51:02&nbsp;四川</p>
                <p class="text12">
                  刚入社会有点迷茫，看到有人用沙盘做‘带着画板去旅行的房车’，瞬间被戳到！这大概就是我心里藏着的梦想吧，想去现场看看大家的创作，也希望能在俱乐部找到方向
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 评论输入区 -->
      <div class="container2">
        <div class="content2">
          <!-- 输入区标题：删除main6/section7嵌套 -->
          <div class="comment-input-header">
            <p class="text14">发表你的看法</p>
            <div class="comment-tools">
              <img
                :src="require('@/assets/showdialog/comment.png')"
                class="image6"
                alt="工具1"
              />
              <img
                :src="require('@/assets/showdialog/comment.png')"
                class="image6"
                alt="工具2"
              />
            </div>
          </div>

          <!-- 提交按钮：删除main5/section6/subBlock4嵌套 -->
          <button class="submit-btn">
            <img
              :src="require('@/assets/showdialog/comment.png')"
              class="image6"
              alt="提交"
            />
            <p class="text13">评论</p>
          </button>
        </div>
        <!-- 保留空内容区（若后续有功能扩展） -->
        <div class="content3"><div class="section8"></div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GeneratedComponent",
  props: {},
};
</script>

<style scoped>
/* 基础容器样式不变 */
.page {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  box-shadow: -8px 0px 22px 0px rgba(191, 196, 217, 0.2);
  background: rgba(255, 255, 255, 1);
  display: flex;
  min-width: 470px;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

/* 顶部俱乐部信息区：优化布局层级 */
.container {
  width: 1080px;
  height: 116px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-end;
  gap: 4px;
  padding: 32px 24px 16px 161px;
}
.content {
  width: 987.5px;
  height: 73px;
  margin-bottom: 17px;
  position: relative;
}
/* 俱乐部头部：合并原main/section/subSection */
.club-header {
  width: 987.5px;
  height: 67px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  top: 6px;
  left: 0;
}
.club-icon {
  width: 67px;
  border-radius: 9px;
  box-sizing: border-box;
  min-height: 67px;
}
/* 俱乐部信息：合并原subBlock/div */
.club-info {
  width: 894.5px;
  height: 63.14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 1.93px;
}
.text {
  width: 904px;
  font-family: 'PingFang SC';
  font-size: 25px;
  white-space: nowrap;
  color: rgba(36, 37, 41, 1);
  line-height: 26px;
  font-weight: 500;
}
/* 俱乐部元信息：合并原div1 */
.club-meta {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 883.5px;
  height: 27.14px;
}
.text1 {
  margin-top: 1.14px;
  width: 337px;
  font-family: 'PingFang SC';
  font-size: 18px;
  white-space: nowrap;
  color: rgba(36, 37, 41, 1);
  line-height: 26px;
  font-weight: 400;
}
/* 俱乐部操作区：合并原div2/div3 */
.club-actions {
  width: 371px;
  height: 26px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 15px;
}
/* 收藏按钮：合并原div4/div5/div6 */
.collect-btn {
  width: 53px;
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image {
  width: 16px;
  height: 15px;
  overflow: hidden;
  box-sizing: border-box;
}
.text2 {
  width: 34px;
  font-family: 'PingFang SC';
  font-size: 14px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 1);
  line-height: 26px;
  font-weight: 400;
}
.text3 {
  width: 122px;
  font-family: 'PingFang SC';
  font-size: 14px;
  white-space: nowrap;
  color: rgba(206, 206, 206, 1);
  line-height: 26px;
  font-weight: 400;
}
.text4 {
  width: 83px;
  font-family: 'PingFang SC';
  font-size: 14px;
  white-space: nowrap;
  color: rgba(206, 206, 206, 1);
  line-height: 26px;
  font-weight: 400;
}
/* 关闭按钮 */
.close-btn {
  width: 16px;
  height: 16px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 927.5px;
}
.section1 {
  width: 10.76px;
  transform: rotate(-134.99999517032686deg);
  border-radius: 66.67px;
  box-sizing: border-box;
  background: rgba(146, 150, 166, 1);
  min-height: 10.76px;
  position: absolute;
  top: 2.62px;
  left: 2.62px;
}
.section2 {
  width: 10.76px;
  transform: rotate(-44.999990340653675deg);
  border-radius: 66.67px;
  box-sizing: border-box;
  background: rgba(146, 150, 166, 1);
  min-height: 10.76px;
  position: absolute;
  top: 2.62px;
  left: 2.62px;
}

/* 介绍与讨论区：优化布局 */
.container1 {
  width: 1080px;
  height: 581px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 24px;
  padding: 8px 83px 12px 93px;
}
.content1 {
  width: 973px;
  height: 511px;
  margin-top: 8px;
  margin-right: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
/* 介绍文本：删除main2嵌套，直接用p标签 */
.text5 {
  width: 916px;
  font-family: 'PingFang SC';
  font-size: 14px;
  color: rgba(90, 92, 102, 1);
  font-weight: 400;
  white-space: pre-line;
  margin-bottom: 24px;
}
.text5__linebreak {
  padding-bottom: 1px;
}
/* 讨论区标题：合并原main3/section4/subSection1 */
.discussion-title {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 110px;
  height: 20px;
  margin-bottom: 24px;
}
.image1 {
  width: 20px;
  height: 20px;
  overflow: hidden;
  box-sizing: border-box;
}
.text6 {
  font-family: 'PingFang SC';
  font-size: 20px;
  white-space: nowrap;
  text-align: center;
  color: rgba(36, 37, 41, 1);
  line-height: 16px;
  font-weight: 500;
}
/* 讨论列表：合并原main4/section5 */
.discussion-list {
  width: 973px;
  height: 220px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}
/* 评论项：合并原subSection/block/subBlock */
.comment-item {
  display: flex;
  align-items: center;
  gap: 19px;
  width: 973px;
  height: 60px;
}
</style>