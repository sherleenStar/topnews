<template>
  <el-container>

      <el-aside style="width:200px; background-color:#323745">
          <layout-aside style="overflow:hidden"></layout-aside>
      </el-aside>
      <el-container>
          <el-header>
            <layout-header></layout-header>
          </el-header>
          <el-main class="main">
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>

export default {

}
</script>

<style lang='less' scoped>
.main {
  padding: 0;
}
</style>
