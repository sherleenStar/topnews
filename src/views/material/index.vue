<template>
  <el-card v-loading='loading'>
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
 <!-- 自定义上传 -->
    <el-upload class="upload-pic" :show-file-list="false" :http-request="uploadImg" action="">
  <el-button  type="primary">上传素材</el-button>
</el-upload>

    <el-tabs v-model="activeName" @tab-click="changeTab" style="position='relative">

        <!-- 全部素材 -->
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item" >
            <img :src="item.url" alt />

            <div class="operate">
              <i @click="collectOrDel(item)" :style="{color:item.is_collected?'red':'#000'}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"   @click="deletePic(item.id)"></i>
            </div>

          </el-card>
        </div>
<!-- 全部素材分页 -->
         <el-row type='flex' justify="center">
          <el-pagination background layout="prev, pager, next" :total="page.total" :current-page="page.currentPage" :page-size="page.pageSize" @current-change='changePage'></el-pagination>
        </el-row>
      </el-tab-pane>
<!-- 收藏素材 -->
      <el-tab-pane label="收藏素材" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-item">
            <img :src="item.url" alt />
          </el-card>
        </div>
<!-- 收藏素材分页 -->
        <el-row type='flex' justify="center">
          <el-pagination background layout="prev, pager, next" :total="page.total" :page-size="page.pageSize" :current-page="page.currentPage" @current-change='changePage'></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      loading: false
    }
  },
  methods: {
    collectOrDel (item) {
      let mess = item.is_collected ? '取消' : ''
      this.$confirm(`您确定要${mess}收藏该图片?`).then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: {
            collect: !item.is_collected
          }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    deletePic (id) {
      this.$confirm('您确定要删除该图片吗').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    uploadImg (params) {
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(() => {
        this.getMaterial()
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect',
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
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped >
.upload-pic{
    position: absolute;
    right: 30px;
    top: 120px;
    z-index: 10;
//     margin-right: 70px;
//     margin-top: -5px;
}
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .img-item {
    width: 180px;
    height: 200px;
    border-radius: 6px;
    margin: 30px;
    position: relative;
    border: 0;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      background-color: #f4f5f6;
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      i {
        font-size: 20px;
      }
    }
  }
}

</style>
