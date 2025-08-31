<template>
    <!-- 弹出对话框 -->
    <div v-if="dialogVisible" class="dialog">
      <div class="dialog-close">
        <i class="fas fa-times" @click="hideDialog"></i>
      </div>
      <div class="dialog-content">
        <!-- 对话框左侧图片 -->
        <div class="dialog-image">
            <el-carousel class="carousel-img">
                <el-carousel-item v-for="url in photo_urls" :key="url" class="carousel-img1">
                    <img :src="url" alt="image" class="carousel-img2"/>
                </el-carousel-item>
            </el-carousel>
        </div>
        <!-- 对话框右侧 -->
        <div class="dialog-text">
            <div class="check" v-if="ischeck">
              <button @click="topass('post',1,post_id)" class="check-button">通过</button>
              <button @click="topass('post',0,post_id)" class="check-button">不通过</button>
            </div>

            <div class="header">
                <div class="id-image" @click="toaccount">
                    <img :src="userphoto" alt="User Profile Image">
                </div>
                <div class="username">{{ username }}</div>
                <button @click="updatefollow" :class="{'is_followed': is_followed}">
                  <div v-if="is_followed" class="follow">已关注 </div>
                  <div v-else class="unfollow">关注 </div>
                </button>
            </div>

            <el-scrollbar height="100%">
              <div class="description">
                <p>{{ title }}</p>
                <p>{{ content }}</p>
              </div>

              <div class="divider"></div>
              <p>共{{ number_of_comments }}条评论</p>

              <div class="comments">

                <div class="comment-item" v-for=" ucomment in usercomments " :key="ucomment.id" >
                    <img :src="ucomment.userphoto" alt="User Profile Image">
                    <div class="comment-content">
                      <div class="comment-name">{{ ucomment.username }}</div>
                      <div class="comment-text">{{ ucomment.content }}</div>
                      <div class="file-list">
                        <div class="image-container" v-for="(file, index) in ucomment.files" :key="index">
                          <img v-if="file" :src="file" :alt="file" class="preview-image"/>
                        </div>
                      </div>

                    </div>
                </div>

              </div>

            </el-scrollbar>

            <div class="actions" v-if="!is_comment && !ischeck" @click="toaddcomment">
                <input type="text" placeholder="说点什么">
            </div>

            <div class="comment" v-if="is_comment && !ischeck">
              <input v-model="conment" class="input-content" placeholder="说点什么">
              <button @click="submitFile" class="submitcomment">发送</button>
            </div>

            <div class="contain_footer" v-if="is_comment && !ischeck" >

              <div class="entry flex" @click="selectFile">
                <img src="../../assets/communite/add.png" class="icon" />
                <input type="file" ref="fileInput" @change="handleFileChange" style="display: none" accept="image/*" />
              </div>

              <ul class="file-list">
                <li v-for="(file, index) in files" :key="index" class="file-item">
                <div class="image-container" @mouseenter="file.showButton = true" @mouseleave="file.showButton = false">
                  <img v-if="file.url" :src="file.url" :alt="file.name" class="preview-image"/>
                  <button v-if="file.showButton" @click="removeFile(index)" class="remove-button">X</button>
                </div>
                </li>
              </ul>
            </div>

            <div class="actions1" v-if="!is_comment && !ischeck">
                <div class="action-buttons">

                <button @click="updatelikes" :class="{'is_liked': is_liked}">
                  <span v-if="is_liked">♥ {{ number_of_likes }}</span>
                  <span v-else>♡ {{ number_of_likes }}</span>
                </button>

                <button @click="updateFavorited" :class="{'is-favorited': isFavorited}">
                  <span v-if="isFavorited">★ {{ number_of_favorites }}</span>
                  <span v-else>☆ {{ number_of_favorites }}</span>
                </button>

                <button > 💬{{ number_of_comments }}</button>
                </div>
            </div>

        </div>
      </div>
    </div>
</template>

  <script>
  import { showPostDialog,get_image_url, add_favorite,add_like,add_follow ,add_comment_to_post,uploadphoto, showcomment} from "@/api/community.js"
  import { get_image_url_user ,checkjudge} from "@/api/user";
  export default {
    props: {
        post_id:String,
        dialogVisible:Boolean,
        ischeck:Boolean,
    },
    data(){
        return{
          usercomments:[],
          files: [],
          is_followed:false,
          uploadStatus: '',
          isFavorited: false,
          is_liked:false,
          is_comment:false,
          title:"",
          content:"",
          photo_id:"",
            user_id:"",
            userphoto:"",
            username:"",
            create_time:"",
            number_of_likes:"",
            number_of_favorites:"",
            number_of_comments:"",
            classify:"",
            first_photo_id:"",
            photo_urls:[],
            conment:"",
        }
    },
    methods: {
      toaccount() {
      this.$router.push({
        name:'Account',
        params:{id:this.user_id}
      });
    },
      async topass(classify,isok,id){
        const data={
          'classify':classify,
          'isok':isok,
          'id':id
        };
        const res=await checkjudge(data);
        console.log(res);
        alert(res.message);
        if(isok)
          this.$emit('close',1);
        else
          this.$emit('close',0)
      },

      selectFile() {
        this.$refs.fileInput.click();
      },

      handleFileChange(event) {
        const newFiles = Array.from(event.target.files).map(file => {
          return {
            file: file,
            url: URL.createObjectURL(file),
            name: file.name,
            showButton: false // 初始化时隐藏按钮
          };
        });
        this.files = [...this.files, ...newFiles];
        event.target.value = ''; // 清空输入框的值，以便选择相同文件时也能触发 change 事件
      },

      removeFile(index) {
        // 释放URL对象的内存
        URL.revokeObjectURL(this.files[index].url);
        this.files.splice(index, 1);
      },

      async submitFile() {
        let send_files = "";
        for (let i = 0; i < this.files.length; i++)
        {
          const formData = new FormData();
          formData.append('file', this.files[i].file); // 仅传递 file 对象
          const response = await uploadphoto(formData);
          console.log(response)
          if (response.status_code === 200)
          {
            send_files += response.data.file_id;
            if (i < this.files.length - 1) {
              send_files += ",";
            }
          }
          else {
            alert("文件上传失败，请重新上传");
            return;
          }
        }
        console.log("file_id",send_files)
        const data = {
          post_id:this.post_id,
          content: this.conment,
          photo_id: send_files,
        };
        try {
          const response = await add_comment_to_post(data);
          console.log(response)
          if (response.status_code === 200) {
            console.log("上传成功");
            this.uploadStatus = '上传成功';
            this.files = []; // 上传成功后清空文件数组
          } else {
            alert("上传失败，请重新上传");
          }
        } catch (error) {
          this.uploadStatus = '上传失败';
          alert("上传出错")
          //console.error("上传出错：", error);
        }
        this.is_comment=!this.is_comment;
        this.loadcomments();
      },

      toaddcomment(){
        this.is_comment=!this.is_comment;
      },
      async updatefollow(){
        console.log("follow",this.user_id)
        const res=await add_follow(this.user_id);

        if(res.data)
          this.is_followed=1;
        else
          this.is_followed=0;
      },
      async updateFavorited() {
        const res=await add_favorite(this.post_id);
        if(res.data)
        {
          this.number_of_favorites +=1;
          this.isFavorited=1;
        }
        else
        {
          this.number_of_favorites -= 1;
          this.isFavorited=0;
        }
      },
      async updatelikes(){
        const res=await add_like(this.post_id);
        if(res.data)
        {
          this.number_of_likes += 1;
          this.is_liked=1;
        }
        else
        {
          this.number_of_likes -= 1;
          this.is_liked=0;
        }
      },
      async loadDetails() {
            const res = await showPostDialog(this.post_id);
            console.log("res.data",res.data)
            this.username=res.data.username;
            // this.userphoto=res.data.userphoto;
            const tmp=await get_image_url_user(res.data.user_photo);
            console.log("tmp",tmp)
            this.userphoto=tmp.data.file_url;
            console.log("photo",this.userphoto);
            this.user_id=res.data.user_id;
            this.title=res.data.title;
            this.content=res.data.content;
            this.number_of_likes=res.data.likes;
            this.number_of_favorites=res.data.number_of_favorites;
            this.number_of_comments=res.data.number_of_comments;
            this.isFavorited=res.data.isFavorited;
            this.is_liked=res.data.is_liked;
            this.is_followed=res.data.is_followed;
            const photoIds = res.data.photo_id.split(',');
            for (let i = 0; i < photoIds.length; i++) {
                const url = await this.getImageUrl(photoIds[i]); // 等待每个图片的 URL
                this.photo_urls.push(url); // 将 URL 添加到 photo_urls 数组中
            }
        },
      async loadcomments(){
        const res=await showcomment(this.post_id);
        console.log("scomment",res);
        this.usercomments=[];
        this.number_of_comments=0;
        for(let i=0;i<res.data.length;i++)
        {
          let tmp_photo_urls=[];
          console.log(res.data[i]);
          if(res.data[i].files)
          {
            const photoIds = res.data[i].files.split(',');
            for (let j = 0; j < photoIds.length; j++) {
              const url = await this.getImageUrl(photoIds[j]); // 等待每个图片的 URL
              console.log("comment",url);
              tmp_photo_urls.push(url); // 将 URL 添加到 photo_urls 数组中
            }
          }
          const uphoto=await this.getImageUrl_user(res.data[i].userphoto);
          let ans={
            'id':res.data[i].id,
            'userphoto':uphoto,
            'username':res.data[i].username,
            'content':res.data[i].content,
            'files':tmp_photo_urls,
          }
          this.usercomments.push(ans);
          this.number_of_comments += 1;
        }
      },
      async getImageUrl(id) {
            const res = await get_image_url(id);
            console.log(res.data.file_url);
            return res.data.file_url;
        },
      async getImageUrl_user(id) {
            const res = await get_image_url_user(id);
            console.log(res.data.file_url);
            return res.data.file_url;
        },
    },
    mounted() {
        this.loadDetails(); // 在弹窗组件加载时调用后端接口
        this.loadcomments();
    }
  };
  </script>

<style>
.carousel-img {
  width: 100%;
  height: 80%;
  border-radius: 8px;
  margin-top: 60%;
}
.carousel-img1 {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    margin-top:20%
}
.carousel-img2 {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 8px;
    display: block;
}
.el-scrollbar {
    height: 68% !important;
    width: 95%;
}
</style>

<style scoped>
.comment{
  display: flex;
  flex-direction: row;
  margin-top:2vh;
}
.submitcomment{
  height: 5vh;
  width: 4vw;
  background-color: bisque;  
  border-radius: 2vh;
}
.input-content{
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    margin-right: 10px;
    width:30vh;
}
.check{
  margin-bottom:1vw;
}
.check-button{
  background-color: #E1D8C2;
    color: black; /* 文字颜色设置为白色 */
    border: none; /* 移除边框 */
    padding: 1% 2%; /* 内边距 */
    cursor: pointer; /* 鼠标悬停时显示手指形状 */
    border-radius: 8px;
    margin-right:1%;
}
  .contain_footer {
    width: 100%;
    height: 4vh;
    margin-left: 0.3vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top:1vh;
  }
  .icon {
    width:3vw;
    height:6vh;
  }
  .file-list {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    list-style: none;
    margin-top: 10px;
  }
  .file-item {
    position: relative; /* 相对定位 */
    margin-right: 10px;
  }
  .image-container {
    position: relative; /* 相对定位 */
    width:3vw;
    height:6vh;
  }
  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .remove-button {
    position: absolute; /* 绝对定位 */
    top: 5px;
    right: 5px;
    background-color: rgba(231, 76, 60, 0.7);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px;
    cursor: pointer;
    z-index: 10; /* 确保按钮在图片上层 */
    display: none; /* 默认隐藏 */
  }
  .image-container:hover .remove-button {
    display: block; /* 鼠标悬停时显示按钮 */
  }
  button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 16px;
  }
  .is-favorited {
  color: red; /* 收藏后变为红色 */
  }
  .is_liked {
  color: red; /* 收藏后变为红色 */
  }
  .follow{
  color:white;
  width: 4vw;
  height: 4vh;
  background-color: gainsboro;
  }
  .unfollow{
  width: 4vw;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #DEC687;
  padding: 2% 6%; /* 内边距，根据需要调整 */
  border: none; /* 移除边框，如果你想要的话 */
  color: black;
  border-radius: 8px;
  }
  .dialog {
    /* position: fixed; */
    /* transform: translate(-50%, -50%); */
    background: white;
    /* box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); */
    /* border-radius: 8px; */
    z-index: 1000;
    width: 100%;
    height: 100%;
  }

  /* .dialog-close {
    position: absolute;
    background-color: #ff6b6b;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
  } */

  .dialog-content {
    display: flex;
    width:100%;
    height: 100%;
    padding: 20px;
  }

.dialog-image {
  margin-right: 1vw;
  width: 40%;
  height: 80%;
}
.dialog-text {
    width: 50%;
    height: 80%;
  font-size: 35%;
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .id-image {
    margin-right: 10px;
  }

  .id-image img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  .username {
    font-weight: bold;
    flex: 1;
    font-size: 1.5em;
  }

  .button-follow {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
  }

  .description {
    font-size: 1.5em;
  }

  .divider {
    height: 1px;
    background: #e0e0e0;
    margin: 20px 0;
  }

  .comments {
    margin-bottom: 20px;
  }

  .comment-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }

  .comment-item img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .comment-content {
    flex: 1;
  }

  .comment-name {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .actions {
    display: flex;
    align-items: center;
    width:100%;
    margin-top: 2vh;
  }

  .actions input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 20px;
    margin-right: 10px;
  }

  .actions1 {
    display: flex;
    align-items: center;
    width:100%;
    margin-top:1vh;
  }
  .action1-buttons {
    display: flex;
    gap: 10px;
  }
  
  .button-heart {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #ff6b6b;
  }

  .button-heart i {
    margin-right: 5px;
  }
</style>
