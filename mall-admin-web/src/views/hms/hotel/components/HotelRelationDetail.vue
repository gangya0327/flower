<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      ref="productRelationForm"
      label-width="120px"
      style="width: 680px"
      size="small"
    >
      <el-form-item label="关联专题：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入专题名称"
          v-model="selectSubject"
          :titles="subjectTitles"
          :data="subjectList"
        ></el-transfer>
      </el-form-item>
      <!-- <el-form-item label="关联优选：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入优选名称"
          v-model="selectPrefrenceArea"
          :titles="prefrenceAreaTitles"
          :data="prefrenceAreaList"
        ></el-transfer>
      </el-form-item>-->
      <el-form-item label="关联旅游产品：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入路线名称"
          v-model="selectRoutes"
          :titles="prefrenceAreaTitles"
          :data="routeList"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="关联机票：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入机票名称"
          v-model="selectFlights"
          :titles="prefrenceAreaTitles"
          :data="flightList"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="关联文章：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入文章名称"
          v-model="selectTravels"
          :titles="prefrenceAreaTitles"
          :data="travelsList"
        ></el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步，填写酒店详情</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，保存酒店</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { fetchListAll as fetchSubjectList } from "@/api/subject";
import { fetchList as fetchPrefrenceAreaList } from "@/api/prefrenceArea";
import { getRelationProducts as getRelationList } from "@/api/product";

export default {
  name: "HotelRelationDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //所有专题列表
      subjectList: [],
      //专题左右标题
      subjectTitles: ["待选择", "已选择"],
      //所有专题列表
      prefrenceAreaList: [],
      //专题左右标题
      prefrenceAreaTitles: ["待选择", "已选择"],
      // 所有旅游产品
      routeList: [],
      // 所有机票
      flightList: [],
      // 所有酒店
      hotelList: [],
      // 所有文章
      travelsList: []
    };
  },
  created() {
    this.getSubjectList();
    this.getPrefrenceAreaList();
    this.getAllProductsList();
  },
  computed: {
    //选中的专题
    selectSubject: {
      get: function() {
        let subjects = [];
        if (
          this.value.subjectProductRelationList == null ||
          this.value.subjectProductRelationList.length <= 0
        ) {
          return subjects;
        }
        for (let i = 0; i < this.value.subjectProductRelationList.length; i++) {
          subjects.push(this.value.subjectProductRelationList[i].subjectId);
        }
        return subjects;
      },
      set: function(newValue) {
        this.value.subjectProductRelationList = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.subjectProductRelationList.push({
            subjectId: newValue[i]
          });
        }
      }
    },
    // 选中的旅游产品
    selectRoutes: {
      get: function() {
        let prefrenceAreas = [];
        if (
          this.value.routeListIds == null ||
          this.value.routeListIds.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.routeListIds.length; i++) {
          prefrenceAreas.push(this.value.routeListIds[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.routeListIds = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.routeListIds.push({
            slaveProductId: newValue[i]
          });
        }
      }
    },
    // 选中的机票
    selectFlights: {
      get: function() {
        let prefrenceAreas = [];
        if (
          this.value.flightListIds == null ||
          this.value.flightListIds.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.flightListIds.length; i++) {
          prefrenceAreas.push(this.value.flightListIds[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.flightListIds = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.flightListIds.push({
            slaveProductId: newValue[i]
          });
        }
      }
    },
    // 选中的酒店
    selectHotels: {
      get: function() {
        let prefrenceAreas = [];
        if (
          this.value.hotelListIds == null ||
          this.value.hotelListIds.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.hotelListIds.length; i++) {
          prefrenceAreas.push(this.value.hotelListIds[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.hotelListIds = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.hotelListIds.push({
            slaveProductId: newValue[i]
          });
        }
      }
    },
    // 选中的文章
    selectTravels: {
      get: function() {
        let prefrenceAreas = [];
        if (
          this.value.travelsListIds == null ||
          this.value.travelsListIds.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.travelsListIds.length; i++) {
          prefrenceAreas.push(this.value.travelsListIds[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.travelsListIds = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.travelsListIds.push({
            slaveProductId: newValue[i]
          });
        }
      }
    }
  },
  methods: {
    // 获取所有类别产品
    getAllProductsList() {
      getRelationList().then(response => {
        for (const key in response.data) {
          let list = response.data[key];
          if (key == 1) {
            // 旅游产品
            for (let i = 0; i < list.length; i++) {
              this.routeList.push({
                label: list[i].name,
                key: list[i].id
              });
            }
          } else if (key == 2) {
            // 机票
            for (let i = 0; i < list.length; i++) {
              this.flightList.push({
                label: list[i].name,
                key: list[i].id
              });
            }
          } else if (key == 3) {
            for (let i = 0; i < list.length; i++) {
              this.hotelList.push({
                label: list[i].name,
                key: list[i].id
              });
            }
          } else if (key == 4) {
            for (let i = 0; i < list.length; i++) {
              this.travelsList.push({
                label: list[i].name,
                key: list[i].id
              });
            }
          }
        }
      });
    },
    filterMethod(query, item) {
      return item.label.indexOf(query) > -1;
    },
    getSubjectList() {
      fetchSubjectList().then(response => {
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
          this.subjectList.push({
            label: list[i].title,
            key: list[i].id
          });
        }
      });
    },
    getPrefrenceAreaList() {
      fetchPrefrenceAreaList().then(response => {
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
          this.prefrenceAreaList.push({
            label: list[i].name,
            key: list[i].id
          });
        }
      });
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleFinishCommit() {
      // 保存拼接所有关联产品的id
      let allIds = [];
      // 加关联产品的产品类型
      this.value.routeListIds.map(v => {
        v.businessType = 1;
      });
      this.value.flightListIds.map(v => {
        v.businessType = 2;
      });
      this.value.hotelListIds.map(v => {
        v.businessType = 3;
      });
      this.value.travelsListIds.map(v => {
        v.businessType = 4;
      });
      let idAssemble = this.value.routeListIds.concat(
        this.value.flightListIds,
        this.value.hotelListIds,
        this.value.travelsListIds
      );
      for (let i = 0; i < idAssemble.length; i++) {
        allIds[i] = {};
        allIds[i].slaveProductId = idAssemble[i].slaveProductId;
        allIds[i].businessType = idAssemble[i].businessType;
      }
      this.value.pmsProductRelationList = allIds;
      this.$emit("finishCommit", this.isEdit);
    }
  }
};
</script>

<style scoped>
</style>
