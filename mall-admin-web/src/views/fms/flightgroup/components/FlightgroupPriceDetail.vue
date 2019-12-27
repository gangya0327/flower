<template>
  <div style="margin-top: 50px">
    <el-table :data="value.priceList" style="width: 100%;margin-bottom: 10px;" ref="priceTable">
      <el-table-column label="价格类型" width="100" align>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.priceType | priceTypeFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格名称">
        <template slot-scope="scope">
          <el-tag size="medium">{{ scope.row.priceName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="供应价" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.supplyPrice }}</div>
        </template>
      </el-table-column>
      <el-table-column label="舱位" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.shippingSpaceName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="人数限制" width="100">
        <template slot-scope="scope">
          <div>{{ scope.row.maxPeople }}</div>
        </template>
      </el-table-column>
      <el-table-column label="前台优先展示" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.firstShow | firstShowFormat }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="scope.row.showStatus === 0">将被删除</div>
          <div v-else>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      type="primary"
      size="mini"
      style="margin-bottom: 20px;"
      @click="dialogPriceVisible = true"
    >添加价格信息</el-button>

    <el-dialog title="价格信息" :visible.sync="dialogPriceVisible" center width="35%">
      <el-form :model="priceForm" :inline="true" ref="priceForm">
        <el-form-item label="价格类型" :label-width="formLabelWidth">
          <el-select v-model="priceForm.priceType" placeholder="请选择价格类型" style="width: 150px;">
            <el-option label="成人" value="1"></el-option>
            <el-option label="儿童" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格名称" :label-width="formLabelWidth">
          <el-input v-model="priceForm.priceName"></el-input>
        </el-form-item>
        <el-form-item label="供应价" :label-width="formLabelWidth">
          <el-input v-model="priceForm.supplyPrice" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="舱位" :label-width="formLabelWidth">
          <el-input v-model="priceForm.shippingSpaceName" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="人数限制" :label-width="formLabelWidth">
          <el-input v-model="priceForm.maxPeople" style="width: 150px"></el-input>
        </el-form-item>
        <el-form-item label="前台优先展示" :label-width="formLabelWidth">
          <el-switch v-model="priceForm.firstShow"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogPriceVisible = false">取 消</el-button>
        <el-button type="primary" @click="addPrice()">确 定</el-button>
      </div>
    </el-dialog>
    <div style="text-align: center">
      <el-button size="medium" @click="handlePrev">上一步</el-button>
      <el-button type="primary" size="medium" @click="handleFinishCommit">完成，提交班期</el-button>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";

export default {
  name: "GroupTripDetail",
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogPriceVisible: false,
      priceForm: {
        priceType: null,
        priceName: "",
        supplyPrice: null,
        shippingSpaceName: null,
        maxPeople: null,
        firstShow: null,
        showStatus: 1
      },
      formLabelWidth: "120px",
      rules: {
        transportUrgentTel: [
          { required: true, message: "请填写接送紧急联系电话", trigger: "blur" }
        ]
      },
      isEditPrice: -1
    };
  },
  created() {},
  computed: {},
  filters: {
    priceTypeFormat(value) {
      //价格类型（1 - 成人，2 - 儿童）
      let priceTypeStr = ["", "成人", "儿童"];
      return priceTypeStr[value];
    },
    firstShowFormat(value) {
      //是否优先展示价格（0 - 否，1 - 是）
      let firstShowStr = ["否", "是"];
      return firstShowStr[value];
    }
  },
  methods: {
    addPrice() {
      this.$refs["priceForm"].resetFields();
      let oPrice = {
        priceType: this.priceForm.priceType,
        priceName: this.priceForm.priceName,
        supplyPrice: Number(this.priceForm.supplyPrice),
        shippingSpaceName: this.priceForm.shippingSpaceName,
        maxPeople: Number(this.priceForm.maxPeople),
        firstShow: this.priceForm.firstShow ? 1 : 0,
        showStatus: this.priceForm.showStatus
      };
      if (this.isEditPrice > -1) {
        this.value.priceList.splice(this.isEditPrice, 1);
      }
      this.value.priceList.push(oPrice);
      this.dialogPriceVisible = false;
      this.isEditPrice = -1;
    },
    handleEdit(index, row) {
      this.dialogPriceVisible = true;
      this.priceForm.priceType = row.priceType;
      this.priceForm.priceName = row.priceName;
      this.priceForm.supplyPrice = row.supplyPrice;
      this.priceForm.shippingSpaceName = row.shippingSpaceName;
      this.priceForm.firstShow = row.firstShow ? true : false;
      this.priceForm.maxPeople = row.maxPeople;

      this.isEditPrice = index;
    },
    handleDelete(index, row) {
      row.showStatus = 0; //0不展示，1展示
    },
    handlePrev() {
      this.$emit("prevStep");
    },
    handleFinishCommit() {
      this.$emit("finishCommit", this.isEdit);
    }
  }
};
</script>

<style scoped>
</style>