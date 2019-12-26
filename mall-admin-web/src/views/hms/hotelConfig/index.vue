<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-form :model="value" label-width="150px">
        <el-form-item label="上传Excel：">
          <el-upload
            class="image-uploader"
            :multiple="false"
            :auto-upload="true"
            list-type="text"
            :show-file-list="true"
            :before-upload="beforeUpload"
            :drag="true"
            action
            :limit="1"
            :on-exceed="handleExceed"
            :http-request="uploadFile"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限Excel格式，单文件不超过1MB</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="small" icon="el-icon-document">
        <a href="static/template_hotel.xlsx">下载模版</a>
      </el-button>
      <el-button type="primary" @click="saveExcelData" size="small" icon="edit">保存数据</el-button>
    </el-card>

    <div class="block" style="float: left;margin-top: 20px;">
      <span class="demonstration">选择查询日期：</span>
      <el-date-picker
        v-model="searchDate"
        @change="searchDataByDate"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
      ></el-date-picker>
    </div>
    <div class="onOffLine" style="float: right;margin-top: 20px;">
      <el-button type="primary" @click="onLineBatch">批量上架</el-button>
      <el-button type="danger" @click="offLineBatch">批量下架</el-button>
    </div>
    <div class="table-container" style="margin-top: 80px;">
      <el-table :data="tableData" border style="width: 100%; margin-top: 40px">
        <el-table-column prop="id" label="ID" width="180"></el-table-column>
        <el-table-column prop="roomType" label="房型"></el-table-column>
        <el-table-column prop="salePrice" label="价格">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.edit"
              size="small"
              v-model="scope.row.salePrice"
              style="width:100px"
            ></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.salePrice }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="guestNumber" label="入住人数">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.edit"
              size="small"
              v-model="scope.row.guestNumber"
              style="width:100px"
            ></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.guestNumber }}</span>
          </template>
        </el-table-column>
         <el-table-column prop="stock" label="库存">
          <template slot-scope="scope">
            <el-input
              v-show="scope.row.edit"
              size="small"
              v-model="scope.row.stock"
              style="width:100px"
            ></el-input>
            <span v-show="!scope.row.edit">{{ scope.row.stock }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="上下架">
          <template slot-scope="scope">
            <el-switch
              @change="updateSingleDayRoomData(scope.row, '上下架')"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="操作">
          <template slot-scope="scope">
            <el-button
              v-show="!scope.row.edit"
              type="primary"
              @click="scope.row.edit=true"
              size="small"
              icon="edit"
            >编辑</el-button>
            <el-button
              v-show="scope.row.edit"
              type="success"
              @click="updateSingleDayRoomData(scope.row)"
              size="small"
              icon="edit"
            >完成</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  importHotelExcel as importHotel,
  saveHotelExcel as saveHotel,
  getHotelData as fetchList,
  updateHotelData as updateData,
  batchOnOffLineHotel as batchStatus
} from "@/api/product";
import { formatDate } from "@/utils/date";
export default {
  name: "edithotelprice",
  data() {
    return {
      value: {},
      searchDate: "",
      fileList: [
        {
          name: "food111.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      allRoomData: null,
      tableData: [],
      roomList: [
        {
          roomName: "双床房"
        }
      ]
    };
  },
  created() {
    this.searchDate = new Date();
    this.getList();
  },
  watch: {},
  filters: {},
  methods: {
    // 根据id获取房型价格数据
    getList() {
      let that = this;
      fetchList(that.$route.query.id).then(response => {
        if (response.data && JSON.stringify(response.data) != "{}") {
          that.$message.success("获取数据成功");
          let today = formatDate(new Date(), "yyyy-MM-dd");
          that.allRoomData = response.data;
          // 默认显示当天的数据
          let todayData = response.data[today];
          for (let i in todayData) {
            that.$set(todayData[i], "edit", false);
          }
          that.tableData = todayData;
        } else if (JSON.stringify(response.data) == "{}") {
          that.$message.warning(
            "该酒店未导入数据，请使用导入Excel功能初始化数据"
          );
        } else {
          that.$message.error("获取数据失败", response.message);
        }
      });
    },
    // 上传文件之前的钩子
    beforeUpload(file) {
      const isText = file.type === "application/vnd.ms-excel";
      const isTextComputer =
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      return isText | isTextComputer;
    },
    // 上传文件个数超过定义的数量
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`);
    },
    // 上传文件
    uploadFile(item) {
      var that = this;
      const fileObj = item.file;
      // FormData 对象
      const form = new FormData();
      // 文件对象
      form.append("file", fileObj);
      // let formTwo = JSON.stringify(form)
      importHotel(form).then(response => {
        // this.$message.info("文件：" + fileObj.name + "上传成功");
        let today = formatDate(new Date(), "yyyy-MM-dd");
        if (response.data) {
          that.allRoomData = response.data;
          let todayData = response.data[today];
          for (let i in todayData) {
            that.$set(todayData[i], "edit", false);
          }
          that.tableData = todayData;
        }
      });
    },
    // 根据日期查数据
    searchDataByDate(value) {
      // 日期改变，数据改变
      if (this.allRoomData) {
        let todayData = this.allRoomData[value];
        for (let i in todayData) {
          this.$set(todayData[i], "edit", false);
        }
        this.tableData = todayData;
      }
    },
    // 保存价格
    savePrice(data) {
      data.edit = false;
    },
    // 保存导入的excel数据
    saveExcelData() {
      let that = this;
      let params = {
        prices: this.allRoomData,
        productId: this.$route.query.id
      };
      const loading = this.$loading({
        lock: true,
        text: "保存中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      saveHotel(params).then(response => {
        if (response.code === 200 || response.code === '0000') {
          loading.close();
          that.$message.success("保存成功");
        } else {
          loading.close();
          that.$message.error("保存失败", response.message);
        }
      });
    },
    // 房型上下架
    updateSingleDayRoomData(row, type) {
      let that = this;
      let params = row;
      if (type == "上下架") {
        // 上下架操作需要确认
        that
          .$confirm(
            "确认" + (row.status == 1 ? "上线" : "下线") + "?",
            "提示",
            {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }
          )
          .then(() => {
            updateData(params).then(response => {
              if (response.code === 200 || response.code === '0000') {
                that.$message.success("操作成功");
              } else {
                that.$message.error("操作失败");
              }
            });
          })
          .catch(() => {
            row.status = !row.status;
          });
      } else {
        updateData(params).then(response => {
          if (response.code === 200 || response.code === '0000') {
            that.$message.success("操作成功");
            row.edit = false;
          } else {
            that.$message.error("操作失败");
          }
        });
      }
    },
    // 批量上线
    onLineBatch() {
      let that = this;
      let params = {
        productId: this.$route.query.id,
        status: 1
      };
      that
        .$confirm("确认全部上架?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          batchStatus(params).then(response => {
            if (response.code === 200 || response.code === '0000') {
              that.$message.success("操作成功");
              that.getList();
            } else {
              that.$message.error("操作失败");
            }
          });
        })
        .catch(() => {});
    },
    // 批量下线
    offLineBatch() {
      let that = this;
      let params = {
        productId: this.$route.query.id,
        status: 2
      };
      that
        .$confirm("确认全部下架?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          batchStatus(params).then(response => {
            if (response.code === 200 || response.code === '0000') {
              that.$message.success("操作成功");
              that.getList();
            } else {
              that.$message.error("操作失败");
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style scoped>
</style>


