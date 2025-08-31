<template>
    <div class="page">
        <div class="subBlock">
            <p class="text">欢迎来到画心岛小组</p>
            <p class="text1">根据你搜索的关键词，我们为你推荐了一些帖子</p>
        </div>

        <div class="container1">
            <div v-for="(item, index) in post_list" :key="index" class="post">
                <img
                    :src="require('@/assets/icon.png')"
                    class="post_image"
                    alt="Image Asset 1"
                />
                <div class="content">
                    <div class="top">
                        <p class="text2">{{ item["title"] }}</p>
                        <p class="text3">收藏</p>
                        <p class="text4">创建于 {{ item["createtime"] }}</p>
                    </div>
                    <p class="buttom">{{ item["content"] }}</p>
                </div>
            </div>
        </div>

    </div>
</template>
  
  <script>
  export default {
    name: "GeneratedComponent",
    props: {},
    data(){
        return{
            post_list:[
                {
                    "title":"沙盘创作俱乐部",
                    "content":"你是否曾有过这样的时刻：脑子里藏着奇奇怪怪的念头，想把&nbsp;“云朵落在海底”“星星长在树上”&nbsp;的画面变出来，却不知从何下手？或是心里攒了细碎的情绪，说不出口，却想找个地方悄悄安放？​",
                    "createtime": "2025-8-30"
                },
                {
                    "title":"i人专属伤心避风港，不用开口也有人懂",
                    "content":" “不想在人群里强装开朗？不想把难过说给不懂的人听？来沙盘创作俱乐部的&nbsp;i&nbsp;人专属小角落吧&nbsp;——&nbsp;这里没有逼你聊天的尴尬，只有细软的沙子和安静的空间。​",
                    "createtime": "2025-8-30"
                },
                {
                    "title":"心理疗愈室，帮你找回内心平静",
                    "content":" ““被工作压得喘不过气？被生活的琐事缠得心烦意乱？沙盘创作俱乐部化身专属心理疗愈室，用触觉与创作帮你卸下疲惫。把焦虑捏成沙团狠狠按在沙盘里，再慢慢塑造成“坚固的小城堡”，告诉自己我能抵御一切。​",
                    "createtime": "2025-8-30"
                },
                {
                    "title":"e人鉴赏｜每一份创作都是热闹的灵感派对",
                    "content":" “想围观&nbsp;e&nbsp;人的脑洞有多离谱？想和活力满满的他们一起玩出创意新高度？沙盘创作俱乐部的‘e&nbsp;人鉴赏专场’等你来！这里没有安静的独处，只有&nbsp;e&nbsp;人带着自己的沙盘“巡回展示”。​",
                    "createtime": "2025-8-30"
                }
            ]
        }
    }
  };
  </script>
  
  <style scoped>
    .page {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        box-shadow: -8px 0px 22px 0px rgba(191,196,217,0.2);
        background: rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
    }
  .subBlock {
      width: 80%;
      height: 10%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
  }
  .container1 {
      width: 100%;
      height: 80%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: flex-start;
      gap: 31px;
      padding-top: 8px;
      padding-right: 83px;
      padding-bottom: 12px;
      padding-left: 91px;
      margin-top:1vw
  }
  .post{
    weight:100%;
    display: flex;
    flex-direction: row;
    gap: 1vw;
  }
  .post_image{
    height: 100%;
    weight:20%;
  }
  .content{
    display: flex;
    flex-direction: column;
  }
  .top{
    display: flex;
    flex-direction: row;
  }

  
  .wrap {
      width: 1080px;
      height: 753px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
  }
  .container {
      width: 1080px;
      height: 116px;
      position: relative;
  }
  /* .content {
      width: 1080px;
      height: 116px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: flex-end;
      gap: 17px;
      padding-top: 32px;
      padding-right: 24px;
      padding-bottom: 16px;
      padding-left: 161px;
      position: absolute;
      top: 0px;
      left: 0px;
  } */
  .main {
      width: 994.50px;
      height: 58px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      margin-bottom: 26px;
  }
  .section {
      width: 994.50px;
      height: 58px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 26px;
  }
  .subSection {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 904px;
      height: 58px;
  }
  .block {
      width: 904px;
      height: 58px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
  }
  
  .text {
      width: 904px;
      font-family: 'PingFang SC';
      font-size: 25px;
      white-space: nowrap;
      color: rgba(36,37,41,1);
      line-height: 26px;
      font-weight: 500;
  }
  .div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 836px;
      height: 22px;
  }
  .text1 {
      width: 836px;
      font-family: 'PingFang SC';
      font-size: 18px;
      white-space: nowrap;
      color: rgba(90,92,102,1);
      line-height: 22px;
      font-weight: 400;
  }
  .content1 {
      width: 16px;
      height: 16px;
      overflow: hidden;
      box-sizing: border-box;
      position: absolute;
      top: 24px;
      left: 1023px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
  }
  .main1 {
      width: 10.76px;
      height: 10.76px;
      transform: rotate(-134.99999517032686deg);
      border-radius: 66.67px;
      box-sizing: border-box;
      background: rgba(146,150,166,1);
      margin-right: 2.62px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
  }
  .section1 {
      width: 10.76px;
      transform: rotate(-44.999990340653675deg);
      border-radius: 66.67px;
      box-sizing: border-box;
      background: rgba(146,150,166,1);
      min-height: 10.76px;
  }
  
  .content2 {
      width: 907px;
      height: 515.62px;
      margin-top: 6.38px;
      margin-right: 82px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
  }
  .main2 {
      width: 907px;
      height: 83.62px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
  }
  .subSection1 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 907px;
      height: 83.62px;
  }
  .block1 {
      width: 84px;
      border-radius: 9px;
      box-sizing: border-box;
      min-height: 82px;
      margin-top: 1.62px;
  }
  .block2 {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 794px;
      height: 83.62px;
  }
  .subBlock1 {
      width: 794px;
      height: 24px;
      margin-top: 1.62px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
  }
  .text2 {
      width: 140px;
      height: 17.73px;
      font-family: 'PingFang SC';
      font-size: 20px;
      white-space: nowrap;
      color: rgba(36,37,41,1);
      line-height: 16px;
      font-weight: 500;
  }
  .div1 {
      width: 288px;
      height: 24px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding-bottom: 8px;
  }
  .div2 {
      width: 288px;
      height: 26px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  .div3 {
      width: 53px;
      height: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 3px;
  }
  .div4 {
      width: 53px;
      height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .div5 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 15px;
  }
  .image {
      width: 16px;
      height: 15px;
      overflow: hidden;
      box-sizing: border-box;
  }
  .text3 {
      width: 34px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(0,0,0,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text4 {
      margin-left: 15px;
      width: 122px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text5 {
      margin-left: 15px;
      width: 83px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text6 {
      margin-top: 9px;
      width: 782px;
      height: 49px;
      font-family: 'PingFang SC';
      font-size: 14px;
      color: rgba(90,92,102,1);
      line-height: 22px;
      font-weight: 400;
  }
  .main3 {
      width: 895px;
      opacity: 0.22;
      background-color: rgb(0,0,0);
      min-height: 0.5px;
      margin-top: 30.5px;
  }
  .main4 {
      width: 907px;
      height: 87px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 26px;
  }
  .subSection2 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 907px;
      height: 87px;
  }
  .block3 {
      width: 84px;
      border-radius: 9px;
      box-sizing: border-box;
      min-height: 82px;
      margin-top: 5px;
  }
  .block4 {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 794px;
      height: 87px;
  }
  .subBlock2 {
      width: 794px;
      height: 29px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
  }
  .text7 {
      margin-top: 5px;
      width: 492px;
      height: 18px;
      font-family: 'PingFang SC';
      font-size: 20px;
      white-space: nowrap;
      color: rgba(36,37,41,1);
      line-height: 16px;
      font-weight: 500;
  }
  .div6 {
      width: 288px;
      height: 29px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding-bottom: 8px;
  }
  .div7 {
      width: 288px;
      height: 26px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  .div8 {
      width: 53px;
      height: 26px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 3px;
  }
  .div9 {
      width: 53px;
      height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .div10 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 15px;
  }
  .image1 {
      width: 16px;
      height: 15px;
      overflow: hidden;
      box-sizing: border-box;
  }
  .text8 {
      width: 34px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(0,0,0,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text9 {
      margin-left: 15px;
      width: 122px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text10 {
      margin-left: 15px;
      width: 83px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text11 {
      margin-top: 9px;
      width: 782px;
      height: 49px;
      font-family: 'PingFang SC';
      font-size: 14px;
      color: rgba(90,92,102,1);
      line-height: 22px;
      font-weight: 400;
  }
  .main5 {
      width: 895px;
      opacity: 0.22;
      background-color: rgb(0,0,0);
      min-height: 0.5px;
      margin-top: 30.5px;
  }
  .main6 {
      width: 907px;
      height: 87px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 26px;
  }
  .subSection3 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 907px;
      height: 87px;
  }
  .block5 {
      width: 84px;
      border-radius: 9px;
      box-sizing: border-box;
      min-height: 82px;
      margin-top: 5px;
  }
  .block6 {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      width: 794px;
      height: 87px;
  }
  .subBlock3 {
      width: 794px;
      height: 29px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
  }
  .text12 {
      margin-top: 5px;
      width: 366px;
      height: 18px;
      font-family: 'PingFang SC';
      font-size: 20px;
      white-space: nowrap;
      color: rgba(36,37,41,1);
      line-height: 16px;
      font-weight: 500;
  }
  .div11 {
      width: 288px;
      height: 29px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding-bottom: 8px;
  }
  .div12 {
      width: 288px;
      height: 26px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  .div13 {
      width: 53px;
      height: 26px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 3px;
  }
  .div14 {
      width: 53px;
      height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .div15 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 15px;
  }
  .image2 {
      width: 16px;
      height: 15px;
      overflow: hidden;
      box-sizing: border-box;
  }
  .text13 {
      width: 34px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(0,0,0,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text14 {
      margin-left: 15px;
      width: 122px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text15 {
      margin-left: 15px;
      width: 83px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text16 {
      margin-top: 9px;
      width: 782px;
      height: 49px;
      font-family: 'PingFang SC';
      font-size: 14px;
      color: rgba(90,92,102,1);
      line-height: 22px;
      font-weight: 400;
  }
  .main7 {
      width: 895px;
      opacity: 0.22;
      background-color: rgb(0,0,0);
      min-height: 0.5px;
      margin-top: 30.5px;
  }
  .main8 {
      width: 907px;
      height: 87px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 26px;
  }
  .subSection4 {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 907px;
      height: 87px;
  }
  .block7 {
      width: 84px;
      border-radius: 9px;
      box-sizing: border-box;
      min-height: 82px;
      margin-top: 5px;
  }
  .block8 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      width: 794px;
      height: 87px;
  }
  .subBlock4 {
      width: 794px;
      height: 29px;
      position: relative;
  }
  .text17 {
      position: absolute;
      top: 5px;
      left: 0px;
      width: 517px;
      height: 18px;
      font-family: 'PingFang SC';
      font-size: 20px;
      white-space: nowrap;
      color: rgba(36,37,41,1);
      line-height: 16px;
      font-weight: 500;
  }
  .div16 {
      width: 288px;
      height: 29px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
      padding-bottom: 8px;
      position: absolute;
      top: 0px;
      left: 506px;
  }
  .div17 {
      width: 288px;
      height: 26px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
  }
  .div18 {
      width: 53px;
      height: 26px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: center;
      align-items: center;
      gap: 3px;
  }
  .div19 {
      width: 53px;
      height: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .div20 {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 16px;
      height: 15px;
  }
  .image3 {
      width: 16px;
      height: 15px;
      overflow: hidden;
      box-sizing: border-box;
  }
  .text18 {
      width: 34px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(0,0,0,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text19 {
      margin-left: 15px;
      width: 122px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text20 {
      margin-left: 15px;
      width: 83px;
      font-family: 'PingFang SC';
      font-size: 14px;
      white-space: nowrap;
      color: rgba(206,206,206,1);
      line-height: 26px;
      font-weight: 400;
  }
  .text21 {
      width: 782px;
      height: 49px;
      font-family: 'PingFang SC';
      font-size: 14px;
      color: rgba(90,92,102,1);
      line-height: 22px;
      font-weight: 400;
  }
  </style>
  