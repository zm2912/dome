<template>
  <div style="width: 100%">
    <div class="button">
      <el-button-group>
        <el-button
          :style="[showComponentsCard ? activation : '']"
          plain
          @click="card"
          class="buttonCenter"
          >卡片</el-button
        >
        <el-button
          :style="[showComponentsTable ? activation : '']"
          plain
          @click="table"
          class="buttonCenter"
          >列表</el-button
        >
      </el-button-group>
    </div>
    <div class="table" v-show="showComponentsTable">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        :header-cell-style="{ color: '#000' }"
      >
        <el-table-column prop="" label="" width="20">
          <!-- <span><i class="el-icon-star-on" style="color: #f7cd34"></i></span> -->
          <span
            ><img
              src="../assets/img/start.png"
              alt=""
              style="width: 12px; height: 12px"
          /></span>
        </el-table-column>
        <el-table-column
          prop="productCategory"
          label="所属品类"
          min-width="20%"
        >
        </el-table-column>
        <el-table-column label="项目类别" min-width="25%">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.prjCategory"
              placement="top-start"
            >
              <div style="min-width: 25%">
                <span
                  style="
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: block;
                  "
                >
                  {{ scope.row.prjCategory }}
                </span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="项目编号" min-width="30%">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="scope.row.guid"
              placement="top-start"
            >
              <div style="min-width: 20%">
                <span
                  style="
                    overflow: hidden;
                    word-break: keep-all;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    display: block;
                  "
                >
                  {{ scope.row.guid }}
                </span>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="prjName" label="项目名称" min-width="120%">
        </el-table-column>
        <el-table-column label="项目状态" min-width="30%">
          <template slot-scope="scope">
            <div class="filletFather">
              <span
                style="
                  display: block;
                  width: 6px;
                  hight: 6px;
                  margin-right: 4px;
                "
                class="fillet"
                :style="{
                  background:
                    scope.row.projectStatus == 'processing'
                      ? '#288eed'
                      : '#e35b4d',
                }"
              ></span>
              <span
                style="
                  overflow: hidden;
                  word-break: keep-all;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  display: block;
                "
              >
                {{
                  scope.row.projectStatus == "processing"
                    ? "进行中"
                    : scope.row.projectStatus == "approving"
                    ? "审批中"
                    : ""
                }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="prjManager" label="项目经理" min-width="40%">
        </el-table-column>
        <el-table-column prop="department" label="所属部门" min-width="40%">
        </el-table-column>
        <el-table-column prop="prjStartDate" label="项目计划时间">
          <template slot-scope="scope">
            <span>
              {{ scope.row.prjStartDate }} ~ {{ scope.row.prjEndDate }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div
      class="card"
      :style="{ width: defaultWidthCard }"
      v-show="showComponentsCard"
    >
      <div
        class="one media flexOne"
        v-for="(item, index) in tableData"
        :key="index"
        @click="cardClick($event,index)"
        :style="[item.activation ? activationCard : '']"
      >
        <!-- <div><img :src="'../assets/img/' +  item.logo" alt="" style="width:45px;height:45px;"></div> -->
        <div>
          <img
            src="../assets/img/image.jpg"
            alt=""
            style="width: 45px; height: 45px; margin-right: 10px"
          />
        </div>
        <div class="centerText">
          <div class="textHard">
            <div>{{ item.prjName }}</div>
            <div style="display: flex">
              <span
                style="
                  display: block;
                  width: 6px;
                  hight: 6px;
                  margin-right: 4px;
                  border-radius: 50%;
                  height: 6px;
                  margin-top: 5px;
                "
                :style="{
                  background:
                    item.projectStatus == 'processing' ? '#288eed' : '#e35b4d',
                }"
              ></span>
              <span style="display: block; font-size: 12px">
                {{
                  item.projectStatus == "processing"
                    ? "进行中"
                    : item.projectStatus == "approving"
                    ? "审批中"
                    : ""
                }}
              </span>
            </div>
          </div>
          <div class="textCenter">
            <div>项目经理：{{ item.prjManager }}</div>
            <div>立项日期：{{ item.prjStartDate }}</div>
          </div>
          <div class="textFool">
            <div>
              任务：{{ item.taskCount }} 完成：{{ item.taskDoneCount }} 进行：{{
                item.taskDoingCount
              }}
            </div>
            <div>
              <img
                src="../assets/img/start.png"
                alt=""
                style="width: 12px; height: 12px"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tableDataJSON from "../assets/json/data.json";
export default {
  name: "Table",
  data() {
    return {
      showComponentsTable: true,
      showComponentsCard: false,
      tableData: [],
      activation: {
        border: "1px solid #1989FA",
        color: "#1989FA",
        "z-index": 999,
      },
      activationCard:{
        border: "1px solid #1989FA",
        "z-index": 999,
      },
      defaultWidthCard: 1000,
    };
  },
  created() {
    // 获取数据
    let data = tableDataJSON.data;
    // 对数据中的时间数据进行操作
    data.forEach((element) => {
      element.prjEndDate = element.prjEndDate.split(" ")[0];
      element.prjStartDate = element.prjStartDate.split(" ")[0];
      element.activation = false
    });
    this.tableData = data;
    // 获取浏览器可见宽度
    let WidthCard = window.innerWidth;
    this.defaultWidthCard = WidthCard;
    // 默认调用函数
    this.table();
  },
  methods: {
    // 点击切换函数
    card() {
      this.showComponentsTable = false;
      this.showComponentsCard = !this.showComponentsTable;
    },
    // 点击切换函数
    table() {
      this.showComponentsCard = false;
      this.showComponentsTable = !this.showComponentsCard;
    },
    // 点击函数
    cardClick(e, index){
      let newdata = this.tableData
      newdata.forEach(item => {
        item.activation = false
      })
      newdata[index].activation = true
      this.tableData = newdata
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.button {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  margin-bottom: 15px;
}
.table {
  border: 1px solid #e9e9e9;
}
.table >>> .el-table__row > td {
  /* 去除表格线 */
  border: none;
}
.filletFather {
  display: flex;
  align-content: center;
  justify-items: center;
}
.fillet {
  border-radius: 50%;
  height: 6px;
  margin-top: 8px;
}
.buttonCenter:hover {
  border: 1px solid #e9e9e9 !important;
}
.buttonCenter:focus {
  border: 1px solid #1989fa !important;
}
.card {
  display: flex;
  justify-self: start;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
}
.one {
  height: 75px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9e9e9;
  cursor: pointer;
  overflow: hidden; 
  text-overflow:ellipsis; 
  white-space: nowrap;
}
.flexOne {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5px;
}
.textHard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  font-size: 14px;
  font-weight: bold;
}
.centerText {
  width: 80%;
  font-size: 12px;
  color: #c5c3c1;
}
.textFool {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*媒体查询*/
@media (min-width: 1200px) {
  .media {
    width: 20%;
  }
}
@media (min-width: 1000px) and (max-width: 1199px) {
  .media {
    width: 25%;
  }
}
@media (min-width: 768px) and (max-width: 1001px) {
  .media {
    width: 23%;
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .media {
    width: 20%;
  }
}
@media (max-width: 479px) {
  .media {
    width: 40%;
  }
}
</style>
