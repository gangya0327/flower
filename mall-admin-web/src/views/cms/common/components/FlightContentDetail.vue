<template>
  <div style="margin-top: 10px">
    <el-form
      :model="value"
      ref="productSaleForm"
      label-width="100px"
      style="width: 600px"
      size="small"
    >
      <el-card shadow="hover" class="trip-card">
        <div slot="header" class="clearfix ccc">
          <span>去程信息</span>
        </div>
        <el-form-item label="航班编号：" prop="tripFlightNumber">
          <el-input v-model="value.tripFlightNumber" style="width: 200px;" placeholder="如：MU235"></el-input>
        </el-form-item>
        <el-form-item label="航班公司：" prop="tripAirlineCompany">
          <el-input v-model="value.tripAirlineCompany" style="width: 200px;" placeholder="如：中国东方航空"></el-input>
        </el-form-item>
        <el-form-item label="出发城市：" prop="tripDepartureCityName">
          <el-input v-model="value.tripDepartureCityName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达城市：">
          <el-input v-model="value.tripDestinationCityName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发机场：">
          <el-input v-model="value.tripDepartureAirportName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达机场：">
          <el-input v-model="value.tripDestinationAirportName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发航站楼：">
          <el-input v-model="value.tripDepartureTerminal" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达航站楼：">
          <el-input v-model="value.tripDestinationTerminal" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="机型：">
          <el-input v-model="value.tripPlaneType" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="去程历时：">
          <el-input v-model="value.tripCostTime" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发时间：">
          <el-time-picker
            v-model="value.tripDepartureTime"
            format="HH:mm"
            :editable="false"
            style="width: 200px;"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="到达时间：">
          <el-time-picker
            v-model="value.tripDestinationTime"
            format="HH:mm"
            :editable="false"
            style="width: 200px;"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="航程类型：">
          <el-select v-model="value.tripFlightType" placeholder="请选择航程类型" style="width: 200px;">
            <el-option
              v-for="item in tripFlightTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否中转：">
          <el-select v-model="value.tripIsTransfer" placeholder="请选择是否中转" style="width: 200px;">
            <el-option
              v-for="item in tripIsTransferOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-card>

      <el-card shadow="hover" class="trip-card">
        <div slot="header" class="clearfix">
          <span>返程信息</span>
        </div>
        <el-form-item label="航班编号：">
          <el-input v-model="value.returnFlightNumber" style="width: 200px;" placeholder="如：MU235"></el-input>
        </el-form-item>
        <el-form-item label="航班公司：">
          <el-input
            v-model="value.returnAirlineCompany"
            style="width: 200px;"
            placeholder="如：中国东方航空"
          ></el-input>
        </el-form-item>
        <el-form-item label="出发城市：">
          <el-input v-model="value.returnDepartureCityName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达城市：">
          <el-input v-model="value.returnDestinationCityName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发机场：">
          <el-input v-model="value.returnDepartureAirportName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达机场：">
          <el-input v-model="value.returnDestinationAirportName" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发航站楼：">
          <el-input v-model="value.returnDepartureTerminal" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="到达航站楼：">
          <el-input v-model="value.returnDestinationTerminal" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="机型：">
          <el-input v-model="value.returnPlaneType" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="去程历时：">
          <el-input v-model="value.returnCostTime" style="width: 200px;" placeholder></el-input>
        </el-form-item>
        <el-form-item label="出发时间：">
          <el-time-picker
            v-model="value.returnDepartureTime"
            format="HH:mm"
            :editable="false"
            style="width: 200px;"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="到达时间：">
          <el-time-picker
            v-model="value.returnDestinationTime"
            format="HH:mm"
            :editable="false"
            style="width: 200px;"
          ></el-time-picker>
        </el-form-item>
      </el-card>

      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleNext">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchList as fetchMemberLevelList } from "@/api/memberLevel";

export default {
  name: "FlightContentDetail",
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
      tripFlightTypeOptions: [
        { value: 1, label: "单程" },
        { value: 2, label: "往返" },
        { value: 3, label: "联程" }
      ],
      tripIsTransferOptions: [
        { value: 1, label: "直飞" },
        { value: 2, label: "中转" }
      ]
    };
  },
  created() {},
  computed: {},
  methods: {
    handlePrev() {
      this.$emit("prevStep");
    },
    handleNext(formName) {
      this.$emit("nextStep");
    }
  }
};
</script>

<style scoped>
.trip-card {
  width: 730px;
  margin-bottom: 15px;
}
.trip-card .el-form-item--mini.el-form-item,
.trip-card .el-form-item--small.el-form-item {
  display: inline-block;
}
.trip-card > div {
  padding: 0;
}
.el-card__body {
  padding: 10px;
}
.el-card__header {
  padding: 0;
}
</style>
