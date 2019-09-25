<template>
  <el-card v-loading='loading'>
      <bread-crumb slot="header">
        <template slot="title">发表文章</template>
      </bread-crumb>
      <el-form label-width="100px" :model="formData" :rules="publishRules" ref="publishForm" >

          <el-form-item label='标题' prop="title">
              <el-input v-model="formData.title" class="title"></el-input>
          </el-form-item>
          <el-form-item label='内容' prop="content">
            <quill-editor v-model="formData.content" style="height:300px"></quill-editor>
          </el-form-item>
          <el-form-item label='封面' class="cover" prop="cover" >
            <el-radio-group  v-model="formData.cover.type" @change="changeType">
              <el-radio :label="1">单选</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
            </el-radio-group>
          </el-form-item>
          <cover-image :images=formData.cover.images
          @selectImg = 'changeImg'>

          </cover-image>
          <el-form-item label='频道' prop="channel_id">
            <el-select v-model="formData.channel_id">
              <el-option v-for="item in channels" :key = item.id :value=item.id :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>

              <el-button type="primary" @click=" publish(false)">发布文章</el-button>
              <el-button @click=" publish(true)">存入草稿</el-button>

          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        title: '',
        content: '',
        channel_id: null,
        cover: {
          type: 1,
          images: ['']
        }

      },
      publishRules: {
        title: [{
          required: true,
          message: '标题不能为空'
        },
        {
          min: 5, max: 30, message: '标题长度在5-30个字符之间'
        }],
        content: [{
          required: true,
          message: '内容不能为空'
        }],
        channel_id: [{
          required: true,
          message: '频道不能为空'
        }]
      }
    }
  },
  methods: {
    // 获取频道
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    // 接受子组件传过来的数据,更改images
    changeImg (url, index) {
      this.formData.cover.images = this.formData.cover.images.map((item, i) =>
        i === index ? url : item
      )
    },
    // 封面类型改变事件
    changeType (type) {
      if (this.formData.cover.type === 1) {
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) {
        this.formData.cover.images = ['', '', '']
      } else {
        this.formData.cover.images = []
      }
    },
    // 根据ID获取文章
    getArticleById (articleId) {
      this.loading = true
      this.$axios({
        url: `/articles/${articleId}`
      }).then(result => {
        this.formData = result.data
        this.loading = false
      })
    },
    // 发布文章
    publish (draft) {
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          // 根据地址是否携带id判断是新增还是修改
          let { articleId } = this.$route.params
          this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            data: this.formData,
            params: { draft }
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    }
  },
  created () {
    this.getChannels()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style lang='less' scoped>
.cover{
  margin-top:90px;
}
.title{
  width: 400px;
}
</style>
