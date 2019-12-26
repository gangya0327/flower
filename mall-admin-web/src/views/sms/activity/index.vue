<template>
    <div class="app-container">
        <!-- 搜索部分 -->
        <el-card class="filter-container" shadow="never">
            <i class="el-icon-search"></i>
            <span>筛选搜索</span>
            <div class="right-btns">
                <el-button @click="handleResetSearch()" size="small">重置</el-button>
                <el-button type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
            </div>
            <div style="margin-top: 15px">
                <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                    <el-form-item label="活动名称：">
                        <el-input
                            v-model="listQuery.keyword"
                            class="input-width"
                            placeholder="活动名称"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="上架状态：">
                        <el-select v-model="listQuery.status" placeholder="全部" clearable>
                            <el-option
                                v-for="item in publishStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="报名开始时间：">
                        <el-date-picker
                            v-model="listQuery.activityStartDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                            style="width: 200px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名截止时间：">
                        <el-date-picker
                            v-model="listQuery.activityEndDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                            style="width: 200px"
                        ></el-date-picker>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 列表头部 -->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <div class="right-btns">
                <el-button size="mini" class="btn-add" @click="handleAddActivity()">添加活动</el-button>
            </div>
        </el-card>
        <!-- 列表内容 -->
        <div class="table-container">
            <el-table ref="activityTable" :data="list" border v-loading="listLoading">
                <el-table-column label="编号" align="center">
                    <template slot-scope="scope">{{scope.row.bargainActivityId}}</template>
                </el-table-column>
                <el-table-column label="活动名称" align="center">
                    <template slot-scope="scope">{{scope.row.activityName}}</template>
                </el-table-column>
                <el-table-column label="活动费用" align="center">
                    <template slot-scope="scope">{{scope.row.activityMoney}}</template>
                </el-table-column>
                <el-table-column label="助力人数" align="center">
                    <template slot-scope="scope">{{scope.row.activityCriterion}}</template>
                </el-table-column>
                <el-table-column label="关联产品" align="center">
                    <template slot-scope="scope">{{scope.row.productName}}</template>
                </el-table-column>
                <el-table-column label="已报名" align="center">
                    <template slot-scope="scope">{{scope.row.joinCount}}</template>
                </el-table-column>
                <el-table-column label="总库存" align="center">
                    <template slot-scope="scope">{{scope.row.productStockTotal}}</template>
                </el-table-column>
                <el-table-column label="报名开始时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.activityStartDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="报名截止时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.activityEndDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="出发时间" width="160" align="center">
                    <template slot-scope="scope">{{scope.row.createDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="上架/下架" width="85" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="0"
                            v-model="scope.row.status"
                        ></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                size="mini"
                                @click="handleUpdateActivity(scope.$index, scope.row)"
                            >编辑活动</el-button>
                        </p>
                        <p>
                            <el-button
                                size="mini"
                                @click="handleExamineList(scope.$index, scope.row)"
                            >查看报名</el-button>
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
import {
    test,
    fetchList,
    onlineActivity,
    offlineActivity
} from "@/api/activity";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    activityStartDate: null,
    activityEndDate: null,
    pageNum: 1,
    pageNo: 1,
    pageSize: 5,
    status: null
};
export default {
    name: "activityList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            list: null,
            total: null,
            listLoading: false,
            publishStatusOptions: [
                { value: 1, label: "上架" },
                { value: 0, label: "下架" }
            ]
        };
    },
    created() {
        this.getList();
    },
    filters: {
        formatDate(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then(response => {
                this.listLoading = false;
                this.total = response.data.total;
                this.list = response.data.list;
            });
        },
        handleAddActivity() {
            this.$router.push({ path: "/sms/addActivity" });
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageNo = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.listQuery.pageNo = val;
            this.getList();
        },
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            this.listQuery.pageNo = 1;
            this.getList();
        },
        handleUpdateActivity(index, row) {
            this.$router.push({
                path: "/sms/updateActivity",
                query: { id: row.bargainActivityId }
            });
        },
        handleExamineList(index, row) {
            this.$router.push({
                path: "/sms/examine",
                query: { id: row.bargainActivityId }
            });
        },
        handleStatusChange(index, row) {
            this.$confirm("是否要修改该状态?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    let url = "";
                    let data = {
                        activityBargainId: row.bargainActivityId
                    };
                    // axios({
                    //   url:
                    //     "/caiyu/activity/admin/" +
                    //     (row.status === 1 ? "onlineActivity/" : "offlineActivity/") +
                    //     row.bargainActivityId,
                    //   method: "post",
                    //   data: data,
                    //   headers: {
                    //     Authorization: getToken()
                    //   }
                    // }).then(() => {
                    //   this.$message({
                    //     type: "success",
                    //     message: "修改成功!"
                    //   });
                    // });
                    if (row.status === 1) {
                        onlineActivity(row.bargainActivityId, data).then(
                            response => {
                                this.$message({
                                    type: "success",
                                    message: "上架成功!"
                                });
                            }
                        );
                    } else {
                        offlineActivity(row.bargainActivityId, data).then(
                            response => {
                                this.$message({
                                    type: "success",
                                    message: "下架成功!"
                                });
                            }
                        );
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "取消修改"
                    });
                    this.getList();
                });
        }
    }
};
</script>

<style scoped>
.right-btns {
    float: right;
}
</style>

