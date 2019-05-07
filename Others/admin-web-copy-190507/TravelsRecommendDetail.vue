<template>
  <div style="margin-top: 50px">
    <el-form
      :model="value"
      ref="productRelationForm"
      label-width="120px"
      style="width: 680px"
      size="small"
    >
     <el-form-item style="margin-bottom:0">
        <span style="color: red;font-size: 12px">（说明：关联产品展示在文章结尾，相关推荐内容上方）</span>
      </el-form-item>
      <el-form-item label="关联路线：">
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
      <el-form-item label="关联酒店：">
        <el-transfer
          style="display: inline-block"
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入酒店名称"
          v-model="selectHotels"
          :titles="prefrenceAreaTitles"
          :data="hotelList"
        ></el-transfer>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button size="medium" @click="handlePrev">上一步</el-button>
        <el-button type="primary" size="medium" @click="handleFinishCommit">完成，保存文章</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getRelationProducts as getRelationList } from "@/api/product";

export default {
  name: "TravelsRecommendDetail",
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
    this.getAllProductsList();
  },
  computed: {
    // 选中的旅游产品
    selectRoutes: {
      get: function() {
        let prefrenceAreas = [];
        if (
          this.value.routeListIds1 == null ||
          this.value.routeListIds1.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.routeListIds1.length; i++) {
          prefrenceAreas.push(this.value.routeListIds1[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.routeListIds1 = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.routeListIds1.push({
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
          this.value.flightListIds1 == null ||
          this.value.flightListIds1.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.flightListIds1.length; i++) {
          prefrenceAreas.push(this.value.flightListIds1[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.flightListIds1 = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.flightListIds1.push({
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
          this.value.hotelListIds1 == null ||
          this.value.hotelListIds1.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.hotelListIds1.length; i++) {
          prefrenceAreas.push(this.value.hotelListIds1[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.hotelListIds1 = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.hotelListIds1.push({
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
          this.value.travelsListIds1 == null ||
          this.value.travelsListIds1.length <= 0
        ) {
          return prefrenceAreas;
        }
        for (let i = 0; i < this.value.travelsListIds1.length; i++) {
          prefrenceAreas.push(this.value.travelsListIds1[i].slaveProductId);
        }
        return prefrenceAreas;
      },
      set: function(newValue) {
        this.value.travelsListIds1 = [];
        for (let i = 0; i < newValue.length; i++) {
          this.value.travelsListIds1.push({
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
    handlePrev() {
      this.$emit("prevStep");
    },
    handleFinishCommit() {
      // 保存拼接所有关联产品的id
      let allIds = [];
      // 加关联产品的产品类型
      this.value.routeListIds1.map(v => {
        v.businessType = 1;
        v.relationType = 1;
      });
      this.value.flightListIds1.map(v => {
        v.businessType = 2;
        v.relationType = 1;
      });
      this.value.hotelListIds1.map(v => {
        v.businessType = 3;
        v.relationType = 1;
      });
      this.value.travelsListIds1.map(v => {
        v.businessType = 4;
        v.relationType = 1;
      });
      let idAssemble = this.value.routeListIds1.concat(
        this.value.flightListIds1,
        this.value.hotelListIds1,
        this.value.travelsListIds1
      );
      for (let i = 0; i < idAssemble.length; i++) {
        allIds[i] = {};
        allIds[i].slaveProductId = idAssemble[i].slaveProductId;
        allIds[i].businessType = idAssemble[i].businessType;
        allIds[i].relationType = idAssemble[i].relationType;
      }
      this.value.pmsProductRelationList = this.value.pmsProductRelationList.concat(
        allIds
      );
      this.$emit("finishCommit", this.isEdit);
    }
  }
};
</script>

<style scoped>
</style>
