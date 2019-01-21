<template>
  <div class="app-container">
    <!--表格渲染-->
    <el-table v-loading="loading" :data="dataArr" size="small" border style="width: 100%;">
      <el-table-column prop="rolename" label="角色名称"/>
      <el-table-column prop="roledesc" label="角色描述"/>
      <el-table-column prop="createTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <el-popover
            v-if="hasPermission(['ROLE_ADMIN'])"
            :ref="scope.row.id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :total="total"
      style="margin-top: 8px;"
      layout="total, prev, pager, next, sizes"
      @size-change="sizeChange"
      @current-change="pageChange"/>
  </div>
</template>

<script>

import hasPermission from '@/utils/permission'
import initData from '@/utils/initData'
import { parseTime } from '@/utils'
export default {
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      /* 角色数据列表 */
      roleArr: [],
      permissions: [],
      pageParams: { curPageNum: 0, pageSize: 10 }
    }
  },

  mounted() {
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    hasPermission,
    parseTime,
    beforeInit() {
      this.url = '/getRoleList'
      const query = this.query
      const value = query.value
      this.data = { curPageNum: this.pageParams.curPageNum, pageSize: this.pageParams.pageSize }
      if (value) { this.pageParams['name'] = value }
      return true
    }
  }
}
</script>

<style scoped>

</style>
