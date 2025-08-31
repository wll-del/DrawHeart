<template>
    <div class="back">
      <div class="input-container">
            <el-autocomplete 
              v-model="inputcontent"
              :fetch-suggestions="querySearchAsync"
              placeholder="Please input"
              @select="handleSelect"
              class="custom-input"
            />
            <div class="query" @click="handleClick"></div>  
      </div>
    
      <!-- 导航栏 -->
      <div class="navbar">
          <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
            <el-tab-pane label="文物" name="first" ></el-tab-pane>
            <el-tab-pane label="科普" name="second"></el-tab-pane>
            <el-tab-pane label="攻略" name="third"></el-tab-pane>
            <el-tab-pane label="美食" name="fourth"></el-tab-pane>
          </el-tabs>
      </div>
    
      <div id="gallery">
        <div v-for="image in images" :key="image.id" class="image-item" @click="showDialog(image.id)">
          <img :src="image.img" :style="{ width: '100%', height: '100%', 'object-fit': 'cover','border-radius':'36px' }" alt="image" />
        </div>
      </div>
    
      <div id="load-more" ref="loadMore" v-if="hasMore">
        <button @click="loadImages">加载更多</button>
      </div>
        
    
      <!-- 弹窗部分 -->
      <showdialog 
          v-if="isDialogVisible" 
          :post_id="post_id" 
          :dialogVisible="isDialogVisible"
          :ischeck="false"
          @close="hideDialog" 
          class="Pop-ups"
      />
    
      <!-- 遮罩层 -->
      <div v-if="isDialogVisible" class="dialog-overlay" @click="hideDialog"></div>
    
    </div>
    </template>
      
    <script>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useRouter } from 'vue-router';
    import { showPost,query_input,query,get_image_url } from "@/api/community.js";
    import showdialog from './dialog.vue';
    export default {
      props:['shareData'],
      components: {
        showdialog
      },
      setup(props, { emit }) {
        const router = useRouter();
        const inputcontent = ref('');
        const querySearchAsync = async (queryString, cb) => {
          if (!queryString) {
            cb([]);
            return;
          }
          try {
            const requestData = {
              keyword: queryString // 确保使用 queryString 作为关键词
            };
            const response = await query_input(requestData);
            console.log(response)
            if (response) {
              // 转换后端返回的数据格式
              const suggestions = response.map(item => ({
                value: item.title,
                id: item.id
              }));
              cb(suggestions); // 传递转换后的数据
            } else {
              cb([]); // 返回空数组
            }
          } catch (error) {
            console.error('Failed to fetch suggestions:', error);
            cb([]); // 发生错误时返回空数组
          }
        };
    
        const handleSelect = (item) => {
          console.log('Selected item:', item);
          performCustomAction(item);
        };
    
        const handleClick = async () => {
          const data = {
            keyword: inputcontent.value
          };
          try {
            const response = await query(data);
            console.log('查询成功:', response.status_code);
            emit('send-data', { response });
            router.push('/PostQueryRes');
          } catch (error) {
            console.error('查询失败:', error.message);
          }
        };
    
        const performCustomAction = async (item) => {
          console.log('Performing custom action with:', item);
          const data = {
            keyword: item.value
          };
          try {
            const response = await query(data);
            console.log('查询成功:', response.status_code);  
            emit('send-data', { response });
            router.push('/PostQueryRes');
          } catch (error) {
            console.error('查询失败:', error.message);
          }
        };
        return {
          inputcontent,
          querySearchAsync,
          handleSelect,
          handleClick
        };
      },
      data() {
        return {
          isDialogVisible:false,
          dialogTitle: 'Dialog Title',
          dialogContent: 'This is the content of the dialog.',
          images: [],
          offset: 0,
          limit: 10,
          hasMore: true,
        };
      },
    
      methods: {
    
        showDialog(post_id) {
          this.post_id = post_id;  // 设置选中的图像ID
          this.isDialogVisible = true;  // 显示弹窗
        },
        hideDialog() {
          this.isDialogVisible = false;
        },
    
          async loadImages() {
        // 假设 props.shareData 是一个响应式对象，确保其在 props 中定义
              const rawData = this.shareData ? this.shareData.response : null;
              console.log("after", rawData);
  
              if (rawData && rawData.length) {
                  for (const item of rawData) {
                      const first_photo_id = item["first_photo_id"];
                      const id = item["id"];
                      try {
                          const res = await get_image_url(first_photo_id);  // 确保这个方法在 methods 中定义
                          this.images.push({ img: res.data.file_url, id: id });  // 请注意字段名是 file_url 不是 file_trl
                      } catch (error) {
                          console.error('Error fetching image:', error);
                      }
                  }
              } else {
                  console.log('No data to load images from');
              }
          },
    
        handleIntersection(entries) {
          const entry = entries[0];
          if (entry.isIntersecting && this.hasMore) {
            this.loadImages();
          }
        },
    
        async showdialog(id){
            this.$router.push({ name: 'showDialog_shop', params: { id: id } });
        }
      },
    
      mounted() {
        this.loadImages();
    
      //   const observer = new IntersectionObserver(this.handleIntersection);
      //   observer.observe(this.$refs.loadMore);
    
      //   this.observer = observer;
    
      },
    
      beforeUnmount() {
        if (this.observer) {
          this.observer.disconnect();
        }
      },
    };
    </script>
      
    <style scoped>
    .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40vw;
    margin-left: 28vw;
    margin-top:2vh;
  }
  .query {
    width: 2.5vw;
    height: 2.5vw;
    background-image: url('../../assets/query/search.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    margin-left: 1vw;
  }
  .navbar{
    margin-left:40vw;
    width:15vw;
  }
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }
      body {
        font-family: Arial, sans-serif;
      }
      .back{
      background-color: #F4F2ED;
      height: 100%;
    }
      #gallery {
        display: block; 
        column-count: 6;
        column-gap: 0vw;
      }
      .image-item {
        /* break-inside: avoid;
        margin-bottom: 10px; */
        border-radius:36px;
    border: 1px solid #ccc;
    padding: 10px;
    background-color: #D9D9D9;
    margin-bottom: 10px; 
    margin-left: 1vw;
    margin-right: 1vw;
      }
      img {
        width: 100%;
        display: block;
      }
      #load-more {
        text-align: center;
        margin-top: 20px;
      }
      button {
        padding: 10px 20px;
        font-size: 16px;
      }
      .Pop-ups{
        position: absolute; /* 绝对定位 */
      border-radius: 8px;
      top: 20vh; 
      left: 30vw; 
      width: 45vw;
      height: 70vh;
      }
    </style>