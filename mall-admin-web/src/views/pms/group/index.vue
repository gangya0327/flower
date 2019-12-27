<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="handleSearchList()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="产品名称：">
            <el-input style="width: 203px" v-model="listQuery.productName" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="行程天数：">
            <el-input style="width: 203px" v-model="listQuery.tripDays" placeholder="行程天数"></el-input>
          </el-form-item>
          <el-form-item label="班期名称：">
            <el-input style="width: 203px" v-model="listQuery.groupName" placeholder="班期名称"></el-input>
          </el-form-item>
          <!-- <el-form-item label="班期状态：">
            <el-select v-model="listQuery.groupStatus" placeholder="全部" clearable>
              <el-option
                v-for="item in groupStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="创建时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createStartDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="创建开始时间"
            ></el-date-picker>-
            <el-date-picker
              class="input-width"
              v-model="listQuery.createEndDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="创建结束时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="编辑时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.updateStartDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="编辑开始时间"
            ></el-date-picker>-
            <el-date-picker
              class="input-width"
              v-model="listQuery.updateEndDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="编辑结束时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="出团时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.tripStartDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="出团开始时间"
            ></el-date-picker>-
            <el-date-picker
              class="input-width"
              v-model="listQuery.tripEndDate"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="开团结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >确定</el-button>
    </div>
    </el-card>
    <div class="table-container">
      <el-table
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="团队/线路编号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="批次号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.groupNumber}}</template>
        </el-table-column>
        <el-table-column label="团队名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="出团日期" width="100" align="center">
          <template slot-scope="scope">{{scope.row.tripTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="天/晚" width="100" align="center">
          <template slot-scope="scope">{{scope.row.dayNight | formatDayNight}}</template>
        </el-table-column>
        <el-table-column label="产品名称" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="库存" width="100" align="center">
          <template slot-scope="scope">
            <p>剩余 {{scope.row.stock}}</p>
            <p>{{scope.row.stockLimit | formatStockLimit}}</p>
          </template>
        </el-table-column>
        <!-- <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column> -->
        <!-- <el-table-column label="是否手动调价" width="100" align="center">
          <template slot-scope="scope">{{}}</template>
        </el-table-column>-->
        <el-table-column label="创建时间" width="100" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="最后编辑时间" width="155" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleUpdateGroup(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteGroup(scope.$index, scope.row)"
              >删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>    
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { fetchList, fetchProductList, deleteGroup, deleteGroups } from "@/api/group";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  productName: null,
  tripDays: null,
  groupName: null,
  // groupStatus: null,
  createStartDate: null,
  createEndDate: null,
  updateStartDate: null,
  updateEndDate: null,
  tripStartDate: null,
  tripEndDate: null,
  pageNum: 1,
  pageSize: 5,
};
export default {
  name: "productList",
  data() {
    return {
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productName: null,
        tripDays: null,
        groupName: null,
        // groupStatus: null,
        createStartDate: null,
        createEndDate: null,
        updateStartDate: null,
        updateEndDate: null,
        tripStartDate: null,
        tripEndDate: null
      },
      operates: [
        {
          label: "批量删除",
          value: "deleteGroups"
        },
        // {
        //   label: "商品上架",
        //   value: "publishOn"
        // },
        // {
        //   label: "商品下架",
        //   value: "publishOff"
        // },
        // {
        //   label: "设为推荐",
        //   value: "recommendOn"
        // },
        // {
        //   label: "取消推荐",
        //   value: "recommendOff"
        // },
        // {
        //   label: "设为新品",
        //   value: "newOn"
        // },
        // {
        //   label: "取消新品",
        //   value: "newOff"
        // },
        // {
        //   label: "转移到分类",
        //   value: "transferCategory"
        // },
        // {
        //   label: "移入回收站",
        //   value: "recycle"
        // }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: [],
      productCateOptions: [],
      productOptions: [],
      //班期状态（0 -待发布，1 - 已上架，2 - 已下架）
      // groupStatusOptions: [
      //   {
      //     value: 0,
      //     label: "待发布"
      //   },
      //   {
      //     value: 1,
      //     label: "已上架"
      //   },
      //   {
      //     value: 2,
      //     label: "已下架"
      //   }
      // ]
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDayNight(time) {
      let day = time.split(",")[0];
      let night = time.split(",")[1];
      return day + "天" + night + "晚";
    },
    formatStockLimit(value) {
      if (value === 1) {
        return "不限";
      } else {
        return "有限";
      }
    },
    // formatStatus(value) {
    //   if (value === 0) {
    //     return "未出行";
    //   }
    // }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        if (response.data === "未查询到班期记录") {
          this.list = [];
          this.total = 0;
        } else {
          this.list = response.data.list;
          this.total = response.data.total;
        }
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleUpdateGroup(index, row) {
      this.$router.push({ path: "/pms/updateGroup", query: { id: row.id, pid: row.productId } });
    },
    handleDeleteGroup(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteGroup(row.id).then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: "请选择操作类型",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的商品",
          type: "warning",
          duration: 1000
        });
        return;
      }
      this.$confirm("是否要进行该批量操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.deleteGroups(ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[2].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[4].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[6].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[7].value:
            break;
          case this.operates[8].value:
            this.updateDeleteStatus(1, ids);
            break;
          default:
            break;
        }
        // this.getList();
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updatePublishStatus(row.publishStatus, ids);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateNewStatus(row.newStatus, ids);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRecommendStatus(row.recommandStatus, ids);
    },
    deleteGroups(ids){
      deleteGroups(ids).then(response => {
        this.$message({
          message: "批量删除成功",
          type: "success",
          duration: 1000
        });
        this.getList();
      });
    },
    updatePublishStatus(publishStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("publishStatus", publishStatus);
      updatePublishStatus(params).then(response => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
      });
    },
    updateNewStatus(newStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("newStatus", newStatus);
      updateNewStatus(params).then(response => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("recommendStatus", recommendStatus);
      updateRecommendStatus(params).then(response => {
        this.$message({
          message: "修改成功",
          type: "success",
          duration: 1000
        });
      });
    },
    updateDeleteStatus(deleteStatus, ids) {
      let params = new URLSearchParams();
      params.append("ids", ids);
      params.append("deleteStatus", deleteStatus);
      updateDeleteStatus(params).then(response => {
        this.$message({
          message: "删除成功",
          type: "success",
          duration: 1000
        });
        this.getList();
      });
    }
  }
};
</script>
<style scoped>
.batch-operate-container{
  margin-top: 0;
  width: calc(100% - 100px);
  text-align: right;
}
</style>


