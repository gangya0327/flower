<template>
    <div style="margin-top: 50px">
        <el-form
            :model="value"
            :rules="rules"
            ref="productInfoForm"
            label-width="140px"
            style="width: 600px"
            size="small"
        >
            <el-form-item label="类目：">
                <template>
                    <div v-if="showProductCommonCategoryId">
                        <el-cascader
                            :props="productCateCommonProps"
                            v-model="value.productCommonCategoryId"
                        ></el-cascader>
                    </div>
                    <div v-else>
                        {{value.productCategoryName}}
                        <el-button
                            type="primary"
                            size="mini"
                            @click="showProductCommonCategoryId = true"
                        >修改</el-button>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="产品名称：" prop="name">
                <el-input v-model="value.name"></el-input>
            </el-form-item>
            <el-form-item label="副标题：" prop="subTitle">
                <el-input v-model="value.subTitle"></el-input>
            </el-form-item>
            <el-form-item label="原价：">
                <el-input v-model="value.originalPrice"></el-input>
            </el-form-item>
            <el-form-item label="起售价：">
                <el-input v-model="value.price"></el-input>
            </el-form-item>
            <el-form-item label="产品介绍：">
                <el-input
                    :autoSize="true"
                    v-model="value.description"
                    rows="5"
                    type="textarea"
                    placeholder="请输入内容"
                ></el-input>
            </el-form-item>
            <el-form-item label="产品标签：">
                <el-input v-model="value.tags" placeholder="请用英文逗号 “ , ” 隔开"></el-input>
            </el-form-item>
            <el-form-item label="缩略图：">
                <single-upload v-model="value.narrowImage"></single-upload>
            </el-form-item>

            <el-form-item label="是否上架：">
                <el-switch
                    v-model="value.publishStatus"
                    :active-value="1"
                    :inactive-value="0"
                    style="width: 150px;margin-right: 25px"
                ></el-switch>
                <span>排序：</span>
                <el-input v-model="value.sort" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="喜欢数：">
                <el-input v-model="value.likeNum" style="width: 150px;margin-right: 10px;"></el-input>
                <span>浏览数：</span>
                <el-input v-model="value.watchNum" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center">
                <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    fetchListWithChildren,
    listProductCateCommon
} from "@/api/productCate";
import { getProduct } from "@/api/product";
import SingleUpload from "@/components/Upload/singleUpload";
import MultiUpload from "@/components/Upload/multiUpload";
import Tinymce from "@/components/Tinymce";

var id = 0;

export default {
    name: "FlightInfoDetail",
    components: { SingleUpload, MultiUpload, Tinymce },
    props: {
        value: Object,
        isEdit: {
            type: Boolean,
            default: false
        },
        isMorefunc: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            hasEditCreated: false,
            productCateOptions: [],
            showProductCommonCategoryId: true,
            productCateCommonProps: {
                lazy: true,
                lazyLoad(node, resolve) {
                    var data = null;
                    if (node.value) {
                        data = { id: node.value };
                    }
                    listProductCateCommon(data).then(response => {
                        let optionsData = [];
                        if (response.data.length > 0) {
                            response.data.map(item => {
                                optionsData.push({
                                    value: item.id,
                                    label: item.name,
                                    leaf: !item.hasChild
                                });
                            });
                        }
                        resolve(optionsData);
                    });
                }
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入商品名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                subTitle: [
                    {
                        required: true,
                        message: "请输入商品副标题",
                        trigger: "blur"
                    }
                ],
                description: [
                    {
                        required: true,
                        message: "请输入商品介绍",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    computed: {
        //商品的编号
        productId() {
            return this.value.id;
        },
        travelDay: {
            get: function() {
                if (this.value.dayNight) {
                    let dayNight = this.value.dayNight.split(",");
                    return dayNight[0];
                } else {
                    return null;
                }
            },
            set: function(newValue) {
                if (this.value.dayNight) {
                    let dayNight = this.value.dayNight.split(",");
                    this.value.dayNight = newValue + "," + dayNight[1];
                } else {
                    this.value.dayNight = newValue + ",";
                }
            }
        },
        travelNight: {
            get: function() {
                if (this.value.dayNight) {
                    let dayNight = this.value.dayNight.split(",");
                    return dayNight[1];
                } else {
                    return null;
                }
            },
            set: function(newValue) {
                if (this.value.dayNight) {
                    let dayNight = this.value.dayNight.split(",");
                    this.value.dayNight = dayNight[0] + "," + newValue;
                } else {
                    this.value.dayNight = "," + newValue;
                }
            }
        }
    },
    watch: {
        value: function(newValue) {
            if (newValue.productCommonCategoryId) {
                this.showProductCommonCategoryId = false;
            }
        },
        productId: function(newValue) {
            if (!this.isEdit) return;
            if (this.hasEditCreated) return;
            if (newValue === undefined || newValue == null || newValue === 0)
                return;
        }
    },
    methods: {
        getProductCateList() {
            fetchListWithChildren().then(response => {
                let list = response.data;
                this.productCateOptions = [];
                for (let i = 0; i < list.length; i++) {
                    let children = [];
                    if (
                        list[i].children != null &&
                        list[i].children.length > 0
                    ) {
                        for (let j = 0; j < list[i].children.length; j++) {
                            children.push({
                                label: list[i].children[j].name,
                                value: list[i].children[j].id
                            });
                        }
                    }
                    this.productCateOptions.push({
                        label: list[i].name,
                        value: list[i].id,
                        children: children
                    });
                }
            });
        },
        getCateNameById(id) {
            let name = null;
            for (let i = 0; i < this.productCateOptions.length; i++) {
                for (
                    let j = 0;
                    i < this.productCateOptions[i].children.length;
                    j++
                ) {
                    if (this.productCateOptions[i].children[j].value === id) {
                        name = this.productCateOptions[i].children[j].label;
                        return name;
                    }
                }
            }
            return name;
        },
        handleNext(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$emit("nextStep");
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

<style scoped>
</style>
