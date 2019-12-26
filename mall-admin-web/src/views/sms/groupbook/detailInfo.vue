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
                <el-table-column label="成员昵称" align="center">
                    <template slot-scope="scope">{{scope.row.nickname}}</template>
                </el-table-column>
                <el-table-column label="成员头像" align="center">
                    <template slot-scope="scope">
                        <img style="height: 100px" :src="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column label="创建时间" width="165" align="center">
                    <template slot-scope="scope">{{scope.row.createOrderDate | formatDate}}</template>
                </el-table-column>
                <!-- <el-table-column label="最晚支付时间" width="165" align="center">
                    <template slot-scope="scope">{{scope.row.payDeadline | formatDate}}</template>
                </el-table-column> -->
                <el-table-column label="订单状态" align="center">
                    <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
                </el-table-column>
                <el-table-column label="更新时间" width="165" align="center">
                    <template slot-scope="scope">{{scope.row.updateDate | formatDate}}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleJumpOrder(scope.row)">查看订单</el-button>
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
import { getDetailInfo } from "@/api/groupbook";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    orderId: null,
    pageNum: 1,
    pageNo: 1,
    pageSize: 5,
    status: -1 //状态 0=待支付 1=已支付 2=已发货 3=已完成 4=取消 5=退款
};
export default {
    name: "examine",
    data() {
        return {
            listQuery: Object.assign({}, defaultListQuery),
            publishStatusOptions: [
                { value: -1, label: "全部" },
                { value: 0, label: "待支付" },
                { value: 1, label: "已支付" },
                { value: 2, label: "已发货" },
                { value: 3, label: "已完成" },
                { value: 4, label: "已取消" },
                { value: 5, label: "已退款" }
            ],
            list: null,
            total: null,
            listLoading: false
        };
    },
    created() {
        this.listQuery.orderId = this.$route.query.id;
        this.getList();
    },
    filters: {
        formatDate(time) {
            if (time == null || time === "") {
                return "-";
            }
            let date = new Date(time);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        },
        formatStatus(value) {
            switch (Number(value)) {
                case 0:
                    return "待支付";
                case 1:
                    return "已支付";
                case 2:
                    return "已发货";
                case 3:
                    return "已完成";
                case 4:
                    return "已取消";
                case 5:
                    return "已退款";
            }
        }
    },
    methods: {
        getList() {
            this.listLoading = true;
            getDetailInfo(this.listQuery).then(response => {
                this.listLoading = false;
                this.total = response.data.total;
                this.list = response.data.list;
            });
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            // this.listQuery.pageNo = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            // this.listQuery.pageNo = val;
            this.getList();
        },
        handleResetSearch() {
            this.listQuery = Object.assign({}, defaultListQuery);
            this.listQuery.orderId = this.$route.query.id;
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            // this.listQuery.pageNo = 1;
            this.listQuery.status =
                this.listQuery.status !== null ? this.listQuery.status : -1;
            this.getList();
        },
        handleGroupBookInfo(row) {
            this.$router.push({
                path: "/sms/groupbook/info",
                query: { orderId: row.groupOrderId }
            });
        },
        handleJumpOrder(row) {
            let {href} = this.$router.resolve({
                path: "/oms/order",
                query: { joinId: row.groupUserOrderId }
            });
            window.open(href, '_blank')
        }
    }
};
</script>

<style scoped>
.right-btns {
    float: right;
}
</style>

