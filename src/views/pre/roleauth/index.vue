<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="4">
        <ul :style="'height:' + fullHeight +'px;'" class="mf-rolearr-box">
          <li v-for="item in roles" :key="item.id" :class="'mf-rolearr-item' + (roleActiveNum == item.id ? ' mf-rolearr-item-active' : '')" @click="getRoleIdList(item.id)">
            <span>{{ item.label }} </span>
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <el-tree
          ref="tree"
          :props="defaultProps"
          :data="dataArr"
          :check-strictly="true"
          show-checkbox
          default-expand-all
          node-key="per_id"
          highlight-current/>
        <el-button size="small" type="primary" plain @click="getCheckedKeys">保存</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import hasPermission from '@/utils/permission'
import initData from '@/utils/initData'
import { parseTime } from '@/utils'
import { getRoleTree, getPerIdList } from '@/api/role'
import { save } from '@/api/menu'
export default {
  mixins: [initData],
  data() {
    return {
      delLoading: false,
      sup_this: this,
      defaultProps: {
        children: 'children',
        label: 'per_name'
      },
      permissions: [], roles: [], perIds: [], roleActiveNum: '', checkIds: [],
      pageParams: { curPageNum: 0, pageSize: 10 },
      fullHeight: (document.documentElement.clientHeight - 165)
    }
  },

  mounted() {
  },
  created() {
    this.$nextTick(() => {
      this.init()
    })
    this.getRoles()
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
    getRoles() {
      this.roles = []
      getRoleTree().then(res => {
        this.roles = res.data
        if (this.roles.length) {
          this.getRoleIdList(this.roles[0].id)
        }
      })
    },
    getRoleIdList(roleId) {
      this.roleActiveNum = roleId
      var data = {
        rp_role_id: roleId
      }
      getPerIdList(data).then(res => {
        this.perIds = res.data.data
        // this.perIds.forEach(item => {
        //   console.log(item)
        //   this.$refs.tree.setChecked(item,true,false)
        // })
        this.$refs.tree.setCheckedKeys(this.perIds)
      })
    },
    getCheckedKeys() {
      this.checkIds = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      console.log(this.checkIds)
      var data = {
        rp_role_id: this.roleActiveNum,
        checkIds: this.checkIds
      }
      save(data).then(res => {
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
      })
    }
  }
}
</script>

<style scoped>

.mf-rolearr-box{
        border-right: 1px solid #eaeaea;
        padding-top:25px;
        width: 100%;
}

.mf-page-mf-container{
    position: relative;
    min-height: 100%;
}
.mf-rolearr-box{
    border-right: 1px solid #eaeaea;
    padding-top:25px;
    width: 100%;
}
.mf-rolearr-item{
    height: 35px;
    line-height: 35px;
    color:#666;
    box-sizing: border-box;
    padding-left: 30px;
    cursor: pointer;
    font-size: 14px;
}
.mf-rolearr-item-active{
    background: #E1E6EB;
}

.mf-roleauth-box{
    padding-top: 30px;
    padding-bottom: 0;
    width: 850px;
    box-sizing: border-box;
}
.mf-roleauth-item{
    margin:0 50px 15px 50px;
    font-size: 14px;
}

</style>
