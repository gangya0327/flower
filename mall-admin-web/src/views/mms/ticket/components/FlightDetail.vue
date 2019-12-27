<template>
    <el-card class="form-container" shadow="never">
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="填写商品信息"></el-step>
            <el-step title="填写商品信息"></el-step>
            <el-step title="填写规格明细"></el-step>
        </el-steps>
        <flight-info-detail
            v-show="showStatus[0]"
            v-model="productParam"
            :is-edit="isEdit"
            :is-morefunc="false"
            @nextStep="nextStep"
        ></flight-info-detail>
        <!-- <flight-content-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      :is-morefunc="false"
      @prevStep="prevStep"
        ></flight-content-detail>-->
        <flight-attr-detail
            v-show="showStatus[1]"
            v-model="productParam"
            :is-edit="isEdit"
            @nextStep="nextStep"
            :is-morefunc="false"
            @prevStep="prevStep"
        ></flight-attr-detail>
        <flight-sku-detail
            v-show="showStatus[2]"
            v-model="productParam"
            :is-edit="isEdit"
            @prevStep="prevStep"
            :is-morefunc="false"
            @finishCommit="finishCommit"
        ></flight-sku-detail>
    </el-card>
</template>
<script>
import FlightInfoDetail from "./FlightInfoDetail";
// import FlightContentDetail from "./FlightContentDetail";
import FlightAttrDetail from "./FlightAttrDetail";
import FlightSkuDetail from "./FlightSkuDetail";
import { updateProduct, createProduct, getProduct } from "@/api/product";
import { getProductCateCommon } from "@/api/productCate";

const defaultProductParam = {
    albumPics: "",
    bookTips: "",
    brandId: null,
    brandName: "",
    businessType: 5, //1-旅游 2-机票 3-酒店 4-游记 5-门票 6-普通
    childPrice: 0,
    chargeDetail: "",
    dayNight: null,
    deleteStatus: 0,
    description: "",
    detailDesc: "",
    detailHtml: "",
    detailMobileHtml: "",
    detailTitle: "",
    keywords: "",
    lowStock: 0,
    likeNum: null, //喜欢数
    name: "",
    newStatus: 0,
    note: "",
    originalPrice: 0,
    pic: "", //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [], //商品满减
    productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }], //商品阶梯价格
    productLadderList: [{ count: 0, discount: 0, price: 0 }],
    previewStatus: 0,
    price: 0,
    productAttributeCategoryId: null, //商品属性相关{productAttributeId: 0, value: ''}
    productAttributeValueList: [], //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
    skuStockList: [], //商品相关专题{subjectId: 0}
    subjectProductRelationList: [], //商品相关优选{prefrenceAreaId: 0}
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCommonCategoryId: null, //普通商品的类目
    productCategoryName: "",
    productSn: "",
    promotionEndTime: "",
    promotionPerLimit: 0,
    promotionPrice: null,
    promotionStartTime: "",
    promotionType: 0,
    publishStatus: 0,
    recommandStatus: 0,
    sale: 0,
    serviceIds: "",
    sort: 0,
    stock: 0,
    subTitle: "",
    unit: "",
    usePointLimit: 0,
    verifyStatus: 0,
    watchNum: null, //浏览数
    tags: null, //产品标签
    narrowImage: null,
    skuAttr: [],
    skuList: []
};
export default {
    name: "FlightDetail",
    components: {
        FlightInfoDetail,
        // FlightContentDetail,
        FlightAttrDetail,
        FlightSkuDetail
    },
    props: {
        isEdit: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: 0,
            productParam: Object.assign({}, defaultProductParam),
            showStatus: [true, false, false]
        };
    },
    created() {
        if (this.isEdit) {
            getProduct(this.$route.query.id).then(response => {
                this.productParam = response.data;
                // if (this.productParam.skuList.length !== 0) {
                //     this.productParam.skuList.map(item => {
                //         console.log(item.spec);
                //     });
                // }
                this.productParam.skuAttr = JSON.parse(
                    this.productParam.skuAttr
                );
                getProductCateCommon(
                    this.productParam.productCommonCategoryId
                ).then(response => {
                    if (response.data) {
                        this.productParam.productCategoryName =
                            response.data.name;
                    }
                });
            });
        }else{
            this.productParam.skuAttr = []
        }
    },
    methods: {
        hideAll() {
            for (let i = 0; i < this.showStatus.length; i++) {
                this.showStatus[i] = false;
            }
        },
        prevStep() {
            if (this.active > 0 && this.active < this.showStatus.length) {
                this.active--;
                this.hideAll();
                this.showStatus[this.active] = true;
            }
        },
        nextStep() {
            if (this.active < this.showStatus.length - 1) {
                this.active++;
                this.hideAll();
                this.showStatus[this.active] = true;
            }
        },
        finishCommit(isEdit) {
            // let skuAttrOrigin = {
            //     日期: ["2019-08-07", "2019-08-08"],
            //     类型: ["成人票", "儿童票"]
            // };
            // this.productParam.skuList = [
            //     //[{"日期":"2019-08-07","类型":"成人票"}, 3, 2, 19],
            //     {
            //         spec: '{"日期":"2019-08-07","类型":"成人票"}',
            //         stock: 3,
            //         price: 2,
            //         productId: 19
            //     },
            //     {
            //         spec: '{"日期":"2019-08-08","类型":"儿童票"}',
            //         stock: 3,
            //         price: 2,
            //         productId: 19
            //     },
            //     {
            //         spec: '{"日期":"2019-08-07","类型":"儿童票"}',
            //         stock: 3,
            //         price: 2,
            //         productId: 19
            //     },
            //     {
            //         spec: '{"日期":"2019-08-08","类型":"成人票"}',
            //         stock: 3,
            //         price: 2,
            //         productId: 19
            //     }
            // ];

            // 修改productCommonCategoryId值
            if (this.productParam.productCommonCategoryId === null) {
                this.$message({
                    type: "error",
                    message: "请选择类目",
                    duration: 1000
                });
                return false;
            }
            this.productParam.productCommonCategoryId = this.productParam.productCommonCategoryId[
                this.productParam.productCommonCategoryId.length - 1
            ];
            this.$confirm("是否要提交该产品", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                //处理产品标签的中文逗号
                let tags = this.productParam.tags;
                if (tags && tags.indexOf("，") > 0) {
                    this.productParam.tags = tags.replace(/，/g, ",");
                }
                let productData = {};
                Object.assign(productData, this.productParam);
                productData.skuAttr = JSON.stringify(productData.skuAttr);
                if (isEdit) {
                    updateProduct(this.productParam.id, productData).then(
                        response => {
                            this.$message({
                                type: "success",
                                message: "提交成功",
                                duration: 1000
                            });
                            this.$router.back();
                        }
                    );
                } else {
                    createProduct(productData).then(response => {
                        this.$message({
                            type: "success",
                            message: "提交成功",
                            duration: 1000
                        });
                        this.$router.back();
                    });
                }
            });
        }
    }
};
</script>
<style>
.form-container {
    width: 1200px;
}
</style>


