<template>
    <el-card class="form-container" shadow="never">
        <el-form
            :model="homeAdvertise"
            :rules="rules"
            ref="homeAdvertiseFrom"
            label-width="150px"
            size="small"
        >
            <el-form-item label="广告名称：" prop="name">
                <el-input v-model="homeAdvertise.name" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告位置：">
                <el-select v-model="homeAdvertise.type">
                    <el-option
                        v-for="type in typeOptions"
                        :key="type.value"
                        :label="type.label"
                        :value="type.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="开始时间：" prop="startTime">
                <el-date-picker
                    type="datetime"
                    placeholder="选择日期"
                    v-model="homeAdvertise.startTime"
                ></el-date-picker>
            </el-form-item>
            <el-form-item label="到期时间：" prop="endTime">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="homeAdvertise.endTime"></el-date-picker>
            </el-form-item>
            <el-form-item label="上线/下线：">
                <el-radio-group v-model="homeAdvertise.status">
                    <el-radio :label="0">下线</el-radio>
                    <el-radio :label="1">上线</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="广告图片：">
                <single-upload v-model="homeAdvertise.pic"></single-upload>
            </el-form-item>
            <el-form-item label="排序：">
                <el-input v-model="homeAdvertise.sort" class="input-width"></el-input>
            </el-form-item>
            <el-form-item label="广告链接：" prop="url">
                <el-input v-model="homeAdvertise.url" class="input-width"></el-input>
                <el-collapse class="banner-url-info">
                    <el-collapse-item>
                        <template slot="title">
                            链接格式说明 &nbsp;
                            <i class="header-icon el-icon-info"></i>
                        </template>
                        <div class="banner-url-format">
                            <div>
                                <span>旅游产品：</span>
                                <span>http://ykb.flybytrip.com/trip?id=</span>
                            </div>
                            <div>
                                <span>机票产品：</span>
                                <span>http://ykb.flybytrip.com/flightDetail?id=</span>
                            </div>
                            <div>
                                <span>酒店产品：</span>
                                <span>http://ykb.flybytrip.com/hotelDetail?id=</span>
                            </div>
                            <div>
                                <span>文章产品：</span>
                                <span>http://ykb.flybytrip.com/articleDetail?id=</span>
                            </div>
                            <div>
                                <span>首页目的地：</span>
                                <span>http://ykb.flybytrip.com/hot?productCategoryId=</span>
                            </div>
                            <div>
                                <span>首页专题：</span>
                                <span>http://ykb.flybytrip.com/special?productCategoryId=</span>
                            </div>
                            <div>
                                <span>砍价活动：</span>
                                <span>http://ykb.flybytrip.com/huodong?id=</span>
                            </div>
                            <div>
                                <span>拼团活动：</span>
                                <span>http://ykb.flybytrip.com/assemble?id=</span>
                            </div>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </el-form-item>
            <el-form-item label="广告备注：">
                <el-input
                    class="input-width"
                    type="textarea"
                    :rows="5"
                    placeholder="请输入内容"
                    v-model="homeAdvertise.note"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('homeAdvertiseFrom')">提交</el-button>
                <el-button v-if="!isEdit" @click="resetForm('homeAdvertiseFrom')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
import {
    createHomeAdvertise,
    getHomeAdvertise,
    updateHomeAdvertise
} from "@/api/homeAdvertise";
const defaultTypeOptions = [
    { label: "PC首页轮播图片", value: 0 },
    { label: "H5首页轮播图片", value: 1 },
    { label: "H5首页分类下侧图片", value: 2 },
    { label: "H5文章首页轮播图片", value: 3 },
    { label: "H5酒店首页轮播图片", value: 4 },
    { label: "H5旅游首页轮播图片", value: 5 }
];
const defaultHomeAdvertise = {
    name: null,
    type: 1,
    pic: null,
    startTime: null,
    endTime: null,
    status: 0,
    url: null,
    note: null,
    sort: 0
};
export default {
    name: "HomeAdvertiseDetail",
    components: { SingleUpload },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            homeAdvertise: {},
            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入广告名称",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 140,
                        message: "长度在 2 到 140 个字符",
                        trigger: "blur"
                    }
                ],
                url: [
                    {
                        required: true,
                        message: "请输入广告链接",
                        trigger: "blur"
                    }
                ],
                startTime: [
                    {
                        required: true,
                        message: "请选择开始时间",
                        trigger: "blur"
                    }
                ],
                endTime: [
                    {
                        required: true,
                        message: "请选择到期时间",
                        trigger: "blur"
                    }
                ],
                pic: [
                    {
                        required: true,
                        message: "请选择广告图片",
                        trigger: "blur"
                    }
                ]
            },
            typeOptions: Object.assign({}, defaultTypeOptions),
            urlTypeOptions: [
                { value: 1, label: "旅游路线" },
                { value: 2, label: "特价机票" },
                { value: 3, label: "酒店住宿" },
                { value: 4, label: "游记攻略" },
                { value: 5, label: "目的地" },
                { value: 6, label: "专题" },
                { value: 7, label: "活动" }
            ],
            urlType: null,
            urlTypeId: null
        };
    },
    created() {
        if (this.isEdit) {
            getHomeAdvertise(this.$route.query.id).then(response => {
                this.homeAdvertise = response.data;
            });
        } else {
            this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
        }
    },
    methods: {
        onSubmit(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.$confirm("是否提交数据", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }).then(() => {
                        if (this.isEdit) {
                            updateHomeAdvertise(
                                this.$route.query.id,
                                this.homeAdvertise
                            ).then(response => {
                                this.$refs[formName].resetFields();
                                this.$message({
                                    message: "修改成功",
                                    type: "success",
                                    duration: 1000
                                });
                                this.$router.back();
                            });
                        } else {
                            createHomeAdvertise(this.homeAdvertise).then(
                                response => {
                                    this.$refs[formName].resetFields();
                                    this.homeAdvertise = Object.assign(
                                        {},
                                        defaultHomeAdvertise
                                    );
                                    this.$message({
                                        message: "提交成功",
                                        type: "success",
                                        duration: 1000
                                    });
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
            this.homeAdvertise = Object.assign({}, defaultHomeAdvertise);
        }
    }
};
</script>
<style scoped>
.banner-url-format {
    line-height: 18px;
    font-size: 14px;
    margin: 5px 0 0;
    color: #e88f30;
}
.banner-url-format div span:first-child {
    width: 70px;
    display: inline-block;
}
.banner-url-info {
    border: none;
}
</style>


