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
          <el-form-item label="航班编号：">
            <el-input style="width: 203px" v-model="listQuery.flightNumber" placeholder="航班编号"></el-input>
          </el-form-item>
          <el-form-item label="航空公司：">
            <el-input style="width: 203px" v-model="listQuery.airlineCompany" placeholder="航空公司"></el-input>
          </el-form-item>
          <el-form-item label="班期状态：">
            <el-select v-model="listQuery.status" placeholder="全部" clearable>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出发城市：">
            <el-input style="width: 203px" v-model="listQuery.departureCityName" placeholder="出发城市"></el-input>
          </el-form-item>
          <el-form-item label="到达城市：">
            <el-input
              style="width: 203px"
              v-model="listQuery.destinationCityName"
              placeholder="到达城市"
            ></el-input>
          </el-form-item>
          <el-form-item label="创建时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.createStringTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="创建开始时间"
            ></el-date-picker>-
            <el-date-picker
              class="input-width"
              v-model="listQuery.createEndTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="创建结束时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="编辑时间：">
            <el-date-picker
              class="input-width"
              v-model="listQuery.updateStringTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="编辑开始时间"
            ></el-date-picker>-
            <el-date-picker
              class="input-width"
              v-model="listQuery.updateEndTime"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="编辑结束时间"
            ></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
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
        <el-table-column label="航班编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.flightNumber}}</template>
        </el-table-column>
        <el-table-column label="机票编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.productId}}</template>
        </el-table-column>
        <el-table-column label="航空公司" align="center">
          <template slot-scope="scope">{{scope.row.airlineCompany}}</template>
        </el-table-column>
        <el-table-column label="出团时间" width="100" align="center">
          <template slot-scope="scope">{{scope.row.departureTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="到达时间" width="100" align="center">
          <template slot-scope="scope">{{scope.row.destinationTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="机型" width="120" align="center">
          <template slot-scope="scope">{{scope.row.planeType}}</template>
        </el-table-column>
        <el-table-column label="库存" width="100" align="center">
          <template slot-scope="scope">
            <p>剩余 {{scope.row.stock}}</p>
            <p>{{scope.row.stockLimit | formatStockLimit}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="100" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="最后编辑时间" width="155" align="center">
          <template slot-scope="scope">{{scope.row.updateTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <p>
              <el-button size="mini" @click="handleUpdateFlightgroup(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDeleteFlightgroup(scope.$index, scope.row)"
              >删除</el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
import { fetchList, fetchProductList } from "@/api/group";
import { formatDate } from "@/utils/date";

import {
  fetchList as fetchFlightgroupList,
  deleteFlightgroup
} from "@/api/flight";

const defaultListQuery = {
  flightNumber: null,
  airlineCompany: null,
  departureCityName: null,
  destinationCityName: null,
  createStringTime: null,
  createEndTime: null,
  updateStringTime: null,
  updateEndTime: null,
  pageNum: 1,
  pageSize: 5
};
export default {
  name: "productList",
  data() {
    return {
      operates: [
        {
          label: "商品上架",
          value: "publishOn"
        },
        {
          label: "商品下架",
          value: "publishOff"
        },
        {
          label: "设为推荐",
          value: "recommendOn"
        },
        {
          label: "取消推荐",
          value: "recommendOff"
        },
        {
          label: "设为新品",
          value: "newOn"
        },
        {
          label: "取消新品",
          value: "newOff"
        },
        {
          label: "转移到分类",
          value: "transferCategory"
        },
        {
          label: "移入回收站",
          value: "recycle"
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      productOptions: [],
      //班期状态（0 -待发布，1 - 已上架，2 - 已下架）
      statusOptions: [
        {
          value: 0,
          label: "待发布"
        },
        {
          value: 1,
          label: "已上架"
        },
        {
          value: 2,
          label: "已下架"
        }
      ]
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
    formatStatus(value) {
      if (value === 0) {
        return "未出行";
      }
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchFlightgroupList(this.listQuery).then(response => {
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
      this.$router.push({ path: "/pms/updateGroup", query: { id: row.id } });
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
            this.updatePublishStatus(1, ids);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids);
            break;
          case this.operates[6].value:
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids);
            break;
          default:
            break;
        }
        this.getList();
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
    handleDeleteFlightgroup(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        deleteFlightgroup(row.id).then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleUpdateFlightgroup(index, row) {
      this.$router.push({
        path: "/fms/updateFlightgroup",
        query: { id: row.id }
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
      });
      this.getList();
    }
  }
};
</script>
<style></style>


