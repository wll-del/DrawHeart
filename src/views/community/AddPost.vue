<template>
    <div class="container">
      <div class="overlay">
        <textarea v-model="title" class="input-title" placeholder="请在此处输入标题..."></textarea>
        <textarea v-model="content" class="input-text" placeholder="请在此处输入内容..."></textarea>
        
        <select v-model="selectclassify" class="custom-select">
            <option value="" disabled selected>类别</option>
            <option v-for="item in classify" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
  
        <div class="contain_footer">
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
        
        <div class="header">
          <button class="btn-publish" @click="submitFile">发布</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { send_post, uploadphoto } from '@/api/community';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        files: [],
        selectclassify:'',
        classify: [
            { value: '1', label: '文物' },
            { value: '2', label: '科普' },
            { value: '3', label: '攻略' },
            { value: '4', label: '美食' },
          ],
      };
    },
    methods: {
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
        let first_file="";
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
            if(i==0) first_file += response.data.file_id;
          } 
          else {
            alert("文件上传失败，请重新上传");
            return;
          }
        }
        console.log("file_id",send_files)
        const data = {
          title: this.title,
          content: this.content,
          photo_id: send_files,
          classify:this.selectclassify,
          first_photo_id: first_file
        };
        try {
          const response = await send_post(data);
          console.log(response)
          if (response.status_code === 200) {
            this.files = []; // 上传成功后清空文件数组
            alert("上传成功");
            this.$route.push('/E_Shopping_Mall');
          } else {
            alert("上传失败，请重新上传");
          }
        } catch (error) {
          console.error("上传出错：", error);
        }
         this.$router.push("/community")
      }
     
    }
  };
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100vh; /* 或者您希望的高度 */
    background-image: url(../../assets/communite/send_post_back.png);
    background-repeat: no-repeat;
    overflow: hidden;
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    padding: 20px;
    color: white; /* 根据背景图片调整文字颜色 */
    box-sizing: border-box;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width:  70vw;
    height: 5vh;
    /* margin-top: 1vh; */
    margin-left:10vw;
    padding: 20px;
  }
  
  .btn-publish {
    padding: 20px 40px;
    border: none;
    background-color: rgba(225, 207, 165, 0.5);
    color: black;
    font-size: 2vh;
    text-align: center; /* 水平居中 */
    line-height: 1vh; /* 与按钮高度相同，实现垂直居中 */
    text-align: center;
    border-radius: 16px;
    height: 5vh;
    cursor: pointer;
    margin-left: 54vw;
    margin-top:1vh;
  }
  
  .input-text, .input-title {
    width: 60vw; 
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 10px;
    resize: none;
    font-size: 24px;
    color: #986F3F;
    background-color: #EFEDE8CC;
  }
  
  .input-title {
    height: 8vh; 
    margin-top: 5vh;
  }
  
  .input-text {
    height: 50vh; 
    margin-top: 3vh;
  }
  
  .contain_footer {
    width: 100%;
    height: 12vh;
    margin-left: 35vw;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top:1vh;
  }
  
  .icon {
    width:6vw;
    height:12vh;
  }
  
  .file-upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .file-upload-input,
  .file-upload-button {
    margin-bottom: 10px;
  }
  
  .file-upload-button {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  .submitFilebutton {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .submitFilebutton:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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
    width: 100px;
    height: 100px;
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
  </style>
  