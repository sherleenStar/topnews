<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容列表</template>
    </bread-crumb>
    <el-form class="form">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="formData.status" @change='changeCondition'>
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select v-model="formData.channel_id" placeholder="请选择" @change='changeCondition'>
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
        @change="changeCondition"
          v-model="formData.data"
          type="daterange"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <!-- 主体内容 -->
    <div class="total">
        共找到{{page.total}}条符合条件的内容
    </div>
    <div class="article-item" v-for="(item,index) in list" :key='index'>
        <div class="left">
            <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
            <div class="info">
                <span class="title">{{item.title}}</span>
                <el-tag :type='item.status |statusType' class="tag">{{item.status | statusText}}</el-tag>
                <span class="date">{{item.pubdate}}</span>
            </div>
        </div>
        <div class="right">

            <span><i class="el-icon-edit" @click="editArticle(item.id)">修改</i></span>
            <span @click="delArticles(item.id)"><i class="el-icon-delete" >删除</i></span>

        </div>

    </div>
    <el-row type="flex" justify="center">
        <el-pagination
        background
        layout='prev,pager,next'
        :total='page.total'
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change='changePage'
        >

        </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formData: {
        status: 5,
        channel_id: null,
        data: []
      },
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      list: [],
      defaultImg: require('../../assets/img/boat.jpeg')
    }
  },
  methods: {
    // 修改文章
    editArticle (id) {
      this.$router.push(`/home/publish/${id}`)
    },
    // 删除文章
    delArticles (id) {
      this.$confirm('您确定要删除吗').then(() => {
        this.$axios({
          url: `/articles/${id.toString()}`,
          method: 'delete'
        }).then(() => {
          this.queryArticles()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.queryArticles()
    },
    queryArticles () {
      let params = {
        status: this.formData.status === 5 ? null : this.formData.status,
        channel_id: this.formData.channel_id,
        begin_pubdate: this.formData.data.length ? this.formData.data[0] : null,
        end_pubdate: this.formData.data.length > 1 ? this.formData.data[1] : null,
        page: this.page.currentPage,
        per_page: this.page.pageSize

      }
      this.getArticles(params)
    },
    changeCondition () {
      //       let begin_pubdate =
      //  this.formData.data.length ? this.formData.data[0] : null
      //       let end_pubdate = this.formData.data.length > 1 ? this.formData.data[1] : null
      this.page.currentPage = 1
      this.queryArticles()
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) {
      this.$axios({
        url: '/articles',
        params

      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getArticles()
    this.getChannels()
  },
  filters: {
    statusText (value) {
      switch (value) {
        case 0 :
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
        case 4 :
          return '已删除'
      }
    },
    statusType (value) {
      switch (value) {
        case 0 :
          return 'warning'
        case 1:
          return 'info'
        case 2 :
          return 'success'
        case 3:
          return 'danger'
        case 4 :
          return 'danger'
      }
    }
  }
}

</script>

<style lang='less' scoped>
.total{
    border-bottom: 1px dashed #ccc;
    height: 50px;
    line-height: 50px;
}
.form {
  margin-left: 50px;
}
.article-item{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;
    border-bottom: 1px solid #f2f3f5;
    .left{
        display: flex;
        img{
            width: 160px;
            height: 100px;
            border-radius: 4px;

        }
        .info{
            height: 100px;
            display: flex;
            flex-direction: column;
            margin-left: 10px;
            justify-content: space-around;
            .date{
                color: #999;
                font-size: 12px;
            }
            .title{
                font-size: 14px;
            }
            .tag{
                width: 60px;
            }

        }
    }
    .right{
        font-size: 12px;
        span{
            margin-right: 20px;
        }
    }
}
</style>
