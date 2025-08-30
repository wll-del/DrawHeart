<template>
    <div class="back">
        <!-- 导航栏 -->
        <div v-if="!isLogin">
            <div>1</div>
        </div>
        <div v-else>
            <!-- 顶栏 -->
            <div class="top">
                <div class="title">画心岛</div>
                <div v-if="isLogin"  class="userphoto">头像</div>
            </div>

            <div class="buttom">

                <!-- 侧边栏 -->
                <div class="navbar">
                    <router-link to="/sandbox" class="modify">沙盘</router-link>
                    <router-link to="/lovi" class="compilation">lovi</router-link> 
                    <router-link to="/community" class="compilation">社区</router-link>
                    <router-link to="/personal" class="compilation">个人中心</router-link>
                </div>
            
                <!-- 内容，会根据路由动态加载 -->
                <div class="content">
                    <!-- 页面内容 -->
                    <router-view></router-view>
                </div>

            </div>
        </div>

    </div>
</template>
<script>
// import { RecoverCode} from '@/api/compilation';
// import { Logout } from '@/api/user';
// import { useTokenStore } from '@/store/modules/auth';
// import { computed } from 'vue';
export default {
    // setup(){
    //     const tokenStore = useTokenStore();  
    //     const isLogin = computed(() => !!tokenStore.getToken());  
    //     return {
    //         isLogin
    //     };
    // },
    data() {
      return {
        isLogin: true
      }
    },
    computed: {
        // isLogin() {
        //   const tokenStore = useTokenStore();  
        //   return !!tokenStore.getToken();
        // }
    },
    async mounted() {
        window.addEventListener('beforeunload', this.handleLogoutOnClose);
    },
    beforeUnmount() {
    window.removeEventListener('beforeunload', this.handleLogoutOnClose);
  },
    methods: {
        // async handleLogoutOnClose() {
        //     alert("login",this.isLogin)
        //     if (this.isLogin) {
        //         const res = await Logout();
        //         alert("res",res);
        //     }
        // },
        // async logout(){
        //     const resp= await RecoverCode();
        //     console.log(resp);
        //     if(resp.status_code==200) alert("恢复成功！");
        //     const res = await Logout();
        //     console.log("res",res);
        //     const tokenStore = useTokenStore();
        //     tokenStore.clearToken(); // 清除 Pinia 中的令牌
        //     window.location.href = '/Userlogin';// 重定向到登录页面或首页
        // },
    }
  }
</script>  
<style scoped> 
.back{
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
}
.top{
    display: flex;
    flex-direction: row;
    height: 5vh;
    width: 100vw;
    border: 1px solid #000;
}
.userphoto{
    width: 10vw;
    margin-left: auto;
}
.buttom{
    height: calc(100vh - 5vh);
    width: 100vw;
    margin-top: 1vh;
    display: flex;
    flex-direction: row;
}
.navbar{
    height: 100%;
    width: 10vw;
    display: flex;
    flex-direction: column;
    gap: 1%;
    border: 1px solid #000;
}
.content{
    height: 100%;
    width: calc(90vw - 1vw);
    background-color: #f0f0f0;
    margin-left: 1vw;
    border: 1px solid #000;
    overflow: auto;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    min-width: 1241px; /* 确保能容纳 MakeSandBox 的最小宽度 */
}


.modify{
    top:45vh;
}
.slim{
    top:45vh;
}
.compilation{
    top:45vh;
}

</style>
    