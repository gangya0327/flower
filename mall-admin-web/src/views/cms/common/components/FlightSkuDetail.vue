<template>
    <div style="margin-top: 50px">
        <el-form
            :model="value"
            ref="productRelationForm"
            label-width="120px"
            style="width: 680px"
            size="small"
        >
            <el-form-item label="规格参数：">
                <div v-for="(item, index) in value.skuAttr" :key="index">
                    {{item.type}}：
                    <span v-for="(value, i) in item.value" :key="i">{{value}}、</span>
                    <el-button
                        type="primary"
                        icon="el-icon-plus"
                        circle
                        @click="openAttrValueDialog(index)"
                        size="mini"
                    ></el-button>
                    <el-button
                        type="danger"
                        icon="el-icon-minus"
                        circle
                        @click="deleteAttrValue(index)"
                        size="mini"
                    ></el-button>
                </div>
                <el-button
                    type="primary"
                    @click="openAttrTypeDialog"
                    style="margin-top: 20px"
                >添加参数类型</el-button>
            </el-form-item>
            <el-form-item label="规格明细表：">
                <el-button type="success" @click="createAttrTable">更新规格明细表</el-button>
                <el-table :data="value.skuList" style="width: 750px;max-width: 900px">
                    <el-table-column label="规格项" width="300">
                        <template slot-scope="scope">{{scope.row.spec | specClean}}</template>
                    </el-table-column>
                    <el-table-column prop="stock" label="库存" width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stock" style="width: 75px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" label="价格" width="100">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price" style="width: 75px"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="image" label="图片" width="230">
                        <template slot-scope="scope">
                            <single-upload v-model="scope.row.image" style="width: 210px"></single-upload>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button size="medium" @click="handlePrev">上一步</el-button>
                <el-button type="primary" size="medium" @click="handleFinishCommit">保存提交</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="添加规格类型" :visible.sync="attrTypeDialogVisible" width="400px">
            <el-input v-model="attrTypeInput" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="attrTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAttrType">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加规格参数" :visible.sync="attrValueDialogVisible" width="400px">
            <el-input v-model="attrValueInput" placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="attrValueDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAttrValue">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchListAll as fetchSubjectList } from "@/api/subject";
import SingleUpload from "@/components/Upload/singleUpload";
import { getRelationProducts as getRelationList } from "@/api/product";

export default {
    name: "FlightSkuDetail",
    props: {
        value: Object,
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    components: { SingleUpload },
    data() {
        return {
            attrTypeDialogVisible: false,
            attrValueDialogVisible: false,
            attrTypeInput: null,
            attrValueInput: null,
            attrTypeIndex: null, //操作第几个参数
            // attrList: [
            //     { type: "日期", value: ["2019-08-07", "2019-08-08"] },
            //     { type: "类型", value: ["成人票", "儿童票", "老人票"] },
            //     { type: "等级", value: ["初级", "中级", "高级"] }
            // ],
            attrList: this.value.skuAttr,
            tableData: this.value.skuList
            // tableData: [
            //     {
            //         price: "195",
            //         stock: "2",
            //         spec: "日期:2019-08-07,类型:成人票",
            //         image: null
            //     },
            //     {
            //         price: "199",
            //         stock: "53",
            //         spec: "日期:2019-08-08,类型:儿童票",
            //         image: null
            //     },
            //     {
            //         price: "198",
            //         stock: "4",
            //         spec: "日期:2019-08-07,类型:儿童票",
            //         image: null
            //     },
            //     {
            //         price: "199",
            //         stock: "3",
            //         spec: "日期:2019-08-08,类型:成人票",
            //         image: null
            //     }
            // ]
        };
    },
    filters: {
        specClean(value) {
            let temp = JSON.stringify(value).replace(/\\\\\\\"/g, "");
            temp = temp.slice(2, temp.length - 2);
            temp = temp.replace(/\:/g, "：");
            return temp;
        }
    },
    methods: {
        openAttrTypeDialog() {
            this.attrTypeInput = null;
            this.attrTypeDialogVisible = true;
        },
        addAttrType() {
            if (this.attrTypeInput === "" || this.attrTypeInput === null) {
                this.$message({
                    type: "error",
                    message: "规格参数类型不能为空",
                    duration: 1000
                });
                return false;
            }
            this.value.skuAttr.push({
                type: this.attrTypeInput,
                value: []
            });
            this.attrTypeDialogVisible = false;
        },
        openAttrValueDialog(index) {
            this.attrTypeIndex = index;
            this.attrValueInput = null;
            this.attrValueDialogVisible = true;
        },
        addAttrValue() {
            if (this.attrValueInput === "" || this.attrValueInput === null) {
                this.$message({
                    type: "error",
                    message: "规格参数值不能为空",
                    duration: 1000
                });
                return false;
            }
            this.value.skuAttr[this.attrTypeIndex].value.push(
                this.attrValueInput
            );
            this.attrValueDialogVisible = false;
        },
        deleteAttrValue(index) {
            if (this.value.skuAttr.length === 1) {
                this.$message({
                    type: "error",
                    message: "规格参数至少要有一条",
                    duration: 1000
                });
                return false;
            }
            this.$confirm("是否要删除该条规格参数", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.value.skuAttr.splice(index, 1);
            });
        },
        createAttrTable() {
            let attrInit = [];
            let hasEmptyAttr = false;
            if (this.value.skuAttr.length === 0) {
                this.$message({
                    type: "error",
                    message: "请至少输入一条规格参数",
                    duration: 1000
                });
                return false;
            }
            this.value.skuAttr.map(item => {
                let attrInitItem = [];
                item.value.map(itemValue => {
                    attrInitItem.push(item.type + ":" + itemValue);
                });
                if (attrInitItem.length === 0) {
                    hasEmptyAttr = true;
                }
                attrInit.push(attrInitItem);
            });
            if (hasEmptyAttr) {
                this.$message({
                    type: "error",
                    message: "规格值不能为空",
                    duration: 1000
                });
                return false;
            }

            //将规格数组排列组合
            var attrResult = [[]];
            for (var i = 0; i < attrInit.length; i++) {
                var attrTemp = [];
                for (var j = 0; j < attrResult.length; j++) {
                    for (var k = 0; k < attrInit[i].length; k++) {
                        attrTemp.push(attrResult[j].concat(attrInit[i][k]));
                    }
                }
                attrResult = attrTemp;
            }
            let tableInit = [];

            let itemObjArr = [];
            attrResult.map(item => {
                let itemObj = {};
                item.map(item2 => {
                    let item2Arr = item2.split(":");
                    let item2Obj = {};
                    item2Obj[item2Arr[0]] = item2Arr[1];
                    Object.assign(itemObj, item2Obj);
                });
                itemObjArr.push(itemObj);
            });
            attrResult.map((item, index) => {
                let specText = "";
                item.map(item2 => {
                    specText += item2 + ",";
                });
                specText.slice(0, specText.length - 1);
                tableInit.push({
                    spec: JSON.stringify(itemObjArr[index]).replace(
                        /\"/g,
                        '\\"'
                    ),
                    specText: specText,
                    price: 0,
                    stock: 0,
                    image: null
                });
            });
            this.value.skuList = tableInit;
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
