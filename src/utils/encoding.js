export function decodeResponse(response) {
    try {
      console.log("Starting response decoding",response);
  
      // 处理响应头大小写不敏感的问题
      const contentType = (
        response.headers['content-type'] ||
        response.headers['Content-Type'] ||
        ''
      ).toLowerCase();
      console.log("Detected Content-Type:", contentType);
  
      // 提取并清理字符集参数
      const charsetMatch = contentType.match(/charset\s*=\s*(["']?)([^;"']+)\1/i);
      let charset = 'utf-8';
      if (charsetMatch && charsetMatch[2]) {
        charset = charsetMatch[2]
          .trim()
          .replace(/['"]/g, '')
          .toLowerCase();
      }
      console.log("Using charset:", charset);
  
      // 创建解码器实例
      const decoder = new TextDecoder(charset);
      console.log("Decoder instance created");
  
      // 直接尝试解码（自动处理ArrayBuffer和TypedArray）
      return decoder.decode(response.data);
    } catch (error) {
      console.error('Primary decoding failed:', error);
      
      try {
        // 回退处理流程
        console.log('Attempting fallback decoding');
        
        // 处理不同数据类型
        if (typeof response.data === 'string') {
          console.log('Fallback: Using raw string data');
          return response.data;
        }
  
        // 尝试UTF-8解码二进制数据
        const fallbackDecoder = new TextDecoder('utf-8');
        return fallbackDecoder.decode(response.data);
      } catch (fallbackError) {
        console.error('Fallback decoding failed:', fallbackError);
        
        // 最终回退方案
        try {
          return String.fromCharCode.apply(null, new Uint8Array(response.data));
        } catch (finalError) {
          console.error('Final fallback failed:', finalError);
          return '';
        }
      }
    }
  }