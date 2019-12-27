<template>
    <el-card class="form-container activity-container" shadow="never">
        <el-form class="activity-form" :model="value" ref="activityForm" label-width="140px" width="1000px" size="small" :rules="rules">
            <el-form-item label-width="0">
                <el-col :span="18">
                    <el-form-item prop="activityName" label="活动名称：">
                        <el-input v-model="value.activityName" style="width: 100%"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="23">
                    <el-form-item prop="productDesc" label="活动副标题：">
                        <el-input v-model="value.productDesc" type="textarea"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="activityStartDate" label="报名开始时间：">
                        <el-date-picker
                            v-model="value.activityStartDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="activityEndDate" label="报名截止时间：">
                        <el-date-picker
                            v-model="value.activityEndDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="activityMoney" label="活动价格：">
                        <el-input v-model="value.activityMoney">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="activityCriterion" label="助力人数：">
                        <el-input v-model="value.activityCriterion"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="timeOut" label="支付时限：">
                        <el-input v-model="value.timeOut">
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                </el-col>              
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="24">
                    <el-form-item label="关联产品：" prop="productId">
                        <template>
                            <div v-if="value.productId===null">
                                <el-button type="primary" @click="selectProduct">选择活动产品</el-button>
                            </div>
                            <div v-else-if="value.productId !==null">
                                {{value.productName}}
                                <el-link @click="selectProduct" type="danger" :underline="false">
                                    <i class="el-icon-error el-icon--right"></i>
                                    重选
                                </el-link>
                            </div>
                        </template>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                 <el-col :span="12">
                    <el-form-item label="选择出发日期：" prop="tripDateOrigin">
                        <el-select v-model="tripDateOrigin" placeholder="请选择">
                            <el-option
                            v-for="item in productGroupOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="活动图片：" prop="selectProductPics">
                <multi-upload v-model="selectProductPics"></multi-upload>
            </el-form-item>
            <el-form-item label="活动描述：">
                <tinymce :width="600" :height="220" v-model="value.activityInfo"></tinymce>
            </el-form-item>
            <el-form-item label="总库存：">
                <el-input v-model="value.productStockTotal" style="width: 100px"></el-input>
                <span class="inline-span text-indent-2">已报名：</span>
                <el-input v-model="value.joinCount" style="width: 100px"></el-input>
            </el-form-item>
            <el-form-item label="分享图片：">
                <single-upload
                    v-model="value.shareImgUrl"
                    style="width: 300px;display: inline-block;margin-left: 10px"
                ></single-upload>
            </el-form-item>
            <el-form-item label="分享标题：">
                <el-input v-model="value.shareTitle" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="分享副标题：">
                <el-input v-model="value.shareDesc" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item label="微信群二维码链接：">
                <el-input v-model="value.wxGroupQrUrl" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button size="medium" type="primary" @click="handleSubmit">保存活动</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="选择拼团产品" :visible.sync="productDialogVisible" width="700px" top="10vh">
            <div>
                <el-card class="filter-container" shadow="never" body-style="padding: 15px 0 0">
                    <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
                        <el-form-item label="产品名称：">
                            <el-input
                                v-model="listQuery.keyword"
                                class="input-width"
                                placeholder="产品名称"
                                clearable
                            ></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="handleSearchList()" size="small">查询</el-button>
                    </el-form>
                </el-card>
                <div class="table-container">
                    <el-table :data="productData" style="width: 100%" v-loading="listLoading">
                        <el-table-column prop="id" label="产品编号" width="80"></el-table-column>
                        <el-table-column prop="name" label="产品名称"></el-table-column>
                        <el-table-column label="操作" width="100">
                            <template slot-scope="scope">
                                <el-button
                                    size="mini"
                                    type="primary"
                                    @click="setActivity(scope.$index, scope.row)"
                                >选择产品</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-container">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="listQuery.pageNum"
                        :page-sizes="[5, 10, 20]"
                        :pager-count="5"
                        :page-size="5"
                        background
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
    </el-card>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import {
    syncProductList,
    updateActivity,
    addActivity,
    getActivity
} from "@/api/activity";
import { fetchList as getProductList } from "@/api/product";
import { fetchList as getProductGroup } from "@/api/group";
import { getToken } from "@/utils/auth";
import axios from "axios";
import SingleUpload from "@/components/Upload/singleUpload";
import MultiUpload from "@/components/Upload/multiUpload";
import { formatDate } from "@/utils/date";

const defaultActivityParam = {
    bargainActivityId: null,
    activityName: null, //活动名称
    productDesc: null, //活动内容
    activityStartDate: null, //开始时间
    activityEndDate: null, //结束时间
    activityMoney: null, //活动价格
    activityCriterion: null, //活动标准
    timeOut: null, //支付时限
    activityInfo: null, //富文本详情
    model: 1, //模式 0自动 1手动。默认为1
    productId: null, //产品id
    productStock: null, //已报名
    productStockTotal: null, //商品总库存，期望人数
    joinNum: null, //已报名
    joinCount:null,
    imgs: null,
    shareImgUrl: null,
    shareTitle: null,
    shareDesc: null,
    wxGroupQrUrl: null,
    tripDate: null //出团日期
};

const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    businessType: 1 // businessType 业务类型（1-旅游；2-机票；3-酒店；4-文章）
};

export default {
    name: "ActivityDetail",
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    components: { SingleUpload, MultiUpload, Tinymce },
    data() {
        return {
            value: Object.assign({}, defaultActivityParam),
            listQuery: Object.assign({}, defaultListQuery),
            tripDateOrigin: null,
            total: null,
            productOptions: [],
            productDialogVisible: false,
            listLoading: false,
            productData: [],
            productGroupOptions: [],
            rules: {
                activityName: [
                    {
                        required: true,
                        message: "请选择活动名称",
                        trigger: "blur"
                    }
                ],
                productDesc: [
                    {
                        required: true,
                        message: "请选择活动副标题",
                        trigger: "blur"
                    }
                ],
                activityStartDate: [
                    {
                        required: true,
                        message: "请输入报名开始时间",
                        trigger: "blur"
                    }
                ],
                activityEndDate: [
                    {
                        required: true,
                        message: "请输入报名截止时间",
                        trigger: "blur"
                    }
                ],
                activityMoney: [
                    {
                        required: true,
                        message: "请输入活动价格",
                        trigger: "blur"
                    }
                ],
                activityCriterion: [
                    {
                        required: true,
                        message: "请输入助力人数",
                        trigger: "blur"
                    }
                ],
                timeOut: [
                    {
                        required: true,
                        message: "请输入支付时限",
                        trigger: "blur",
                    },
                ],                
                selectProductPics: [
                    {
                        required: true,
                        message: "请上传活动图片",
                        trigger: "blur"
                    }
                ],
                productId: [
                    {
                        required: true,
                        message: "请选择拼团产品",
                        trigger: "blur"
                    }
                ],
                tripDateOrigin: [
                    {
                        required: true,
                        message: "请选择出团日期",
                        trigger: "blur"
                    }
                ]
            },
        };
    },
    created() {
        this.getProductList();
        if (this.isEdit) {
            let data = {
                activityBargainId: this.$route.query.id
            };
            getActivity(this.$route.query.id, data).then(response => {
                this.value = response.data;
                this.tripDateOrigin = parseInt(this.value.priceIds.slice(1, -1));
                if(this.value.productId) {
                    this.findProductGroup(this.value.productId)
                }
            });
        } 
    },
    computed: {
        selectProductPics: {
            get: function() {
                let pics = [];
                if (this.value.imgs == null || this.value.imgs === "") {
                    return pics;
                }
                let albumPics = this.value.imgs.split(",");
                for (let i = 0; i < albumPics.length; i++) {
                    pics.push(albumPics[i]);
                }
                return pics;
            },
            set: function(newValue) {
                if (newValue == null || newValue.length === 0) {
                    this.value.pic = null;
                    this.value.imgs = null;
                } else {
                    this.value.imgs = "";
                    if (newValue.length > 0) {
                        for (let i = 0; i < newValue.length; i++) {
                            this.value.imgs += newValue[i];
                            if (i !== newValue.length - 1) {
                                this.value.imgs += ",";
                            }
                        }
                    }
                }
            }
        },
        joinNum: {
            get: function() {
                return this.value.productStockTotal - this.value.productStock;
            }
        }
    },
    methods: {
        getProductList() {
            let params = {
                pageNo: 1,
                pageSize: 100
            };
            syncProductList(params).then(response => {
                if (response.data.list.length > 0) {
                    this.productOptions = response.data.list;
                }
            });
        },
        handleSubmit() {
            let reg = /^\d+(\.{0,1}\d+){0,1}$/; //非负数正则
            if(!reg.test(this.value.activityMoney)) {
                this.$message({
                    type: "error",
                    message: "活动价格必须为数字",
                    duration: 3000
                });
                return false;
            }
            if(!reg.test(this.value.timeOut)) {
                this.$message({
                    type: "error",
                    message: "支付时限必须为数字",
                    duration: 3000
                });
                return false;
            }
            if(!reg.test(this.value.activityCriterion)) {
                this.$message({
                    type: "error",
                    message: "助力人数必须为数字",
                    duration: 3000
                });
                return false;
            }
            if(!reg.test(this.value.productStockTotal)) {
                this.$message({
                    type: "error",
                    message: "总库存必须为数字",
                    duration: 3000
                });
                return false;
            }
            if(!reg.test(this.value.joinCount)) {
                this.$message({
                    type: "error",
                    message: "已报名人数必须为数字",
                    duration: 3000
                });
                return false;
            }
            if(this.tripDateOrigin === null) {
                this.$message({
                    type: "error",
                    message: "请选择出团日期",
                    duration: 3000
                });
                return false;
            }
            this.value.priceIds =[this.tripDateOrigin];
            if (this.isEdit) {
                updateActivity(this.value).then(response => {
                    this.$message({
                        type: "success",
                        message: "修改成功",
                        duration: 1000
                    });
                    this.$router.back();
                });
            } else {
                addActivity(this.value).then(response => {
                    this.$message({
                        type: "success",
                        message: "添加成功",
                        duration: 1000
                    });
                    this.$router.back();
                });
            }
        },
        selectProduct() {
            this.productDialogVisible = true;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            getProductList(this.listQuery).then(response => {
                this.listLoading = false;
                if (response.data.list) {
                    this.productData = response.data.list;
                    this.total = response.data.total;
                }
            });
        },
        setActivity(index, row){
            this.productDialogVisible = false;
            this.value.productId = row.id;
            this.value.productName = row.name;
            this.$refs["activityForm"].validateField("productId");
            this.tripDateOrigin = null;
            this.findProductGroup(this.value.productId);
        },
        findProductGroup(productId){
            let nowYear = new Date().getFullYear();
            let nowMonth = (new Date().getMonth() + 1) > 9 ? (new Date().getMonth() + 1):("0" + (new Date().getMonth() + 1));
            getProductGroup({
                productId: productId,
                tripStartDate: nowYear + "-" + nowMonth + "-01",
                tripEndDate: nowYear + "-" + (parseInt(nowMonth) + 3) + "-01",
                pageNum: 1,
                pageSize: 100
            }).then(response => {
                this.productGroupOptions = []
                if(response.data.list){
                    response.data.list.map((item)=>{
                        this.productGroupOptions.push({
                            value: item.id, 
                            label: formatDate(new Date(item.tripTime), "yyyy-MM-dd")
                        });
                    })
                }
            });
        },
        handleCurrentChange(val) {
            this.listQuery.pageNum = val;
            this.getList();
        },
        handleSizeChange(val) {
            this.listQuery.pageNum = 1;
            this.listQuery.pageSize = val;
            this.getList();
        },
        handleSearchList() {
            this.listQuery.pageNum = 1;
            this.getList();
        },
    }
};
</script>

<style>
.activity-container {
    width: 850px;
}
.activity-container .inline-span {
    margin-left: 20px;
}
.activity-container .text-indent-1 {
    text-indent: 1em;
    display: inline-block;
}
.activity-container .text-indent-2 {
    text-indent: 2em;
    display: inline-block;
}
.activity-container .activity-form .el-input {
    width: 200px;
}
.activity-container .activity-form .el-select .el-input {
    width: 200px;
}
.activity-container .activity-form .el-form-item.el-form-item--small{
  margin-bottom: 9px;
}
.activity-container .pagination-container {
    text-align: right;
    display: block;
    float: none;
}
.activity-container .el-dialog__wrapper > div {
    margin-bottom: 10vh;
}
.activity-container .el-dialog__body {
    padding-top: 0;
}
.activity-container .el-form-item.el-form-item--small{
  margin-bottom: 9px;
}
</style>
