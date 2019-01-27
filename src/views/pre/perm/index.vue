<template>
  <div class="app-container">
    <eHeader :roles="roles" :menus="menus" :query="query"/>
    <!--树形表格-->
    <tree-table v-loading="loading" :data="dataArr" :expand-all="true" :columns="columns" border size="small">
      <el-table-column prop="icon" label="图标" align="center" width="80px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.per_icon" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" align="center" width="100px" label="排序">
        <template slot-scope="scope">
          <el-tag >{{ scope.row.per_sort }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column :show-overflow-tooltip="true" prop="per_resource" label="URL地址"/>
      <el-table-column :show-overflow-tooltip="true" prop="per_component" label="组件"/>
      <el-table-column prop="per_crtTime" label="创建日期">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.per_crtTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
          <edit v-if="hasPermission(['ROLE_ADMIN'])" :menus="menus" :data="scope.row" :sup_this="sup_this"/>
          <el-popover
            v-if="hasPermission(['ROLE_ADMIN'])"
            :ref="scope.row.per_id"
            placement="top"
            width="180">
            <p>确定删除本条数据吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="$refs[scope.row.id].doClose()">取消</el-button>
              <el-button :loading="delLoading" type="primary" size="mini" @click="subDelete(scope.row.id)">确定</el-button>
            </div>
            <el-button slot="reference" :disabled="scope.row.per_id === 1" type="danger" size="mini">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>

<script>
import treeTable from '@/components/TreeTable'
import hasPermission from '@/utils/permission'
import tableData from '@/utils/tableData'
import { parseTime } from '@/utils'
import { getMenusTree } from '@/api/menu'
import edit from './edit'
import eHeader from './header'
export default {
  components: { treeTable, edit, eHeader },
  mixins: [tableData],
  data() {
    return {
      columns: [
        {
          text: '名称',
          value: 'per_name'
        }
      ],
      delLoading: false, sup_this: this, menus: [], roles: [],
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
    // this.getRoles()
    this.getMenus()
  },
  methods: {
    hasPermission,
    parseTime,
    beforeInit() {
      this.url = '/getMenusTableTree'
      const query = this.query
      const value = query.value
      this.data = { curPageNum: this.pageParams.curPageNum, pageSize: this.pageParams.pageSize }
      if (value) { this.pageParams['name'] = value }
      return true
    },
    getMenus() {
      getMenusTree().then(res => {
        this.menus = []
        const menu = { id: 0, label: '根目录', children: [] }
        menu.children = res.data
        this.menus.push(menu)
      })
    }
    // getRoles() {
    //   this.roles = []
    //   getRoleTree().then(res => {
    //     this.roles = res.data
    //   })
    // },
  }
}
</script>

<style scoped>

</style>
