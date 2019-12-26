<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写机票信息"></el-step>
      <el-step title="填写机票信息"></el-step>
      <el-step title="填写机票详情"></el-step>
      <el-step title="选择关联产品"></el-step>
    </el-steps>
    <flight-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      :is-morefunc="false"
      @nextStep="nextStep"
    ></flight-info-detail>
    <flight-content-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      :is-morefunc="false"
      @prevStep="prevStep"
    ></flight-content-detail>
    <flight-attr-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      :is-morefunc="false"
      @prevStep="prevStep"
    ></flight-attr-detail>
    <flight-relation-detail
      v-show="showStatus[3]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      :is-morefunc="false"
      @finishCommit="finishCommit"
    ></flight-relation-detail>
  </el-card>
</template>
<script>
import FlightInfoDetail from "./FlightInfoDetail";
import FlightContentDetail from "./FlightContentDetail";
import FlightAttrDetail from "./FlightAttrDetail";
import FlightRelationDetail from "./FlightRelationDetail";
import {
  updateProduct,
  getRelationProductsById as getRelationListById
} from "@/api/product";
import { createFlight, updateFlight, getFlight } from "@/api/flight";

const no_use_data = {
  address: "string",
  checkTime: "string",
  deleteStatus: 0,
  flightId: 0,
  foodService: "string",
  geoPosition: "string",
  id: 0,
  moduleId: "string",
  other: "string",
  park: "string",
  pmsProductRelationList: [
    {
      businessType: "string",
      id: 0,
      productId: 0,
      slaveProductId: 0
    }
  ],
  productId: 0,
  returnFlightType: "string",
  returnIsTransfer: "string",
  roomType: "string",
  scenicSpot: "string",
  sort: 0,
  starRated: "string",
  stockLimitp: "string",
  trafficInformation: "string",
  travelType: "string"
};

const defaultProductParam = {
  albumPics: "",
  baggageAllowance: "", //行李限额
  bookTips: "",
  brandId: null,
  brandName: "",
  businessType: 2,
  childPrice: 0,
  chargeDetail: "",
  dayNight: null,
  deleteStatus: 0,
  description: "",
  detailDesc: "",
  detailHtml: "",
  detailMobileHtml: "",
  detailTitle: "",
  // feightTemplateId: 0,
  // flashPromotionCount: 0,
  // flashPromotionId: 0,
  // flashPromotionPrice: 0,
  // flashPromotionSort: 0,
  // giftPoint: 0,
  // giftGrowth: 0,
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
  weight: 0,
  watchNum: null, //浏览数
  shippingSpace: "", //舱位

  tripFlightNumber: null, //去程航班编号
  tripAirlineCompany: null, //去程航班公司
  tripDepartureCityName: null, //去程出发城市
  tripDepartureAirportName: null, //去程出发机场
  tripDepartureTerminal: null, //去程出发航站楼
  tripDestinationCityName: null, //去程到达城市
  tripDestinationAirportName: null, //去程到达机场
  tripDestinationTerminal: null, //去程到达航站楼
  tripPlaneType: null, //去程机型
  tripDepartureTime: null, //去程出发时间
  tripDestinationTime: null, //去程到达时间
  tripFlightType: null, //去程订单航程类型 1-单程；2-往返；3-联程
  tripIsTransfer: null, //去程是否中转：1-直飞；2-中转
  tripCostTime: null, //去程历时

  returnFlightNumber: null, //返程航班编号
  returnAirlineCompany: null, //返程航班公司
  returnDepartureCityName: null, //返程出发城市
  returnDepartureAirportName: null, //返程出发机场
  returnDepartureTerminal: null, //返程出发航站楼
  returnDestinationCityName: null, //返程到达城市
  returnDestinationAirportName: null, //返程到达机场
  returnDestinationTerminal: null, //返程到达航站楼
  returnPlaneType: null, //返程机型

  returnDepartureTime: null, //返程出发时间*
  returnDestinationTime: null, //返程到达时间*
  returnCostTime: null, //返程历时*
  baggageAllowance: null, //行李额说明
  tags: null, //产品标签
  narrowImage: null,
  payTime: null //支付时限
};
export default {
  name: "FlightDetail",
  components: {
    FlightInfoDetail,
    FlightContentDetail,
    FlightAttrDetail,
    FlightRelationDetail
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
      showStatus: [true, false, false, false]
    };
  },
  created() {
    if (this.isEdit) {
      getFlight(this.$route.query.id).then(response => {
        this.productParam = response.data;
        this.$set(this.productParam, "routeListIds", []);
        this.$set(this.productParam, "flightListIds", []);
        this.$set(this.productParam, "hotelListIds", []);
        this.$set(this.productParam, "travelsListIds", []);

        // 获取已关联的产品
        getRelationListById(this.$route.query.id).then(response => {
          if (response.data && JSON.stringify(response.data) != "{}") {
            for (const key in response.data) {
              let list = response.data[key];
              // debugger;
              if (key == 1) {
                // 旅游产品
                for (let i = 0; i < list.length; i++) {
                  this.productParam.routeListIds.push({
                    label: list[i].name,
                    key: list[i].slaveProductId,
                    slaveProductId: list[i].slaveProductId
                  });
                }
              } else if (key == 2) {
                // 机票
                for (let i = 0; i < list.length; i++) {
                  this.productParam.flightListIds.push({
                    label: list[i].name,
                    key: list[i].slaveProductId,
                    slaveProductId: list[i].slaveProductId
                  });
                }
              } else if (key == 3) {
                for (let i = 0; i < list.length; i++) {
                  this.productParam.hotelListIds.push({
                    label: list[i].name,
                    key: list[i].slaveProductId,
                    slaveProductId: list[i].slaveProductId
                  });
                }
              } else if (key == 4) {
                for (let i = 0; i < list.length; i++) {
                  this.productParam.travelsListIds.push({
                    label: list[i].name,
                    key: list[i].slaveProductId,
                    slaveProductId: list[i].slaveProductId
                  });
                }
              }
            }
          }
        });
      });
    } else {
      this.$set(this.productParam, "routeListIds", []);
      this.$set(this.productParam, "flightListIds", []);
      this.$set(this.productParam, "hotelListIds", []);
      this.$set(this.productParam, "travelsListIds", []);
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
        if (isEdit) {
          updateFlight(this.productParam).then(
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
          createFlight(this.productParam).then(response => {
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
  width: 850px;
}
</style>


