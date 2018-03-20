<template>
    <div>
        <router-view  v-if="token_can">
        </router-view>
    </div>
</template>
<script>
    import vendors from './vendors/index.js';
    export default {
        data() {
            return {
                token_can:false
            };
        },
        computed: {
            //计算属性

        },
        mounted() {
            //组件挂在到实例后调用
        },
        methods: {},
        created(){
            vendors.token.can(()=>{
                this.token_can=true;
            },true);

        }
    };
</script>
<style lang="less">

</style>
