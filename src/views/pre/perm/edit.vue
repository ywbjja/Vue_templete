<template>
  <div>
    <el-button size="mini" type="success" @click="to">编辑</el-button>
    <eForm ref="form" :menus="menus" :sup_this="sup_this" :is-add="false"/>
  </div>
</template>
<script>
import eForm from './form'
export default {
  components: { eForm },
  props: {
    data: {
      type: Object,
      required: true
    },
    sup_this: {
      type: Object,
      required: true
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    to() {
      const _this = this.$refs.form
      _this.roleIds = []
      _this.form = { per_id: this.data.per_id, per_component: this.data.per_component, per_name: this.data.per_name, per_sort: this.data.per_sort,
        per_parent_id: this.data.per_parent_id, per_resource: this.data.per_resource, per_icon: this.data.per_icon, per_describe: this.data.per_describe }
      // this.data.roles.forEach(function(data, index) {
      //   _this.roleIds.push(data)
      // })
      _this.dialog = true
    }
    // getRoles() {
    //   var dataPer_id = {
    //     per_id: this.data.per_id
    //   }
    //   getUserRoles(dataPer_id).then(res => {
    //     for(const item of res.data){
    //       this.form.roleIds.push(item)
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>
  div{
    display: inline-block;
    margin-right: 3px;
  }
</style>
