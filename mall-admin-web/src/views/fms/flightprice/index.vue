<template>
    <div class="price-card">
        <el-card shadow="never">
            <el-table :data="value" style="width: 100%;margin-bottom: 10px;" ref="priceTable">
                <el-table-column label="出发日期" min-width="100" align>
                    <template slot-scope="scope">
                        <div>{{ scope.row.flightDate | timeFormat }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="返程出发日期" min-width="110" align>
                    <template slot-scope="scope">
                        <div>{{ scope.row.returnFlightData | timeFormat }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="价格名称" align>
                    <template slot-scope="scope">
                        <el-tag size="medium">{{ scope.row.priceName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="供应价" min-width="100" align>
                    <template slot-scope="scope">
                        <div>{{ scope.row.supplyPrice }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="销售价" min-width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.purchasePrice }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="儿童供应价" min-width="100" align>
                    <template slot-scope="scope">
                        <div>{{ scope.row.childPrice }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="儿童销售价" min-width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.childPurchasePrice }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="舱位名">
                    <template slot-scope="scope">
                        <div>{{ scope.row.shippingSpaceName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="人数限制" min-width="80">
                    <template slot-scope="scope">
                        <div>{{ scope.row.maxPeople }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="库存" min-width="80">
                    <template slot-scope="scope">
                        <div>{{ scope.row.stock }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="前台展示" min-width="80">
                    <template slot-scope="scope">
                        <div>{{ scope.row.firstShow | firstShowFormat }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <div v-if="scope.row.showStatus === 0">提交后被删除</div>
                        <div v-else>
                            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)"
                            >删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <el-button
                type="primary"
                size="mini"
                style="margin-bottom: 20px;"
                @click="openDialogPrice()"
            >添加价格信息</el-button>

            <el-dialog title="价格信息" :visible.sync="dialogPriceVisible" center width="650px">
                <el-form :model="priceForm" :inline="true" ref="priceForm">
                    <el-form-item label="出发日期" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="priceForm.flightDate"
                            type="date"
                            placeholder="选择日期"
                            style="width: 150px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="返程出发日期" :label-width="formLabelWidth">
                        <el-date-picker
                            v-model="priceForm.returnFlightData"
                            type="date"
                            placeholder="选择日期"
                            style="width: 150px"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="价格名称" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.priceName" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="供应价" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.supplyPrice" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="销售价" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.purchasePrice" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="儿童供应价" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.childPrice" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="儿童销售价" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.childPurchasePrice" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="舱位" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.shippingSpaceName" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="人数限制" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.maxPeople" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" :label-width="formLabelWidth">
                        <el-input v-model="priceForm.stock" style="width: 150px"></el-input>
                    </el-form-item>
                    <el-form-item label="前台优先展示" :label-width="formLabelWidth">
                        <el-switch v-model="priceForm.firstShow"></el-switch>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogPriceVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addPrice()">确 定</el-button>
                </div>
            </el-dialog>
            <div style="text-align: center">
                <el-button type="primary" size="medium" @click="handleFinishCommit">确认提交</el-button>
            </div>
        </el-card>
    </div>
</template>
<script>
import {
    getFlightPrice,
    createFlightPrice,
    updateFlightPrice
} from "@/api/flight";
import { formatDate } from "@/utils/date";

export default {
    name: "flightPriceDetail",
    data: function() {
        return {
            dialogPriceVisible: false,
            priceForm: {
                flightDate: null,
                returnFlightData: null,
                priceName: "",
                supplyPrice: null,
                purchasePrice: null,
                childPrice: null,
                childPurchasePrice: null,
                shippingSpaceName: null,
                maxPeople: null,
                stock: 10,
                firstShow: null, //是否优先展示价格（0 - 否，1 - 是）
                showStatus: 1 //展示状态（0 - 不展示，1 - 展示）
            },
            formLabelWidth: "120px",
            value: [],
            isEdit: false,
            editIndex: -1
        };
    },
    filters: {
        firstShowFormat(value) {
            //是否优先展示价格（0 - 否，1 - 是）
            let firstShowStr = ["否", "是"];
            return firstShowStr[value];
        },
        timeFormat(value) {
            if (!value) {
                return "无";
            }
            let date = new Date(value);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    created() {
        this.getList();
    },
    methods: {
        getList() {
            let that = this;
            getFlightPrice(that.$route.query.fid).then(response => {
                if (response.data.length > 0) {
                    this.isEdit = true;
                    this.value = response.data;
                }
            });
        },
        openDialogPrice() {
            this.priceForm = {
                flightDate: null,
                returnFlightData: null,
                priceName: "",
                supplyPrice: null,
                purchasePrice: null,
                childPrice: null,
                childPurchasePrice: null,
                shippingSpaceName: null,
                maxPeople: null,
                stock: 10,
                firstShow: null, //是否优先展示价格（0 - 否，1 - 是）
                showStatus: 1 //展示状态（0 - 不展示，1 - 展示）
            };
            this.editIndex = -1;
            this.dialogPriceVisible = true;
        },
        addPrice() {
            this.$refs["priceForm"].resetFields();
            let oPrice = {
                flightId: this.$route.query.fid,
                priceType: this.priceForm.priceType,
                priceName: this.priceForm.priceName,
                flightDate: this.priceForm.flightDate,
                returnFlightData: this.priceForm.returnFlightData,
                supplyPrice: Number(this.priceForm.supplyPrice),
                purchasePrice: Number(this.priceForm.purchasePrice),
                childPrice: Number(this.priceForm.childPrice),
                childPurchasePrice: Number(this.priceForm.childPurchasePrice),
                shippingSpaceName: this.priceForm.shippingSpaceName,
                maxPeople: Number(this.priceForm.maxPeople),
                stock: Number(this.priceForm.stock),
                firstShow: this.priceForm.firstShow ? 1 : 0,
                showStatus: this.priceForm.showStatus
            };
            if (this.editIndex > -1) {
                oPrice.id = this.priceForm.id;
                this.value.splice(this.editIndex, 1, oPrice);
            } else {
                this.value.push(oPrice);
            }
            this.dialogPriceVisible = false;
            this.editIndex = -1;
        },
        handleEdit(index, row) {
            this.dialogPriceVisible = true;
            this.priceForm = row;
            this.editIndex = index; //记录修改的行数
        },
        handleDelete(index, row) {
            row.showStatus = 0; //0不展示，1展示
        },
        handleFinishCommit() {
            if (this.isEdit) {
                updateFlightPrice(this.value).then(response => {
                    this.$message({
                        type: "success",
                        message: "修改成功",
                        duration: 1000
                    });
                    this.getList();
                });
            } else {
                createFlightPrice(this.value, this.$route.query.fid).then(
                    response => {
                        this.$message({
                            type: "success",
                            message: "提交成功",
                            duration: 1000
                        });
                        this.getList();
                    }
                );
            }
        }
    }
};
</script>
<style scope>
.price-card {
    margin: 50px 30px;
}
</style>