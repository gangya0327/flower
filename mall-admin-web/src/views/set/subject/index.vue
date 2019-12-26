<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAddSubject()">添加专题</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="newSubjectTable"
        :data="list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="120" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="专题名称" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="首页分类图标" align="center" width="200px">
          <template slot-scope="scope">
            <img style="height: 100px" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column label="详情顶部图标" align="center" width="200px">
          <template slot-scope="scope">
            <img style="height: 100px" :src="scope.row.albumPics">
          </template>
        </el-table-column>
        <el-table-column label="专题排序" width="200" align="center">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column label="推荐到首页" width="200" align="center">
          <template slot-scope="scope">{{scope.row.recommendStatus | formatShowStatus}}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="200" align="center">
          <template slot-scope="scope">{{scope.row.showStatus | formatShowStatus}}</template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEditSort(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDeleteSort(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="专题信息"
      :visible.sync="subjectDialogVisible"
      center
      width="790px"
      class="subject-dialog"
    >
      <el-form :model="subject" label-width="100px" ref="subject">
        <el-form-item label="专题名称">
          <el-input v-model="subject.title"></el-input>
          <span>专题内容</span>
          <el-input v-model="subject.content"></el-input>
        </el-form-item>
        <el-form-item label="专题描述">
          <el-input v-model="subject.description"></el-input>
          <span>专题排序</span>
          <el-input v-model="subject.sort"></el-input>
        </el-form-item>
        <el-form-item label="推荐到首页">
          <el-switch v-model="subject.recommendStatus"></el-switch>
          <span>是否显示</span>
          <el-switch v-model="subject.showStatus"></el-switch>
        </el-form-item>
        <el-form-item label="首页分类图标">
          <single-upload
            v-model="subject.pic"
            style="width: 250px;display: inline-block;margin-left: 10px"
          ></single-upload>
        </el-form-item>
        <el-form-item label="详情顶部图标">
          <single-upload
            v-model="subject.albumPics"
            style="width: 250px;display: inline-block;margin-left: 10px"
          ></single-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subjectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveSubject()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import SingleUpload from "@/components/Upload/singleUpload";
import {
  fetchList,
  createSubject,
  updateSubject,
  deleteSubject
} from "@/api/subject";
import { formatDate } from "@/utils/date";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
const isShowStr = ["否", "是"];
export default {
  name: "subjectList",
  components: { SingleUpload },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      subject: {
        id: null,
        title: null,
        albumPics: null, //详情页顶部图片
        pic: null, //首页小图标
        sort: null,
        content: null,
        description: null,
        recommendStatus: 0,
        showStatus: 0
      },
      subjectDialogVisible: false,
      isEditSubject: -1
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatShowStatus(value) {
      return isShowStr[value];
    },
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    handleDeleteSort(index, row) {
      deleteSubject(row.id).then(response => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.getList();
      });
    },
    handleEditSort(index, row) {
      this.isEditSubject = index;
      // this.subject = row;
      this.subject.id = row.id;
      this.subject.title = row.title;
      this.subject.albumPics = row.albumPics;
      this.subject.pic = row.pic;
      this.subject.sort = row.sort;
      this.subject.content = row.content;
      this.subject.description = row.description;
      this.subject.recommendStatus = row.recommendStatus ? true : false;
      this.subject.showStatus = row.showStatus ? true : false;
      this.subjectDialogVisible = true;
    },
    saveSubject() {
      let subjectObj = {
        id: this.subject.id,
        title: this.subject.title,
        albumPics: this.subject.albumPics,
        pic: this.subject.pic,
        sort: Number(this.subject.sort),
        content: this.subject.content,
        description: this.subject.description,
        recommendStatus: this.subject.recommendStatus ? 1 : 0,
        showStatus: this.subject.showStatus ? 1 : 0
      };
      if (this.isEditSubject > -1) {
        updateSubject(subjectObj).then(response => {
          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.subjectDialogVisible = false;
          this.getList();
          this.isEditSubject = -1;
        });
      } else {
        createSubject(subjectObj).then(response => {
          this.$message({
            type: "success",
            message: "新增成功!"
          });
          this.subjectDialogVisible = false;
          this.getList();
          this.isEditSubject = -1;
        });
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleRecommendStatusStatusChange(index, row) {
      this.updateRecommendStatusStatus(row.id, row.recommendStatus);
    },
    handleAddSubject() {
      this.subjectDialogVisible = true;
      this.subject.id = null;
      this.subject.title = null;
      this.subject.albumPics = null;
      this.subject.pic = null;
      this.subject.sort = null;
      this.subject.content = null;
      this.subject.description = null;
      this.subject.recommendStatus = true;
      this.subject.showStatus = true;

      this.isEditSubject = -1;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      });
    },
    updateRecommendStatusStatus(ids, status) {
      this.$confirm("是否要修改推荐状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = new URLSearchParams();
          params.append("ids", ids);
          params.append("recommendStatus", status);
          updateRecommendStatus(params).then(response => {
            this.getList();
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "success",
            message: "已取消操作!"
          });
          this.getList();
        });
    },
    deleteSubject(ids) {
      this.$confirm("是否要删除该推荐?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let params = new URLSearchParams();
        params.append("ids", ids);
        deleteHomeSubject(params).then(response => {
          this.getList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        });
      });
    }
  }
};
</script>
<style scoped>
.subject-dialog .el-form-item span {
  margin-left: 50px;
  margin-right: 12px;
}
.subject-dialog .el-input {
  width: 150px;
}
.subject-dialog .el-form-item span {
  margin-left: 50px;
}
</style>