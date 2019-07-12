<template>
  <div class="home">
    <el-button @click="submit">往父组件传值</el-button>
  </div>
</template>

<script>
import {getmenus} from '@/api/users.js'
export default {
  name: 'child',
  data () {
    return {
       menuslist:[1111111,2222],
    }
  },
  props: [],
  methods: {
    submit() {
        this.$emit("ccccc", this.menuslist)
    },
    dd(aaaa) {
        console.log("我执行了子组件的方法", aaaa);
    }
  },
  mounted () {
    
  }
};
</script>

<style lang="less" scoped>

</style>

