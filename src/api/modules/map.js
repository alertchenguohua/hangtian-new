// api集合
import api from "../http.js";
// 查询场景数据
export const getSceneList = (body) =>
  api.post("/jeecg-boot/taskPlan/sceneList", body);

// 查询加载场景
export const loadScene = (body) =>
  api.JPost("/jeecg-boot/taskPlan/loadScene", body);

// 场景保存
export const saveScene = (body) =>
  api.JPost("/jeecg-boot/taskPlan/saveScene", body);

// 发送指令
export const sendCommand = (body) =>
  api.JPost("/jeecg-boot/taskExecution/sendCommand", body);

// 任务启动
export const startTask = (body) =>
  api.JPost("/jeecg-boot/taskExecution/startTask", body);

// 任务停止
export const terminateTask = (body) =>
  api.JPost("/jeecg-boot/taskExecution/terminateTask", body);

// 模拟飞行
export const simulatedFlight = (body) =>
  api.JPost("/jeecg-boot/taskExecution/simulatedFlight", body);

// 布局判决
export const layoutValidate = (body) =>
  api.JPost("/jeecg-boot/taskPlan/layoutValidate", body);

// 仿真验证
export const simulationValidate = (body) =>
  api.JPost("/jeecg-boot/taskPlan/simulationValidate", body);
