<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      :rules="rules"
      ref="productInfoForm"
      label-width="120px"
      style="width: 800px"
      size="small"
    >
      <el-form-item label="机票：" prop="productId">
        <el-select v-model="value.productId" placeholder="请选择机票" style="width: 300px">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="航班编号：" prop="flightNumber">
        <el-input v-model="value.flightNumber" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="航空公司：">
        <el-input v-model="value.airlineCompany" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="库存量：" prop="stockLimit">
        <el-radio-group v-model="value.stockLimit" @change="handleStockLimit">
          <el-radio :label="0">有限</el-radio>
          <el-input
            v-model="value.stock"
            style="width: 60px;margin-right: 30px;"
            @focus="handleStockInput"
          ></el-input>
          <el-radio :label="1">不限（各班期平均库存量）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="机型：">
        <el-input v-model="value.planeType" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="出发机场：">
        <el-input v-model="value.departureAirportName" style="width: 200px;margin-right: 20px;"></el-input>
        <span>到达机场：</span>
        <el-input v-model="value.destinationAirportName" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="出发城市：">
        <el-input v-model="value.departureCityName" style="width: 200px;margin-right: 20px;"></el-input>
        <span>到达城市：</span>
        <el-input v-model="value.destinationCityName" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="出发航站楼：">
        <el-input v-model="value.departureTerminal" style="width: 200px;margin-right: 20px;"></el-input>
        <span>到达航站楼：</span>
        <el-input v-model="value.destinationTerminal" style="width: 200px"></el-input>
      </el-form-item>
      <el-form-item label="出发时间：">
        <el-time-picker
          v-model="value.departureTime"
          format="HH:mm"
          :editable="false"
          style="width: 200px;margin-right: 20px;"
        ></el-time-picker>
        <span>到达时间：</span>
        <el-time-picker
          v-model="value.destinationTime"
          format="HH:mm"
          :editable="false"
          style="width: 200px"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="选择机票日期：">
        <el-date-picker
          type="dates"
          v-model="dateList"
          value-format="yyyy-MM-dd"
          placeholder="选择一个或多个日期"
          style="width: 500px"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="已选机票日期：">
        <div style="width: 520px;">{{dateList | formatDateList}}</div>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchProductList } from "@/api/group";
import { formatDate } from "@/utils/date";

/**
deleteStatus (string, optional): 是否为删除状态（0 - 否，1 - 是） ,
flightDate (string, optional): 销售航班日期格式：yyyy-MM-dd,多日期用,分隔 ,
priceList (Array[航班价格], optional): 价格列表 ,
status (string, optional): 状态（0 -待发布，1 - 已上架，2 - 已下架） ,
 */

export default {
  name: "FlightgroupInfoDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      productName: null,
      productOptions: [],
      rules: {
        flightNumber: [
          { required: true, message: "请输入航班编号", trigger: "blur" }
        ],
        productId: [{ required: true, message: "请选择机票", trigger: "blur" }],
        stockLimit: [
          { required: true, message: "请选择库存量", trigger: "blur" }
        ],
        date: [{ required: true, message: "请选择出团日期", trigger: "blur" }],
        flightDate: [
          { required: true, message: "请选择出团日期", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getProductList();
  },
  computed: {
    dateList: {
      get: function() {
        if (this.value.flightDate) {
          return this.value.flightDate.split(",");
        } else {
          return null;
        }
      },
      set: function(newValue) {
        this.value.flightDate = newValue.join();
      }
    }
  },
  watch: {},
  filters: {
    formatDateList(value) {
      if (value) {
        return value.join("，");
      } else {
        return null;
      }
    }
  },
  methods: {
    getProductList() {
      fetchProductList({ pageNum: 1, pageSize: 100, businessType: 2 }).then(
        response => {
          this.productOptions = [];
          let productList = response.data;
          for (let i = 0; i < productList.length; i++) {
            this.productOptions.push({
              label: productList[i].name,
              value: productList[i].id
            });
          }
        }
      );
    },
    handleStockInput() {
      this.value.stockLimit = 0;
    },
    handleStockLimit() {
      this.value.stock = null;
    },
    handlePrev() {
      this.$emit("prevStep");
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
