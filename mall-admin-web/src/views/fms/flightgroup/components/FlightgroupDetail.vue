<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="开班基本信息"></el-step>
      <!-- <el-step title="出团信息"></el-step> -->
      <el-step title="班期价格"></el-step>
    </el-steps>
    <flightgroup-info-detail
      v-show="showStatus[0]"
      v-model="groupParam"
      :is-edit="isEdit"
      :is-morefunc="false"
      @nextStep="nextStep"
    ></flightgroup-info-detail>
    <flightgroup-price-detail
      v-show="showStatus[1]"
      v-model="groupParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      :is-morefunc="false"
      @finishCommit="saveAll"
    ></flightgroup-price-detail>
  </el-card>
</template>
<script>
import FlightgroupInfoDetail from "./FlightgroupInfoDetail";
import FlightgroupPriceDetail from "./FlightgroupPriceDetail";
import {
  createFlightgroup,
  getFlightgroup,
  updateFlightgroup
} from "@/api/flight";
import { formatDate } from "@/utils/date";

const defaultGroupParam = {
  productId: 0,
  stock: null, //库存量
  stockLimit: 1, //库存不限量
  airlineCompany: "", //航空公司
  departureCityName: "", //出发城市名称
  destinationCityName: "", //到达城市名称
  departureAirportName: "", //出发机场
  departureTerminal: "", //出发航站楼
  departureTime: "", //出发时间
  destinationAirportName: "", //到达机场名称
  destinationTerminal: "", //到达航站楼
  destinationTime: "", //到达时间
  flightDate: "", //销售航班日期格式
  flightNumber: "", //航班编号
  id: "", //航班id
  planeType: "", //机型
  priceList: [] //价格列表
  
  // productId: 0,
  // stock: 10, //库存量
  // stockLimit: 0, //库存不限量
  // airlineCompany: "东方航空", //航空公司
  // departureCityName: "上海", //出发城市名称
  // destinationCityName: "北京", //到达城市名称
  // departureAirportName: "上海东", //出发机场
  // departureTerminal: "T3", //出发航站楼
  // departureTime: "", //出发时间
  // destinationAirportName: "北京西", //到达机场名称
  // destinationTerminal: "T1", //到达航站楼
  // destinationTime: "", //到达时间
  // flightDate: "", //销售航班日期格式
  // date: "",
  // flightNumber: "4333115", //航班编号
  // id: "", //航班id
  // planeType: "东方411", //机型
  // priceList: [] //价格列表
};

export default {
  name: "FlightgroupDetail",
  components: {
    FlightgroupInfoDetail,
    FlightgroupPriceDetail
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
      showStatus: [true, false, false, false],
      groupParam: Object.assign({}, defaultGroupParam)
    };
  },
  created() {
    if (this.isEdit) {
      getFlightgroup(this.$route.query.id).then(response => {
        this.groupParam = response.data;
      });
    } else {
      this.groupParam.productId = Number(this.$route.query.fid);
    }
  },
  methods: {
    handleClick(tab, event) {
    },
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
    saveAll(formName) {
      let jsondata = this.groupParam;
      if (this.isEdit) {
        updateFlightgroup(jsondata).then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.$router.back();
        });
      } else {
        createFlightgroup(jsondata).then(response => {
          this.$message({
            message: "新增成功",
            type: "success",
            duration: 1000
          });
          this.$router.back();
        });
      }
    }
  }
};
</script>
<style>
.form-container {
  width: 1000px;
}
</style>


