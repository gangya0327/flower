<template> 
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="填写酒店信息"></el-step>
      <el-step title="填写酒店详情"></el-step>
      <el-step title="选择酒店关联产品"></el-step>
    </el-steps>
    <hotel-info-detail
      v-show="showStatus[0]"
      v-model="productParam"
      :is-edit="isEdit"
      :is-morefunc="false"
      @nextStep="nextStep">
    </hotel-info-detail>
    <hotel-attr-detail
      v-show="showStatus[1]"
      v-model="productParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      :is-morefunc="false"
      @prevStep="prevStep">
    </hotel-attr-detail>
    <hotel-relation-detail
      v-show="showStatus[2]"
      v-model="productParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      :is-morefunc="false"
      @finishCommit="finishCommit">
    </hotel-relation-detail>
  </el-card>
</template>
<script>
  import HotelInfoDetail from './HotelInfoDetail';
  import HotelAttrDetail from './HotelAttrDetail';
  import HotelRelationDetail from './HotelRelationDetail';
  import {createProduct,getProduct,updateProduct, getRelationProductsById as getRelationListById} from '@/api/product';

  const defaultProductParam = {
    albumPics: '',
    brandId: null,
    brandName: '',
    deleteStatus: 0,
    description: '',
    detailDesc: '',
    detailHtml: '',
    detailMobileHtml: '',
    detailTitle: '',
    feightTemplateId: 0,
    flashPromotionCount: 0,
    flashPromotionId: 0,
    flashPromotionPrice: 0,
    flashPromotionSort: 0,
    giftPoint: 0,
    giftGrowth: 0,
    keywords: '',
    lowStock: 0,
    name: '',
    newStatus: 0,
    note: '',
    originalPrice: 0,
    chargeDetail: '',
    bookTips: '',
    childPrice: 0,
    pic: '',
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [],
    //酒店满减
    productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    //酒店阶梯价格
    productLadderList: [{count: 0,discount: 0,price: 0}],
    previewStatus: 0,
    price: 0,
    productAttributeCategoryId: null,
    //酒店属性相关{productAttributeId: 0, value: ''}
    productAttributeValueList: [],
    //酒店sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
    skuStockList: [],
    //酒店相关专题{subjectId: 0}
    subjectProductRelationList: [],
    //酒店相关优选{prefrenceAreaId: 0}
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCategoryName: '',
    productSn: '',
    promotionEndTime: '',
    promotionPerLimit: 0,
    promotionPrice: null,
    promotionStartTime: '',
    promotionType: 0,
    publishStatus: 0,
    recommandStatus: 0,
    sale: 0,
    serviceIds: '',
    sort: 0,
    stock: 0,
    subTitle: '',
    unit: '',
    usePointLimit: 0,
    verifyStatus: 0,
    weight: 0,
    businessType: 3, // 3-酒店
    tags: null, //产品标签
    narrowImage: null,
    payTime: null //支付时限
  };
  export default {
    name: 'HotelDetail',
    components: {HotelInfoDetail, HotelAttrDetail, HotelRelationDetail},
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
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          // 
          this.productParam=response.data;
          this.$set(this.productParam, 'routeListIds', []);
          this.$set(this.productParam, 'flightListIds', []);
          this.$set(this.productParam, 'hotelListIds', []);
          this.$set(this.productParam, 'travelsListIds', []);
        
          // 获取已关联的产品
          getRelationListById(this.$route.query.id).then(response => {
            if (response.data && JSON.stringify(response.data) != '{}') {
              
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
          })
        });
      } else {
        this.$set(this.productParam, 'routeListIds', []);
        this.$set(this.productParam, 'flightListIds', []);
        this.$set(this.productParam, 'hotelListIds', []);
        this.$set(this.productParam, 'travelsListIds', []);
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
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //处理产品标签的中文逗号
          let tags = this.productParam.tags;
          if (tags && tags.indexOf("，") > 0) {
              this.productParam.tags = tags.replace(/，/g, ",");
          }
          if(isEdit){
            updateProduct(this.$route.query.id,this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            createProduct(this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }
        })
      }
    }
  }
</script>
<style>
  .form-container {
    width: 800px;
  }
</style>


