<!--  规划控制页面  -->
<template>
  <div class="plan-control">
    <div>
      <!--  选择场景模块  -->
      <div class="xzcj" style="width: 666px">
        <el-card :bordered="false">
          <font color="#1e90ff" size="4">请选择场景</font>
          <el-select
            filterable
            v-model="sceneId"
            placeholder="请选择场景"
            style="margin-left: 10px"
            @change="loadScene"
          >
            <el-option
              v-for="(item, i) in sceneOptions"
              :key="i"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            @click="saveDialogVisible = true"
            style="margin-left: 10px"
          >
            保存
          </el-button>
          <el-button type="primary" @click="empty()">清空</el-button>
          <el-dialog
            :visible.sync="saveDialogVisible"
            title="场景保存"
            width="30%"
          >
            <div style="text-align: center">
              <el-button type="primary" @click="saveScene()"
                >保存场景</el-button
              >
              <el-button @click="newSaveScene()">另存新场景</el-button>
            </div>
          </el-dialog>
          <el-dialog
            :visible.sync="newScenedialog"
            width="30%"
            title="场景另存为"
          >
            新场景名称：
            <el-input
              style="width: 230px"
              v-model="newSceneName"
              placeholder="请输入新场景名称"
            ></el-input>
            <span slot="footer">
              <el-button @click="dialog = false">取 消</el-button>
              <el-button type="primary" @click="newSceneConfirm()"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-card>
      </div>
      <!--  仿真@@模块  -->
      <div class="fzcs">
        <el-card :bordered="false">
          <p align="center">
            <font color="#1e90ff" size="4">仿真@@</font>
          </p>
          <font>干扰频1:</font>
          <el-select
            @change="choiceFrequency"
            v-model="frequencyOne.value"
            placeholder="请选择干扰频1"
            style="width: 150px; margin-left: 10px"
          >
            <el-option
              v-for="(item, i) in frequencyOne"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <font>干扰模式:</font>
          <el-select
            @change="choicePattern"
            v-model="patternValue"
            placeholder="请选择干扰模式"
            style="width: 150px; margin-left: 10px"
          >
            <el-option
              v-for="(item, i) in pattern"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <font>干扰个数:</font>
          <el-select
            v-model="number"
            style="width: 90px; margin-left: 10px"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, i) in num"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option> </el-select
          ><br /><br />
          <font>请选择驱动形式:</font>
          <el-select v-model="driveValue" style="margin-left: 10px">
            <el-option
              v-for="(item, i) in DriveForms"
              :key="i"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <font color="#1e90ff" size="3">请输入干信比门限: </font>
          <el-input
            type="text"
            size="6"
            v-model="ganxinbi"
            style="width: 150px"
            placeholder="请输入干信比门限"
          ></el-input>
        </el-card>
      </div>

      <!--  各站@@设置模块  -->
      <el-card>
        <div class="main">
          <div class="my-tab">
            <div
              class="my-tab-item"
              v-for="(item, index) in tabItemData"
              :key="item.id"
            >
              <span
                @click="tabItemIndex = index"
                :class="{ 'tab-item-active': index == tabItemIndex }"
                >{{ item.name }}</span
              >
            </div>
          </div>
          <el-form
            v-for="(item, index) in tabItemData"
            :key="item.id"
            v-show="index == tabItemIndex"
            class="my-form"
            :inline="true"
            ref="form"
            :model="item.form"
            label-width="80px"
          >
            <div style="display: flex; flex-wrap: wrap">
              <p style="width: 50%" align="center" v-if="driveValue === 'time'">
                <font>请输入干扰时间:</font>
                <el-input
                  type="text"
                  placeholder="输入格式:xxxs"
                  size="18"
                  v-model="item.InterfereTime"
                  style="width: 150px"
                >
                </el-input>
              </p>
              <p style="width: 50%" v-if="driveValue === 'location'">
                <font>请输入干扰位置:</font>
                <el-input
                  type="text"
                  placeholder="输入格式(以减号为分隔符):x-y-z"
                  size="25"
                  v-model="item.InterfereTime"
                  style="width: 230px"
                ></el-input>
              </p>
              <p style="width: 50%" align="center">
                <font>请选择干扰类型:</font>
                <el-select
                  v-model="item.grType"
                  placeholder="请选择干扰模式"
                  style="width: 150px; margin-left: 10px"
                >
                  <el-option label="欺骗干扰" value="5"></el-option>
                  <el-option label="压制干扰" value="2"></el-option>
                </el-select>
              </p>
              <section v-if="item.grType == 5">
                <font>请输入欺骗坐标:</font>
                <el-input-number
                  v-model="item.jingdu"
                  :precision="7"
                  :step="0.1"
                  :min="-180"
                  :max="180"
                  controls-position="right"
                  style="width: 150px; margin-left: 10px"
                ></el-input-number>
                <el-input-number
                  v-model="item.weidu"
                  :precision="7"
                  :step="0.1"
                  :min="-90"
                  :max="90"
                  controls-position="right"
                  style="width: 150px; margin-left: 10px"
                ></el-input-number>
                <el-input-number
                  v-model="item.gaodu"
                  :precision="7"
                  :step="0.1"
                  :min="-5000"
                  :max="5000"
                  controls-position="right"
                  style="width: 150px; margin-left: 10px"
                ></el-input-number>
              </section>
              <p style="width: 50%" align="center">
                <font>请选择干扰模式:</font>
                <el-select
                  v-model="item.grPattern"
                  placeholder="请选择干扰模式"
                  style="width: 150px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in pattern"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </p>
              <p style="width: 50%" align="center">
                <font>请输入主站功率值:</font>
                <el-input-number
                  v-model="item.homePower"
                  :min="10"
                  :max="1000"
                  style="width: 150px"
                ></el-input-number>
              </p>
            </div>
            <!-- 频段start -->
            <font>F1频段</font>
            <div v-if="item.grType == '2'" class="xzgrzs">
              <el-select
                v-model="item.form.mode1"
                placeholder="请选择干扰模式"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in pattern"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="请输入主1功1值"
                size="18"
                v-model="item.form.power1"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.type1"
                placeholder="请选择干扰制式"
                style="width: 150px; margin-left: 15px"
              >
                <el-option
                  v-for="(item, i) in standard"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <p v-if="item.form.type1 === '0'">
                <br />
                <font>设置{{ standardMap[item.form.type1] }}@@</font>
                <el-select
                  v-model="item.form.frequency1"
                  @change="selectState1($event, item)"
                  placeholder="请选择干扰频1"
                  style="width: 150px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in frequency"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  :disabled="item.form.state1"
                  size="9"
                  v-model="item.form.dpgrZbpl1"
                  style="width: 150px; margin-left: 15px"
                ></el-input>
              </p>
              <p v-if="item.form.type1 === '1'">
                <br />
                <font>设置{{ standardMap[item.form.type1] }}@@</font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="9"
                  v-model="item.form.tpgrZbpl1"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频1"
                  size="9"
                  v-model="item.form.tpgrTzpl1"
                  style="width: 150px; margin-left: 15px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频偏"
                  size="9"
                  v-model="item.form.tpgrZbpp1"
                  style="width: 150px; margin-left: 15px"
                ></el-input>
              </p>
              <p v-if="item.form.type1 === '2'">
                <br />
                <font>设置{{ standardMap[item.form.type1] }}@@</font>
                <el-input
                  type="text"
                  placeholder="起始频1"
                  size="9"
                  v-model="item.form.spgrQspl1"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="终止频1"
                  size="9"
                  v-model="item.form.spgrZzpl1"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="扫频点数"
                  size="9"
                  v-model="item.form.spgrSpds1"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="频点驻留时间"
                  size="9"
                  v-model="item.form.spgrPdzlsj1"
                  style="width: 120px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type1 === '3'">
                <br />
                <font>设置{{ standardMap[item.form.type1] }}@@</font>
                <el-input
                  type="text"
                  placeholder="中心频1"
                  size="9"
                  v-model="item.form.bzsgrZxpl1"
                  style="width: 100px"
                >
                </el-input>
                <el-input
                  type="text"
                  placeholder="带宽"
                  size="9"
                  v-model="item.form.bzsgrDk1"
                  style="width: 100px"
                >
                </el-input>
                <el-select
                  v-model="item.form.bzsgrLbqxs1"
                  style="width: 160px"
                  placeholder="请选择滤波器形式"
                >
                  <el-option
                    v-for="(item, i) in bzsgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="9"
                  v-model="item.form.bzsgrLbqaz1"
                  style="width: 150px"
                >
                </el-input>
              </p>
              <p v-if="item.form.type1 === '4'">
                <br />
                <font>{{ standardMap[item.form.type1] }} </font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="7"
                  v-model="item.form.txgrZbpl1"
                  style="width: 90px"
                >
                </el-input>
                <el-select v-model="item.form.txgrTxxs1" style="width: 120px">
                  <el-option
                    v-for="(item, i) in txgrTxxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="符号速率"
                  size="7"
                  v-model="item.form.txgrFhsl1"
                  style="width: 120px"
                >
                </el-input>
                <el-select v-model="item.form.txgrPNm1" style="width: 120px">
                  <el-option
                    v-for="(item, i) in txgrPNm"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select v-model="item.form.txgrLbqxs1" style="width: 120px">
                  <el-option
                    v-for="(item, i) in txgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="7"
                  v-model="item.form.txgrLbqaz1"
                  style="width: 120px; margin-left: 70px; margin-top: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type1 === '9'">
                <br />
                <font>设置{{ standardMap[item.form.type1] }}@@</font>
                <el-input
                  type="text"
                  placeholder="脉冲宽度"
                  size="9"
                  v-model="item.form.mcgrMckd1"
                  style="width: 150px"
                >
                </el-input>
                <el-input
                  type="text"
                  placeholder="周期"
                  size="9"
                  v-model="item.form.mcgrZq1"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
            </div>
            <div v-else class="xzgrzs">
              <el-select
                v-model="item.form1.f1Bit0"
                placeholder="请选择bit0值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f1Bit1"
                placeholder="请选择bit1值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f1Bit2"
                placeholder="请选择bit2值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f1Bit3"
                placeholder="请选择bit3值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <br />

            <font>F2频段</font>
            <div v-if="item.grType == '2'" class="xzgrzs">
              <el-select
                v-model="item.form.mode2"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰模式"
              >
                <el-option
                  v-for="(item, i) in pattern"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="请输入主1功1值"
                size="18"
                v-model="item.form.power2"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.type2"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰制式"
              >
                <el-option
                  v-for="(item, i) in standard"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <p v-if="item.form.type2 === '0'">
                <br />
                <font>设置{{ standardMap[item.form.type2] }}@@</font>
                <el-select
                  v-model="item.form.frequency2"
                  @change="selectState2($event, item)"
                  style="width: 150px; margin-left: 10px"
                  placeholder="请选择干扰频1"
                >
                  <el-option
                    v-for="(item, i) in frequency"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  :disabled="item.form.state2"
                  type="text"
                  placeholder="载波频1"
                  size="9"
                  v-model="item.form.dpgrZbpl2"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type2 === '1'">
                <br />
                <font>设置{{ standardMap[item.form.type2] }}@@</font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="9"
                  v-model="item.form.tpgrZbpl2"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频1"
                  size="9"
                  v-model="item.form.tpgrTzpl2"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频偏"
                  size="9"
                  v-model="item.form.tpgrZbpp2"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type2 === '2'">
                <br />
                <font>设置{{ standardMap[item.form.type2] }}@@</font>
                <el-input
                  type="text"
                  placeholder="起始频1"
                  size="9"
                  v-model="item.form.spgrQspl2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="终止频1"
                  size="9"
                  v-model="item.form.spgrZzpl2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="扫频点数"
                  size="9"
                  v-model="item.form.spgrSpds2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="频点驻留时间"
                  size="9"
                  v-model="item.form.spgrPdzlsj2"
                  style="width: 120px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type2 === '3'">
                <br />
                <font>设置{{ standardMap[item.form.type2] }}@@</font>
                <el-input
                  type="text"
                  placeholder="中心频1"
                  size="9"
                  v-model="item.form.bzsgrZxpl2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="带宽"
                  size="9"
                  v-model="item.form.bzsgrDk2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-select
                  v-model="item.form.bzsgrLbqxs2"
                  style="width: 100px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in bzsgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="9"
                  v-model="item.form.bzsgrLbqaz2"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type2 === '4'">
                <br />
                <font>{{ standardMap[item.form.type2] }}</font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="7"
                  v-model="item.form.txgrZbpl2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-select
                  v-model="item.form.txgrTxxs2"
                  style="width: 110px; margin-left: 10px"
                  placeholder="调相形式"
                >
                  <el-option
                    v-for="(item, i) in txgrTxxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="符号速率"
                  size="7"
                  v-model="item.form.txgrFhsl2"
                  style="width: 90px; margin-left: 10px"
                ></el-input>
                <el-select
                  v-model="item.form.txgrPNm2"
                  style="width: 100px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in txgrPNm"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="item.form.txgrLbqxs2"
                  style="width: 100px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in txgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="7"
                  v-model="item.form.txgrLbqaz2"
                  style="width: 100px; margin-left: 74px; margin-top: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type2 === '9'">
                <br />
                <font>设置{{ standardMap[item.form.type2] }}@@</font>
                <el-input
                  type="text"
                  placeholder="脉冲宽度"
                  size="9"
                  v-model="item.form.mcgrMckd2"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="周期"
                  size="9"
                  v-model="item.form.mcgrZq2"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
              </p>
            </div>
            <div v-else class="xzgrzs">
              <el-select
                v-model="item.form1.f2Bit0"
                placeholder="请选择bit0值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f2Bit1"
                placeholder="请选择bit1值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f2Bit2"
                placeholder="请选择bit2值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f2Bit3"
                placeholder="请选择bit3值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <br />

            <font>F3频段</font>
            <div v-if="item.grType == '2'" class="xzgrzs">
              <el-select
                v-model="item.form.mode3"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰模式"
              >
                <el-option
                  v-for="(item, i) in pattern"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                type="text"
                placeholder="请输入主1功1值"
                size="18"
                v-model="item.form.power3"
                style="width: 150px; margin-left: 10px"
              ></el-input>
              <el-select
                v-model="item.form.type3"
                style="width: 150px; margin-left: 10px"
                placeholder="请选择干扰制式"
              >
                <el-option
                  v-for="(item, i) in standard"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <p v-if="item.form.type3 === '0'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-select
                  v-model="item.form.frequency3"
                  @change="selectState3($event, item)"
                  style="width: 150px; margin-left: 10px"
                  placeholder="请选择干扰频1"
                >
                  <el-option
                    v-for="(item, i) in frequency"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  :disabled="item.form.state3"
                  type="text"
                  placeholder="载波频1"
                  size="9"
                  v-model="item.form.dpgrZbpl3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type3 === '1'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="9"
                  v-model="item.form.tpgrZbpl3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频1"
                  size="9"
                  v-model="item.form.tpgrTzpl3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="调制频偏"
                  size="9"
                  v-model="item.form.tpgrZbpp3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type3 === '2'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-input
                  type="text"
                  placeholder="起始频1"
                  size="9"
                  v-model="item.form.spgrQspl3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="终止频1"
                  size="9"
                  v-model="item.form.spgrZzpl3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="扫频点数"
                  size="9"
                  v-model="item.form.spgrSpds3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="频点驻留时间"
                  size="9"
                  v-model="item.form.spgrPdzlsj3"
                  style="width: 120px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type3 === '3'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-input
                  type="text"
                  placeholder="中心频1"
                  size="9"
                  v-model="item.form.bzsgrZxpl3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="带宽"
                  size="9"
                  v-model="item.form.bzsgrDk3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-select
                  v-model="item.form.bzsgrLbqxs3"
                  style="width: 120px; margin-left: 10px"
                >
                  <el-option
                    v-for="(item, i) in bzsgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="9"
                  v-model="item.form.bzsgrLbqaz3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type3 === '4'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-input
                  type="text"
                  placeholder="载波频1"
                  size="7"
                  v-model="item.form.txgrZbpl3"
                  style="width: 100px; margin-left: 10px"
                ></el-input>
                <el-select v-model="item.form.txgrTxxs3" style="width: 100px">
                  <el-option
                    v-for="(item, i) in txgrTxxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="符号速率"
                  size="7"
                  v-model="item.form.txgrFhsl3"
                  style="width: 100px"
                >
                </el-input>
                <el-select v-model="item.form.txgrPNm3" style="width: 130px">
                  <el-option
                    v-for="(item, i) in txgrPNm"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-model="item.form.txgrLbqxs3"
                  style="width: 130px"
                  placeholder="请选择PN码"
                >
                  <el-option
                    v-for="(item, i) in txgrLbqxs"
                    :key="i"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
                <el-input
                  type="text"
                  placeholder="滤波器a值"
                  size="7"
                  v-model="item.form.txgrLbqaz3"
                  style="width: 130px; margin-left: 74px; margin-top: 10px"
                ></el-input>
              </p>
              <p v-if="item.form.type3 === '9'">
                <br />
                <font>设置{{ standardMap[item.form.type3] }}@@</font>
                <el-input
                  type="text"
                  placeholder="脉冲宽度"
                  size="9"
                  v-model="item.form.mcgrMckd3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
                <el-input
                  type="text"
                  placeholder="周期"
                  size="9"
                  v-model="item.form.mcgrZq3"
                  style="width: 150px; margin-left: 10px"
                ></el-input>
              </p>
            </div>
            <!-- 频段end -->
            <div v-else class="xzgrzs">
              <el-select
                v-model="item.form1.f3Bit0"
                placeholder="请选择bit0值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f3Bit1"
                placeholder="请选择bit1值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f3Bit2"
                placeholder="请选择bit2值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.form1.f3Bit3"
                placeholder="请选择bit3值"
                style="width: 150px; margin-left: 10px"
              >
                <el-option
                  v-for="(item, i) in bit"
                  :key="i"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <br />
            <el-button size="medium" type="primary"> 更新 </el-button>
            <el-button
              class="buttonTwo"
              size="medium"
              type="primary"
              @click="sendCommand"
            >
              发送指令
            </el-button>
            <el-button
              class="buttonThree"
              size="medium"
              type="primary"
              @click="addCmd()"
            >
              添加指令
            </el-button>
            <el-button
              v-show="current != null"
              class="buttonThree"
              size="medium"
              type="primary"
              @click="changeData()"
            >
              修改指令
            </el-button>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="instructionsSet">
      <div class="right">
        <iframe
          id="ifrm"
          name="mapFrame"
          src="http://101.42.228.120:8092/nl/"
          frameborder="0"
          style="height: 400px; width: 800px"
        ></iframe>
        <el-button @click="flyToXiBei()">缩放到西北区域</el-button>
        <el-button @click="setStations()">设置站位置</el-button>
        <el-button @click="addCustomStyleLine()">添加自定义样式线</el-button>
        <el-button @click="addTargetHistory()">设置目标轨迹</el-button>
        <el-button @click="clearMap()">删除所有要素</el-button>
        <el-button @click="enableDrawTool()">绘制路径</el-button>
        <el-button @click="disableDrawTool()">结束绘制</el-button>
      </div>
      <div>
        <el-button @click="layoutValidate()">布局判决</el-button>
        <el-button @click="simulationValidate()">仿真验证</el-button>
        <el-button @click="messageShow()">信息展示</el-button>
        <el-button @click="animateReceiveData()">连续接收数据展示</el-button>
        <el-button @click="taskAndFlight('startTask')">开始执行</el-button>
        <el-button @click="taskAndFlight('terminateTask')">结束执行</el-button>
        <el-button @click="taskAndFlight('simulatedFlight')"
          >模拟飞行</el-button
        >
      </div>
      <el-card :bordered="false">
        <div style="min-height: 230px; text-align: center">
          <font color="#1e90ff" size="5">指令集</font><br />
          <ol>
            <li
              :class="['cmd-list', { active: index == current }]"
              style="text-align: left"
              @click="getCmdData(item, index)"
              v-for="(item, index) in masterStation"
              :key="index"
            >
              <div v-if="item.grType == '2'">
                {{ item.tab }}在{{
                  driveValue == "time"
                    ? `任务时间${item.indicator}s`
                    : `位置${item.indicator}处`
                }}发送干扰; F1频段{{ standardMap[item.type1] }}干扰，{{
                  patternMap[item.mode1]
                }}模式，功率{{ item.power1 }},参数列表{{ item.value1 }};
                F2频段{{ standardMap[item.type2] }}干扰，{{
                  patternMap[item.mode2]
                }}模式，功率{{ item.power2 }}db,参数列表{{ item.value2 }};
                F3频段{{ standardMap[item.type3] }}干扰，{{
                  patternMap[item.mode3]
                }}模式，功率{{ item.power3 }},参数列表{{ item.value3 }}。
              </div>
              <div v-else>
                {{ item.tab }}在飞行位置{{ item.cheat_coordinate }}处发送干扰,
                F1{{ patternMap[item.mode] }}欺骗干扰，频点有效列表{{
                  item.f1Bit
                }}; F2{{ patternMap[item.mode] }}欺骗干扰，频点有效列表{{
                  item.f2Bit
                }}; F3{{ patternMap[item.mode] }}欺骗干扰，频点有效列表{{
                  item.f3Bit
                }}。
              </div>
              <el-button
                v-show="masterStation.length != 0"
                class="btnDelete"
                type="primary"
                size="small"
                @click="deleteData(index)"
              >
                删除
              </el-button>
            </li>
          </ol>
        </div>
      </el-card>
    </div>
    <!-- 仿真验证触发弹框展示表格数据 -->
    <el-dialog title="仿真验证" width="80%" :visible.sync="fzdialogVisible">
      <el-table
        border
        :data="fangzhenTableData"
        height="500"
        :span-method="objectSpanMethod"
      >
        <el-table-column prop="id" label="轨迹点序号-id" />
        <el-table-column prop="coordinates" label="轨迹点坐标-coordinates" />
        <el-table-column prop="stationId" label="站号-stationId" />
        <el-table-column prop="f" label="信号频率-f" />
        <el-table-column prop="p" label="源端功率-p" />
        <el-table-column prop="q" label="目标处功率-q" />
        <el-table-column prop="frequencyFlag" label="有效标识-frequencyFlag" />
        <el-table-column prop="flag" label="点有效标识-flag" />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import {
  tabItemData,
  commonFrequency,
  pattern,
  txgrPNm,
  standard,
  // getMastetData
} from "@/common/data.js";
export default {
  components: {},
  data() {
    return {
      fzdialogVisible: false, // 仿真验证触发弹框
      sceneData: {}, // 场景加载返回数据
      fangzhenTableData: [], // 仿真验证表格数据
      testData: [],
      saveDialogVisible: false, // 场景保存确认框
      newScenedialog: false, // 新场景保存弹框
      trackList: [], // track轨迹坐标集合
      stationList: [], // station站点轨迹坐标集合
      tabItemIndex: 0, // 站点tab索引也可对应站点id
      tabItemData, // 站点数据集合
      bit: [
        {
          value: "0",
          label: "0",
        },
        {
          value: "1",
          label: "1",
        },
      ],
      current: null, // 当前指令索引
      sceneId: "", // 场景id
      newSceneName: "", // 新场景名称
      sceneOptions: [], // 场景下拉数据
      frequencyOne: commonFrequency,
      frequency: [...commonFrequency, { value: "10", label: "其他" }],
      patternValue: "", // 仿真模块干扰模式绑定值
      pattern,
      patternMap: {
        0: "固定源端功1",
        1: "固定目标处功1",
        2: "固定指向和源端功1",
      },
      num: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
      ], // 干扰个数下拉数据
      number: "", // 干扰个数
      txgrTxxs: [
        { value: "1", label: "0:BPSK" },
        { value: "2", label: "1:QPSK" },
      ],
      driveValue: "time", // 驱动形式默认时间
      DriveForms: [
        {
          value: "time",
          label: "时间",
        },
        {
          value: "location",
          label: "位置",
        },
      ],
      standard, // 干扰制式,
      standardMap: {
        // 干扰制式映射
        0: "点频",
        1: "调频",
        2: "扫频",
        3: "白噪声",
        4: "调相",
        9: "脉冲",
        255: "无效",
      },
      bzsgrLbqxs: [
        { value: "1", label: "0:升余弦" },
        { value: "2", label: "1:矩形" },
        { value: "3", label: "2:高斯" },
      ],
      txgrPNm, // 调相干扰PN
      txgrLbqxs: [
        { value: "1", label: "0:升余弦" },
        { value: "2", label: "1:矩形" },
        { value: "3", label: "2:高斯" },
      ],
      masterStation: [], // 站点数据集合-与指令数据关系密切
      ganxinbi: "", // 干信比门限
      filterStation: {
        0: "主站1",
        1: "从站1",
        2: "从站2",
        3: "从站3",
      }, // id-站点映射
    };
  },
  mounted() {
    this.getSceneList(); // 获取场景数据
    this.mapEventsListener(); // 地图事件捕获
    // TODO: 后期可实现--站点数据需要一个默认的，不需要加载场景即可渲染到地图上，保存的时候保存最后操作的站点数据当作再次进入的默认站点数据
  },
  methods: {
    //场景下拉框获取数据
    async getSceneList() {
      try {
        const { result } = await this.$api.getSceneList();
        this.sceneOptions = result.sences;
      } catch (error) {
        console.log(error);
      }
    },
    // 地图事件捕获
    mapEventsListener() {
      window.addEventListener("message", (event) => {
        let data = event.data;
        if (!data || !data.cmd) {
          return;
        }
        if (data.cmd === "Map_DblClick") {
          if (!data.params) return;
          let { lon, lat } = data.params;
          console.log("Map_DblClick:双击了地图：[" + lon + "," + lat + "],");
        } else if (data.cmd === "Map_RightClick") {
          if (!data.params) return;
          let { lon, lat } = data.params;
          console.log(
            "Map_RightClick:右键点击了地图：[" + lon + "," + lat + "],"
          );
        } else if (data.cmd === "Station_RightClick") {
          if (!data.params) return;
          let { id, lon, lat } = data.params;
          console.log("Station_RightClick", id, [lon, lat]);
          this.addEditPopup(id, [lon, lat]);
        } else if (data.cmd === "Station_Click") {
          if (!data.params) return;
          let { id, lon, lat } = data.params;
          console.log("Station_Click", id, [lon, lat]);
        } else if (data.cmd === "Line_Drawn") {
          // 路径绘制完成绑定track数据
          if (!data.params) return;
          let { coordinates } = data.params;
          console.log("路径绘制完成，坐标为：", coordinates);
          this.trackList = []; // 先清空然后放入新的坐标
          coordinates.forEach((item, i) => {
            this.trackList.push({
              id: i,
              v: 500, // 默认速度
              coordinates: item,
            });
          });
          this.addTargetHistory();
        } else if (data.cmd === "EditPopup_Submit") {
          if (!data.params) return;
          this.setStations();
          console.log("EditPopup_Submit：" + JSON.stringify(data.params));
        } else if (data.cmd === "Station_DragEnd") {
          // 站点拖动更新站点数据
          if (!data.params) return;
          let { id, lon, lat } = data.params;
          console.log("Station_DragEnd:ID为", id, lon, lat);
          let index = this.stationList.findIndex((item) => item.id == id); // 获取拖动过的站点索引
          this.stationList[index].coordinates[0] = lon; // 覆盖旧站点的经纬度
          this.stationList[index].coordinates[1] = lat;
          console.log(this.stationList, "变更站点后的数据");
        }
      });
    },
    // 仿真验证 TODO: 接口报错Value out of range. Value:\"255\" Radix:10"
    async simulationValidate() {
      try {
        if (!this.sceneId) {
          this.$message({
            message: "请先选择场景！",
            type: "error",
          });
          return;
        }
        let sceneFilter = this.sceneOptions.filter(
          (item) => item.id === this.sceneId
        );
        let param = this.handleSaveSceneData(); // *处理要传的数据*
        const { result } = await this.$api.simulationValidate({
          scene_id: this.sceneId,
          scene_name: sceneFilter[0].name,
          station: this.stationList,
          track: this.trackList,
          param,
        });
        result.track.forEach((track) => {
          track.res.forEach((res) => {
            res.stationRes.forEach((s) => {
              this.fangzhenTableData.push({
                id: track.id,
                coordinates: track.coordinates.join(","),
                stationId: res.stationId,
                f: s.f,
                p: s.p,
                q: s.q,
                frequencyFlag: s.frequencyFlag.toString(),
                flag: track.flag.toString(),
              });
            });
          });
        });
        this.fzdialogVisible = true;
      } catch (error) {
        console.log(error, "仿真error");
      }
    },
    // 表格合并逻辑
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.mergeData(this.fangzhenTableData).one[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 数据归并返回
    mergeData(arr) {
      let spanOneArr = [];
      let concatOne = 0;
      arr.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1);
        } else {
          //id
          if (item.id === arr[index - 1].id) {
            //第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1;
            spanOneArr.push(0);
          } else {
            spanOneArr.push(1);
            concatOne = index;
          }
        }
      });
      return {
        one: spanOneArr,
      };
    },
    // 场景另存为
    async newSceneConfirm() {
      try {
        if (!this.newSceneName.trim()) {
          this.$message({
            message: "请输入新场景名称！",
            type: "error",
          });
          return;
        }
        await this.$api.saveScene({
          scene_id: "", // 另存为不传id
          scene_name: this.newSceneName,
          ...this.sceneData,
        });
        this.getSceneList();
        this.$message({
          message: "覆盖场景成功",
          type: "success",
        });
        this.newScenedialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    //添加指令 TODO: 在指令集中添加一条站点指令
    addCmd() {
      // this.masterStation = this.getMastetData();
    },
    // 仿真模块干扰频1与下方设置点频同步
    choiceFrequency(val) {
      for (let i = 0; i < 3; i++) {
        this.tabItemData[i].form.frequency1 = val;
        this.tabItemData[i].form.frequency2 = val;
        this.tabItemData[i].form.frequency3 = val;
      }
      for (let i = 0; i < 4; i++) {
        this.selectState1(val, this.tabItemData[i]);
        this.selectState2(val, this.tabItemData[i]);
        this.selectState3(val, this.tabItemData[i]);
      }
    },

    stateFilter1(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl1 = "1";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl1 = "2";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl1 = "3";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl1 = "4";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl1 = "5";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl1 = "6";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl1 = "7";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl1 = "8";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl1 = "9";
        this.tabItemData[index].form.state1 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl1 = "";
        this.tabItemData[index].form.state1 = false;
      }
    },
    stateFilter2(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl2 = "1";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl2 = "2";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl2 = "3";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl2 = "4";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl2 = "5";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl2 = "6";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl2 = "7";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl2 = "8";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl2 = "9";
        this.tabItemData[index].form.state2 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl2 = "";
        this.tabItemData[index].form.state2 = false;
      }
    },
    stateFilter3(val, index) {
      if (val == "GPS-L1") {
        this.tabItemData[index].form.dpgrZbpl3 = "1";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "GPS-L2") {
        this.tabItemData[index].form.dpgrZbpl3 = "2";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "GLONASS-G1") {
        this.tabItemData[index].form.dpgrZbpl3 = "3";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B1I") {
        this.tabItemData[index].form.dpgrZbpl3 = "4";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2I") {
        this.tabItemData[index].form.dpgrZbpl3 = "5";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B3I") {
        this.tabItemData[index].form.dpgrZbpl3 = "6";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B1C") {
        this.tabItemData[index].form.dpgrZbpl3 = "7";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2a") {
        this.tabItemData[index].form.dpgrZbpl3 = "8";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "BD/BD3-B2b") {
        this.tabItemData[index].form.dpgrZbpl3 = "9";
        this.tabItemData[index].form.state3 = true;
      }
      if (val == "其他") {
        this.tabItemData[index].form.dpgrZbpl3 = "";
        this.tabItemData[index].form.state3 = false;
      }
    },

    selectState1(val, item) {
      // console.log(val, item, "val, item");
      switch (item.name) {
        case "主站1":
          this.stateFilter1(val, item.id);
          break;
        case "从站1":
          this.stateFilter1(val, item.id);
          break;
        case "从站2":
          this.stateFilter1(val, item.id);
          break;
        case "从站3":
          this.stateFilter1(val, item.id);
          break;
      }
    },
    selectState2(val, item) {
      switch (item.name) {
        case "主站1":
          this.stateFilter2(val, item.id);
          break;
        case "从站1":
          this.stateFilter2(val, item.id);
          break;
        case "从站2":
          this.stateFilter2(val, item.id);
          break;
        case "从站3":
          this.stateFilter2(val, item.id);
          break;
      }
    },
    selectState3(val, item) {
      switch (item.name) {
        case "主站1":
          this.stateFilter3(val, item.id);
          break;
        case "从站1":
          this.stateFilter3(val, item.id);
          break;
        case "从站2":
          this.stateFilter3(val, item.id);
          break;
        case "从站3":
          this.stateFilter3(val, item.id);
          break;
      }

      //从站1
      if (this.tabItemData[1].name == "从站1") {
        if (val == "GPS-L1") {
          this.tabItemData[1].form.dpgrZbpl1 = "1";
        } else if (val == "GPS-L2") {
          this.tabItemData[1].form.dpgrZbpl1 = "2";
        } else if (val == "GLONASS-G1") {
          this.tabItemData[1].form.dpgrZbpl1 = "3";
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[1].form.dpgrZbpl1 = "4";
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[1].form.dpgrZbpl1 = "5";
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[1].form.dpgrZbpl1 = "6";
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[1].form.dpgrZbpl1 = "7";
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[1].form.dpgrZbpl1 = "8";
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[1].form.dpgrZbpl1 = "9";
        } else if (val == "其他") {
          this.tabItemData[1].form.dpgrZbpl1 = "";
        }
      }
      //从站2
      if (this.tabItemData[2].name == "从站2") {
        if (val == "GPS-L1") {
          this.tabItemData[2].form.dpgrZbpl1 = "1";
        } else if (val == "GPS-L2") {
          this.tabItemData[2].form.dpgrZbpl1 = "2";
        } else if (val == "GLONASS-G1") {
          this.tabItemData[2].form.dpgrZbpl1 = "3";
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[2].form.dpgrZbpl1 = "4";
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[2].form.dpgrZbpl1 = "5";
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[2].form.dpgrZbpl1 = "6";
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[2].form.dpgrZbpl1 = "7";
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[2].form.dpgrZbpl1 = "8";
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[2].form.dpgrZbpl1 = "9";
        } else if (val == "其他") {
          this.tabItemData[2].form.dpgrZbpl1 = "";
        }
      }
      //从站3
      if (this.tabItemData[3].name == "从站3") {
        if (val == "GPS-L1") {
          this.tabItemData[3].form.dpgrZbpl1 = "1";
        } else if (val == "GPS-L2") {
          this.tabItemData[3].form.dpgrZbpl1 = "2";
        } else if (val == "GLONASS-G1") {
          this.tabItemData[3].form.dpgrZbpl1 = "3";
        } else if (val == "BD/BD3-B1I") {
          this.tabItemData[3].form.dpgrZbpl1 = "4";
        } else if (val == "BD/BD3-B2I") {
          this.tabItemData[3].form.dpgrZbpl1 = "5";
        } else if (val == "BD/BD3-B3I") {
          this.tabItemData[3].form.dpgrZbpl1 = "6";
        } else if (val == "BD/BD3-B1C") {
          this.tabItemData[3].form.dpgrZbpl1 = "7";
        } else if (val == "BD/BD3-B2a") {
          this.tabItemData[3].form.dpgrZbpl1 = "8";
        } else if (val == "BD/BD3-B2b") {
          this.tabItemData[3].form.dpgrZbpl1 = "9";
        } else if (val == "其他") {
          this.tabItemData[3].form.dpgrZbpl1 = "";
        }
      }
    },
    // 仿真模块处的干扰切换--下方站点的干扰模式联动
    choicePattern(val) {
      for (let i = 0; i < 3; i++) {
        this.tabItemData[i].form.mode1 = val;
        this.tabItemData[i].form.mode2 = val;
        this.tabItemData[i].form.mode3 = val;
      }
    },
    // 指令选中- 站点场景数据回显
    getCmdData(val, index) {
      console.log(val, index, "val, index-指令选中");
      this.current = index;
      this.tabItemIndex = val.id;
      this.tabItemData[this.tabItemIndex].grType = val.grType;
      this.tabItemData[this.tabItemIndex].InterfereTime = val.InterfereTime;
      val.grType == "2"
        ? (this.tabItemData[this.tabItemIndex].form = val)
        : (this.tabItemData[this.tabItemIndex].form1 = val);
    },
    // 修改指令-面板修改后-指令同步更新TODO: 面板站点数据与指令数据同步--****需要优化 太冗余繁琐了****
    changeData() {
      const i = this.current;
      switch (this.tabItemIndex) {
        case 0:
          if (this.tabItemData[0].grType == "2") {
            (this.masterStation[i].grType = "2"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[0].name),
              (this.masterStation[i].frequency1 =
                this.tabItemData[0].form.frequency1),
              (this.masterStation[i].mode1 = this.tabItemData[0].form.mode1),
              (this.masterStation[i].power1 = this.tabItemData[0].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[0].InterfereTime), //时间或者位置
              (this.masterStation[i].type1 = this.tabItemData[0].form.type1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[0].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[0].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[0].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[0].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[0].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[0].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[0].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[0].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[0].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[0].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[0].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[0].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[0].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[0].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[0].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[0].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[0].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[0].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[0].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[0].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[0].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[0].form.frequency2), //
              (this.masterStation[i].mode2 = this.tabItemData[0].form.mode2),
              (this.masterStation[i].power2 = this.tabItemData[0].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[0].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[0].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[0].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[0].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[0].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[0].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[0].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[0].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[0].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[0].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[0].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[0].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[0].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[0].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[0].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[0].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[0].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[0].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[0].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[0].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[0].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[0].form.frequency3), //
              (this.masterStation[i].mode3 = this.tabItemData[0].form.mode3),
              (this.masterStation[i].power3 = this.tabItemData[0].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[0].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[0].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[0].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[0].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[0].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[0].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[0].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[0].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[0].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[0].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[0].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[0].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[0].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[0].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[0].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[0].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[0].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[0].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[0].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[0].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "2"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[0].name),
              (this.masterStation[i].f1Bit0 = this.tabItemData[0].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[0].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[0].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[0].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[0].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[0].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[0].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[0].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[0].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[0].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[0].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[0].form1.f3Bit3);
          }

          break;
        case 1:
          if (this.tabItemData[1].grType == "2") {
            (this.masterStation[i].grType = "2"),
              (this.masterStation[i].id = 1),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[1].name),
              (this.masterStation[i].frequency1 =
                this.tabItemData[1].form.frequency1),
              (this.masterStation[i].mode1 = this.tabItemData[1].form.mode1),
              (this.masterStation[i].power1 = this.tabItemData[1].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[1].InterfereTime), //时间或者位置
              (this.masterStation[i].type1 = this.tabItemData[1].form.type1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[1].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[1].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[1].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[1].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[1].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[1].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[1].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[1].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[1].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[1].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[1].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[1].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[1].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[1].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[1].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[1].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[1].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[1].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[1].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[1].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[1].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[1].form.frequency2), //
              (this.masterStation[i].mode2 = this.tabItemData[1].form.mode2),
              (this.masterStation[i].power2 = this.tabItemData[1].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[1].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[1].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[1].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[1].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[1].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[1].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[1].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[1].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[1].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[1].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[1].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[1].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[1].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[1].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[1].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[1].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[1].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[1].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[1].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[1].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[1].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[1].form.frequency3), //
              (this.masterStation[i].mode3 = this.tabItemData[1].form.mode3),
              (this.masterStation[i].power3 = this.tabItemData[1].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[1].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[1].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[1].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[1].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[1].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[1].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[1].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[1].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[1].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[1].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[1].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[1].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[1].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[1].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[1].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[1].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[1].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[1].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[1].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[1].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "5"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[1].name),
              (this.masterStation[i].f1Bit0 = this.tabItemData[1].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[1].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[1].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[1].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[1].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[1].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[1].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[1].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[1].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[1].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[1].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[1].form1.f3Bit3);
          }

          break;
        case 2:
          if (this.tabItemData[2].grType == "2") {
            (this.masterStation[i].grType = "2"),
              (this.masterStation[i].id = 2),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[2].name),
              (this.masterStation[i].frequency1 =
                this.tabItemData[2].form.frequency1),
              (this.masterStation[i].mode1 = this.tabItemData[2].form.mode1),
              (this.masterStation[i].power1 = this.tabItemData[2].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[2].InterfereTime), //时间或者位置
              (this.masterStation[i].type1 = this.tabItemData[2].form.type1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[2].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[2].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[2].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[2].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[2].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[2].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[2].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[2].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[2].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[2].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[2].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[2].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[2].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[2].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[2].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[2].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[2].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[2].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[2].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[2].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[2].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[2].form.frequency2), //
              (this.masterStation[i].mode2 = this.tabItemData[2].form.mode2),
              (this.masterStation[i].power2 = this.tabItemData[2].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[2].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[2].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[2].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[2].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[2].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[2].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[2].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[2].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[2].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[2].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[2].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[2].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[2].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[2].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[2].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[2].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[2].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[2].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[2].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[2].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[2].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[2].form.frequency3), //
              (this.masterStation[i].mode3 = this.tabItemData[2].form.mode3),
              (this.masterStation[i].power3 = this.tabItemData[2].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[2].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[2].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[2].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[2].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[2].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[2].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[2].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[2].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[2].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[2].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[2].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[2].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[2].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[2].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[2].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[2].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[2].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[2].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[2].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[2].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "5"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[2].name),
              (this.masterStation[i].f1Bit0 = this.tabItemData[2].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[2].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[2].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[2].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[2].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[2].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[2].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[2].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[2].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[2].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[2].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[2].form1.f3Bit3);
          }
          break;
        case 3:
          if (this.tabItemData[3].grType == "2") {
            (this.masterStation[i].grType = "2"),
              (this.masterStation[i].id = 3),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tabs = this.tabItemData[3].name),
              (this.masterStation[i].frequency1 =
                this.tabItemData[3].form.frequency1),
              (this.masterStation[i].mode1 = this.tabItemData[3].form.mode1),
              (this.masterStation[i].power1 = this.tabItemData[3].form.power1),
              (this.masterStation[i].InterfereTime =
                this.tabItemData[3].InterfereTime), //时间或者位置
              (this.masterStation[i].type1 = this.tabItemData[3].form.type1), //点频干扰
              (this.masterStation[i].dpgrZbpl1 =
                this.tabItemData[3].form.dpgrZbpl1), //点频干扰(载波频1)
              (this.masterStation[i].tpgrZbpl1 =
                this.tabItemData[3].form.tpgrZbpl1), //调频干扰(载波频1)
              (this.masterStation[i].tpgrTzpl1 =
                this.tabItemData[3].form.tpgrTzpl1), //调频干扰(调制频1)
              (this.masterStation[i].tpgrZbpp1 =
                this.tabItemData[3].form.tpgrZbpp1), //调频干扰(调制频偏)
              (this.masterStation[i].spgrQspl1 =
                this.tabItemData[3].form.spgrQspl1), //扫频干扰(起始频1)
              (this.masterStation[i].spgrZzpl1 =
                this.tabItemData[3].form.spgrZzpl1), //扫频干扰(终止频1)
              (this.masterStation[i].spgrSpds1 =
                this.tabItemData[3].form.spgrSpds1), //扫频干扰(扫频点数)
              (this.masterStation[i].spgrPdzlsj1 =
                this.tabItemData[3].form.spgrPdzlsj1), //扫频干扰(频点驻留时间)
              (this.masterStation[i].bzsgrZxpl1 =
                this.tabItemData[3].form.bzsgrZxpl1), //白噪声干扰(中心频1)
              (this.masterStation[i].bzsgrDk1 =
                this.tabItemData[3].form.bzsgrDk1), //白噪声干扰(带宽)
              (this.masterStation[i].bzsgrLbqxs1 =
                this.tabItemData[3].form.bzsgrLbqxs1), //白噪声干扰(滤波器)
              (this.masterStation[i].bzsgrLbqaz1 =
                this.tabItemData[3].form.bzsgrLbqaz1), //白噪声干扰(滤波器a值)
              (this.masterStation[i].txgrZbpl1 =
                this.tabItemData[3].form.txgrZbpl1), //调相干扰(载波频1)
              (this.masterStation[i].txgrTxxs =
                this.tabItemData[3].form.txgrTxxs), //调相干扰
              (this.masterStation[i].txgrFhsl1 =
                this.tabItemData[3].form.txgrFhsl1), //调相干扰(符号速率)
              (this.masterStation[i].txgrPNm1 =
                this.tabItemData[3].form.txgrPNm1), //调相干扰
              (this.masterStation[i].txgrLbqxs1 =
                this.tabItemData[3].form.txgrLbqxs1), //调相干扰
              (this.masterStation[i].txgrLbqaz1 =
                this.tabItemData[3].form.txgrLbqaz1), //调相干扰(滤波器a值)
              (this.masterStation[i].mcgrMckd1 =
                this.tabItemData[3].form.mcgrMckd1), //脉冲干扰(脉冲宽度)
              (this.masterStation[i].mcgrZq1 =
                this.tabItemData[3].form.mcgrZq1), //脉冲干扰(周期)
              //F2频段
              (this.masterStation[i].tabs1 = this.tabItemData[3].name),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].frequency2 =
                this.tabItemData[3].form.frequency2), //
              (this.masterStation[i].mode2 = this.tabItemData[3].form.mode2),
              (this.masterStation[i].power2 = this.tabItemData[3].form.power2),
              (this.masterStation[i].dpgrZbpl2 =
                this.tabItemData[3].form.dpgrZbpl2), //点频干扰
              (this.masterStation[i].tpgrZbpl2 =
                this.tabItemData[3].form.tpgrZbpl2), //调频干扰
              (this.masterStation[i].tpgrTzpl2 =
                this.tabItemData[3].form.tpgrTzpl2), //调频干扰
              (this.masterStation[i].tpgrZbpp2 =
                this.tabItemData[3].form.tpgrZbpp2), //调频干扰
              (this.masterStation[i].spgrQspl2 =
                this.tabItemData[3].form.spgrQspl2), //扫频干扰
              (this.masterStation[i].spgrZzpl2 =
                this.tabItemData[3].form.spgrZzpl2), //扫频干扰
              (this.masterStation[i].spgrSpds2 =
                this.tabItemData[3].form.spgrSpds2), //扫频干扰
              (this.masterStation[i].spgrPdzlsj2 =
                this.tabItemData[3].form.spgrPdzlsj2), //扫频干扰
              (this.masterStation[i].bzsgrZxpl2 =
                this.tabItemData[3].form.bzsgrZxpl2), //白噪声干扰
              (this.masterStation[i].bzsgrDk2 =
                this.tabItemData[3].form.bzsgrDk2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs2 =
                this.tabItemData[3].form.bzsgrLbqxs2), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz2 =
                this.tabItemData[3].form.bzsgrLbqaz2), //白噪声干扰
              (this.masterStation[i].txgrZbpl2 =
                this.tabItemData[3].form.txgrZbpl2), //调相干扰
              (this.masterStation[i].txgrTxxs2 =
                this.tabItemData[3].form.txgrTxxs2), //调相干扰
              (this.masterStation[i].txgrFhsl2 =
                this.tabItemData[3].form.txgrFhsl2), //调相干扰
              (this.masterStation[i].txgrPNm2 =
                this.tabItemData[3].form.txgrPNm2), //调相干扰
              (this.masterStation[i].txgrLbqxs2 =
                this.tabItemData[3].form.txgrLbqxs2), //调相干扰
              (this.masterStation[i].txgrLbqaz2 =
                this.tabItemData[3].form.txgrLbqaz2), //调相干扰
              (this.masterStation[i].mcgrMckd2 =
                this.tabItemData[3].form.mcgrMckd2), //脉冲干扰
              (this.masterStation[i].mcgrZq2 =
                this.tabItemData[3].form.mcgrZq2), //脉冲干扰
              //F3频段
              (this.masterStation[i].tabs2 = this.tabItemData[3].name),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].frequency3 =
                this.tabItemData[3].form.frequency3), //
              (this.masterStation[i].mode3 = this.tabItemData[3].form.mode3),
              (this.masterStation[i].power3 = this.tabItemData[3].form.power3),
              (this.masterStation[i].dpgrZbpl3 =
                this.tabItemData[3].form.dpgrZbpl3), //点频干扰
              (this.masterStation[i].tpgrZbpl3 =
                this.tabItemData[3].form.tpgrZbpl3), //调频干扰
              (this.masterStation[i].tpgrTzpl3 =
                this.tabItemData[3].form.tpgrTzpl3), //调频干扰
              (this.masterStation[i].tpgrZbpp3 =
                this.tabItemData[3].form.tpgrZbpp3), //调频干扰
              (this.masterStation[i].spgrQspl3 =
                this.tabItemData[3].form.spgrQspl3), //扫频干扰
              (this.masterStation[i].spgrZzpl3 =
                this.tabItemData[3].form.spgrZzpl3), //扫频干扰
              (this.masterStation[i].spgrSpds3 =
                this.tabItemData[3].form.spgrSpds3), //扫频干扰
              (this.masterStation[i].spgrPdzlsj3 =
                this.tabItemData[3].form.spgrPdzlsj3), //扫频干扰
              (this.masterStation[i].bzsgrZxpl3 =
                this.tabItemData[3].form.bzsgrZxpl3), //白噪声干扰
              (this.masterStation[i].bzsgrDk3 =
                this.tabItemData[3].form.bzsgrDk3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqxs3 =
                this.tabItemData[3].form.bzsgrLbqxs3), //白噪声干扰
              (this.masterStation[i].bzsgrLbqaz3 =
                this.tabItemData[3].form.bzsgrLbqaz3), //白噪声干扰
              (this.masterStation[i].txgrZbpl3 =
                this.tabItemData[3].form.txgrZbpl3), //调相干扰
              (this.masterStation[i].txgrTxxs3 =
                this.tabItemData[3].form.txgrTxxs3), //调相干扰
              (this.masterStation[i].txgrFhsl3 =
                this.tabItemData[3].form.txgrFhsl3), //调相干扰
              (this.masterStation[i].txgrPNm3 =
                this.tabItemData[3].form.txgrPNm3), //调相干扰
              (this.masterStation[i].txgrLbqxs3 =
                this.tabItemData[3].form.txgrLbqxs3), //调相干扰
              (this.masterStation[i].txgrLbqaz3 =
                this.tabItemData[3].form.txgrLbqaz3), //调相干扰
              (this.masterStation[i].mcgrMckd3 =
                this.tabItemData[3].form.mcgrMckd3), //脉冲干扰
              (this.masterStation[i].mcgrZq3 =
                this.tabItemData[3].form.mcgrZq3); //脉冲干扰
          } else {
            (this.masterStation[i].grType = "5"),
              (this.masterStation[i].id = 0),
              (this.masterStation[i].f1 = "F1频段"),
              (this.masterStation[i].tab = this.tabItemData[3].name),
              (this.masterStation[i].f1Bit0 = this.tabItemData[3].form1.f1Bit0),
              (this.masterStation[i].f1Bit1 = this.tabItemData[3].form1.f1Bit1),
              (this.masterStation[i].f1Bit2 = this.tabItemData[3].form1.f1Bit2),
              (this.masterStation[i].f1Bit3 = this.tabItemData[3].form1.f1Bit3),
              (this.masterStation[i].f2 = "F2频段"),
              (this.masterStation[i].f2Bit0 = this.tabItemData[3].form1.f2Bit0),
              (this.masterStation[i].f2Bit1 = this.tabItemData[3].form1.f2Bit1),
              (this.masterStation[i].f2Bit2 = this.tabItemData[3].form1.f2Bit2),
              (this.masterStation[i].f2Bit3 = this.tabItemData[3].form1.f2Bit3),
              (this.masterStation[i].f3 = "F3频段"),
              (this.masterStation[i].f3Bit0 = this.tabItemData[3].form1.f3Bit0),
              (this.masterStation[i].f3Bit1 = this.tabItemData[3].form1.f3Bit1),
              (this.masterStation[i].f3Bit2 = this.tabItemData[3].form1.f3Bit2),
              (this.masterStation[i].f3Bit3 = this.tabItemData[3].form1.f3Bit3);
          }
          break;
      }
      this.$message({
        message: "修改成功",
        type: "success",
      });
      this.current = null;
    },
    // TODO: websocket长链接持续渲染需要重做
    animateReceiveData() {
      let animateInterval = null;
      if (animateInterval != null) {
        clearInterval(animateInterval);
        animateInterval = null;
      }
      this.setStations();

      let idx = 0;
      animateInterval = setInterval(() => {
        if (idx >= this.testData.length) {
          clearInterval(animateInterval);
          animateInterval = null;
          return;
        }
        let tmpCoord = this.testData[idx++];
        let globalId = 0;
        let targetData = {
          id: globalId++,
          properties: {
            时间: "2022-02-28",
            运行状态: "在线",
            姿态角: "140",
            经度: tmpCoord[0],
            纬度: tmpCoord[1],
            速度: "200KM/H",
          },
          coordinates: tmpCoord,
          styles: {
            isAlwaysShowPopop: true, //是否一直显示弹窗
          },
        };
        window.mapFrame.postMessage(
          {
            cmd: "addTarget", //在地图中添加站点
            params: {
              target: targetData,
            },
          },
          "*"
        );
      }, 1000);
    },
    //保存场景
    async saveScene() {
      try {
        if (!this.sceneId) {
          this.$message({
            message: "请先选择场景！",
            type: "error",
          });
          return;
        }
        let sceneFilter = this.sceneOptions.filter(
          (item) => item.id === this.sceneId
        );
        let param = this.handleSaveSceneData(); // *处理场景保存的数据*
        const { result } = await this.$api.saveScene({
          scene_id: this.sceneId,
          scene_name: sceneFilter[0].name,
          station: this.stationList,
          track: this.trackList,
          param,
        });
        console.log(result);
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.saveDialogVisible = false;
      } catch (error) {
        console.log(error);
        this.$message({
          message: "保存失败",
          type: "error",
        });
      }
    },
    // 处理场景保存的数据
    handleSaveSceneData() {
      console.log(this.masterStation, "场景返回数据处理后");
      let cmd = []; // 指令集合
      this.masterStation.forEach((item) => {
        if (item.grType == 2) {
          cmd.push({
            frameType: 2,
            station_id: item.id,
            indicator: item.indicator,
            f1: {
              mode: item.mode1, // 干扰模式
              type: item.type1, // 干扰制式
              power: item.power1,
              value: this.handleTypeValue(item.type1, item, 1),
            },
            f2: {
              mode: item.mode2, // 干扰模式
              type: item.mode2, // 干扰制式
              power: item.power2,
              value: this.handleTypeValue(item.type2, item, 2),
            },
            f3: {
              mode: item.mode3, // 干扰模式
              type: item.type3, // 干扰制式
              power: item.power3,
              value: this.handleTypeValue(item.type3, item, 3),
            },
          });
        } else {
          cmd.push({
            frameType: 2,
            station_id: item.id,
            indicator: item.indicator,
            cheat_coordinate: [item.jingdu, item.weidu, item.gaodu],
            f1: parseInt(
              item.f1Bit0 + item.f1Bit1 + item.f1Bit2 + item.f1Bit3,
              2
            ),
            f2: parseInt(
              item.f2Bit0 + item.f2Bit1 + item.f2Bit2 + item.f2Bit3,
              2
            ),
            f3: parseInt(
              item.f3Bit0 + item.f3Bit1 + item.f3Bit2 + item.f3Bit3,
              2
            ),
          });
        }
      });
      return {
        number: this.number,
        limit: this.ganxinbi,
        condition: this.driveValue, // time or location
        cmd,
      };
    },
    //清空数据
    empty() {
      this.masterStation = [];
      this.number = "";
      this.driveValue = "time";
      this.ganxinbi = "";
    },
    // 场景另存为新场景弹框唤起
    newSaveScene() {
      this.saveDialogVisible = false;
      this.newScenedialog = true;
    },
    //布局判决 判决之后打点判别-绘制颜色
    async layoutValidate() {
      try {
        if (!this.sceneId) {
          this.$message({
            type: "error",
            message: "请先选择场景!",
          });
          return;
        }
        const { result } = await this.$api.layoutValidate({
          station: this.stationList,
          track: this.trackList,
        });
        console.log(result);
        // false:purple  true:green
        this.setStations();
      } catch (error) {
        console.log(error);
      }
    },
    // 添加目标轨迹
    addTargetHistory() {
      let targetHistoryData = [
        // {
        //   id: "111",
        //   properties: {
        //     时间: "2022-02-28",
        //     运行状态: "在线",
        //     姿态角: "140",
        //     速度: "200KM/H",
        //   },
        //   coordinates: this.coordinates,
        //   styles: {
        //     lineColor: "#FF0099", //圆边线颜色
        //     lineWidth: 2, //圆边线宽度
        //     radius: 6, //圆半径大小
        //     fillColor: this.trackcolor1, //圆填充色
        //     opacity: 0.5, //透明度，取值范围[0-1]，1代表完全不透明
        //   },
        // },
      ];
      this.trackList.forEach((track) => {
        let fillColor = "darkblue";
        if (track.flag + "" == "true") {
          fillColor = "green";
        } else if (track.flag + "" == "false") {
          fillColor = "purple";
        }
        targetHistoryData.push({
          id: track.id,
          properties: {
            // 时间: "",
            运行状态: "在线",
            // 姿态角: "140",
            速度: track.v + "m/s",
          },
          coordinates: track.coordinates,
          styles: {
            fillColor,
          },
        });
      });
      window.mapFrame.postMessage(
        {
          cmd: "addTargetHistory", //在地图中目标历史轨迹
          params: {
            history: targetHistoryData,
            historyClickAble: true, //轨迹点是否可点击，启用该参数后，点击轨迹点，会将所点击轨迹点对应的id及经纬度回传给主程序
          },
        },
        "*"
      );
    },
    //信息展示TODO: websocket
    messageShow() {
      // this.animateReceiveData();
      // this.testData.push();
    },
    //开始执行 & 结束执行 & 模拟飞行 三合一 因参数一样，功能相似可以合并
    async taskAndFlight(taskName) {
      try {
        if (!this.sceneId) {
          this.$message({
            type: "error",
            message: "请先选择场景!",
          });
          return;
        }
        await this.$api[taskName]({
          scene_id: this.sceneId,
        });
        let message = "";
        if (taskName == "startTask") {
          message = "开始执行任务成功";
        } else if (taskName == "terminateTask") {
          message = "结束任务成功";
        } else {
          message = "模拟飞行成功";
        }
        this.$message({
          type: "success",
          message,
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: "执行失败，请重试！",
        });
      }
    },
    // 发送指令
    async sendCommand() {
      try {
        console.log(this.driveValue, "driveValue");
        console.log(this.tabItemData, "tabItemData");
        console.log(this.tabItemIndex, "tabItemIndex");
        let params = {};
        let tabItem = this.tabItemData[this.tabItemIndex];
        // 2代表压制GR；5代表欺骗GR
        let frameType = tabItem.grType;
        if (+frameType === 2) {
          // 处理type和value
          params = {
            f1: {
              mode: tabItem.form.mode1, // 干扰模式
              type: tabItem.form.type1, // 干扰制式
              power: tabItem.form.power1,
              value: this.handleTypeValue(tabItem.form.type1, tabItem, 1),
            },
            f2: {
              mode: tabItem.form.mode2, // 干扰模式
              type: tabItem.form.mode2, // 干扰制式
              power: tabItem.form.power2,
              value: this.handleTypeValue(tabItem.form.type2, tabItem, 2),
            },
            f3: {
              mode: tabItem.form.mode3, // 干扰模式
              type: tabItem.form.type3, // 干扰制式
              power: tabItem.form.power3,
              value: this.handleTypeValue(tabItem.form.type3, tabItem, 3),
            },
          };
        } else {
          params = {
            mode: tabItem.grPattern,
            power: tabItem.homePower,
            cheat_coordinate: [tabItem.jingdu, tabItem.weidu, tabItem.gaodu],
            f1: parseInt(
              tabItem.form1.f1Bit0 +
                tabItem.form1.f1Bit1 +
                tabItem.form1.f1Bit2 +
                tabItem.form1.f1Bit3,
              2
            ),
            f2: parseInt(
              tabItem.form1.f2Bit0 +
                tabItem.form1.f2Bit1 +
                tabItem.form1.f2Bit2 +
                tabItem.form1.f2Bit3,
              2
            ),
            f3: parseInt(
              tabItem.form1.f3Bit0 +
                tabItem.form1.f3Bit1 +
                tabItem.form1.f3Bit2 +
                tabItem.form1.f3Bit3,
              2
            ),
          };
        }
        const { result } = await this.$api.sendCommand({
          frameType,
          station_id: tabItem.id,
          ...params,
        });
        console.log(result);
        this.$message({
          type: "success",
          message: "发送成功",
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: "发送失败",
        });
      }
    },
    // 处理type GR制式与 value对应数据
    handleTypeValue(type, tabItem, fIndex) {
      console.log(type, tabItem, "-----------");
      let form = tabItem.form || tabItem;
      let arr = [];
      switch (+type) {
        case 0:
          arr = [form["dpgrZbpl" + fIndex]];
          break;
        case 1:
          arr = [
            form["tpgrZbpl" + fIndex],
            form["tpgrTzpl" + fIndex],
            form["tpgrZbpp" + fIndex],
          ];
          break;
        case 2:
          arr = [
            form["spgrQspl" + fIndex],
            form["spgrZzpl" + fIndex],
            form["spgrSpds" + fIndex],
            form["spgrPdzlsj" + fIndex],
          ];
          break;
        case 3:
          arr = [
            form["bzsgrZxpl" + fIndex],
            form["bzsgrDk" + fIndex],
            form["bzsgrLbqxs" + fIndex],
            form["bzsgrLbqaz" + fIndex],
          ];
          break;
        case 4:
          arr = [
            form["txgrZbpl" + fIndex],
            form["txgrTxxs" + fIndex],
            form["txgrFhsl" + fIndex],
            form["txgrPNm" + fIndex],
            form["txgrLbqxs" + fIndex],
            form["txgrLbqaz" + fIndex],
          ];
          break;
        case 5:
          arr = [form["mcgrMckd" + fIndex], form["mcgrZq" + fIndex]];
          break;
        default:
          arr = [];
          break;
      }
      return arr;
    },
    // 查询加载场景
    async loadScene() {
      try {
        const { result } = await this.$api.loadScene({
          scene_id: this.sceneId,
        });
        console.log(result, "场景加载");
        this.sceneData = result; // 绑定场景返回的数据
        this.ganxinbi = result.param.limit; // 干信比门限回显
        (this.driveValue = result.param.condition), // == "time" ? "1" : "2"; // 驱动形式回显
          (this.number = result.param.number); // 限制个数
        this.handleCoordinatesData(result); // 处理坐标数据
        // 指令数据绑定
        result.param.cmd.map((item) => {
          if (item.frameType == 2) {
            // 压制干扰
            this.masterStation.push({
              grType: "2",
              id: item.station_id,
              tab: this.filterStation[item.station_id],
              indicator: item.indicator, // 时间
              mode1: item.f1.mode + "" != "undefined" ? item.f1.mode + "" : "", // F1干扰模式
              type1: item.f1.type + "" != "undefined" ? item.f1.type + "" : "", // 干扰制式
              power1: item.f1.power, // 功率
              value1: item.f1.value,
              InterfereTime: item.indicator, //时间或者位置
              dpgrZbpl1: item.f1.value ? item.f1.value[0] : "", //点频干扰(载波频1)
              tpgrZbpl1:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调频干扰(载波频1)
              tpgrTzpl1:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //调频干扰(调制频1)
              tpgrZbpp1:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //调频干扰(调制频偏)
              spgrQspl1:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //扫频干扰(起始频1)
              spgrZzpl1:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //扫频干扰(终止频1)
              spgrSpds1:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //扫频干扰(扫频点数)
              spgrPdzlsj1:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //扫频干扰(频点驻留时间)
              bzsgrZxpl1:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //白噪声干扰(中心频1)
              bzsgrDk1:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //白噪声干扰(带宽)
              bzsgrLbqxs1:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //白噪声干扰(滤波器)
              bzsgrLbqaz1:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //白噪声干扰(滤波器a值)
              txgrZbpl1:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调相干扰(载波频1)
              txgrTxxs1:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] + "" : "", //调相干扰
              txgrFhsl1:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //调相干扰(符号速率)
              txgrPNm1:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] + "" : "", //调相干扰
              txgrLbqxs1:
                item.f1.value && item.f1.value[4] ? item.f1.value[4] + "" : "", //调相干扰
              txgrLbqaz1:
                item.f1.value && item.f1.value[5] ? item.f1.value[5] : "", //调相干扰(滤波器a值)
              mcgrMckd1:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //脉冲干扰(脉冲宽度)
              mcgrZq1:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //脉冲干扰(周期)
              //F2频段
              type2: item.f2.type + "" != "undefined" ? item.f2.type + "" : "", // 干扰制式,
              power2: item.f2.power,
              value2: item.f2.value,
              mode2: item.f2.mode + "" != "undefined" ? item.f2.mode + "" : "", // F2干扰模式
              dpgrZbpl2: item.f1.value ? item.f1.value[0] : "", //点频干扰(载波频1)
              tpgrZbpl2:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调频干扰(载波频1)
              tpgrTzpl2:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //调频干扰(调制频1)
              tpgrZbpp2:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //调频干扰(调制频偏)
              spgrQspl2:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //扫频干扰(起始频1)
              spgrZzpl2:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //扫频干扰(终止频1)
              spgrSpds2:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //扫频干扰(扫频点数)
              spgrPdzlsj2:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //扫频干扰(频点驻留时间)
              bzsgrZxpl2:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //白噪声干扰(中心频1)
              bzsgrDk2:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //白噪声干扰(带宽)
              bzsgrLbqxs2:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //白噪声干扰(滤波器)
              bzsgrLbqaz2:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //白噪声干扰(滤波器a值)
              txgrZbpl2:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调相干扰(载波频1)
              txgrTxxs2:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] + "" : "", //调相干扰
              txgrFhsl2:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //调相干扰(符号速率)
              txgrPNm2:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] + "" : "", //调相干扰
              txgrLbqxs2:
                item.f1.value && item.f1.value[4] ? item.f1.value[4] + "" : "", //调相干扰
              txgrLbqaz2:
                item.f1.value && item.f1.value[5] ? item.f1.value[5] : "", //调相干扰(滤波器a值)
              mcgrMckd2:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //脉冲干扰(脉冲宽度)
              mcgrZq2:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //脉冲干扰(周期)
              //F3频段
              mode3: item.f3.mode + "" != "undefined" ? item.f3.mode + "" : "", // F3干扰模式,
              type3: item.f3.type + "" != "undefined" ? item.f3.type + "" : "", // 干扰制式,
              power3: item.f3.power,
              value3: item.f3.value,
              dpgrZbpl3: item.f1.value ? item.f1.value[0] : "", //点频干扰(载波频1)
              tpgrZbpl3:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调频干扰(载波频1)
              tpgrTzpl3:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //调频干扰(调制频1)
              tpgrZbpp3:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //调频干扰(调制频偏)
              spgrQspl3:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //扫频干扰(起始频1)
              spgrZzpl3:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //扫频干扰(终止频1)
              spgrSpds3:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] : "", //扫频干扰(扫频点数)
              spgrPdzlsj3:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //扫频干扰(频点驻留时间)
              bzsgrZxpl3:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //白噪声干扰(中心频1)
              bzsgrDk3:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //白噪声干扰(带宽)
              bzsgrLbqxs3:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //白噪声干扰(滤波器)
              bzsgrLbqaz3:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] : "", //白噪声干扰(滤波器a值)
              txgrZbpl3:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //调相干扰(载波频1)
              txgrTxxs3:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] + "" : "", //调相干扰
              txgrFhsl3:
                item.f1.value && item.f1.value[2] ? item.f1.value[2] + "" : "", //调相干扰(符号速率)
              txgrPNm3:
                item.f1.value && item.f1.value[3] ? item.f1.value[3] + "" : "", //调相干扰
              txgrLbqxs3:
                item.f1.value && item.f1.value[4] ? item.f1.value[4] + "" : "", //调相干扰
              txgrLbqaz3:
                item.f1.value && item.f1.value[5] ? item.f1.value[5] : "", //调相干扰(滤波器a值)
              mcgrMckd3:
                item.f1.value && item.f1.value[0] ? item.f1.value[0] : "", //脉冲干扰(脉冲宽度)
              mcgrZq3:
                item.f1.value && item.f1.value[1] ? item.f1.value[1] : "", //脉冲干扰(周期)
            });
          } else {
            // 欺骗干扰
            this.masterStation.push({
              grType: "5",
              id: item.station_id,
              tab: this.filterStation[item.station_id],
              cheat_coordinate: item.cheat_coordinate,
              jingdu:
                item.cheat_coordinate && item.cheat_coordinate[0]
                  ? item.cheat_coordinate[0]
                  : 0,
              weidu:
                item.cheat_coordinate && item.cheat_coordinate[1]
                  ? item.cheat_coordinate[0]
                  : 0,
              gaodu:
                item.cheat_coordinate && item.cheat_coordinate[2]
                  ? item.cheat_coordinate[0]
                  : 0,
              mode: item.mode,
              f1Bit: item.f1.toString(2),
              f2Bit: item.f2.toString(2),
              f3Bit: item.f3.toString(2),
              f1Bit0: item.f1.toString(2).split("")[0] || "",
              f1Bit1: item.f1.toString(2).split("")[1]
                ? item.f1.toString(2).split("")[1]
                : "",
              f1Bit2: item.f1.toString(2).split("")[2]
                ? item.f1.toString(2).split("")[2]
                : "",
              f1Bit3: item.f1.toString(2).split("")[3]
                ? item.f1.toString(2).split("")[3]
                : "",
              f2Bit0: item.f2.toString(2).split("")[0] || "",
              f2Bit1: item.f2.toString(2).split("")[1]
                ? item.f2.toString(2).split("")[1]
                : "",
              f2Bit2: item.f2.toString(2).split("")[2]
                ? item.f2.toString(2).split("")[2]
                : "",
              f2Bit3: item.f2.toString(2).split("")[3]
                ? item.f2.toString(2).split("")[3]
                : "",
              f3Bit0: item.f3.toString(2).split("")[0] || "",
              f3Bit1: item.f3.toString(2).split("")[1]
                ? item.f3.toString(2).split("")[1]
                : "",
              f3Bit2: item.f3.toString(2).split("")[2]
                ? item.f3.toString(2).split("")[2]
                : "",
              f3Bit3: item.f3.toString(2).split("")[3]
                ? item.f3.toString(2).split("")[3]
                : "",
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    // 处理地图坐标数据
    handleCoordinatesData(result) {
      this.trackList = result.track;
      this.stationList = result.station;
      this.outTimer = setTimeout(() => {
        this.setStations(); // 设置站点位置
        this.addTargetHistory(); // 设置目标轨迹位置
      }, 1000);
    },
    // 删除单行指令
    deleteData(index) {
      this.masterStation.splice(index, 1);
      this.$message({
        message: "删除成功",
        type: "success",
      });
      this.current = null;
    },
    //缩放到西北区域
    flyToXiBei() {
      window.mapFrame.postMessage(
        {
          cmd: "flyTo", //地图缩放到指定位置和层级命名
          params: {
            x: 86.95,
            y: 39.355,
            level: 7,
          },
        },
        "*"
      );
    },
    //添加自定义样式线
    addCustomStyleLine() {
      window.mapFrame.postMessage(
        {
          cmd: "addCustomStyleLine", //在地图中添加站点
          params: {
            coordinates: this.coordinates,
            styles: {
              lineColor: "#FF0099", //线颜色
              lineWidth: 5, //线宽度
              duration: 3000, //线显示的时间（单位为毫秒），超过该时间后线自动消失。当该参数为0时，线永久显示
            },
          },
        },
        "*"
      );
    },
    beforeDestroy() {
      clearTimeout(this.outTimer);
    },
    //设置干扰站位置
    setStations() {
      if (!this.sceneId) {
        this.$message({
          message: "请先选择场景！",
          type: "error",
        });
        return;
      }
      let stationsData = [
        // {
        //   id: "1",
        //   type: "",
        //   properties: { 站点名称: "测试站1", 运行状态: "在线" }, //在弹框中显示的信息
        //   coordinates: this.coordinates1,
        //   styles: {
        //     isAlwaysShowPopop: false, //是否保持一直显示弹窗，当该属性为false时可通过点击固定站来切换弹窗的显示状态
        //     isDraggable: false, //是否可拖拽 默认为true
        //     lineColor: "green", //连接线颜色，默认为red
        //     lineWidth: 3, //连接线宽度,默认为3
        //     icon: this.stationcolor1, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
        //   },
        // },
      ];
      this.stationList.forEach((station, i) => {
        let iconColor = "darkblue";
        if (station.flag + "" == "true") {
          iconColor = "green";
        } else if (station.flag + "" == "false") {
          iconColor = "purple";
        }
        stationsData.push({
          id: station.id,
          properties: { 站点名称: "测试站" + i, 运行状态: "在线" },
          coordinates: station.coordinates,
          styles: {
            // isLine2Target: true, //是否在地图上绘制站点到目标之间的连接线，该参数默认true
            // lineColor: "red", //连接线颜色 默认为red
            // lineWidth: 1, //连接线宽度 默认为3
            isAlwaysShowPopop: false, //是否保持一直显示弹窗，当该属性为false时可通过点击固定站来切换弹窗的显示状态
            icon: iconColor, //所用图标颜色，支持的颜色包括["purple","darkblue","blue","yellow","green"],默认值为darkblue
          },
        });
      });
      window.mapFrame.postMessage(
        {
          cmd: "setStations", //在地图中添加固定站
          params: {
            stations: stationsData,
          },
        },
        "*"
      );
      // 设置完站点，让地图到站点出现的大概位置-防止看不到
      window.mapFrame.postMessage(
        {
          cmd: "flyTo", //地图缩放到指定位置和层级命名
          params: {
            x: this.stationList[0].coordinates[0],
            y: this.stationList[0].coordinates[1],
            level: 7,
          },
        },
        "*"
      );
    },
    clearMap() {
      window.mapFrame.postMessage(
        {
          cmd: "clearMap", //清除所有地图要素指令
        },
        "*"
      );
    },
    //绘制路径
    enableDrawTool() {
      window.mapFrame.postMessage(
        {
          cmd: "enableDrawTool", //在地图中添加站点
          params: {},
        },
        "*"
      );
    },
    //结束绘制
    disableDrawTool() {
      window.mapFrame.postMessage(
        {
          cmd: "disableDrawTool", //在地图中添加站点
          params: {},
        },
        "*"
      );
    },
    // 右击站点展示站点信息
    addEditPopup(id, position) {
      let popData = {
        properties: {
          经度: position[0],
          纬度: position[1],
        },
        coordinates: position,
      };
      window.mapFrame.postMessage(
        {
          cmd: "addEditPopup",
          params: {
            popData: popData,
          },
        },
        "*"
      );
    },
  },
};
</script>
<style lang="less" scoped>
@import "../assets/control.less";
</style>
