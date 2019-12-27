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
                    <el-form-item label="产品名称：">
                        <el-input
                            v-model="listQuery.activityName"
                            class="input-width"
                            placeholder="产品名称"
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
                            v-model="listQuery.startDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                            style="width: 200px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="报名截止时间：">
                        <el-date-picker
                            v-model="listQuery.endDate"
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
                <el-button size="mini" class="btn-add" @click="handleAddGroupbook()">添加活动</el-button>
            </div>
        </el-card>
        <!-- 列表内容 -->
        <div class="table-container">
            <el-table ref="activityTable" :data="list" border v-loading="listLoading">
                <el-table-column label="活动编号" align="center">
                    <template slot-scope="scope">{{scope.row.groupActivityId}}</template>
                </el-table-column>
                <el-table-column label="活动产品名称" min-width="150" align="center">
                    <template slot-scope="scope">{{scope.row.productName}}</template>
                </el-table-column>
                <el-table-column label="活动原价" align="center">
                    <template slot-scope="scope">{{scope.row.originalPrice}}</template>
                </el-table-column>
                <el-table-column label="活动价" align="center">
                    <template slot-scope="scope">{{scope.row.activityPrice}}</template>
                </el-table-column>
                <el-table-column label="成团人数" align="center">
                    <template slot-scope="scope">{{scope.row.buildGroupPeopleNum}}</template>
                </el-table-column>
                <el-table-column label="成团有效时间（小时）" align="center" min-width="100">
                    <template slot-scope="scope">{{scope.row.buildGroupLimitHour}}</template>
                </el-table-column>
                <el-table-column label="报名开始时间" min-width="100" align="center">
                    <template slot-scope="scope">{{scope.row.activityStartDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="报名截止时间" min-width="100" align="center">
                    <template slot-scope="scope">{{scope.row.activityEndDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="出发时间" min-width="100" align="center">
                    <template slot-scope="scope">{{scope.row.createTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="上架/下架" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="handleStatusChange(scope.$index, scope.row)"
                            :active-value="1"
                            :inactive-value="2"
                            v-model="scope.row.activityStatus"
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
                                @click="handleDetailList(scope.$index, scope.row)"
                            >查看拼团情况</el-button>
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
                :current-page.sync="listQuery.pageNo"
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
} from "@/api/groupbook";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    activityName: null,
    startDate: null,
    endDate: null,
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
        handleAddGroupbook() {
            this.$router.push({ path: "/sms/addGroupbook" });
        },
        handleSizeChange(val) {
            this.listQuery.pageNo = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNo = val;
            this.getList();
        },
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
        },
        handleSearchList() {
            this.listQuery.pageNo = 1;
            this.getList();
        },
        handleUpdateActivity(index, row) {
            this.$router.push({
                path: "/sms/updateGroupbook",
                query: { id: row.groupActivityId }
            });
        },
        handleDetailList(index, row) {
            this.$router.push({
                path: "/sms/groupbook/detailList",
                query: {
                    id: row.groupActivityId,
                    buildGroupLimitHour: row.buildGroupLimitHour
                }
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
                        activityBargainId: row.groupActivityId
                    };
                    if (row.activityStatus === 1) {
                        onlineActivity(row.groupActivityId, data).then(
                            response => {
                                this.$message({
                                    type: "success",
                                    message: "上架成功!"
                                });
                            }
                        );
                    } else {
                        offlineActivity(row.groupActivityId, data).then(
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

