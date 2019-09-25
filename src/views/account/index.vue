<template>
<el-card>
    <bread-crumb slot="header">
        <template slot="title">账户信息</template>
    </bread-crumb>
    <el-form
    label-width="100px"
    ref = 'accountForm'
    :model="formData"
    :rules="accountRules"
    style="margin-left:60px">
        <el-form-item prop="name" label-width="用户名">
            <el-input style="width:300px" v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item  label-width="简介">
            <el-input v-model="formData.intro" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item prop="email" label-width="邮箱">
            <el-input v-model="formData.email" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label-width="手机号">
            <el-input disabled v-model="formData.mobile" style="width:300px"></el-input>
        </el-form-item><el-form-item label-width="用户名">
            <el-button @click="saveUserInfo" type="primary">保存信息</el-button>
        </el-form-item>

    </el-form>
    <el-upload action="" :show-file-list="false" :http-request="uploadImg">
        <img class="head-img"
        :src='formData.photo?formData.photo:defaultImg'
        alt="">

    </el-upload>

</el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      defaultImg: require('../../assets/img/flowers.jpeg'),
      formData: {

      },
      accountRules: {
        name: [{
          required: true, message: '用户名不能为空'
        }, {
          min: 1, max: 7, message: '用户名要控制在1-7个字符之间'
        }],
        email: [
          {
            required: true, message: '邮箱不能为空'
          }, {
            pattern: /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/, message: '邮箱格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(result => {
        eventBus.$emit('updateUserInfo')
        this.formData.photo = result.data.photo
      })
    },
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      this.$refs.accountForm.validate((isOk) => {
        if (isOk) {
          this.$axios({
            url: '/user/profile',
            method: 'patch',
            data: this.formData
          }).then(() => {
            eventBus.$emit('updateUserInfo')
            this.$message({ message: '保存成功', type: 'success' })
          })
        }
      })
    }
  },
  created () {
    this.getUserInfo()
  }

}
</script>

<style scoped>
.head-img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
    position: absolute;
    top: 120px;
    right: 400px;
}

</style>
