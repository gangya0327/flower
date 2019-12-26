<template>
    <div style="margin-top: 50px">
        <el-table :data="value.prices" style="width: 100%;margin-bottom: 10px;" ref="priceTable">
            <el-table-column label="价格类型" width="100" align>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.priceType | priceTypeFormat }}</span>
                </template>
            </el-table-column>
            <el-table-column label="价格名称">
                <template slot-scope="scope">
                    <el-tag size="medium">{{ scope.row.priceName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="供应价" width="100">
                <template slot-scope="scope">
                    <div>{{ scope.row.supplyPrice }}</div>
                </template>
            </el-table-column>
            <el-table-column label="补房差" width="100">
                <template slot-scope="scope">
                    <div>{{ scope.row.houseExtraPrice }}</div>
                </template>
            </el-table-column>
            <el-table-column label="人数限制" width="100">
                <template slot-scope="scope">
                    <div>{{ scope.row.maxPeople }}</div>
                </template>
            </el-table-column>
            <el-table-column label="前台优先展示" width="120">
                <template slot-scope="scope">
                    <div>{{ scope.row.firstShow | firstShowFormat }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div v-if="scope.row.showStatus === 0">将被删除</div>
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

        <el-dialog title="价格信息" :visible.sync="dialogPriceVisible" center width="35%">
            <el-form :model="priceForm" :inline="true" ref="priceForm">
                <el-form-item label="价格类型" :label-width="formLabelWidth">
                    <el-select
                        v-model="priceForm.priceType"
                        placeholder="请选择价格类型"
                        style="width: 150px;"
                    >
                        <el-option label="成人" value="1"></el-option>
                        <el-option label="儿童" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格名称" :label-width="formLabelWidth">
                    <el-input v-model="priceForm.priceName"></el-input>
                </el-form-item>
                <el-form-item label="供应价" :label-width="formLabelWidth">
                    <el-input v-model="priceForm.supplyPrice" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="补房差" :label-width="formLabelWidth">
                    <el-input v-model="priceForm.houseExtraPrice" style="width: 150px"></el-input>
                </el-form-item>
                <el-form-item label="人数限制" :label-width="formLabelWidth">
                    <el-input v-model="priceForm.maxPeople" style="width: 150px"></el-input>
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
            <el-button size="medium" @click="handlePrev">上一步，填写出团信息</el-button>
            <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交班期</el-button>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/utils/date";

export default {
    name: "GroupTripDetail",
    props: {
        value: Object,
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            tableData: this.value.transports,
            dialogPriceVisible: false,
            priceForm: {
                priceType: null,
                priceName: "",
                supplyPrice: null,
                houseExtraPrice: 0,
                maxPeople: null,
                firstShow: null,
                showStatus: 1
            },
            formLabelWidth: "120px",
            rules: {
                transportUrgentTel: [
                    {
                        required: true,
                        message: "请填写接送紧急联系电话",
                        trigger: "blur"
                    }
                ]
            },
            isEditPrice: -1
        };
    },
    created() {},
    computed: {},
    filters: {
        priceTypeFormat(value) {
            //价格类型（1 - 成人，2 - 儿童）
            let priceTypeStr = ["", "成人", "儿童"];
            return priceTypeStr[value];
        },
        firstShowFormat(value) {
            //是否优先展示价格（0 - 否，1 - 是）
            let firstShowStr = ["否", "是"];
            return firstShowStr[value];
        }
    },
    methods: {
        addPrice() {
            let hasFirstShow = -1; //是否优先展示标记，遍历后若有，改为他的index
            this.value.prices.map((item, index) => {
                if (item.firstShow === 1) {
                    hasFirstShow = index;
                }
            });
            if (hasFirstShow !== -1) {
                if (
                    hasFirstShow !== this.isEditPrice &&
                    this.priceForm.firstShow
                ) {
                    this.$message({
                        message: "已经有一个优先展示的价格了",
                        type: "warning",
                        duration: 2000
                    });
                    return false;
                }
            }
            this.$refs["priceForm"].resetFields();
            if (
                !this.priceForm.priceType ||
                !this.priceForm.priceName ||
                !this.priceForm.supplyPrice ||
                !this.priceForm.maxPeople
            ) {
                this.$message({
                    message: "表单填写不完整！",
                    type: "warning",
                    duration: 2000
                });
                return false;
            }
            let oPrice = {
                id: this.priceForm.id,
                priceType: this.priceForm.priceType,
                priceName: this.priceForm.priceName,
                supplyPrice: this.priceForm.supplyPrice,
                houseExtraPrice: this.priceForm.houseExtraPrice,
                maxPeople: this.priceForm.maxPeople,
                firstShow: this.priceForm.firstShow ? 1 : 0,
                showStatus: this.priceForm.showStatus
            };
            if (this.isEditPrice > -1) {
                this.value.prices.splice(this.isEditPrice, 1, oPrice);
            } else {
                this.value.prices.push(oPrice);
            }
            this.dialogPriceVisible = false;
            this.isEditPrice = -1;
        },
        //新增价格弹框
        openDialogPrice() {
            this.priceForm = {
                priceType: null,
                priceName: "",
                supplyPrice: null,
                houseExtraPrice: 0,
                maxPeople: null,
                firstShow: null,
                showStatus: 1
            };
            this.isEditPrice = -1;
            this.dialogPriceVisible = true;
        },
        //编辑价格弹框
        handleEdit(index, row) {
            this.dialogPriceVisible = true;
            this.priceForm.id = row.id;
            this.priceForm.priceType = row.priceType;
            this.priceForm.priceName = row.priceName;
            this.priceForm.supplyPrice = row.supplyPrice;
            this.priceForm.houseExtraPrice = row.houseExtraPrice;
            this.priceForm.firstShow = row.firstShow ? true : false;
            this.priceForm.maxPeople = row.maxPeople;

            this.isEditPrice = index;
        },
        handleDelete(index, row) {
            row.showStatus = 0; //0不展示，1展示
        },
        handlePrev() {
            this.$emit("prevStep");
        },
        handleFinishCommit() {
            this.$emit("finishCommit", this.isEdit);
        }
    }
};
</script>

<style scoped>
</style>
