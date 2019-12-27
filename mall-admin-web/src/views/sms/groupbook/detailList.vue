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
                    <el-form-item label="拼团状态：">
                        <el-select v-model="listQuery.status" placeholder="全部" clearable>
                            <el-option
                                v-for="item in statusOptions"
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
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column label="拼团编号" align="center">
                    <template slot-scope="scope">{{scope.row.groupOrderId}}</template>
                </el-table-column>
                <el-table-column label="发起人昵称" align="center">
                    <template slot-scope="scope">{{scope.row.nickname}}</template>
                </el-table-column>
                <el-table-column label="发起人头像" align="center">
                    <template slot-scope="scope">
                        <img style="height: 100px" :src="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column label="发起时间" width="165" align="center">
                    <template slot-scope="scope">{{scope.row.startTime | formatDate}}</template>
                </el-table-column>
                <el-table-column label="当前人数" align="center">
                    <template slot-scope="scope">{{scope.row.count | formatCount}}</template>
                </el-table-column>
                <el-table-column label="拼团状态" align="center">
                    <template slot-scope="scope">{{scope.row.orderStatus | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <p>
                            <el-button size="mini" @click="handleGroupBookInfo(scope.row)">查看成员</el-button>
                        </p>
                        <p>
                            <el-button
                                size="mini"
                                type="primary"
                                @click="handleMergeGroupBook(scope.row)"
                            >拼团合并</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleRefundGroupBook(scope.row)"
                            >拼团退款</el-button>
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

        <el-dialog :visible.sync="mergeDialogVisible" width="600px">
            <el-steps :active="active" finish-status="success" align-center>
                <el-step title="第一步" description="填写要合并的团编号"></el-step>
                <el-step title="第二步" description="选择要合并的成员"></el-step>
            </el-steps>
            <div v-show="showStatus[0]">
                <el-main>
                    <el-form label-width="150px">
                        <el-form-item label="要合并的团编号">
                            <el-input v-model="groupSourceLeftId" placeholder="要合并的团编号"></el-input>
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-footer>
                    <el-button style="margin-top: 12px;" @click="getMembers">下一步</el-button>
                </el-footer>
            </div>
            <div v-show="showStatus[1]">
                <el-main>
                    <el-transfer
                        v-model="targetList"
                        :data="membersData"
                        :titles="['旧团成员', '新团成员']"
                    ></el-transfer>
                </el-main>
                <el-footer>
                    <el-button style="margin-top: 12px;" @click="prev">上一步</el-button>
                    <el-button style="margin-top: 12px;" @click="mergeSubmit">提交</el-button>
                </el-footer>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    getDetailList,
    getDetailInfo,
    mergeGroupbook,
    refundGroupbook
} from "@/api/groupbook";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    id: null,
    // pageNum: 1,
    pageNo: 1,
    pageSize: 5,
    status: -1 //0=待成团 1=拼团中(发起者支付后的状态) 2=拼团成功（最后一个用户支付后的状态） 3=拼团失败退款中 4=拼团失败退款完成 5=取消
};
const membersQuery = {
    orderId: null,
    pageNo: 1,
    pageSize: 999,
    status: -1 //状态 0=待支付 1=已支付 2=已发货 3=已完成 4=取消 5=退款
};
export default {
    name: "detailList",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            membersQuery: Object.assign({}, membersQuery),
            statusOptions: [
                { value: -1, label: "全部" },
                { value: 0, label: "待成团" },
                { value: 1, label: "拼团中" },
                { value: 2, label: "拼团成功" },
                { value: 3, label: "拼团失败退款中" },
                { value: 4, label: "拼团失败退款完成" },
                { value: 5, label: "拼团取消" }
            ],
            list: null,
            total: null,
            listLoading: false,
            mergeDialogVisible: false,
            active: 0,
            showStatus: [true, false, false],
            leftRightId: null,
            groupSOurceRightId: null,
            groupSourceLeftId: null,
            targetList: [],
            membersData: []
        };
    },
    created() {
        this.listQuery.id = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatCount(value) {
            if (!value) {
                return 0;
            } else {
                return value;
            }
        },
        formatDate(time) {
            if (time == null || time === "") {
                return "N/A";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatStatus(value) {
            switch (Number(value)) {
                case 0:
                    return "待成团";
                case 1:
                    return "拼团中";
                case 2: {
                    return "拼团成功";
                }
                case 3:
                    return "拼团失败退款中";
                case 4:
                    return "拼团失败退款完成";
                case 5:
                    return "拼团取消";
            }
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            getDetailList(this.listQuery).then(response => {
                this.listLoading = false;
                this.total = response.data.total;
                this.list = this.formatStatusByLimitHour(response.data.list);
            });
        },
        //订单状态若是拼团中，且已超过成团有效时间，则改为拼团失败退款中
        formatStatusByLimitHour(list) {
            let buildGroupLimitHour = this.$route.query.buildGroupLimitHour;
            let nowTime = new Date().getTime();
            list.map(function(item,index) {
                if (
                    (item.startTime + buildGroupLimitHour * 1000 * 60 * 60) <
                        nowTime &&
                    item.orderStatus === "1"
                ) {
                    item.orderStatus = "3";
                }
            });
            return list;
        },
        handleSizeChange(val) {
            // this.listQuery.pageNum = 1;
            this.listQuery.pageNo = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            // this.listQuery.pageNum = val;
            this.listQuery.pageNo = val;
            this.getList();
        },
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
            this.listQuery.id = this.$route.query.id;
        },
        handleSearchList() {
            // this.listQuery.pageNum = 1;
            this.listQuery.pageNo = 1;
            this.listQuery.status =
                this.listQuery.status !== null ? this.listQuery.status : -1;
            this.getList();
        },
        handleGroupBookInfo(row) {
            this.$router.push({
                path: "/sms/groupbook/info",
                query: { id: row.groupOrderId }
            });
        },
        initMergeData() {
            this.hideAll();
            this.showStatus[0] = true;
            this.groupSourceLeftId = null;
            this.membersData = [];
            this.targetList = [];
        },
        handleMergeGroupBook(row) {
            this.active = 0;
            this.initMergeData();
            this.groupSOurceRightId = row.groupOrderId;
            this.membersQuery.orderId = row.groupOrderId;
            getDetailInfo(this.membersQuery).then(response => {
                if (response.data.list) {
                    response.data.list.map(item => {
                        this.membersData.push({
                            key: item.groupUserOrderId,
                            label: item.nickname
                        });
                    });
                }
            });
            this.mergeDialogVisible = true;
        },
        hideAll() {
            for (let i = 0; i < this.showStatus.length; i++) {
                this.showStatus[i] = false;
            }
        },
        prev() {
            this.active--;
            let cur = this.active;
            this.hideAll();
            this.showStatus[cur] = true;
        },
        next() {
            if (this.active++ > 2) {
                this.active = 0;
            }
            let cur = this.active;
            this.hideAll();
            this.showStatus[cur] = true;
        },
        getMembers() {
            if (!this.groupSourceLeftId) {
                this.$message.error("请输入要合并的团编号");
                return false;
            }
            this.membersQuery.orderId = this.groupSourceLeftId;
            getDetailInfo(this.membersQuery).then(response => {
                if (response.data.list.length > 0) {
                    response.data.list.map(item => {
                        this.membersData.push({
                            key: item.groupUserOrderId,
                            label: item.nickname
                        });
                    });
                    this.next();
                } else {
                    this.$message.error("输入的团找不到成员");
                    return false;
                }
            });
        },
        mergeSubmit() {
            let data = {
                groupSOurceRightId: this.groupSOurceRightId,
                groupSourceLeftId: this.groupSourceLeftId,
                targetList: this.targetList
            };
            mergeGroupbook(data).then(response => {
                this.mergeDialogVisible = false;
                this.getList();
            });
        },
        handleRefundGroupBook(row) {
            let data = {
                groupOrderId: row.groupOrderId
            };
            refundGroupbook(data).then(response => {
                this.$message({
                    type: "success",
                    message: "退款成功",
                    duration: 1000
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
.el-footer {
    text-align: right;
}
</style>

