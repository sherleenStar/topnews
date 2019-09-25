<template>
  <div class="cover-image">
      <div class="cover-item" v-for="(item,index) in images" :key="index" @click="openLayer(index)">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog @close='dialogVisible=false'
      :visible="dialogVisible">
          <select-image @selectOneImg='receiveImg'></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    //   打开层
    openLayer (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    receiveImg (url) {
      this.$emit('selectImg', url, this.selectIndex)
      this.dialogVisible = false
    }
  }

}
</script>

<style lang="less" scoped>
.cover-image {
    display: flex;
    margin: 10px 0;
    margin-left: 100px;
    .cover-item{
        border: 1px solid #ccc;
        width: 220px;
        height: 180px;
        padding:  10px;
        margin: 10px;
        img {
            width: 100%;
            height: 100%;
        }

    }
}

</style>
