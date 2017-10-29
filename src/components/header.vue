<template>
  <div class="hello">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">hello</el-menu-item>
      <el-submenu index="2">
        <template slot="title">编译中心</template>
        <el-menu-item index="2-1">词法分析</el-menu-item>
        <el-menu-item index="2-2">语法分析</el-menu-item>
        <el-menu-item index="2-3">AST</el-menu-item>
      </el-submenu>
      <el-menu-item index="3"><a href="https://github.com/iamsail/sail-compiler" target="_blank">Github</a></el-menu-item>
      <h1 class="name">{{ msg }}</h1>

    </el-menu>
    <div class="line"></div>

  </div>
</template>

<script>
export default {
    name: 'header',
    data() {
        return {
            msg: 'Sail-Compiler',
            activeIndex: '1',
            activeIndex2: '1'
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.name{
  position:relative;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  align-items: center;
}

</style>











