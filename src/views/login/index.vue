<template>
  <div class="login">
    <el-card class="login-card">
      <div class="title">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="myForm" style="margin-top:20px">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" style="width:70%" placeholder="请输入验证码"></el-input>
          <el-button style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree" style="font-size:10px" class="checkbox">
            我已阅读并同意
            <span>用户协议</span>和
            <span>隐私条款</span>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" type="primary" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    let validator = function (rule, value, callback) {
      value ? callback() : callback(new Error('您需要同意协议'))
    }
    return {
      loginForm: {
        mobile: '',
        code: '',
        agree: false
      },
      loginRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码为六位数字'
          }
        ],
        agree: [{ validator }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(isOK => {
        let datasss = {
          mobile: this.loginForm.mobile,
          code: this.loginForm.code
        }
        if (isOK) {
          this.$axios
            .post('/authorizations', datasss)
            .then(result => {
              window.localStorage.setItem('user-token', result.data.token)
              this.$router.push('/home')
            })
            // .catch(error => {
            //   console.log(error)
            //   this.$message({
            //     type: 'warning',
            //     message: '手机号或验证码错误'
            //   })
            // })
        }

        // console.log('校验成功')
      })
    }
  }
}
</script>
// 如果要在style中写less就在style标签中写lang="less";
<style lang="less" scoped>
.login {
  background-image: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 330px;
    .title {
      text-align: center;

      img {
        height: 45px;
      }
    }
    .checkbox {
      span {
        color: blue;
      }
    }
  }
}
</style>
