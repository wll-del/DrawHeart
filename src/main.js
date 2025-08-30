import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import api from './api'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';

const app = createApp(App)
app.config.globalProperties.$api = api

// pinia
const pinia = createPinia();
// 持久化存储
import { createPersistedState } from 'pinia-plugin-persistedstate';
pinia.use(
    createPersistedState({
        auto: true, // 启用所有 Store 默认持久化
    }),
);
// 重写 $reset 方法 => 解决组合式api中无法使用问题
pinia.use(({ store }) => {
    const initialState = JSON.parse(JSON.stringify(store.$state));
    store.$reset = () => {
        store.$patch(initialState);
    };
});
app.use(pinia);

app.use(router)
app.use(ElementPlus);
app.mount('#app')
