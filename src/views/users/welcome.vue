<template>
    <div class="wel">欢迎来到电商后台管理系统{{name}}
    <el-button @click="pp">hhhh</el-button></div>
</template>

<script>
import eventBus from '../../assets/js/eventBus'
export default {
    name: 'welcome',
    data () {
        return {
        name:222,
        }
    },
    methods: {
        pp() {
            console.log(this.name);
        }
    },
    mounted() {
        eventBus.$on("name", (params) => {
            this.name = params;
            console.log(this.name);
        })
    }
}
</script>

<style lang="less" scoped>
 .wel{
     font-size: 30px;
     font-weight: bold
 }
</style>

