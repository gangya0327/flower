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
      <el-form-item label="目的地分类：" prop="productCategoryId">
        <el-cascader v-model="selectProductCateValue" :options="productCateOptions"></el-cascader>
      </el-form-item>
      <el-form-item label="旅游产品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="商品品牌：" prop="brandId" v-if="this.isMorefunc">
        <el-select v-model="value.brandId" @change="handleBrandChange" placeholder="请选择品牌">
          <el-option
            v-for="item in brandOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="旅游类型：" prop="travelType">
        <el-select v-model="value.travelType" placeholder="请选择类型">
          <el-option
            v-for="item in travelTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品介绍：">
        <el-input
          :autoSize="true"
          v-model="value.description"
          type="textarea"
          rows="4"
          placeholder="请输入内容"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品标签：">
        <el-input v-model="value.tags" placeholder="请用英文逗号 “ , ” 隔开"></el-input>
      </el-form-item>
      <el-form-item label="缩略图：">
        <single-upload v-model="value.narrowImage"></single-upload>
      </el-form-item> 
      <el-form-item label="商品货号：" v-if="this.isMorefunc">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="商品售价：">
        <el-input v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="支付时限">
        <el-input v-model="value.payTime">
          <template slot="append">分钟</template>
        </el-input>
      </el-form-item>
      <el-form-item label="出行天数：" prop="dayNight">
        <el-input v-model="travelDay" style="width: 80px;margin-right: 10px"></el-input>天，
        <el-input v-model="travelNight" style="width: 80px;margin-right: 10px"></el-input>夜
      </el-form-item>
      <el-form-item label="儿童价格：">
        <el-input v-model="value.childPrice"></el-input>
      </el-form-item>
      <el-form-item label="市场（划线）价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item> -->
      <el-form-item label="计量单位：" v-if="this.isMorefunc">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：" v-if="this.isMorefunc">
        <el-input v-model="value.weight" style="width: 300px"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item label="喜欢数：">
        <el-input v-model="value.likeNum" style="width: 150px;margin-right: 10px;"></el-input>
        <span>浏览数：</span>
        <el-input v-model="value.watchNum" style="width: 150px;"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="success" size="medium" v-show="!this.isEdit" @click="saveTempProduct">保存已录信息</el-button>
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写商品促销</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchListWithChildren } from "@/api/productCate";
import { fetchList as fetchBrandList } from "@/api/brand";
import SingleUpload from "@/components/Upload/singleUpload";
import { getProduct } from "@/api/product";

export default {
  name: "ProductInfoDetail",
  components: { SingleUpload },
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
      //选中商品分类的值
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      travelTypeOptions: [
        {
          value: 1,
          label: "自由行"
        },
        {
          value: 2,
          label: "跟团游"
        },
        {
          value: 3,
          label: "周边游"
        }
      ],
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur"
          }
        ],
        subTitle: [
          { required: true, message: "请输入商品副标题", trigger: "blur" }
        ],
        dayNight: [
          { required: true, message: "请输入出行天数", trigger: "blur" }
        ],
        productCategoryId: [
          { required: true, message: "请选择商品分类", trigger: "blur" }
        ],
        brandId: [
          { required: true, message: "请选择商品品牌", trigger: "blur" }
        ],
        description: [
          { required: true, message: "请输入商品介绍", trigger: "blur" }
        ],
        requiredProp: [
          { required: true, message: "该项为必填项", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getProductCateList();
    this.getBrandList();
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
    productId: function(newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    selectProductCateValue: function(newValue) {
      if(!this.isEdit){
        window.sessionStorage.selectProductCateValue = JSON.stringify(newValue);
      }
      if (newValue != null && newValue.length === 2) {
        this.value.productCategoryId = newValue[1];
        // this.value.productCategoryName = this.getCateNameById(
        //   this.value.productCategoryId
        // );
      } else {
        this.value.productCategoryId = null;
        this.value.productCategoryName = null;
      }
    }
  },
  methods: {
    //处理编辑逻辑
    handleEditCreated() {
      if (this.value.productCategoryId != null) {
        if(this.value.cateParentId && this.value.productCategoryId){
          this.selectProductCateValue = [this.value.cateParentId, this.value.productCategoryId]
        }
        // this.selectProductCateValue.push(this.value.cateParentId);
        // this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductCateList() {
      fetchListWithChildren().then(response => {
        let list = response.data;
        this.productCateOptions = [];
        for (let i = 0; i < list.length; i++) {
          let children = [];
          if (list[i].children != null && list[i].children.length > 0) {
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
        if(!this.isEdit && window.sessionStorage.selectProductCateValue && window.sessionStorage.tempProduct){
          this.selectProductCateValue = JSON.parse(window.sessionStorage.selectProductCateValue);
        }
        if(this.value.cateParentId && this.value.productCategoryId){
          this.selectProductCateValue = [this.value.cateParentId, this.value.productCategoryId]
        }
      });
    },
    getBrandList() {
      fetchBrandList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.brandOptions = [];
        let brandList = response.data.list;
        for (let i = 0; i < brandList.length; i++) {
          this.brandOptions.push({
            label: brandList[i].name,
            value: brandList[i].id
          });
        }
      });
    },
    getCateNameById(id) {
      let name = null;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; i < this.productCateOptions[i].children.length; j++) {
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
    },
    handleBrandChange(val) {
      let brandName = "";
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].value === val) {
          brandName = this.brandOptions[i].label;
          break;
        }
      }
      this.value.brandName = brandName;
    },
    saveTempProduct(){
      this.$message({
        type: "success",
        message: "已保存当前录入信息",
        duration: 1000
      });
      window.sessionStorage.tempProduct = JSON.stringify(this.value);
    }
  }
};
</script>

<style scoped>
</style>
