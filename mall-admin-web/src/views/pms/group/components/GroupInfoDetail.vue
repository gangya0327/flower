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
      <el-form-item label="旅游产品：" prop="productId">
        <el-select v-model="value.productId" placeholder="请选择旅游产品" style="width: 300px" @change="getSelectedProductGroup">
          <el-option
            v-for="item in productOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="团队主名称：" prop="name">
        <el-input v-model="value.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="团队子名称：">
        <el-input v-model="value.secondName" style="width: 300px"></el-input>（例：1号车，2号车）
      </el-form-item>
      <!-- <el-form-item label="库存量：" prop="stockLimit">
        <el-radio-group v-model="value.stockLimit" @change="handleStockLimit">
          <el-radio :label="0">有限</el-radio>
          <el-input
            v-model="value.stock"
            style="width: 60px;margin-right: 30px;"
            @focus="handleStockInput"
          ></el-input>
          <el-radio :label="1">不限（各班期平均库存量）</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <el-form-item label="最小成团人数：" prop="minPeople">
        <el-input v-model="value.minPeople" style="width: 60px"></el-input>
      </el-form-item>
      <!-- <el-form-item label="出团集合时间：">
        <el-time-picker
          v-model="value.collectionTime"
          format="HH:mm"
          :editable="false"
          style="width: 100px"
        ></el-time-picker>
      </el-form-item> -->
      <el-form-item label="报名截止时间：" prop="enrollEndTime">
        <el-select v-model="value.enrollEndDay" placeholder="请选择" style="width: 100px">
          <el-option
            v-for="item in enrollEndDayOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="padding: 0 10px 0 5px">天</span>
        <el-time-picker
          v-model="value.enrollEndTime"
          format="HH 时 mm 分"
          :editable="false"
          style="width: 130px"
        ></el-time-picker>
        <div>
          <el-checkbox v-model="enrollInWeekend">周末计算在内</el-checkbox>
        </div>
        <div
          style="color: red;line-height: 20px;font-size: 12px;"
        >例：若设置0天15时30分，即报名截止时间为出团当天的15:30；若设置为1天16时0分，即报名截止时间为出团前一天的16:00。</div>
      </el-form-item>
      <!-- <el-form-item label="行程结束时间：">
        <el-time-picker
          v-model="value.tripEndTime"
          format="HH:mm"
          :editable="false"
          style="width: 100px"
        ></el-time-picker>
      </el-form-item> -->
      <el-form-item label="选择开团日期：" prop="collectionDate" v-if="isEdit">
        <el-date-picker
          type="date"
          v-model="collectionDate"
          placeholder="选择一个日期"
          style="width: 500px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="选择开团日期：" prop="date" v-if="!isEdit">
        <el-date-picker
          type="dates"
          v-model="value.date"
          placeholder="选择一个或多个日期"
          style="width: 500px;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" size="medium" @click="handleNext('productInfoForm')">下一步，填写出团信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchProductList } from "@/api/group";
import { fetchList as getProductGroup } from "@/api/group";
import { getProduct } from "@/api/product";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
    pageNum: 1,
    pageSize: 999,
    businessType: 1 // businessType 业务类型（1-旅游；2-机票；3-酒店；4-文章）
};

export default {
  name: "GroupInfoDetail",
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
      listQuery: Object.assign({}, defaultListQuery),
      productOptions: [],
      enrollEndDayOptions: [
        { value: "0", label: "0" },
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" }
      ],
      rules: {
        name: [{ required: true, message: "请输入班期名称", trigger: "blur" }],
        productId: [
          { required: true, message: "请选择旅游产品", trigger: "blur" }
        ],
        stockLimit: [
          { required: true, message: "请选择库存量", trigger: "blur" }
        ],
        minPeople: [
          { required: true, message: "请填写最小成团人数", trigger: "blur" }
        ],
        enrollEndTime: [
          { required: true, message: "请填写报名截止时间", trigger: "blur" }
        ],
        date: [
          { required: true, message: "请选择出团日期", trigger: "blur" }
        ]
      },
      groupData: []
    };
  },
  created() {
    this.getProductList();
    this.getSelectedProductGroup(this.$route.query.pid);
  },
  computed: {
    enrollInWeekend: {
      get: function() {
        if (this.value.enrollInWeekend) return true;
        else return false;
      },
      set: function(newValue) {
        if (newValue) this.value.enrollInWeekend = 1;
        else this.value.enrollInWeekend = 0;
      }
    },
    collectionDate: {
      get: function() {
        let date = new Date(this.value.collectionTime);
        return formatDate(date, "yyyy-MM-dd");
      },
      set: function(newValue) {
        let time = formatDate(new Date(this.value.collectionTime), "hh:mm");
        let date = formatDate(newValue, "yyyy-MM-dd");
        let newCollectionTime = date + " " + time;
        this.value.collectionTimeParam = newCollectionTime;
        this.value.collectionTime = new Date("" + newCollectionTime);
      }
    }
  },
  watch: {},
  methods: {
    getProductList() {
      fetchProductList({ pageNum: 1, pageSize: 100 }).then(response => {
        this.productOptions = [];
        let productList = response.data;
        for (let i = 0; i < productList.length; i++) {
          this.productOptions.push({
            label: productList[i].name,
            value: productList[i].id
          });
        }
      });
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
      let noSameDate = false
      if(this.groupData.length > 0) {
        let dates = this.value.date;
        if(this.isEdit) {
          dates = [new Date(this.value.collectionTime)]
        }
        dates.map((dateItem) => {
          this.groupData.map((groupDateItem) => {
            if(groupDateItem.getTime() === dateItem.getTime()) {
              if( (formatDate(groupDateItem, "yyyy-MM-dd") !== formatDate(new Date(this.value.date), "yyyy-MM-dd")) && this.isEdit ) {
                noSameDate = true
                this.$message({
                  message: formatDate(groupDateItem, "yyyy-MM-dd") + "日已有开团",
                  type: "error",
                  duration: 3000
                });
              }else if(!this.isEdit) {
                 noSameDate = true
                this.$message({
                  message: formatDate(groupDateItem, "yyyy-MM-dd") + "日已有开团",
                  type: "error",
                  duration: 3000
                });
              }
            }
          })
        })
      }
      if(noSameDate) {
        return false;
      }
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
    //根据产品id查询对应开班日期
    getSelectedProductGroup(val) {
      this.listQuery.productId = val
      getProductGroup(this.listQuery).then(response => {
        this.groupData = []
        if (response.data.list) {
          response.data.list.map((item) => {
            this.groupData.push(new Date(item.tripTime))
          })
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
