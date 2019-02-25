<template>
  <el-dialog :append-to-body="true" :visible.sync="dialog" :title="isAdd ? '新增菜单' : '编辑菜单'" width="600px">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="80px">
      <el-form-item label="角色名称" prop="rolename">
        <el-input v-model="form.rolename" placeholder="请填写角色名称" style="width: 460px;"/>
      </el-form-item>
      <el-form-item label="角色描述" prop="roledesc">
        <el-input v-model.number="form.roledesc" placeholder="请填写角色描述" style="width: 460px;"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="text" @click="cancel">取消</el-button>
      <el-button :loading="loading" type="primary" @click="doSubmit">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { add, edit } from '@/api/role'
export default {
  props: {
    isAdd: {
      type: Boolean,
      required: true
    },
    sup_this: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false, dialog: false,
      form: { rolename:'' ,roledesc: '' },
      roleIds: [],
      rules: {
        rolename: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roledesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur', }
        ]
      }
    }
  },
  methods: {
    cancel() {
      this.resetForm()
    },
    doSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          if (this.isAdd) {
            this.doAdd()
          } else this.doEdit()
        } else {
          return false
        }
      })
    },
    doAdd() {
      add(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '添加成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.$parent.$parent.init()
      }).catch(error => {
        this.loading = false
        this.$message({
          showClose: true,
          message: error,
          type: 'error'
        })
      })
    },
    doEdit() {
      edit(this.form).then(res => {
        this.resetForm()
        this.$notify({
          title: '修改成功',
          type: 'success',
          duration: 2500
        })
        this.loading = false
        this.sup_this.init()
      }).catch(err => {
        this.loading = false
        console.log(err.msg)
      })
    },
    resetForm() {
      this.dialog = false
      this.$refs['form'].resetFields()
      this.form = { rolename: '', roledesc: '' }
      this.roleIds = []
    },
    selected(name) {
      this.form.icon = name
    }
  }
}
</script>

<style scoped>

</style>
