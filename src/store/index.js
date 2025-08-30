const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 提取纯净的文件名（去除路径和扩展名）
  const moduleName = modulePath
    .replace(/^\.\//, '')       // 去除开头的./
    .replace(/\.\w+$/, '');     // 去除文件扩展名

  // 获取模块内容（注意要取 .default）
  const moduleContent = modulesFiles(modulePath).default;

  // 合并模块
  if (moduleContent) {
    modules[moduleName] = moduleContent;
  }

  return modules;
}, {});

export default modules;