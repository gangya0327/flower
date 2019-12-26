<template>
    <el-card class="form-container" shadow="never">
        <el-form :model="productCate" :rules="rules" ref="productCateFrom" label-width="150px">
            <el-form-item label="类目名称：" prop="name">
                <el-input v-model="productCate.name"></el-input>
            </el-form-item>
            <!-- <el-form-item label="上级分类：">
                <el-select v-model="productCate.parentId" placeholder="请选择分类">
                    <el-option
                        v-for="item in selectProductCateList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>-->
            <el-form-item label="排序：">
                <el-input v-model="productCate.sort"></el-input>
            </el-form-item>
            <!-- <el-form-item label="是否显示：">
        <el-radio-group v-model="productCate.showStatus">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
            </el-form-item>-->
            <el-form-item label="首页分类图标：">
                <single-upload v-model="productCate.icon"></single-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('productCateFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('productCateFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
import {
    fetchList,
    createProductCate,
    updateProductCate,
    getProductCate
} from "@/api/productCate";
import {
    listProductCateCommon,
    createProductCateCommon,
    getProductCateCommon,
    updateProductCateCommon
} from "@/api/productCate";
import { fetchListWithAttr } from "@/api/productAttrCate";
import SingleUpload from "@/components/Upload/singleUpload";

const defaultProductCate = {
    icon: "", //首页小图标
    name: "",
    parentId: null,
    sort: 0,
    id: null,
    parentIds: null
};
export default {
    name: "ProductCateDetail",
    components: { SingleUpload },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            productCate: Object.assign({}, defaultProductCate),
            selectProductCateList: [],
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入类目名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {
        if (this.isEdit) {
            getProductCateCommon(this.$route.query.id).then(response => {
                this.productCate = response.data;
            });
        } else {
            this.productCate = Object.assign({}, defaultProductCate);
            if (this.$route.query.parentId) {
                getProductCateCommon(this.$route.query.parentId).then(
                    response => {
                        let parent = response.data;
                        if (parent.parentIds) {
                            this.productCate.parentIds =
                                parent.parentIds +
                                "," +
                                this.$route.query.parentId;
                        } else {
                            this.productCate.parentIds = this.$route.query.parentId;
                        }
                    }
                );
            }
        }
        this.getSelectProductCateList();
    },
    methods: {
        getSelectProductCateList() {
            this.productCate.parentId = this.$route.query.parentId
                ? this.$route.query.parentId
                : null;
            // if (this.$route.query.parentId) {
            //     listProductCateCommon({ id: this.$route.query.parentId }).then(
            //         response => {
            //             //this.selectProductCateList = response.data;
            //             this.selectProductCateList.unshift({
            //                 id: this.$route.query.parentId,
            //                 name: "同级分类"
            //             });
            //         }
            //     );
            // } else {
            //     listProductCateCommon().then(response => {
            //         //this.selectProductCateList = response.data;
            //         this.selectProductCateList.unshift({
            //             id: null,
            //             name: "无上级分类"
            //         });
            //     });
            // }
        },
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否提交数据", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        if (this.isEdit) {
                            updateProductCateCommon(
                                this.$route.query.id,
                                this.productCate
                            ).then(response => {
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                    duration: 1000
                                });
                                this.$router.back();
                            });
                        } else {
                            createProductCateCommon(this.productCate).then(
                                response => {
                                    this.$refs[formName].resetFields();
                                    this.resetForm(formName);
                                    this.$message({
                                        message: "提交成功",
                                        type: "success",
                                        duration: 1000
                                    });
                                    this.$router.back();
                                }
                            );
                        }
                    });
                } else {
                    this.$message({
                        message: "验证失败",
                        type: "error",
                        duration: 1000
                    });
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.productCate = Object.assign({}, defaultProductCate);
            this.getSelectProductCateList();
        }
    }
};
</script>

<style scoped>
</style>
