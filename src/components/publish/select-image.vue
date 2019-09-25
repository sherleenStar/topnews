<template>
    <el-tabs>
        <el-tab-pane label="素材库">
            <div class="img-list">
                <el-card class="imgs-item" v-for="item in list" :key='item.id'>
                    <img @click="checkImg(item)" :src="item.url" alt="">
                </el-card>
            </div>
            <el-row type="flex" justify="center">
                <el-pagination
                layout="prev,pager,next"
                background
                :current-page="page.currentPage"
                :total='page.total'
                :page-size="page.pageSize"
                @current-change='changePage'></el-pagination>
            </el-row>
        </el-tab-pane>
        <el-tab-pane label="上传图片">
            <el-upload
            :show-file-list = 'false'
            action=""
            :http-request="uploadImg">

            <i class="el-icon-plus avatar-uploader-icon"></i>

            </el-upload>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        total: 0,
        pageSize: 12,
        currentPage: 1
      }
    }
  },
  methods: {
    //   上传用户素材
    uploadImg (params) {
      let data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(result => {
        //   得到一个线上地址
        this.$emit('selectOneImg', result.data.url)
      })
    },
    //   点击素材时触发
    checkImg (item) {
      this.$emit('selectOneImg', item.url)
    },
    // 改变页数
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //   获取所有图片
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.page.currentPage = 1
    this.getAllImg()
  }

}
</script>

<style lang='less' scoped>
.img-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .imgs-item {
        width: 160px;
        height: 140px;
        margin: 5px;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

</style>
