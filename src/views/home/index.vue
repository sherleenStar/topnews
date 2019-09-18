<template>
  <el-container>
      <el-aside>
          <layoutAside></layoutAside>
      </el-aside>
      <el-container>
          <el-header>头部</el-header>
          <el-main>
              <router-view></router-view>
          </el-main>
      </el-container>
  </el-container>
</template>

<script>
import layoutAside from '../../components/home/layout-aside'
export default {
  components: {
    'layoutAside': layoutAside
  }

}
</script>

<style>

</style>
