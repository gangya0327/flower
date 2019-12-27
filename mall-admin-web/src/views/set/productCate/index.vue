<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button
        class="btn-add"
        @click="handleAddProductCate()"
        size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="分类名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="图标" align="center" width="200px">
          <template slot-scope="scope">
            <img style="height: 100px" :src="scope.row.icon">
          </template>
        </el-table-column>
        <el-table-column label="级别" width="100" align="center">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <!-- <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.showStatus">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.row.level | disableNextLevel"
              @click="handleShowNextLevel(scope.$index, scope.row)">查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleUpdate(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  // import {fetchList,deleteProductCate,updateShowStatus} from '@/api/productCate'
  import {listProductCateCommon, deleteProductCateCommon} from '@/api/productCate'

  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        listLoading: true,
        parentId: 0
      }
    },
    created() {
      this.resetParentId();
      this.getList();
    },
    watch: {
      $route(route) {
        this.resetParentId();
        this.getList();
      }
    },
    methods: {
      resetParentId(){
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 0;
        }
      },
      handleAddProductCate() {
        this.$router.push({path: '/sort/addProductCateCommon', query: {parentId: this.$route.query.parentId}});
      },
      getList() {
        this.listLoading = true;
        if(this.$route.query.parentId) {
            listProductCateCommon({id: this.$route.query.parentId}).then(response => {
            this.listLoading = false;
            this.list = response.data;
          });
        }else{
          listProductCateCommon().then(response => {
            this.listLoading = false;
            this.list = response.data;
          });
        }
      },
      handleSizeChange(val) {
        this.getList();
      },
      handleCurrentChange(val) {
        this.getList();
      },
      // handleShowStatusChange(index, row) {
      //   let data = new URLSearchParams();
      //   let ids=[];
      //   ids.push(row.id)
      //   data.append('ids',ids);
      //   data.append('showStatus',row.showStatus);
      //   updateShowStatus(data).then(response=>{
      //     this.$message({
      //       message: '修改成功',
      //       type: 'success',
      //       duration: 1000
      //     });
      //   });
      // },
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/sort/productCateCommon', query: {parentId: row.id}})
      },
      handleUpdate(index, row) {
        this.$router.push({path:'/sort/updateProductCateCommon',query:{id:row.id, parentId: row.parentId}});
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProductCateCommon(row.id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          });
        });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 1) {
          return '二级';
        }
      },
      disableNextLevel(value) {
        if (value === 0 || value === null) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
