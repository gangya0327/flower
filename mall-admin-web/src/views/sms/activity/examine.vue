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
                <el-form :inline="true" :model="listQuery" size="small" label-width="160px">
                    <el-form-item label="申请人姓名或手机号：">
                        <el-input
                            v-model="listQuery.keyword"
                            class="input-width"
                            placeholder="请输入关键字"
                            clearable
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="订单状态：">
                        <el-select v-model="listQuery.status" placeholder="全部" clearable>
                            <el-option
                                v-for="item in publishStatusOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
        <!-- 列表头部 -->
        <el-card class="operate-container" shadow="never">
            <i class="el-icon-tickets"></i>
            <span>数据列表</span>
            <div class="right-btns"></div>
        </el-card>
        <!-- 列表内容 -->
        <div class="table-container">
            <el-table ref="activityTable" :data="list" v-loading="listLoading" border>
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="编号" align="center">
                    <template slot-scope="scope">{{scope.row.id}}</template>
                </el-table-column>
                <el-table-column label="活动名称" align="center">
                    <template slot-scope="scope">{{scope.row.activityName}}</template>
                </el-table-column>
                <el-table-column label="当前助力人数" align="center">
                    <template slot-scope="scope">{{scope.row.helpPeople | formatHelpPeople}}</template>
                </el-table-column>
                <el-table-column label="用户头像" align="center">
                    <template slot-scope="scope">
                        <img style="height: 100px" :src="scope.row.userImg" />
                    </template>
                </el-table-column>
                <el-table-column label="用户昵称" align="center">
                    <template slot-scope="scope">{{scope.row.userName}}</template>
                </el-table-column>
                <el-table-column label="申请人姓名" align="center">
                    <template slot-scope="scope">{{scope.row.questionnaire | formatApplyName}}</template>
                </el-table-column>
                <el-table-column label="申请人手机" align="center">
                    <template slot-scope="scope">{{scope.row.questionnaire | formatApplyPhone}}</template>
                </el-table-column>
                <el-table-column label="订单状态" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="更新时间" align="center">
                    <template slot-scope="scope">{{scope.row.updateTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button
                                size="mini"
                                type="success"
                                @click="handleExecute(scope.row,2)"
                                v-show="scope.row.status !== 4"
                            >通过</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleExecute(scope.row,5)"
                                v-show="scope.row.status !== 4"
                            >拒绝</el-button>
                            <el-button
                                size="mini"
                                @click="handleOrder(scope.row)"
                                v-show="scope.row.status === 4"
                            >查看订单</el-button>
                        </p>
                        <p>
                            <el-button
                                size="mini"
                                @click="handleExecute(scope.row,3)"
                                v-show="scope.row.status !== 4"
                            >取消资格</el-button>
                            <el-button size="mini" @click="handleQeustion(scope.row)">查看问卷</el-button>
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
        <el-dialog title="问卷内容" :visible.sync="dialogVisible">
            <el-card shadow="never">
                <el-table :data="questionData" style="width: 100%">
                    <el-table-column prop="key" label="问题" width="180"></el-table-column>
                    <el-table-column prop="value" label="回答"></el-table-column>
                </el-table>
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import { getExamineList, examineExecute } from "@/api/activity";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    activityBargainId: null,
    pageNum: 1,
    pageNo: 1,
    pageSize: 5,
    status: -1 //状态 0已提交 1报名成功 2待支付 3取消订单 4订单完成 5订单结束 6已退款-1全部
};
export default {
    name: "examine",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            publishStatusOptions: [
                { value: -1, label: "全部" },
                { value: 0, label: "已提交" },
                { value: 1, label: "报名成功" },
                { value: 2, label: "待支付" },
                { value: 3, label: "已取消" },
                { value: 4, label: "已完成" },
                { value: 5, label: "已结束" },
                { value: 6, label: "已退款" }
            ],
            list: null,
            total: null,
            dialogVisible: false,
            questionData: [],
            listLoading: false
        };
    },
    created() {
        this.listQuery.activityBargainId = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatDate(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatStatus(value) {
            switch (value) {
                case 0:
                    return "已提交";
                case 1:
                    return "报名成功";
                case 2:
                    return "待支付";
                case 3:
                    return "已取消";
                case 4:
                    return "已完成";
                case 5:
                    return "已结束";
                case 6:
                    return "已退款";
            }
        },
        formatHelpPeople(value) {
            if (value === null) {
                return 0;
            } else {
                return value;
            }
        },
        formatApplyName(value) {
            return JSON.parse(value).applyName;
        },
        formatApplyPhone(value) {
            return JSON.parse(value).applyPhone;
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            getExamineList(this.listQuery).then(response => {
                this.listLoading = false;
                this.total = response.data.total;
                this.list = response.data.list;
            });
        },
        handleOrder(row) {
            let { href } = this.$router.resolve({
                path: "/oms/orderActivityDetail",
                query: { id: row.orderId }
            });
            window.open(href, "_blank");
        },
        handleExecute(row, type) {
            let params = {
                id: row.id,
                status: type //2通过 5拒绝 3收回
            };
            examineExecute(params).then(response => {
                this.$message({
                    message: "操作成功",
                    type: "success",
                    duration: 1000
                });
                this.getList();
            });
        },
        handleQeustion(row) {
            this.dialogVisible = true;
            let questionnaire = JSON.parse(row.questionnaire);
            let questionData = [];
            for (let i in questionnaire) {
                if (i !== "applyName" && i !== "applyPhone") {
                    let obj = {
                        key: i,
                        value: questionnaire[i]
                    };
                    questionData.push(obj);
                }
            }
            this.questionData = questionData;
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
            this.listQuery.activityBargainId = this.$route.query.id;
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            this.listQuery.pageNo = 1;
            this.listQuery.status =
                this.listQuery.status !== null ? this.listQuery.status : -1;
            this.getList();
        }
    }
};
</script>

<style scoped>
.right-btns {
    float: right;
}
</style>

