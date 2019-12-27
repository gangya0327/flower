<template>
  <!-- <el-card class="form-container" shadow="never">
    <el-tabs v-model="activeTabs" type="card" @tab-click="handleClick">
      <el-tab-pane label="开班基本信息" name="1">
        <group-info-detail v-model="groupParam" :is-edit="isEdit"></group-info-detail>
      </el-tab-pane>
      <el-tab-pane label="出团信息" name="2">
        <group-trip-detail v-model="groupParam" :is-edit="isEdit"></group-trip-detail>
      </el-tab-pane>
      <el-tab-pane label="价格" name="3">
        <group-price-detail v-model="groupParam" :is-edit="isEdit"></group-price-detail>
      </el-tab-pane>
    </el-tabs>
    <el-button
      type="primary"
      style="position: relative;left: 50%"
      @click="saveAll('productInfoForm')"
    >提交数据</el-button>
  </el-card>-->

  <el-card class="form-container" shadow="never">
    <el-steps :active="active" finish-status="success" align-center>
      <el-step title="开班基本信息"></el-step>
      <el-step title="出团信息"></el-step>
      <el-step title="班期价格"></el-step>
    </el-steps>
    <group-info-detail
      v-show="showStatus[0]"
      v-model="groupParam"
      :is-edit="isEdit"
      :is-morefunc="false"
      @nextStep="nextStep"
    ></group-info-detail>
    <group-trip-detail
      v-show="showStatus[1]"
      v-model="groupParam"
      :is-edit="isEdit"
      @nextStep="nextStep"
      :is-morefunc="false"
      @prevStep="prevStep"
    ></group-trip-detail>
    <group-price-detail
      v-show="showStatus[2]"
      v-model="groupParam"
      :is-edit="isEdit"
      @prevStep="prevStep"
      :is-morefunc="false"
      @finishCommit="saveAll"
    ></group-price-detail>
  </el-card>
</template>
<script>
import GroupInfoDetail from "./GroupInfoDetail";
import GroupTripDetail from "./GroupTripDetail";
import GroupPriceDetail from "./GroupPriceDetail";
import {
  fetchProductList,
  getGroup,
  createGroup,
  updateGroup
} from "@/api/group";
import { formatDate } from "@/utils/date";

const defaultGroupParam = {
  productId: 0,
  name: null, //团队主名称
  secondName: null, //团队子名称
  stock: 0, //库存量
  stockLimit: 0, //库存不限量
  minPeople: 2, //最小成团人数
  collectionTime: new Date(0, 0), //出团集合时间
  enrollEndDay: 0, //报名截止时间-日
  enrollEndTime: new Date(0, 0), //报名截止时间
  enrollInWeekend: 0, //0-否 1-是
  tripEndTime: new Date(0, 0), //行程结束时间
  dateList: "", //选择出团日期
  transportUrgentTel: "", //接送紧急联系电话
  meetPlace: "", //接团地点
  meetSign: "", //接团标语
  localGuideName: "", //接地导游姓名
  localGuidePhone: "", //接地导游手机号
  transports: [],
  prices: []
};

export default {
  name: "GroupDetail",
  components: { GroupInfoDetail, GroupTripDetail, GroupPriceDetail },
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
      groupParam: Object.assign({}, defaultGroupParam),
      activeTabs: "1"
    };
  },
  created() {
    if (this.isEdit) {
      getGroup(this.$route.query.id).then(response => {
        this.groupParam = response.data;
      });
    } else {
      this.groupParam.productId = this.$route.query.pid;
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
    saveAll(formName) {
      let datajson = {};
      if (this.isEdit) {
        let date = new Date(this.groupParam.collectionTime);
        datajson.dateList = [formatDate(date, "yyyy-MM-dd")];
      } else {
        datajson.dateList = [];
        this.groupParam.date.map((v, i) => {
          let date = new Date(v);
          datajson.dateList.push(formatDate(date, "yyyy-MM-dd"));
        });
      }
      if (datajson.dateList == undefined) {
        this.$message({
          message: "请选择开团日期",
          type: "error",
          duration: 1000
        });
        return false;
      }

      let groupInfo = {};
      groupInfo.collectionTimeParam = formatDate(
        new Date(this.groupParam.collectionTime),
        "hh:mm"
      );
      groupInfo.enrollEndDay = this.groupParam.enrollEndDay;
      groupInfo.enrollEndTimeParam = formatDate(
        new Date(this.groupParam.enrollEndTime),
        "hh:mm"
      );
      groupInfo.enrollInWeekend = this.groupParam.enrollInWeekend;
      groupInfo.localGuideName = this.groupParam.localGuideName;
      groupInfo.localGuidePhone = this.groupParam.localGuidePhone;
      groupInfo.meetPlace = this.groupParam.meetPlace;
      groupInfo.meetSign = this.groupParam.meetSign;
      groupInfo.minPeople = this.groupParam.minPeople;
      groupInfo.name = this.groupParam.name;
      groupInfo.productId = this.groupParam.productId;
      groupInfo.secondName = this.groupParam.secondName;
      groupInfo.stock = this.groupParam.stock;
      groupInfo.stockLimit = this.groupParam.stockLimit;
      groupInfo.transportUrgentTel = this.groupParam.transportUrgentTel;
      groupInfo.id = this.groupParam.id;
      groupInfo.tripEndTimeParam = formatDate(
        new Date(this.groupParam.tripEndTime),
        "hh:mm"
      );
      let PmsProductGroupPrice = [];
      this.groupParam.prices.map(v => {
        PmsProductGroupPrice.push(v);
      });
      groupInfo.priceInfo = PmsProductGroupPrice;

      //transports
      let transportInfo = [];
      this.groupParam.transports.map(v => {
        transportInfo.push(v);
      });
      groupInfo.transportInfo = transportInfo;

      datajson.groupInfo = groupInfo;
      // return;
      if (this.isEdit) {
        updateGroup(datajson).then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          // location.reload();
          this.$router.back();
        });
      } else {
        createGroup(datajson).then(response => {
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


