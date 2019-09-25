<template>
  <el-row type="flex" class="home-header" justify="space-between" align="middle">
    <el-col :span="6">
      <i class="el-icon-s-unfold"></i>
      <span class="title">江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="4">
      <img class="head-img" :src="userInfo.photo?userInfo.photo:defaultImg" alt />
      <el-dropdown trigger="click" @command="commandClick">
        <span class="el-dropdown-link">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="account">个人信息</el-dropdown-item>
          <el-dropdown-item command="git">git地址</el-dropdown-item>
          <el-dropdown-item command="lgout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: { Authorization: `Bearer${token}` }
      }).then(result => {
        this.userInfo = result.data
      })
    },
    commandClick (key) {
    //   console.log(key)

      if (key === 'account') {
        this.$router.push('/home/account')
      } else if (key === 'git') {
        window.location.href = 'https://github.com'
      } else {
        window.localStorage.clear()
        this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUserInfo()
    eventBus.$on('updateUserInfo', () => {
      this.getUserInfo()
    })
  }
}
</script>

<style lang='less' scoped>
.home-header {
  height: 50px;
  .el-icon-s-unfold {
    font-size: 22px;
  }
  .title {
    vertical-align: top;
    margin-left: 4px;
  }
  .head-img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin-right: 6px;
  }
}
</style>
