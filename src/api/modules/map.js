// api集合
import api from "../http.js";
// 首页详情
export const getSceneList = (body) =>
  api.post("/jeecg-boot/taskPlan/sceneList", body);

// 查询加载场景
export const loadScene = (body) =>
  api.JPost("/jeecg-boot/taskPlan/loadScene", body);

// 发送指令
export const sendCommand = (body) =>
  api.JPost("/jeecg-boot/taskExecution/sendCommand", body);
