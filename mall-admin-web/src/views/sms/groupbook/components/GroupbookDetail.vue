<template>
    <el-card class="form-container groupbook-container" shadow="never">
        <el-form
            :model="value"
            ref="activityForm"
            label-width="140px"
            width="1000px"
            size="small"
            :rules="rules"
        >
            <el-form-item label="拼团产品：" prop="productId">
                <template>
                    <div v-if="value.productId===null">
                        <el-button type="primary" @click="selectProduct">选择拼团产品</el-button>
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
            <el-form-item label-width="0">
                 <el-col :span="12">
                    <el-form-item label="选择出发日期：">
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
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="activityStartDate" label="活动开始时间：">
                        <el-date-picker
                            v-model="value.activityStartDate"
                            type="datetime"
                            placeholder="选择日期时间"
                            default-time="12:00:00"
                        ></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="activityEndDate" label="活动结束时间：">
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
                    <el-form-item prop="activityPrice" label="拼团价格：">
                        <el-input v-model="value.activityPrice" type="number">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="buildGroupPeopleNum" label="成团人数：">
                        <el-input v-model="value.buildGroupPeopleNum" type="number" placeholder></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="buildGroupLimitHour" label="成团有效时间：">
                        <el-input v-model="value.buildGroupLimitHour" type="number" >
                            <template slot="append">小时</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item prop="perLimitBookingNum" label="每人限购数量：">
                        <el-input v-model="value.perLimitBookingNum" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label-width="0">
                <el-col :span="12">
                    <el-form-item prop="payTime" label="订单支付时效：">
                        <el-input v-model="value.payTime" type="number">
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="活动图片：" prop="activityImg">
                <multi-upload v-model="selectProductPics"></multi-upload>
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
            <el-form-item label="分享类型：">
                <el-input v-model="value.shareType" style="width:100%"></el-input>
            </el-form-item>

            <el-form-item style="text-align: center">
                <el-button size="medium" type="primary" @click="handleSubmit('activityForm')">保存活动</el-button>
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
                                    @click="setGroupbook(scope.$index, scope.row)"
                                >开启拼团</el-button>
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
import { updateGroupbook, addGroupbook, getGroupbook } from "@/api/groupbook";
import { fetchList as getProductList } from "@/api/product";
import { fetchList as getProductGroup } from "@/api/group";
import { getToken } from "@/utils/auth";
import axios from "axios";
import SingleUpload from "@/components/Upload/singleUpload";
import MultiUpload from "@/components/Upload/multiUpload";
import { formatDate } from "@/utils/date";

const defaultActivityParam = {
    activityEndDate: null, // 活动结束时间
    activityImg: null, // 活动图片
    activityPrice: null, // 拼团价
    activityStartDate: null, // 活动开始时间
    buildGroupLimitHour: null, // 成团有效时间(小时)
    buildGroupPeopleNum: null, // 成团人数
    outOfLimit: null,
    payTime: null, //支付时间
    perLimitBookingNum: null, // 每人限购数量
    productId: null, // 砍价商品ID
    productName: null,
    shareDesc: null, // 分享的描述
    shareImgUrl: null, //分享的图片链接
    shareLink: null, //分享的跳转链接
    shareTitle: null, //分享的标题
    shareType: null //分享的类型
};
const defaultListQuery = {
    keyword: null,
    pageNum: 1,
    pageSize: 5,
    businessType: 1 // businessType 业务类型（1-旅游；2-机票；3-酒店；4-文章）
};

export default {
    name: "GroupbookDetail",
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
            productDialogVisible: false,
            productData: [],
            tripDateOrigin: null,
            productGroupOptions: [],
            total: null,
            listLoading: false,
            rules: {
                productId: [
                    {
                        required: true,
                        message: "请选择拼团产品",
                        trigger: "blur"
                    }
                ],
                activityStartDate: [
                    {
                        required: true,
                        message: "请输入活动开始时间",
                        trigger: "blur"
                    }
                ],
                activityEndDate: [
                    {
                        required: true,
                        message: "请输入活动结束时间",
                        trigger: "blur"
                    }
                ],
                activityPrice: [
                    {
                        required: true,
                        message: "请输入拼团价格",
                        trigger: "blur"
                    }
                ],
                buildGroupPeopleNum: [
                    {
                        required: true,
                        message: "请输入成团人数",
                        trigger: "blur"
                    }
                ],
                buildGroupLimitHour: [
                    {
                        required: true,
                        message: "请输入成团有效时间",
                        trigger: "blur",
                    }
                ],
                perLimitBookingNum: [
                    {
                        required: true,
                        message: "请输入每人限购数量",
                        trigger: "blur"
                    }
                ],
                payTime: [
                    {
                        required: true,
                        message: "请输入订单支付时效",
                        trigger: "blur"
                    }
                ],
                activityImg: [
                    {
                        required: true,
                        message: "请上传活动图片",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        if (this.isEdit) {
            getGroupbook(this.$route.query.id).then(response => {
                this.value = response.data.activity;
                this.tripDateOrigin = parseInt(this.value.priceIds.slice(1, -1));
                if(this.value.productId) {
                    this.findProductGroup(this.value.productId)
                }
            });
            // getActivity(this.$route.query.id, data).then(response => {
            //     this.value = response.data;
            //     this.tripDateOrigin = parseInt(this.value.priceIds.slice(1, -1));
            //     if(this.value.productId) {
            //         this.findProductGroup(this.value.productId)
            //     }
            // });
        }
    },
    filters: {
        businessTypeStr(value) {
            if (value === 1) {
                return "旅游路线";
            }
        }
    },
    computed: {
        selectProductPics: {
            get: function() {
                let pics = [];
                if (
                    this.value.activityImg == null ||
                    this.value.activityImg === ""
                ) {
                    return pics;
                }
                let albumPics = this.value.activityImg.split(",");
                for (let i = 0; i < albumPics.length; i++) {
                    pics.push(albumPics[i]);
                }
                return pics;
            },
            set: function(newValue) {
                if (newValue == null || newValue.length === 0) {
                    this.value.activityImg = null;
                    this.value.activityImg = null;
                } else {
                    this.value.activityImg = "";
                    if (newValue.length > 0) {
                        for (let i = 0; i < newValue.length; i++) {
                            this.value.activityImg += newValue[i];
                            if (i !== newValue.length - 1) {
                                this.value.activityImg += ",";
                            }
                        }
                    }
                    this.$refs["activityForm"].validateField("activityImg");
                }
            }
        }
    },
    methods: {
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
        setGroupbook(index, row) {
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
                    console.log(this.productGroupOptions)
                }
            });
        },
        selectProduct() {
            this.productDialogVisible = true;
            this.getList();
        },
        handleSubmit(formName) {
            if(this.tripDateOrigin === null) {
                this.$message({
                    type: "error",
                    message: "请选择出团日期",
                    duration: 3000
                });
                return false;
            }
            this.value.priceIds =[this.tripDateOrigin];
            console.log(313,this.value)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    //通过校验才可进行新增或修改
                    if (this.isEdit) {
                        updateGroupbook(this.value).then(response => {
                            this.$message({
                                type: "success",
                                message: "修改成功",
                                duration: 1000
                            });
                            this.$router.back();
                        });
                    } else {
                        addGroupbook(this.value).then(response => {
                            this.$message({
                                type: "success",
                                message: "添加成功",
                                duration: 1000
                            });
                            this.$router.back();
                        });
                    }
                } else {
                    this.$message({
                        message: "验证失败",
                        type: "error",
                        duration: 1000
                    });
                    return false;
                }
            });
        }
    }
};
</script>

<style>
.groupbook-container {
    width: 850px;
}
.groupbook-container .inline-span {
    margin-left: 20px;
}
.groupbook-container .text-indent-1 {
    text-indent: 1em;
    display: inline-block;
}
.groupbook-container .text-indent-2 {
    text-indent: 2em;
    display: inline-block;
}
.groupbook-container form .el-input {
    width: 200px;
}
.groupbook-container .pagination-container {
    text-align: right;
    display: block;
    float: none;
}
.groupbook-container .el-dialog__wrapper > div {
    margin-bottom: 10vh;
}
.groupbook-container .el-dialog__body {
    padding-top: 0;
}
.groupbook-container .el-form-item.el-form-item--small{
  margin-bottom: 9px;
}
</style>
