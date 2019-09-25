<template>
  <el-card>
      <bread-crumb slot="header">
        <template slot="title">
            评论列表
        </template>
      </bread-crumb>
       <el-table :data='list'>
            <el-table-column width="600px" prop='title' label="标题"></el-table-column>
            <el-table-column align="center" prop='comment_status' label="评论状态" :formatter="stateFormatter"></el-table-column>
            <el-table-column align="center" prop='total_comment_count' label="总评论数"></el-table-column>
            <el-table-column align="center" prop='total_comment_count' label="总评论数"></el-table-column>
            <el-table-column align="center" label="操作">

                <template slot-scope="obj">
                    <el-button size='small' type="text">修改</el-button>
                    <el-button size='small' type="text" @click="changeState(obj.row)" >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
                </template>
            </el-table-column>
       </el-table>
       <el-row type='flex'
        justify='center'>
           <el-pagination
           @current-change="changePage"
            :page-size="page.pageSize"
            background
            layout="prev, pager, next"
            :total="page.total"
            :current-page="page.currentPage">
        </el-pagination>
       </el-row>

  </el-card>
</template>
<script>
export default {
  data () {
    return {
      list: [
      ],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }

    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    stateFormatter (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    changeState (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}评论?`).then(() => {
        this.$axios({
          url: 'comments/status',
          method: 'put',
          params: { article_id: row.id.toString() },
          data: { allow_comment: !row.comment_status }
        }).then(() => {
          this.getComment()
        //   this.$message({
        //     type: 'success',
        //     message: `${mess}成功!`
        //   })
        })
      })

    // .catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: `已取消${mess}`
    //     })
    //   })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    }
  },
  created () {
    this.getComment()
  }
}
</script>
<style>
</style>
